"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import base58 from "bs58";
import TokenAutoComplete, { OkxToken } from "@/components/common/AutoComplete";
import SwapChains from "./SwapChains";
import { useDebounce } from "use-debounce";
import { getQuotes, listAvailableTokens, swapRequest } from "@/utils/okx";
import { Wallet } from "./SolanaWallet";
import dynamic from "next/dynamic";
import { parseUnits } from "viem";

const SolanaSwapButton = dynamic(() => import("./SolanaSwapButton"), {
  ssr: false,
});

export const SolanaSwapComponent = () => {
  const [loading, setLoading] = useState(false);
  const [fromToken, setFromToken] = useState<OkxToken | null>(null);
  const [toToken, setToToken] = useState<OkxToken | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [debounceAmount] = useDebounce(fromAmount, 200);
  const [toAmount, setToAmount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [availableTokens, setAvailableTokens] = useState<OkxToken[]>([]);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [slippage, setSlippage] = useState("0.02");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toString());
    }
  }, [connection, publicKey]);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokens = await listAvailableTokens({chainId: "501"});
        if (tokens.length > 0) {
          setFromToken(tokens[0]);
          setToToken(tokens[1]);
          setAvailableTokens(tokens);
        }
      } catch (error) {
        console.error("Failed to load tokens:", error);
      }
    };
    loadTokens();
  }, []);

  const swapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const getSwapData = useCallback(async () => {
    if (debounceAmount.length > 0 && fromToken && toToken) {
      const fromDecimals = parseInt(fromToken.decimals, 10);
      const amountInWei = parseUnits(debounceAmount, fromDecimals);
      try {
        const response = await getQuotes({
          chainId: "501",
          amount: amountInWei.toString(),
          fromTokenAddress: fromToken.tokenContractAddress,
          toTokenAddress: toToken.tokenContractAddress,
        });
        if (response.data[0]) {
          setErrorMessage(null);
          setToAmount(
            (
              (+debounceAmount * response.data[0]?.fromToken.tokenUnitPrice) /
              response.data[0]?.toToken.tokenUnitPrice
            )
              .toFixed(8)
              .toString()
          );
        } else {
          setToAmount("");
          setErrorMessage(response.msg || "Failed to fetch quotes.");
        }
      } catch (error) {
        console.error("Error fetching swap data:", error);
        setErrorMessage("Error fetching swap data.");
      }
    }
  }, [fromToken, toToken, debounceAmount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getSwapData();
    }, 2000);
    return () => clearTimeout(timer);
  }, [debounceAmount, fromToken, toToken, getSwapData]);

  const handleSwap = async (recipientValue: string) => {
    if (!fromToken || !toToken || !publicKey) {
      console.error("Wallet not connected or tokens not selected");
      setErrorMessage("Please connect your wallet and select tokens");
      return;
    }
    try {
      setLoading(true);
      const fromDecimals = parseInt(fromToken.decimals, 10);
      const amountInWei = parseUnits(debounceAmount, fromDecimals);
      console.log("Requesting swap quote from OKX...");
      const swapQuote = await swapRequest({
        chainId: "501",
        fromTokenAddress: fromToken.tokenContractAddress,
        toTokenAddress: toToken.tokenContractAddress,
        amount: amountInWei.toString(),
        userWalletAddress: publicKey.toString(),
        feePercent: "1.32", // Example commission percentage (max 3, 2 decimals)
        fromTokenReferrerWalletAddress: publicKey.toString(), // Use SOL wallet address directly
        slippage,
      } as any);
      console.log("Received swap quote:", swapQuote);
      if (!swapQuote.data || !swapQuote.data[0]) {
        throw new Error(
          `Failed to get swap data: ${swapQuote.msg || "Unknown error"}`
        );
      }
      const swapData = swapQuote.data[0];
      const transactionData = swapData.tx?.data || swapData.data;
      if (!transactionData || typeof transactionData !== "string") {
        console.error("Invalid transaction data:", transactionData);
        throw new Error("Failed to get valid transaction data from OKX");
      }
      console.log("Got transaction data from OKX");
      const recentBlockHash = await connection.getLatestBlockhash();
      console.log("Got blockhash:", recentBlockHash.blockhash);
      const decodedTransaction = base58.decode(transactionData);
      let tx;
      try {
        tx = VersionedTransaction.deserialize(decodedTransaction);
        console.log("Successfully created versioned transaction");
        const messageV0 = tx.message;
        messageV0.recentBlockhash = recentBlockHash.blockhash;
        tx = new VersionedTransaction(messageV0);
      } catch (e) {
        console.log("Versioned transaction failed, trying legacy transaction");
        tx = Transaction.from(decodedTransaction);
        console.log("Successfully created legacy transaction");
        tx.recentBlockhash = recentBlockHash.blockhash;
        tx.feePayer = publicKey;
      }
      console.log("Sending transaction to wallet for approval...");
      const signature = await sendTransaction(tx, connection, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
        maxRetries: 3,
      });
      console.log(`Transaction sent with signature: ${signature}`);
      console.log("Waiting for transaction confirmation...");
      const confirmation = await connection.confirmTransaction(
        {
          signature,
          blockhash: recentBlockHash.blockhash,
          lastValidBlockHeight: recentBlockHash.lastValidBlockHeight,
        },
        "confirmed"
      );
      if (confirmation.value?.err) {
        throw new Error(
          `Transaction failed: ${JSON.stringify(confirmation.value.err)}`
        );
      }
      console.log("Swap completed successfully!");
      setErrorMessage(null);
      setLoading(false);
      alert(`Swap successful! Transaction ID: ${signature}`);
    } catch (error: any) {
      console.error("Transaction failed:", error);
      setErrorMessage(`Transaction failed: ${error.message || "Unknown error"}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSwapData();
  }, [debounceAmount, getSwapData]);

  const onConnectedWallet = (address: any) => {
    console.log("Wallet Connected", address);
    setWalletAddress(address);
  };

  return (
    <Wallet>
      <div className="w-full flex justify-center">
        <Card className="min-w-[300px] p-4">
          <div className="flex items-center gap-3">
            <Image src={"/networks/solana.png"} width={24} height={24} alt="" />
            <p>Solana Swap</p>
          </div>
          <div className="my-6 flex flex-col gap-6">
            <SwapChains chainId="501" />
            <div>
              <div className="w-full bg-[hsl(var(--card-lighter))] px-3 py-5 rounded-2xl flex items-center gap-3">
                <Input
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-transparent border-0 outline-none w-3/4 md:text-xl md:p-0"
                />
                <TokenAutoComplete
                  chainId={"501"}
                  token={fromToken || undefined}
                  items={availableTokens}
                  onSelected={(token) => setFromToken(token)}
                />
              </div>
              <div className="relative w-full">
                <div
                  onClick={swapTokens}
                  className="absolute -top-[8px] left-[calc(50%-16px)] cursor-pointer"
                >
                  <RefreshCwIcon width={32} />
                </div>
              </div>
              <div className="w-full bg-[hsl(var(--card-lighter))] px-3 py-5 rounded-2xl flex items-center gap-3 mt-2">
                <Input
                  value={toAmount}
                  disabled
                  className="bg-transparent border-0 outline-none w-3/4 md:text-xl md:p-0"
                />
                <TokenAutoComplete
                  chainId="501"
                  token={toToken || undefined}
                  items={availableTokens}
                  onSelected={(token) => setToToken(token)}
                />
              </div>
            </div>
            {errorMessage && (
              <p className="text-error text-sm mx-3">{errorMessage}</p>
            )}
            <div>
              {walletAddress ? (
                <Button
                  onClick={() => handleSwap(walletAddress)}
                  className="w-full bg-brand text-white rounded-[14px] relative"
                  disabled={loading}
                >
                  {loading ? "Swapping..." : "Swap"}
                </Button>
              ) : (
                <div>
                  <SolanaSwapButton onConnected={onConnectedWallet} />
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Wallet>
  );
};
