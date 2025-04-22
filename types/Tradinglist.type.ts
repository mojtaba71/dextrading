export interface ITradingListResponse {
  data: ITradingItem[];
}

export interface ITradingItem {
  id: string;
  type: string;
  attributes: Attributes;
}

export interface Attributes {
  block_number: number;
  tx_hash: string;
  tx_from_address: string;
  from_token_amount: string;
  to_token_amount: string;
  price_from_in_currency_token: string;
  price_to_in_currency_token: string;
  price_from_in_usd: string;
  price_to_in_usd: string;
  block_timestamp: string;
  kind: string;
  volume_in_usd: string;
  from_token_address: string;
  to_token_address: string;
}
