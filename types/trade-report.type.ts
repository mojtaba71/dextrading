export interface TradeReportType {
  data?: Data;
}

export interface Data {
  EVM?: Evm;
}

export interface Evm {
  DEXTradeByTokens?: DextradeByToken[];
}

export interface DextradeByToken {
  Block?: Block;
  ChainId?: string;
  Trade?: Trade;
  Transaction?: Transaction;
  typeOfTransaction?: string;
  maker?: string;
}

export interface Block {
  Number?: string;
  Time?: string;
}

export interface Trade {
  Amount?: string;
  Buyer?: string;
  Currency?: Currency;
  Dex?: Dex;
  Price?: number;
  Seller?: string;
  Side?: Side;
  priceInEth?: number;
  typeOfTransaction?: string;
  maker?: string;
}

export interface Currency {
  SmartContract?: string;
  Symbol?: string;
}

export interface Dex {
  ProtocolName?: string;
  SmartContract?: string;
}

export interface Side {
  Amount?: string;
  Currency?: Currency2;
}

export interface Currency2 {
  SmartContract?: string;
  Symbol?: string;
}

export interface Transaction {
  Hash?: string;
}
