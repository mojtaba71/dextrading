export interface NotificationMessage {
  id: number;
  name: string;
  buy_amount: string;
  buy_currency_name: string;
  network: string;
  signer: string;
  sell_amount: string;
  sell_currency_name: string;
  dex_protocol: string;
  buy_amount_usd: string;
  market_address: string;
  raw_message: {
    Transfer: {
      Currency: {
        SmartContract: string;
      };
    };
  };
} 