export interface NFTTradeReportType {
  data: Data;
}

export interface Data {
  EVM: Evm;
}

export interface Evm {
  DEXTrades: Dextrade[];
}

export interface Dextrade {
  ChainId: string;
  Trade: Trade;
  buy_amount: string;
  count: string;
  sell_amount: string;
}

export interface Trade {
  Buy: Buy;
  Sell: Sell;
}

export interface Buy {
  Currency: Currency;
  max_price: number;
  min_price: number;
}

export interface Currency {
  SmartContract: string;
  Symbol: string;
}

export interface Sell {
  Currency: Currency2;
}

export interface Currency2 {
  SmartContract: string;
  Symbol: string;
}
