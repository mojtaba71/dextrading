import axios, { AxiosRequestConfig } from "axios";
import { fetchData } from "./http/axios.config";

export async function isPaidMember(): Promise<boolean> {
  const key = localStorage.getItem("LICENSE_KEY");
  if (!key) {
    return false;
  }
  try {
    const data = await verifyKey(key);
    return data === "OK";
  } catch (error: any) {
    console.error("Error fetching key:", error.message);
    return false;
  }
}

export function isLoggedIn(): string | null {
  const key = localStorage.getItem("LICENSE_KEY");
  return key;
}

export const verifyKey = (
  key: string,
  options?: AxiosRequestConfig
): Promise<any> => {
  const config: AxiosRequestConfig = {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_KEY}`, // Use an environment variable for access key
    },
  };

  return fetchData<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL_TWO}/newAppKeys/${key}`,
    config
  );
};

///auth/login
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/auth/login`, {
    email: email.toLowerCase(),
    password,
  });
};

///auth/register
export const Regsiter = async ({
  email,
  password,
  referral_code,
}: {
  email: string;
  password: string;
  referral_code?: string | null;
}): Promise<any> => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/auth/register`, {
    email: email.toLowerCase(),
    password,
    referral_code,
  });
};
// /auth/forgot-password
export const forgotPassword = async ({
  email,
}: {
  email: string;
}): Promise<any> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/auth/forgot-password`,
    {
      email,
    }
  );
};
// /auth/reset-password
export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}): Promise<any> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/auth/reset-password`,
    {
      token,
      newPassword,
    }
  );
};
// /auth/resend-verification
export const resendVerificationCode = async ({
  email,
}: {
  email: string;
}): Promise<any> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/auth/resend-verification-email`,
    {
      email,
    }
  );
};


// /users with token
export const getUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<any> => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
    },
  };

  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/users?email=${email}`
  );
};
