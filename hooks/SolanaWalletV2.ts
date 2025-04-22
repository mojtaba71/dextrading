import { Connection, Transaction, PublicKey, Keypair } from "@solana/web3.js";

import WalletConnect from "@walletconnect/client";
import bs58 from "bs58";
import axios from "axios";
import CryptoJS from "crypto-js";
// Solana RPC URL
const SOLANA_RPC_URL =
  "https://solana-mainnet.g.alchemy.com/v2/pyluglhWw_trNXL5Vpk4OkqcGDtTluTp";
const SOLANA_CONNECTION = new Connection(SOLANA_RPC_URL);

// Your Solana Private Key (in base58 format)
const privateKey =
  "4nDHEMjTnrSn5qg8ASV5Dyxo3wdXYxW6F2eUPrc2NrnrmqG5u5kk2nLfbWe7S8hEFkiCfR6mB2WGioVJ1AghP84P";
const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));

// OKX API Credentials
const OK_ACCESS_KEY = "c5598e30-8736-4e19-94ba-e929f79d9ae6";
const OK_ACCESS_PASSPHRASE = "Abed1380.";
const OK_ACCESS_SECRET = "ynKHhud7GUUPPoC07blbpZFqtCLzjQXWySrW2GXjTKA="; // Your OKX secret key

function sign(message: string, secret_key: string) {
  const hmac = CryptoJS.HmacSHA256(message, secret_key);
  return CryptoJS.enc.Base64.stringify(hmac);
}

function preHash(
  timestamp: string,
  method: string,
  request_path: string,
  params?: any
) {
  let query_string = "";
  if (method === "GET" && params) {
    query_string = "?" + new URLSearchParams(params).toString();
  }
  if (method === "POST" && params) {
    query_string = JSON.stringify(params);
  }
  return timestamp + method + request_path + query_string;
}

// Helper Function: Generate OKX Headers
function getOKXHeaders(method: string, path: string, body: string = "") {
  const timestamp = new Date().toISOString().slice(0, -5) + "Z";

  const secret = process.env.NEXT_PUBLIC_OKX_API_SECRET;
  if (!secret) {
    throw new Error("OKX API secret is not defined");
  }
  const message = preHash(timestamp, method, path, body);

  const signature = sign(message, secret);

  return {
    "OK-ACCESS-KEY": OK_ACCESS_KEY,
    "OK-ACCESS-SIGN": signature,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": OK_ACCESS_PASSPHRASE,
  };
}

// Fetch SOL Price
async function fetchSolPrice() {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
  );
  if (response.data && response.data.solana && response.data.solana.usd) {
    return response.data.solana.usd;
  } else {
    throw new Error("Failed to fetch SOL price");
  }
}

// Fetch Swap Data
async function fetchSwapData(
  userWallet: string,
  fromToken: string,
  toToken: string,
  amount: string,
  slippage: number
) {
  const path = `/api/v5/dex/aggregator/swap?amount=${amount}&chainId=501&fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&userWalletAddress=${userWallet}&slippage=${slippage}`;
  const url = `https://www.okx.com${path}`;
  const headers = getOKXHeaders("GET", path);
  debugger;
  try {
    const response = await axios.get(url, { headers });
    if (response.data && response.data.data && response.data.data.callData) {
      return response.data.data.callData;
    } else {
      throw new Error("Invalid response from OKX swap API");
    }
  } catch (error: any) {
    console.error(
      "Error Response:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch swap data");
  }
}

// Perform Solana Swap
async function swapSolana(walletAddress: string, callData: string) {
  const transaction = Transaction.from(bs58.decode(callData));
  const { blockhash } = await SOLANA_CONNECTION.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(walletAddress);

  // Sign the transaction with your private key
  transaction.sign(keypair);

  // Send the transaction
  const txId = await SOLANA_CONNECTION.sendRawTransaction(
    transaction.serialize()
  );
  await SOLANA_CONNECTION.confirmTransaction(txId);
  console.log(`Transaction successful: https://solscan.io/tx/${txId}`);
}

// Main Logic for Swap Execution
export async function executeSwap() {
  const chain = "Solana"; // "EVM" or "Solana"
  const walletAddress = "BUWeS7VFChneQDfaRvmHYdoY3r2GwGD2eBL4vVpVEJXv"; // Replace with wallet address
  const fromToken = "11111111111111111111111111111111"; // Replace with the actual token address
  const toToken = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"; // Replace with the actual token address
  const amount = "1000000000000000000"; // Amount in smallest units (e.g., wei or lamports)
  const slippage = 0.05; // Slippage in percentage

  try {
    // Fetch current SOL price in USD
    const solPrice = await fetchSolPrice();
    console.log(`Current SOL Price: $${solPrice} USD`);

    // Calculate equivalent amount of SOL for $1
    const solAmountInUsd = 1; // $1 worth of SOL
    const solAmount = Math.floor((solAmountInUsd / solPrice) * 1e9); // Convert to lamports
    console.log(`Swapping ${solAmount} lamports of SOL (≈ $1) to BONK...`);

    // Convert solAmount to string before passing it
    const swapData = await fetchSwapData(
      walletAddress,
      fromToken,
      toToken,
      solAmount.toString(),
      slippage
    );
    console.log(`Swap Data Fetched: ${swapData}`);

    // Execute the swap
    await swapSolana(walletAddress, swapData);
  } catch (error: any) {
    console.error("Error during swap execution:", error.message);
  }
}

// // Execute the Script
// executeSwap();
