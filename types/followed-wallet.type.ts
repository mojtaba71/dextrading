export interface FollowedWallet {
  label: string;
  address: string;
  id?: number;
  created_at?: string;
}
export interface FollowedGroup {
  label: string;
  addresses: string[];
  notificationThreshold: number | undefined;
  notification_threshold?: number;
  id?: number;
  created_at?: string;
}
