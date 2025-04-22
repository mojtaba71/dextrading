export interface UserDetailsType {
  email: string;
}

export interface UserData {
  buying_date: null | string;
  created_at: string;
  email: string;
  id: number;
  license_key: string;
  name: null | string;
  reset_token: null | string;
  reset_token_expires: null | string;
  subscription_name: null | string;
  telegram_handle: null | string;
  twitter_handle: null | string;
  user_type: "standard" | "vip";
  verification_token: null | string;
  verified: boolean;
  referred_by_email: any,
  telegram_verified: boolean,
  twitter_verified: boolean,
  balance: string,
  referred_users_emails: string[]
}

export interface UserHandle {
  name?: string;
  telegram_handle?: string;
  subscription_name?: string;
  twitter_handle?: string;
}

export interface UserLicenseKey {
  license_key: string;
}
