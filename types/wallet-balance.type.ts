import { HotTokenHolder } from "./Wallet.type";

export interface WalletBalanceType {
  balances?: Balance[];
  totalBalance?: TotalBalance;
}

export interface Balance {
  value?: number;
  currency?: Currency;
  tokenPrice?: any;
  totalReserveInUSD?: string;
  valueInUsd?: number;
}

export interface Currency {
  symbol?: string;
  IToken?: string;
  address?: string;
}

export interface TotalBalance {
  valueInUsd?: number;
}

export interface WalletStory {
  walletAddress: string;
  networkId: string;
  avgBuyAmount: number;
  winRate: number;
  netProfit: number;
  avgHoldingTime: number;
  buyAmountLabel: string;
  totalScore: number;
  age: number;
  dayActive: number;
  swapTime: number;
  totalFee: number;
  botActivity: string;
  details: string;
  totalNumPartiallyClosedData: number;
  totalNumofFullyOpenedData: number;
  totalTransactions: number;
  hotTokenHolders: HotTokenHolder[];
  firstTopTokenHolder: any;
  top5ProfitableTokens: any;
  xProfit: any;
  newestSellDate: string;
}
