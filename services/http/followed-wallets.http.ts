import { FollowedGroup, FollowedWallet } from "@/types/followed-wallet.type";
import axios from "axios";

// WALLETS
export const addWallet = (token: string, wallet: FollowedWallet) =>
  axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/addwallet`, wallet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const editWallet = (token: string, wallet: FollowedWallet) =>
  axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/editwalletlabel`,
    { address: wallet.address, newLabel: wallet.label },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const listWallet = (token: string) =>
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/listwallets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const removeWallet = (token: string, id: number) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/removewallet/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//   GROUPS
export const addGroup = (token: string, group: FollowedGroup) =>
  axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/addgroup`, group, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const editGroup = (
  token: string,
  group: {
    groupId: number | undefined;
    newLabel: string;
    newThreshold: number | undefined;
  }
) =>
  axios.put(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/editgroup`, group, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const listGroup = (token: string) =>
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/listgroups`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const removeGroup = (token: string, id: number) =>
  axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/removegroup/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//MEssages
export const getMessages = (token: string) =>
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/getMessages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getGroupMessages = (token: string) =>
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/getGroupMessages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const latestSwap = (network: string) => {
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/latestswap`, {
    params: { network },
  });
};
