export interface WalletSummaryType {
  highestProfit?: [number, string, string, string];
  lowestProfit?: [number, string, string, string];
  highestLoss?: [number, string, string, string];
  lowestLoss?: [number, string, string, string];
  totalProfit?: number;
  totalLoss?: number;
  netProfit?: number;
  description?: string;
  averagePercentageProfit?: number;
  totalProfits?: TotalProfits;
  totalBuySellTimes?: TotalBuySellTimes;
  totalBuyAmounts?: TotalBuyAmounts;
  totalSellAmounts?: TotalSellAmounts;
  totalBuyTimes?: TotalBuyTimes;
  totalSellTimes?: TotalSellTimes;
  percentageWeek?: { [key: string]: number };
  percentageMonth?: { [key: string]: number };
  percentageYear?: PercentageYear;
  averageHoldingTimes?: AverageHoldingTimes;
  totalProfitsPerToken?: TotalProfitsPerToken;
  overallAverageHoldingTimeAndProfit?: OverallAverageHoldingTimeAndProfit;
  mostProfitableTokenWithShortestOpeningTime?: MostProfitableTokenWithShortestOpeningTime;
  swapTimeResults?: SwapTimeResults;
  avgHoldingTime?: string;
  avgProfit?: number;
  avgBuyAmount?: number;
  holdingTimeLabel?: string;
  profitLabel?: string;
  buyAmountLabel?: string;
  holdingTimeScore?: number;
  profitScore?: number;
  sizeScore?: number;
  totalScore?: number;
  winRate?: string;
  totalProfitableSwaps?: number;
  totalNegativeSwaps?: number;
  totalPositions?: number;
  newestBoughtToken?: NewestBoughtToken;
  newestSoldToken?: NewestSoldToken;
  formattedNewestBoughtToken?: FormattedNewestBoughtToken;
  formattedNewestSoldToken?: FormattedNewestSoldToken;
  transactionMetrics?: TransactionMetrics;
  percentageProfitsPerToken?: PercentageProfitsPerToken;
  totalWithdraw?: number;
  totalDeposit?: number;
  sendTokens?: SendTokens;
  sentHistory?: SentHistory[];
  WithdrawDuration?: string;
  receiveTokens?: ReceiveTokens;
  receiveHistory?: ReceiveHistory[];
  DepositDuration?: string;
  totalNotClosedBalance?: number;
  totalPartiallyClosed?: number;
  CurrentBalance?: number;
  totalNumofPartiallyClosed?: TotalNumofPartiallyClosed;
  totalNumofFullyOpenedData?: TotalNumofFullyOpenedData;
  totalNumTransactionsData?: TotalNumTransactionsData;
  Interaction?: Interaction;
  SwapTime?: string[];
  BotActivity?: string;
  details?: "Dex Trader" | "Not Dex Trader";
  HotTokenHolders?: HotTokenHolder[];
  top5ProfitableTokens?: any[];
  most5TradedTokens?: any[];
  Top20HotTokenHolders?: any[];
  TotalFee?: number;
  DextraderScore?: number;
  averagePercentageyearly?: number;
  labelTrader?: "Day Trader" | "Night Trader";
  timestamp?: number;
  limit: any;
  transactionStats?: TransactionStats;
  resume: any[]
}

export interface TransactionStats {
  totalReceiveTransactions: number;
  totalSendTransactions: number;
  totalTransaction: number;
  totalSwapTransactions: number;
  realizedPosition: number;
  totalProfitableSwaps: number;
  totalNegativeSwaps: number;
  partialClosed: number;
  FullyOpened: number;
  FullyClosed: number;
  totalPositionsReal: number;
}

export interface TotalProfits {
  month: { [key: string]: number };
  week: { [key: string]: number };
  year: { [key: string]: number };
}

export interface TotalBuySellTimes {
  month: { [key: string]: number };
  week: { [key: string]: number };
  year: { [key: string]: number };
}

export interface TotalBuyAmounts {
  month: { [key: string]: number };
  week: { [key: string]: number };
  year: { [key: string]: number };
}

export interface TotalSellAmounts {
  month: { [key: string]: number };
  week: { [key: string]: number };
  year: { [key: string]: number };
}

export interface TotalBuyTimes {
  month: { [key: string]: number };
  week: { [key: string]: number };
  year: { [key: string]: number };
}

export interface TotalSellTimes {
  month: { [key: string]: number };
  week: { [key: string]: number };
  year: { [key: string]: number };
}

export interface PercentageYear {
  "2023": number;
}

export interface AverageHoldingTimes {
  "BUNNI-LP": BunniLp;
  X: X;
  "ethx-f": EthxF;
  bendWETH: BendWeth;
  ipUSDC: IpUsdc;
  aEthUSDT: AEthUsdt;
  ipUSDT: IpUsdt;
  "Av2-WETH-LP": Av2WethLp;
}

export interface BunniLp {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface X {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface EthxF {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface BendWeth {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface IpUsdc {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface AEthUsdt {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface IpUsdt {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface Av2WethLp {
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface TotalProfitsPerToken {
  "BUNNI-LP": BunniLp2;
  X: X2;
  "ethx-f": EthxF2;
  bendWETH: BendWeth2;
  ipUSDC: IpUsdc2;
  aEthUSDT: AEthUsdt2;
  ipUSDT: IpUsdt2;
  "Av2-WETH-LP": Av2WethLp2;
}

export interface BunniLp2 {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
}

export interface X2 {
  profit: number;
  currencyAddress: string;
  buyAmount: string;
}

export interface EthxF2 {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
}

export interface BendWeth2 {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
}

export interface IpUsdc2 {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
}

export interface AEthUsdt2 {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
}

export interface IpUsdt2 {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
}

export interface Av2WethLp2 {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
}

export interface OverallAverageHoldingTimeAndProfit {
  HoldingTime: string;
  Profit: number;
  BuyAmount: number;
}

export interface MostProfitableTokenWithShortestOpeningTime {
  tokenName: string;
  profit: number;
  averageHoldingTime: string;
  currencyAddress: string;
}

export interface SwapTimeResults {
  longestTime: string;
  shortestTime: string;
  longestTokenInfo: LongestTokenInfo;
  shortestTokenInfo: ShortestTokenInfo;
}

export interface LongestTokenInfo {
  tokenName: string;
  averageHoldingTime: string;
  currencyAddress: string;
  profit: number;
}

export interface ShortestTokenInfo {
  tokenName: string;
  averageHoldingTime: string;
  currencyAddress: string;
  profit: number;
}

export interface NewestBoughtToken {
  tokenName: string;
  currencyAddress: string;
  buyTime: string;
  profit: number;
}

export interface NewestSoldToken {
  tokenName: string;
  currencyAddress: string;
  sellTime: string;
}

export interface FormattedNewestBoughtToken {
  tokenName: string;
  currencyAddress: string;
  buyTime: string;
  profit: number;
}

export interface FormattedNewestSoldToken {
  tokenName: string;
  currencyAddress: string;
  sellTime: string;
}

export interface TransactionMetrics {
  totalTransactions: number;
  latestTransaction: LatestTransaction;
  firstTransaction: FirstTransaction;
  uniqueDaysActive: number;
  walletAge: number;
}

export interface LatestTransaction {
  time: string;
  details: Details;
  Currency: string;
}

export interface Details {
  type: string;
  sender: Sender;
  receiver: Receiver;
  amount: number;
  amount_usd: number;
  currency: Currency;
  transaction: Transaction;
  block: Block;
}

export interface Sender {
  address: string;
}

export interface Receiver {
  address: string;
}

export interface Currency {
  symbol: string;
  address: string;
}

export interface Transaction {
  hash: string;
  gasValue: number;
  gasPrice: number;
}

export interface Block {
  height: number;
  timestamp: Timestamp;
}

export interface Timestamp {
  time: string;
}

export interface FirstTransaction {
  time: string;
  details: Details2;
  Currency: string;
}

export interface Details2 {
  type: string;
  sender: Sender2;
  receiver: Receiver2;
  amount: number;
  amount_usd: number;
  currency: Currency2;
  transaction: Transaction2;
  block: Block2;
}

export interface Sender2 {
  address: string;
}

export interface Receiver2 {
  address: string;
}

export interface Currency2 {
  symbol: string;
  address: string;
}

export interface Transaction2 {
  hash: string;
  gasValue: number;
  gasPrice: number;
}

export interface Block2 {
  height: number;
  timestamp: Timestamp2;
}

export interface Timestamp2 {
  time: string;
}

export interface PercentageProfitsPerToken {
  "BUNNI-LP": BunniLp3;
  X: X3;
  "ethx-f": EthxF3;
  bendWETH: BendWeth3;
  ipUSDC: IpUsdc3;
  aEthUSDT: AEthUsdt3;
  ipUSDT: IpUsdt3;
  "Av2-WETH-LP": Av2WethLp3;
}

export interface BunniLp3 {
  profit: number;
  currencyAddress: string;
}

export interface X3 {
  profit: number;
  currencyAddress: string;
}

export interface EthxF3 {
  profit: number;
  currencyAddress: string;
}

export interface BendWeth3 {
  profit: number;
  currencyAddress: string;
}

export interface IpUsdc3 {
  profit: number;
  currencyAddress: string;
}

export interface AEthUsdt3 {
  profit: number;
  currencyAddress: string;
}

export interface IpUsdt3 {
  profit: number;
  currencyAddress: string;
}

export interface Av2WethLp3 {
  profit: number;
  currencyAddress: string;
}

export interface SendTokens {
  totalSendTransactions: number;
}

export interface SentHistory {
  amount: number;
  amount_usd: number;
  time: string;
  interval?: string;
}

export interface ReceiveTokens {
  totalReceiveTransactions: number;
}

export interface ReceiveHistory {
  amount: number;
  amount_usd: number;
  time: string;
  interval?: string;
}

export interface TotalNumofPartiallyClosed {
  totalnumPartiallyClosedData: number;
}

export interface TotalNumofFullyOpenedData {
  totalnumPartiallyClosedData: number;
}

export interface TotalNumTransactionsData {
  totalTransactions: number;
}

export interface Interaction {
  mostRepeatedSendAddress: MostRepeatedSendAddress;
  mostRepeatedReceiveAddress: MostRepeatedReceiveAddress;
  mostIncludedAddress: MostIncludedAddress;
  top5ReceiveAddresses: Top5ReceiveAddresses[];
  top5SendAddresses: Top5SendAddresses[];
}

export interface MostRepeatedSendAddress {
  address: string;
  count: number;
}

export interface MostRepeatedReceiveAddress {
  address: string;
  count: number;
}

export interface MostIncludedAddress {
  address: string;
  count: number;
}
export interface Top5ReceiveAddresses {
  address: string;
  count: number;
}

export interface Top5SendAddresses {
  address: string;
  count: number;
}

export interface HotTokenHolder {
  tokenName: string;
  balanceType: string;
  "Buy Amount": number;
  "Buy Amount (USD)": number;
  "Sell Amount": number;
  "Sell Amount (USD)": number;
  Profit: number;
  "Entry Price": number;
  "Exit Price": any;
  "Buy Times": Time[];
  "Sell Times": any[];
  "Num of Buy Times": number;
  "Num of Sell Times": number;
  "Sell Amount of pufETH": number;
  "Buy Amount of pufETH": number;
  Balance: number;
  "Currency Address": string;
  tokenPrice: string;
  totalReserveInUSD: string;
  currentValue: number;
  currentProfit: number;
}

export interface Time {
  time: string;
}

export interface TopTokensData {
  name: string;
  totalTrades?: number | undefined;
  color: any;
  pnl: number;
  ratio: string;
  image: any;
  address: string;
}
