// import { Error } from "./error.type";
import { ImageType } from "./Image.type";

export interface Gem {
  tokenName: string;
  contractAddress: string;
  count: number;
  latestDate: string;
  rank: number;
  imageUrl: string | undefined;
  pressure: {
    type: string;
    degree: string;
  };
}

export interface IToken extends Error {
  id?: string;
  data?: Daum[];
  TokenMedia?: TokenMedia;
  isLowLiquidity?: boolean;
  TickersData?: TickersData;
  FunctionCallsData?: FunctionCallsData;
  BalancesData?: BalancesData;
  TopTradersData?: TopTradersData;
  TopHoldersData?: TopHoldersData;
  TokenHoldersData?: TokenHoldersData;
  SecurityData?: SecurityData;
  ScoreData?: ScoreData;
  timestamp?: number;
  relationships?: {
    data?: {
      id: string;
    };
  };
  imageUrl?: string;
  imageUrl2?: string;
  seoImageUrl?: string;
}

export interface TokenOverview {
  token: IToken;
  logoLoading: boolean;
  logoError: Error | null;
  logo: string | undefined;
  alternateLogo: ImageType | undefined;
  altText: string;
}

export interface Daum {
  id?: string;
  type?: string;
  attributes?: Attributes;
  relationships?: Relationships;
  logo_url: string;
  name: string;
  address: string;
  price_stats?: PriceStats;
  imageUrl?: string;
  imageUrl2?: string;
  seoImageUrl?: string;
}

export interface PriceStats {
  btc?: Btc;
  usd?: Usd;
  eth?: Eth;
}

export interface Btc {
  price?: number;
  change_1h?: number;
  change_24h?: number;
  change_7d?: number;
  volume_24h?: number;
  market_cap?: number;
  change_30d?: number;
  change_1q?: number;
  change_1y?: number;
  volume_24h_formatted?: string;
  price_formatted?: string;
  market_cap_formatted?: string;
  volume_24h_change_24h?: number;
  market_cap_change_24h?: number;
}

export interface Usd {
  price: number;
  change_1h: number;
  change_24h: number;
  change_7d: number;
  volume_24h: number;
  market_cap: number;
  change_30d: number;
  change_1q: number;
  change_1y: number;
  volume_24h_formatted: string;
  price_formatted: string;
  market_cap_formatted: string;
  volume_24h_change_24h: number;
  market_cap_change_24h: number;
}

export interface Eth {
  price: number;
  change_1h: number;
  change_24h: number;
  change_7d: number;
  volume_24h: number;
  market_cap: number;
  change_30d: number;
  change_1q: number;
  change_1y: number;
  volume_24h_formatted: string;
  price_formatted: string;
  market_cap_formatted: string;
  volume_24h_change_24h: number;
  market_cap_change_24h: number;
}

export interface Attributes {
  base_token_price_usd?: string;
  base_token_price_native_currency?: string;
  quote_token_price_usd?: string;
  quote_token_price_native_currency?: string;
  base_token_price_quote_token?: string;
  quote_token_price_base_token?: string;
  address?: string;
  name?: string;
  pool_created_at?: string;
  fdv_usd?: string;
  market_cap_usd?: any;
  price_change_percentage?: PriceChangePercentage;
  transactions?: Transactions;
  volume_usd?: VolumeUsd;
  reserve_in_usd?: string;
}

export interface PriceChangePercentage {
  m5?: string;
  h1?: string;
  h6?: string;
  h24?: string;
}

export interface Transactions {
  [key: string]: any;
  m5?: M5;
  m15?: M15;
  m30?: M30;
  h1?: H1;
  h24?: H24;
}

export interface M5 {
  buys?: number;
  sells?: number;
  buyers?: Buyers;
  sellers?: Sellers;
}

export interface Buyers {}

export interface Sellers {}

export interface M15 {
  buys?: number;
  sells?: number;
  buyers?: Buyers2;
  sellers?: Sellers2;
}

export interface Buyers2 {}

export interface Sellers2 {}

export interface M30 {
  buys?: number;
  sells?: number;
  buyers?: Buyers3;
  sellers?: Sellers3;
}

export interface Buyers3 {}

export interface Sellers3 {}

export interface H1 {
  buys?: number;
  sells?: number;
  buyers?: number;
  sellers?: number;
}

export interface H24 {
  buys?: number;
  sells?: number;
  buyers?: number;
  sellers?: number;
}

export interface VolumeUsd {
  [key: string]: any;
  m5?: string;
  h1?: string;
  h6?: string;
  h24?: string;
}

export interface Relationships {
  base_token?: BaseToken;
  quote_token?: QuoteToken;
  dex?: Dex;
}

export interface BaseToken {
  data?: Data;
}

export interface Data {
  id?: string;
  type?: string;
}

export interface QuoteToken {
  data?: Data2;
}

export interface Data2 {
  id?: string;
  type?: string;
}

export interface Dex {
  data?: Data3;
}

export interface Data3 {
  id?: string;
  type?: string;
}

export interface TokenMedia {
  Token_Currency?: string;
  Token_Symbol?: string;
  Token_Website?: string[];
  Token_Discord?: any;
  Token_Telegram?: string[];
  Token_Twitter?: string[];
}

export interface TickersData {
  dex?: Dex2[];
  cex?: cex[];
}

export interface cex {
  original: any;
  id: number;
  base?: string;
  trade_url?: string;
  target?: string;
  volume?: number;
  market?: Market;
  target_coin_id?: string;
  last?: string;
  converted_volume?: ConvertedVolume;
}

export interface Dex2 {
  original: any;
  market?: Market;
  target_coin_id?: string;
  last?: string;
  converted_volume?: ConvertedVolume;
  id: number;
  base?: string;
  trade_url?: string;
  target?: string;
  volume?: number;
  coin_id?: string;
}

export interface Market {
  name?: string;
}

export interface ConvertedVolume {
  usd?: string;
}

export interface FunctionCallsData {
  data?: Data4;
  functionsCalled?: FunctionsCalled[];
  renounceOwnership?: RenounceOwnership;
  extraFunctions?: ExtraFunction[];
  malFunc?: MalFunc;
  maliciousLibraries?: MaliciousLibraries;
  maliciousFunctions?: any[];
}

export interface Data4 {
  ethereum?: Ethereum;
}

export interface Ethereum {
  smartContractCalls?: SmartContractCall[];
}

export interface SmartContractCall {
  smartContractMethod?: SmartContractMethod;
  count?: number;
  internal_count?: number;
  external_count?: number;
  senders?: number;
  txs?: number;
  gasValue?: number;
  gas_value_usd?: number;
  max_date?: string;
  type?: string;
}

export interface SmartContractMethod {
  name?: string;
  signature?: string;
  signatureHash?: string;
}

export interface FunctionsCalled {
  Name?: string;
  Date?: string;
  Type?: string;
  Internal?: number;
  External?: number;
}

export interface RenounceOwnership {
  Date?: any;
  status?: any;
}

export interface ExtraFunction {
  Name?: string;
  Date?: string;
  Internal?: number;
  External?: number;
}

export interface MalFunc {
  uniqueNames?: string[];
  similarNames?: any[];
  count?: number;
}

export interface MaliciousLibraries {
  count?: number;
  libraries?: string[];
}

export interface BalancesData {
  numberOfAddresses?: number;
  results?: Result[];
}

export interface Result {
  address?: string;
  balance?: string;
}

export interface TopTradersData {
  data?: Data5;
}

export interface Data5 {
  ethereum?: Ethereum2;
}

export interface Ethereum2 {
  smartContractCalls?: SmartContractCall2[];
}

export interface SmartContractCall2 {
  address?: Address;
  max_date?: string;
  count?: number;
  gasValue?: number;
  gas_value_usd?: number;
}

export interface Address {
  address?: string;
  annotation?: any;
}

export interface TopHoldersData {
  data?: Data6;
}

export interface Data6 {
  EVM?: Evm;
}

export interface Evm {
  Blocks?: Block[];
  TokenHolders?: TokenHolder[];
}

export interface Block {
  ChainId?: string;
}

export interface TokenHolder {
  Balance?: Balance;
}

export interface Balance {
  Amount?: string;
  Address?: string;
  Percentage?: string;
}

export interface TokenHoldersData {
  Blocks?: Block2[];
  date1?: any[];
  date2?: any[];
  date3?: Date3[];
}

export interface Block2 {
  ChainId?: string;
}

export interface Date3 {
  BalanceUpdate?: BalanceUpdate;
  count?: string;
  dispersion?: number;
  entropy?: number;
  gini?: number;
  kurtosis?: number;
  nakamoto?: number;
  quantile?: number;
  skew?: number;
  standard_deviation?: number;
  supply?: string;
  theil_index?: number;
  BalanceUpdate_label?: string;
  count_label?: string;
  dispersion_label?: number;
  entropy_label?: number;
  gini_label?: number;
  kurtosis_label?: number;
  nakamoto_label?: number;
  quantile_label?: number;
  skew_label?: number;
  standard_deviation_label?: number;
  supply_label?: string;
  theil_index_label?: number;
}

export interface BalanceUpdate {
  LastDate?: string;
}

export interface SecurityData {
  tokenSecurity?: TokenSecurity;
}

export interface TokenSecurity {
  details?: Details;
  sourceCodeControl?: SourceCodeControl;
  restriction?: Restriction;
  tradingControl?: TradingControl;
  ownershipControl?: OwnershipControl;
  taxControl?: TaxControl;
}

export interface Details {
  sell_tax?: string;
  buy_tax?: string;
  holder_count?: string;
  token_name?: string;
  token_symbol?: string;
  locked_percentage?: number;
  dex_listings?: DexListing[];
  total_liquidity?: number;
  holdersChart?: HoldersChart;
}

export interface DexListing {
  name?: string;
  total_liquidity?: number;
}

export interface HoldersChart {
  lpHoldersData?: LpHoldersDaum[];
  regularHoldersData?: RegularHoldersDaum[];
}

export interface LpHoldersDaum {
  address?: string;
  tag?: string;
  value?: any;
  is_contract?: number;
  balance?: string;
  percent?: string;
  NFT_list?: any;
  is_locked?: number;
}

export interface RegularHoldersDaum {
  address?: string;
  tag?: string;
  is_contract?: number;
  balance?: string;
  percent?: string;
  is_locked?: number;
}

export interface SourceCodeControl {
  is_open_source?: string;
  isProxy?: string;
  externalCall?: string;
  isHoneypot?: string;
  honeypot_with_same_creator?: string;
  isMintable?: string;
}

export interface Restriction {
  isBlacklisted?: string;
  isWhitelisted?: string;
  isAntiWhale?: string;
}

export interface TradingControl {
  cannotBuy?: string;
  cannotSellAll?: string;
  tradingCooldown?: string;
  transfer_pausable?: string;
}

export interface OwnershipControl {
  hiddenOwner?: string;
  canTakeBackOwnership?: string;
  personalSlippageModifiable?: string;
  ownerChangeBalance?: string;
}

export interface TaxControl {
  personalSlippageModifiable?: string;
  slippage_modifiable?: string;
  gas_abuse?: string;
}

export interface ScoreData {
  score4?: number;
  details?: any;
  score2?: number;
  tokenName?: string;
  score3?: number;
  status?: string;
  score1?: number;
  symbol?: string;
  totalScore?: number;
  riskLevel?: string;
}

export interface IAI {
  trend: string;
  categoryTrend: string;
  importantTokens: string[];
}
