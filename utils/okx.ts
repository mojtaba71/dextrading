// lib/okxApi.ts
import axios from "axios";
import crypto from "crypto";
import CryptoJS from "crypto-js";

const okxInstance = axios.create({
  baseURL: "https://www.okx.com/api/v5",
  headers: {
    "OK-ACCESS-KEY": process.env.NEXT_PUBLIC_OKX_API_KEY!,
    "OK-ACCESS-PASSPHRASE": process.env.NEXT_PUBLIC_OKX_PASSPHRASE!,
  },
});

okxInstance.interceptors.request.use((config) => {
  const timestamp = new Date().toISOString();
  config.headers["OK-ACCESS-TIMESTAMP"] = timestamp;

  const prehash =
    timestamp + config.method!.toUpperCase() + config.url + (config.data || "");
  config.headers["OK-ACCESS-SIGN"] = crypto
    .createHmac("sha256", process.env.NEXT_PUBLIC_OKX_API_SECRET!)
    .update(prehash)
    .digest("base64");

  return config;
});

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

function sign(message: string, secret_key: string) {
  const hmac = CryptoJS.HmacSHA256(message, secret_key);
  return CryptoJS.enc.Base64.stringify(hmac);
}

function createSignature(method: string, request_path: string, params: any) {
  const timestamp = new Date().toISOString().slice(0, -5) + "Z";
  const secret = process.env.NEXT_PUBLIC_OKX_API_SECRET;
  if (!secret) {
    throw new Error("OKX API secret is not defined");
  }
  const message = preHash(timestamp, method, request_path, params);
  const signature = sign(message, secret);
  return { signature, timestamp };
}

export const sendGetRequest = async (
  request_path: string,
  params?: Record<string, any>
) => {
  const { signature, timestamp } = createSignature("GET", request_path, params);
  const headers = {
    "OK-ACCESS-KEY": process.env.NEXT_PUBLIC_OKX_API_KEY || "",
    "OK-ACCESS-SIGN": signature,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": process.env.NEXT_PUBLIC_OKX_PASSPHRASE || "",
    "OK-ACCESS-PROJECT": process.env.NEXT_PUBLIC_OKX_API_PROJECT_ID || "",
  };
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  const response = await fetch(
    `https://www.okx.com${request_path}${queryString}`,
    { headers }
  );
  return response.json();
};

// export async function   listAvailableTokens(chainId: string) {
//   const result = await sendGetRequest("/api/v5/dex/aggregator/all-tokens", {
//     chainId,
//   });
//   return result.data;
// }
export async function listAvailableTokens(params: {
  chainId: string;
  inputContent?: string;
}) {
  const result = await axios.get(
    `https://www.okx.com/priapi/v1/dx/trade/multi/allTokens`,
    {
      params: {
        ...params,
        userUniqueId: "4D241270-F313-4D3B-B9A8-A6F269EBB8EC",
      },
    }
  );
  return result.data;
}
export async function searchSwapToken(params: {
  chainId: string;
  inputContent?: string;
}) {
  const result = await axios.get(
    `https://www.okx.com/priapi/v1/dx/trade/multi/tokens/single/search`,
    {
      params: {
        ...params,
        chainType: 0,
        searchType: 0,
        userUniqueId: "4D241270-F313-4D3B-B9A8-A6F269EBB8EC",
      },
    }
  );
  return result.data;
}

export async function getQuotes(params: {
  chainId: string;
  amount: bigint | string;
  fromTokenAddress: string;
  toTokenAddress: string;
}) {
  const result = await sendGetRequest("/api/v5/dex/aggregator/quote", {
    ...params,
  });
  return result;
}
export async function approveTransaction(params: {
  chainId: string;
  approveAmount: string;
  tokenContractAddress: `0x${string}` | undefined;
}) {
  const result = await sendGetRequest(
    "/api/v5/dex/aggregator/approve-transaction",
    {
      ...params,
      referrerAddress: "7MgHTgmy3K5hUpNg5NaCRa6c5an3qcPv1KwNhLvh4FnC",
    }
  );
  return result;
}
export async function swapRequest(params: {
  chainId: string;
  amount: string | bigint;
  fromTokenAddress: string;
  toTokenAddress: string;
  slippage: number;
  userWalletAddress: string;
}) {
  const result = await sendGetRequest("/api/v5/dex/aggregator/swap", {
    ...params,
    feePercent: "1.32",
    fromTokenReferrerWalletAddress:
      "7MgHTgmy3K5hUpNg5NaCRa6c5an3qcPv1KwNhLvh4FnC",
  });
  return result;
}
