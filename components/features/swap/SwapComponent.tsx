"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useCallback, useState, useEffect } from "react";
import {
  getQuotes,
  listAvailableTokens,
  swapRequest,
  approveTransaction,
  searchSwapToken,
} from "@/utils/okx";
import { erc20Abi, parseUnits } from "viem";
import SwapChains from "./SwapChains";
import SwapButton from "./SwapButton";
import TokenAutoComplete from "@/components/common/AutoComplete";
import { useDebounce } from "use-debounce";
import { MaxUint256 } from "ethers";
import { Contract, BrowserProvider } from "ethers";
import { AiOutlineSwap } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import SwapMessages from "./SwapMessages";
import { useRouter, useSearchParams } from "next/navigation";
import Slippage from "./Slippage";
import SolanaSwapButton from "./SolanaSwapButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";

interface OkxToken {
  decimals: string;
  tokenContractAddress: string;
  tokenLogoUrl: string;
  tokenName: string;
  tokenSymbol: string;
}

export const SwapComponent = ({
  fromTokenContractAddress,
  toTokenContractAddress,
  selectedNetwrok,
}: {
  fromTokenContractAddress?: string;
  toTokenContractAddress?: string;
  selectedNetwrok?: number;
}) => {
  const searchParams = useSearchParams();

  const [chainId, setChainId] = useState(selectedNetwrok ? selectedNetwrok.toString() : searchParams.get("chainId") ?? "501");

  const [fromAmount, setFromAmount] = useState<string>(
    searchParams.get("fromAmount") ?? "1"
  );
  const [toAmount, setToAmount] = useState<string>(
    searchParams.get("toAmount") ?? ""
  );
  const [fromToken, setFromToken] = useState<OkxToken | null>(null);
  const [toToken, setToToken] = useState<OkxToken | null>(null);

  const router = useRouter();
  const { data: tokens } = useQuery({
    queryKey: ["okxTokens", chainId],
    queryFn: () => listAvailableTokens({ chainId }).then((data) => data),
    select: (data) => data.data,
  });

  const [networkIsSolana, setNetworkIsSolana] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction: sendSolanaTransaction } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toString());
    }
  }, [connection, publicKey]);
  const onConnectedSolanaWallet = (address: any) => {
    console.log("Wallet Connected", address);
    setWalletAddress(address);
  };

  const handleSolanaSwap = async (recipientValue: string) => {
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
      const signature = await sendSolanaTransaction(tx, connection, {
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
      setErrorMessage(
        `Transaction failed: ${error.message || "Unknown error"}`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chainId && chainId === "501") {
      setNetworkIsSolana(true);
    } else {
      setNetworkIsSolana(false);
    }
  }, [chainId]);

  const getTokenWithContractAddress = async (
    contractAddress: string,
    identifier: string
  ) => {
    let response = await searchSwapToken({
      chainId,
      inputContent: contractAddress,
    });
    identifier === "fromToken"
      ? setFromToken(
          [...response.data.systemList, ...response.data.thirdPartyList][0]
        )
      : setToToken(
          [...response.data.systemList, ...response.data.thirdPartyList][0]
        );
  };

  useEffect(() => {
    if (fromTokenContractAddress && toTokenContractAddress) {
      getTokenWithContractAddress(fromTokenContractAddress, "fromToken");
      getTokenWithContractAddress(toTokenContractAddress, "toToken");
    }
    if (selectedNetwrok) {
      setChainId(selectedNetwrok.toString())
    }
  }, [fromTokenContractAddress, toTokenContractAddress, selectedNetwrok]);

  useEffect(() => {
    if (tokens) {
      if (searchParams.get("fromToken")) {
        getTokenWithContractAddress(
          searchParams.get("fromToken") as string,
          "fromToken"
        );
      }
      if (searchParams.get("toToken")) {
        getTokenWithContractAddress(
          searchParams.get("toToken") as string,
          "toToken"
        );
      }
      if (
        noValueChecker(searchParams.get("fromToken")) &&
        noValueChecker(searchParams.get("toToken"))
      ) {
        setFromToken(tokens[0]);
        setToToken(tokens[1]);
      }

      setAvailableTokens(tokens);
    }
  }, [tokens]);

  useEffect(() => {
    if (tokens && !fromTokenContractAddress && !toTokenContractAddress) {
      router.push(
        `/dextrading-swap?chainId=${chainId}&&fromAmount=${fromAmount}&&toAmount=${toAmount}&&fromToken=${
          fromToken && fromToken.tokenContractAddress
        }&&toToken=${toToken && toToken.tokenContractAddress}`
      );
    }
  }, [tokens, chainId, router, fromAmount, toAmount, fromToken, toToken]);

  const { address } = useAccount();

  const [availableTokens, setAvailableTokens] = useState<OkxToken[]>([]);
  const [debounceAmount] = useDebounce(fromAmount, 200);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [slippage, setSlippage] = useState(0.02);
  const [isApproved, setIsApproved] = useState(false);
  const [fromTokenBalance, setFromTokenBalance] = useState<string>("0");
  const [toTokenBalance, setToTokenBalance] = useState<string>("0");

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Check Allowance
  const checkAllowance = useCallback(
    async (
      tokenAddress: string,
      ownerAddress: string,
      spenderAddress: string
    ) => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tokenContract = new Contract(tokenAddress, erc20Abi, signer);

        const amountInWei = parseUnits(
          debounceAmount || "0",
          +fromToken!.decimals
        );
        const allowance: bigint = await tokenContract.allowance(
          ownerAddress,
          spenderAddress
        );

        setIsApproved(allowance >= amountInWei);
      } catch (error) {
        console.error("Error checking allowance:", error);
        setIsApproved(false);
      }
    },
    [debounceAmount, fromToken]
  );

  const handleApproval = async () => {
    if (!fromToken || !address || !debounceAmount) {
      console.error("Missing required data for approval");
      return;
    }

    try {
      const approveAmount = parseUnits(
        debounceAmount,
        +fromToken.decimals
      ).toString();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const approveTxData = await approveTransaction({
        chainId,
        tokenContractAddress: fromToken.tokenContractAddress as `0x${string}`, // Explicit type assertion
        approveAmount,
      });

      const dexContractAddress = approveTxData.data[0].dexContractAddress;
      const tokenContract = new Contract(
        fromToken.tokenContractAddress,
        erc20Abi,
        signer
      );

      const txResponse = await tokenContract.approve(
        dexContractAddress,
        MaxUint256.toString()
      );
      console.log("Approval Transaction Sent:", txResponse);
      await txResponse.wait();

      setIsApproved(true);
    } catch (error) {
      console.error("Error during approval:", error);
    }
  };

  const noValueChecker = (value: any) => {
    return value === "undefined" || value === "null";
  };

  // Fetch Swap Data
  const getSwapData = useCallback(async () => {
    if (debounceAmount.length > 0 && fromToken && toToken) {
      const fromDecimals = parseInt(fromToken.decimals, 10);
      const amountInWei = parseUnits(debounceAmount, fromDecimals);

      try {
        const response = await getQuotes({
          chainId,
          amount: amountInWei.toString(),
          fromTokenAddress: fromToken.tokenContractAddress,
          toTokenAddress: toToken.tokenContractAddress!,
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
  }, [fromToken, toToken, debounceAmount, chainId]);

  // Send Swap Request
  const sendSwapRequest = async () => {
    if (!fromToken || !toToken || !debounceAmount || !address) {
      console.error("Missing required data for swap");
      return;
    }

    try {
      const amountInWei = parseUnits(debounceAmount, +fromToken.decimals);
      const swapQuote = await swapRequest({
        chainId,
        fromTokenAddress: fromToken.tokenContractAddress,
        toTokenAddress: toToken.tokenContractAddress!,
        amount: amountInWei.toString(),
        userWalletAddress: address!,
        slippage,
      });

      const transactionData = swapQuote.data[0]?.tx;
      if (!transactionData) {
        console.error("Transaction data is missing in swapQuote");
        return;
      }

      sendTransaction({
        to: transactionData.to,
        data: transactionData.data,
        value: BigInt(transactionData.value || "0"),
      });
    } catch (error) {
      console.error("Error during swap transaction:", error);
    }
  };

  // Fetch Token Balances
  const fetchTokenBalance = useCallback(
    async (
      token: OkxToken,
      setBalance: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (!token || !address) return;

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tokenContract = new Contract(
          token.tokenContractAddress,
          erc20Abi,
          signer
        );

        const balance: bigint = await tokenContract.balanceOf(address);
        const decimals = Number(token.decimals);
        setBalance((Number(balance) / 10 ** decimals).toFixed(4));
      } catch (error) {
        console.error(`Error fetching balance for ${token.tokenName}:`, error);
        setBalance("0");
      }
    },
    [address]
  );

  useEffect(() => {
    fetchTokenBalance(fromToken!, setFromTokenBalance);
  }, [fromToken, address, fetchTokenBalance]);

  useEffect(() => {
    fetchTokenBalance(toToken!, setToTokenBalance);
  }, [toToken, address, fetchTokenBalance]);

  useEffect(() => {
    if (debounceAmount.length > 0 && fromToken && toToken) {
      getSwapData();
    }
  }, [debounceAmount, fromToken, toToken, getSwapData]);

  useEffect(() => {
    if (
      fromToken &&
      address &&
      toToken?.tokenContractAddress &&
      debounceAmount
    ) {
      checkAllowance(
        fromToken.tokenContractAddress,
        address,
        toToken.tokenContractAddress
      );
    }
  }, [fromToken, address, toToken, debounceAmount, checkAllowance]);

  return (
    <div className="w-full flex justify-center">
      <Card className="min-w-[320px] p-4">
        <div className="flex items-center gap-3">
          <Image src={"/networks/dex.png"} width={24} height={24} alt="" />
          <p>Dextrading Swap</p>
        </div>
        <div className="my-6 flex flex-col gap-6">
          <SwapChains chainId={chainId} setChainId={setChainId} />
          <div>
            <div className="w-full bg-[hsl(var(--card-lighter))] px-3 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-1/2">
                <Input
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-transparent border-0 outline-none w-3/4 md:text-xl md:p-0 hover:bg-transparent focus-visible:ring-0"
                  style={{ padding: 0 }}
                />
                <div className="text-sm text-muted-foreground mt-2 text-nowrap">
                  Balance: {fromTokenBalance} {fromToken?.tokenSymbol}
                </div>
              </div>
              <TokenAutoComplete
                chainId={chainId}
                token={fromToken || undefined}
                items={availableTokens}
                onSelected={(token: OkxToken) => setFromToken(token)}
              />
            </div>

            <div className="relative w-full">
              <div
                onClick={() => {
                  const temp = fromToken;
                  setFromToken(toToken);
                  setToToken(temp);
                  setFromAmount(toAmount);
                  setToAmount(fromAmount);

                  const tempBalance = fromTokenBalance;
                  setFromTokenBalance(toTokenBalance);
                  setToTokenBalance(tempBalance);
                }}
                className="absolute -top-[16px] left-[calc(50%-16px)] cursor-pointer"
              >
                <div className="p-2 bg-card rounded-full">
                  <AiOutlineSwap className="rotate-90 text-2xl" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[hsl(var(--card-lighter))] px-3 py-2 rounded-2xl flex items-center gap-3 mt-2">
              <div className="w-full">
                <Input
                  value={`${(+toAmount).toFixed(4)}`}
                  disabled
                  className="bg-transparent border-0 outline-none w-3/4 md:text-xl md:p-0 hover:bg-transparent focus-visible:ring-0"
                  style={{ padding: 0 }}
                />
                <div className="text-sm text-muted-foreground mt-2 text-nowrap">
                  Balance: {toTokenBalance} {toToken?.tokenSymbol}
                </div>
              </div>

              <TokenAutoComplete
                chainId={chainId}
                token={toToken || undefined}
                items={availableTokens}
                onSelected={(token: OkxToken) => setToToken(token)}
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-error text-sm mx-3">{errorMessage}</p>
          )}
          {networkIsSolana ? (
            <div>
              {walletAddress ? (
                <Button
                  onClick={() => handleSolanaSwap(walletAddress)}
                  className="w-full bg-brand text-white rounded-[14px] relative"
                  disabled={loading}
                >
                  {loading ? "Swapping..." : "Swap"}
                </Button>
              ) : (
                <div>
                  <SolanaSwapButton onConnected={onConnectedSolanaWallet} />
                </div>
              )}
            </div>
          ) : (
            <>
              {address && !isApproved ? (
                <Button onClick={handleApproval} className="bg-brand">
                  Approve Token
                </Button>
              ) : (
                <SwapButton
                  sendSwapRequest={sendSwapRequest}
                  isApproved={isApproved}
                  disabled={!isApproved || !fromAmount || !toAmount}
                />
              )}
            </>
          )}
          {fromAmount && toAmount && (
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div>Price per {fromToken?.tokenName}</div>
              <div>
                {(Number(toAmount) / Number(fromAmount)).toFixed(4)}{" "}
                {toToken?.tokenName}
              </div>
            </div>
          )}
          <Slippage onChange={(value: number) => setSlippage(value)} />

          <SwapMessages
            error={error}
            isConfirmed={isConfirmed}
            hash={hash}
            isConfirming={isConfirming}
          />
        </div>
      </Card>
    </div>
  );
};
