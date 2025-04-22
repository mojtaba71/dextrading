import { ethers, JsonRpcProvider } from "ethers";
import { Connection, Transaction, PublicKey } from "@solana/web3.js";

import WalletConnect from "@walletconnect/client";
import bs58 from "bs58";
import axios from "axios";

// Configuration with Alchemy APIs
const SOLANA_RPC_URL =
  "https://solana-mainnet.g.alchemy.com/v2/pyluglhWw_trNXL5Vpk4OkqcGDtTluTp";
const EVM_RPC_URL =
  "https://eth-mainnet.g.alchemy.com/v2/pyluglhWw_trNXL5Vpk4OkqcGDtTluTp";
const SOLANA_CONNECTION = new Connection(SOLANA_RPC_URL);
const evmProvider = new JsonRpcProvider(EVM_RPC_URL);

// Initialize WalletConnect
const walletConnector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Static bridge URL
});

// Function to fetch swap data
export async function fetchSwapData(
  chain: string,
  userWallet: string,
  fromToken: string,
  toToken: string,
  amount: string,
  slippage: number
) {
  const chainId = chain === "EVM" ? 1 : 501; // 1 = Ethereum Mainnet, 501 = Solana
  const url = `https://www.okx.com/api/v5/dex/aggregator/swap?amount=${amount}&chainId=${chainId}&fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&userWalletAddress=${userWallet}&slippage=${slippage}`;
  const response = await axios.get(url, {
    headers: {
        'Authorization': `Bearer pyluglhWw_trNXL5Vpk4OkqcGDtTluTp`,
    }
  });
  return response.data.data.callData;
}

// Function to approve tokens on EVM chains
export async function approveEVM(
  walletAddress: string,
  tokenAddress: string,
  spenderAddress: string,
  amount: string
) {
  const abi = [
    "function approve(address spender, uint256 amount) external returns (bool)",
  ];
  const signer = await evmProvider.getSigner(walletAddress);
  const contract = new ethers.Contract(tokenAddress, abi, signer);

  const tx = await contract.approve(spenderAddress, amount);
  console.log(`Approval Transaction Sent: ${tx.hash}`);
  await tx.wait();
  console.log("Approval Confirmed!");
}

// Function to perform EVM swap
export async function swapEVM(walletAddress: string, swapData: any) {
  const signer = await evmProvider.getSigner(walletAddress);
  const tx = await signer.sendTransaction(swapData);
  console.log(`Swap Transaction Sent: ${tx.hash}`);
  await tx.wait();
  console.log("Swap Confirmed!");
}

// Function to perform Solana swap
export async function swapSolana(walletAddress: string, callData: string) {
  const transaction = Transaction.from(bs58.decode(callData));
  const { blockhash } = await SOLANA_CONNECTION.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(walletAddress);

  if (!walletConnector.connected) {
    await walletConnector.createSession();
  }

  // walletConnector.on("connect", async () => {
  //   const signedTransaction = await walletConnector.signTransaction(
  //     transaction.serialize()
  //   );
  //   const txData = Transaction.from(bs58.decode(signedTransaction));
  //   const txId = await SOLANA_CONNECTION.sendRawTransaction(txData.serialize());
  //   await SOLANA_CONNECTION.confirmTransaction(txId);
  //   console.log(`Transaction successful: https://solscan.io/tx/${txId}`);
  // });

  walletConnector.on("disconnect", () => {
    console.log("Wallet disconnected");
  });
}

// Main function to handle swap operations
export async function executeSwap(
  chain: string,
  walletAddress: string,
  fromToken: string,
  toToken: string,
  amount: string,
  slippage: number
) {
  try {
    console.log(`Starting swap on ${chain}...`);
    const callData = await fetchSwapData(
      chain,
      walletAddress,
      fromToken,
      toToken,
      amount,
      slippage
    );

    if (chain === "EVM") {
      const spenderAddress = "0xSpenderAddress"; // Replace with actual spender address
      await approveEVM(walletAddress, fromToken, spenderAddress, amount);
      await swapEVM(walletAddress, callData);
    } else if (chain === "Solana") {
      await swapSolana(walletAddress, callData);
    } else {
      console.error("Unsupported chain");
    }
  } catch (error) {
    console.error("Error during swap:", error);
  }
}

// (async () => {
//   const chain = "EVM"; // "EVM" or "Solana"
//   const walletAddress = "YourWalletAddress"; // Replace with wallet address
//   const fromToken = "0xFromTokenAddress"; // Replace with the actual token address
//   const toToken = "0xToTokenAddress"; // Replace with the actual token address
//   const amount = "1000000000000000000"; // Amount in smallest units (e.g., wei or lamports)
//   const slippage = 0.05; // Slippage in percentage

//   await executeSwap(chain, walletAddress, fromToken, toToken, amount, slippage);
// })();
