import { ContactForm } from "@/types/contact-form.type";
import { UserDetailsType, UserHandle } from "@/types/user.types";
import axios from "axios";

export const getUserData = async (token: string): Promise<UserDetailsType> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/users`, config);
};
export const getUserReferralLink = async (
  token: string
): Promise<UserDetailsType> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/users/referral-link `,
    config
  );
};
export const editUserData = async (
  body: UserHandle,
  headers: any
): Promise<UserHandle> => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/user/handles`,
    body,
    {
      headers,
    }
  );
};
export const connectTelegram = async (
  body: {},
  headers: any
): Promise<UserHandle> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/users/start-telegram-verification`,
    body,
    {
      headers,
    }
  );
};
export const telegramCallback = async (
  body: {
    tgAuthResult: string;
  },
  headers: any
): Promise<UserHandle> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/telegram/callback `,
    body,
    {
      headers,
    }
  );
};
export const generateOuthUrl = async (headers: any): Promise<UserHandle> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/generate-oauth-url`,
    {},
    {
      headers,
    }
  );
};
export const verifyTwitter = async (
  headers: any,
  params: any
): Promise<UserHandle> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/oauth-login`,
    {},
    {
      headers,
      params,
    }
  );
};

export const subscribe = async (email: string): Promise<UserHandle> => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_FOUR}/subscribe`, {
    email,
  });
};
export const contactusForm = async (body: ContactForm): Promise<UserHandle> => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/contact`, body);
};
