export interface NotificationMessage {
  id: number;
  name: string;
  sellImageUrl: string;
  buyImageUrl: string;
  buy_amount_usd: string | null;
  buy_amount: string | null;
  sell_amount: string | null;
  buy_currency_name: string | null;
  sell_currency_name: string | null;
  signer: string | null;
  network: string | null;
  market_address: string | null;
  dex_protocol: string | null;
  raw_message: {
    Transfer: {
      Currency: {
        SmartContract: string;
      };
    };
  };
  trade_time?: string;
  report: {
    detailed: string;
    dex_protocol: string;
    market_address: string;
    network: string;
    paidTokenAmount: string;
    paidTokenName: string;
    price: string;
    receivedTokenAmount: string;
    receivedTokenName: string;
    signer: string;
    swapType: string;
    trade_time: string;
    value: string;
  };
}
