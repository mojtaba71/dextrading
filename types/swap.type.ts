export interface SwapType {
  transactions?: TransactionType[];
  send?: Send[];
  receive?: Receive[];
  swap?: Swap[];
  mergedSwaps?: MergedSwaps;
  overallMergedSwaps?: OverallMergedSwaps;
  notClosedPositions?: [string, NotClosedPosition][];
  partiallyClosedPositions?: PartiallyClosedPosition[];
  fullyClosedPositions?: FullyClosedPosition[];
  balance?: Balance[];
  swapWallet?: SwapWallet[];
  aggregatedSendTransactions?: AggregatedSendTransactions;
  aggregatedReceiveTransactions?: AggregatedReceiveTransactions;
  timestamp?: number;
  netProfit?: number;
  totalProfit?: number;
  totalLoss?: number;
  labelTrader?: string;
  overallProfit?: number;
  swaps: any[];
  profitByToken?: {
    [key: string]: ProfitPerToken;
  };
  profitPeriods: any,
  solanaBalance: {
    BalanceUpdate: { Balance: string; Currency: { Symbol: string } };
  }[];
}

export interface ProfitPerToken {
  profit: number;
  tokenSymbol: string;
  totalBoughtTradeValue: number;
  totalSoldTradeValue: number;
  contractAddress: string;
  imageUrl?: string;
  totalTrades: number;
  totalSellTrades: number, 
  totalBuyTrades: number;
  latestSwapTime?: string;
}

export interface TransactionType {
  type?: string;
  sender?: Sender;
  receiver?: Receiver;
  amount?: number;
  amount_usd?: number;
  currency?: Currency;
  transaction?: Transaction2;
  block?: Block;
  transactions?: Transaction3[];
  description?: Description;
  imageUrl?: string | undefined;
}

export interface Sender {
  address?: string;
}

export interface Receiver {
  address?: string;
}

export interface Currency {
  symbol?: string;
  address?: string;
}

export interface Transaction2 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block {
  height?: number;
  timestamp?: Timestamp;
}

export interface Timestamp {
  time?: string;
}

export interface Transaction3 {
  type?: string;
  sender?: Sender2;
  receiver?: Receiver2;
  amount?: number;
  amount_usd?: number;
  currency?: Currency2;
  transaction?: Transaction4;
  block?: Block2;
}

export interface Sender2 {
  address?: string;
}

export interface Receiver2 {
  address?: string;
}

export interface Currency2 {
  symbol?: string;
  address?: string;
}

export interface Transaction4 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block2 {
  height?: number;
  timestamp?: Timestamp2;
}

export interface Timestamp2 {
  time?: string;
}

export interface Description {
  sentTokenName?: string;
  sentTokenAddress?: string | undefined;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string | undefined;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
  swapType?: any;
  receivedTokenImageUrl: string | undefined;
  sentTokenImageUrl: string | undefined;
  tradeValue?: number;
}

export interface Send {
  type?: string;
  sender?: Sender3;
  receiver?: Receiver3;
  amount?: number;
  amount_usd?: number;
  currency?: Currency3;
  transaction?: Transaction5;
  block?: Block3;
}

export interface Sender3 {
  address?: string;
}

export interface Receiver3 {
  address?: string;
}

export interface Currency3 {
  symbol?: string;
  address?: string;
}

export interface Transaction5 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block3 {
  height?: number;
  timestamp?: Timestamp3;
}

export interface Timestamp3 {
  time?: string;
}

export interface Receive {
  type?: string;
  sender?: Sender4;
  receiver?: Receiver4;
  amount?: number;
  amount_usd?: number;
  currency?: Currency4;
  transaction?: Transaction6;
  block?: Block4;
}

export interface Sender4 {
  address?: string;
}

export interface Receiver4 {
  address?: string;
}

export interface Currency4 {
  symbol?: string;
  address?: string;
}

export interface Transaction6 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block4 {
  height?: number;
  timestamp?: Timestamp4;
}

export interface Timestamp4 {
  time?: string;
}

export interface Swap {
  type?: string;
  transactions?: Transaction7[];
  description?: Description2;
}

export interface Transaction7 {
  type?: string;
  sender?: Sender5;
  receiver?: Receiver5;
  amount?: number;
  amount_usd?: number;
  currency?: Currency5;
  transaction?: Transaction8;
  block?: Block5;
}

export interface Sender5 {
  address?: string;
}

export interface Receiver5 {
  address?: string;
}

export interface Currency5 {
  symbol?: string;
  address?: string;
}

export interface Transaction8 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block5 {
  height?: number;
  timestamp?: Timestamp5;
}

export interface Timestamp5 {
  time?: string;
}

export interface Description2 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
  swapType?: any;
}

export interface MergedSwaps {
  "ANDY2.0"?: Andy20[];
  ETH?: Eth[];
  NITEFEEDER?: Nitefeeder[];
  PEVE?: Peve[];
  FOFAR?: Fofar[];
  DOVE?: Dove[];
  "NEKO?"?: Neko[];
  SHP420INU?: Shp420Inu[];
  ANDY?: Andy[];
  VONE?: Vone[];
  TRUMPSHIBA?: Trumpshiba[];
  HASH?: Hash[];
  yANDY?: YAndy[];
  MWAVE?: Mwave[];
  PepeWC?: PepeWc[];
  MATT?: Matt[];
  sSHIB?: SShib[];
  MERM?: Merm[];
  BONKY?: Bonky[];
  sPEPE?: SPepe[];
  sDOGE?: SDoge[];
  SHIV?: Shiv[];
  sGROK?: SGrok[];
}

export interface Andy20 {
  type?: string;
  transactions?: Transaction9[];
  description?: Description3;
}

export interface Transaction9 {
  type?: string;
  sender?: Sender6;
  receiver?: Receiver6;
  amount?: number;
  amount_usd?: number;
  currency?: Currency6;
  transaction?: Transaction10;
  block?: Block6;
}

export interface Sender6 {
  address?: string;
}

export interface Receiver6 {
  address?: string;
}

export interface Currency6 {
  symbol?: string;
  address?: string;
}

export interface Transaction10 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block6 {
  height?: number;
  timestamp?: Timestamp6;
}

export interface Timestamp6 {
  time?: string;
}

export interface Description3 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Eth {
  type?: string;
  transactions?: Transaction11[];
  description?: Description4;
}

export interface Transaction11 {
  type?: string;
  sender?: Sender7;
  receiver?: Receiver7;
  amount?: number;
  amount_usd?: number;
  currency?: Currency7;
  transaction?: Transaction12;
  block?: Block7;
}

export interface Sender7 {
  address?: string;
}

export interface Receiver7 {
  address?: string;
}

export interface Currency7 {
  symbol?: string;
  address?: string;
}

export interface Transaction12 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block7 {
  height?: number;
  timestamp?: Timestamp7;
}

export interface Timestamp7 {
  time?: string;
}

export interface Description4 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Nitefeeder {
  type?: string;
  transactions?: Transaction13[];
  description?: Description5;
}

export interface Transaction13 {
  type?: string;
  sender?: Sender8;
  receiver?: Receiver8;
  amount?: number;
  amount_usd?: number;
  currency?: Currency8;
  transaction?: Transaction14;
  block?: Block8;
}

export interface Sender8 {
  address?: string;
}

export interface Receiver8 {
  address?: string;
}

export interface Currency8 {
  symbol?: string;
  address?: string;
}

export interface Transaction14 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block8 {
  height?: number;
  timestamp?: Timestamp8;
}

export interface Timestamp8 {
  time?: string;
}

export interface Description5 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Peve {
  type?: string;
  transactions?: Transaction15[];
  description?: Description6;
}

export interface Transaction15 {
  type?: string;
  sender?: Sender9;
  receiver?: Receiver9;
  amount?: number;
  amount_usd?: number;
  currency?: Currency9;
  transaction?: Transaction16;
  block?: Block9;
}

export interface Sender9 {
  address?: string;
}

export interface Receiver9 {
  address?: string;
}

export interface Currency9 {
  symbol?: string;
  address?: string;
}

export interface Transaction16 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block9 {
  height?: number;
  timestamp?: Timestamp9;
}

export interface Timestamp9 {
  time?: string;
}

export interface Description6 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Fofar {
  type?: string;
  transactions?: Transaction17[];
  description?: Description7;
}

export interface Transaction17 {
  type?: string;
  sender?: Sender10;
  receiver?: Receiver10;
  amount?: number;
  amount_usd?: number;
  currency?: Currency10;
  transaction?: Transaction18;
  block?: Block10;
}

export interface Sender10 {
  address?: string;
}

export interface Receiver10 {
  address?: string;
}

export interface Currency10 {
  symbol?: string;
  address?: string;
}

export interface Transaction18 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block10 {
  height?: number;
  timestamp?: Timestamp10;
}

export interface Timestamp10 {
  time?: string;
}

export interface Description7 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Dove {
  type?: string;
  transactions?: Transaction19[];
  description?: Description8;
}

export interface Transaction19 {
  type?: string;
  sender?: Sender11;
  receiver?: Receiver11;
  amount?: number;
  amount_usd?: number;
  currency?: Currency11;
  transaction?: Transaction20;
  block?: Block11;
}

export interface Sender11 {
  address?: string;
}

export interface Receiver11 {
  address?: string;
}

export interface Currency11 {
  symbol?: string;
  address?: string;
}

export interface Transaction20 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block11 {
  height?: number;
  timestamp?: Timestamp11;
}

export interface Timestamp11 {
  time?: string;
}

export interface Description8 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Neko {
  type?: string;
  transactions?: Transaction21[];
  description?: Description9;
}

export interface Transaction21 {
  type?: string;
  sender?: Sender12;
  receiver?: Receiver12;
  amount?: number;
  amount_usd?: number;
  currency?: Currency12;
  transaction?: Transaction22;
  block?: Block12;
}

export interface Sender12 {
  address?: string;
}

export interface Receiver12 {
  address?: string;
}

export interface Currency12 {
  symbol?: string;
  address?: string;
}

export interface Transaction22 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block12 {
  height?: number;
  timestamp?: Timestamp12;
}

export interface Timestamp12 {
  time?: string;
}

export interface Description9 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Shp420Inu {
  type?: string;
  transactions?: Transaction23[];
  description?: Description10;
}

export interface Transaction23 {
  type?: string;
  sender?: Sender13;
  receiver?: Receiver13;
  amount?: number;
  amount_usd?: number;
  currency?: Currency13;
  transaction?: Transaction24;
  block?: Block13;
}

export interface Sender13 {
  address?: string;
}

export interface Receiver13 {
  address?: string;
}

export interface Currency13 {
  symbol?: string;
  address?: string;
}

export interface Transaction24 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block13 {
  height?: number;
  timestamp?: Timestamp13;
}

export interface Timestamp13 {
  time?: string;
}

export interface Description10 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Andy {
  type?: string;
  transactions?: Transaction25[];
  description?: Description11;
}

export interface Transaction25 {
  type?: string;
  sender?: Sender14;
  receiver?: Receiver14;
  amount?: number;
  amount_usd?: number;
  currency?: Currency14;
  transaction?: Transaction26;
  block?: Block14;
}

export interface Sender14 {
  address?: string;
}

export interface Receiver14 {
  address?: string;
}

export interface Currency14 {
  symbol?: string;
  address?: string;
}

export interface Transaction26 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block14 {
  height?: number;
  timestamp?: Timestamp14;
}

export interface Timestamp14 {
  time?: string;
}

export interface Description11 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Vone {
  type?: string;
  transactions?: Transaction27[];
  description?: Description12;
}

export interface Transaction27 {
  type?: string;
  sender?: Sender15;
  receiver?: Receiver15;
  amount?: number;
  amount_usd?: number;
  currency?: Currency15;
  transaction?: Transaction28;
  block?: Block15;
}

export interface Sender15 {
  address?: string;
}

export interface Receiver15 {
  address?: string;
}

export interface Currency15 {
  symbol?: string;
  address?: string;
}

export interface Transaction28 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block15 {
  height?: number;
  timestamp?: Timestamp15;
}

export interface Timestamp15 {
  time?: string;
}

export interface Description12 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Trumpshiba {
  type?: string;
  transactions?: Transaction29[];
  description?: Description13;
}

export interface Transaction29 {
  type?: string;
  sender?: Sender16;
  receiver?: Receiver16;
  amount?: number;
  amount_usd?: number;
  currency?: Currency16;
  transaction?: Transaction30;
  block?: Block16;
}

export interface Sender16 {
  address?: string;
}

export interface Receiver16 {
  address?: string;
}

export interface Currency16 {
  symbol?: string;
  address?: string;
}

export interface Transaction30 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block16 {
  height?: number;
  timestamp?: Timestamp16;
}

export interface Timestamp16 {
  time?: string;
}

export interface Description13 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Hash {
  type?: string;
  transactions?: Transaction31[];
  description?: Description14;
}

export interface Transaction31 {
  type?: string;
  sender?: Sender17;
  receiver?: Receiver17;
  amount?: number;
  amount_usd?: number;
  currency?: Currency17;
  transaction?: Transaction32;
  block?: Block17;
}

export interface Sender17 {
  address?: string;
}

export interface Receiver17 {
  address?: string;
}

export interface Currency17 {
  symbol?: string;
  address?: string;
}

export interface Transaction32 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block17 {
  height?: number;
  timestamp?: Timestamp17;
}

export interface Timestamp17 {
  time?: string;
}

export interface Description14 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface YAndy {
  type?: string;
  transactions?: Transaction33[];
  description?: Description15;
}

export interface Transaction33 {
  type?: string;
  sender?: Sender18;
  receiver?: Receiver18;
  amount?: number;
  amount_usd?: number;
  currency?: Currency18;
  transaction?: Transaction34;
  block?: Block18;
}

export interface Sender18 {
  address?: string;
}

export interface Receiver18 {
  address?: string;
}

export interface Currency18 {
  symbol?: string;
  address?: string;
}

export interface Transaction34 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block18 {
  height?: number;
  timestamp?: Timestamp18;
}

export interface Timestamp18 {
  time?: string;
}

export interface Description15 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Mwave {
  type?: string;
  transactions?: Transaction35[];
  description?: Description16;
}

export interface Transaction35 {
  type?: string;
  sender?: Sender19;
  receiver?: Receiver19;
  amount?: number;
  amount_usd?: number;
  currency?: Currency19;
  transaction?: Transaction36;
  block?: Block19;
}

export interface Sender19 {
  address?: string;
}

export interface Receiver19 {
  address?: string;
}

export interface Currency19 {
  symbol?: string;
  address?: string;
}

export interface Transaction36 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block19 {
  height?: number;
  timestamp?: Timestamp19;
}

export interface Timestamp19 {
  time?: string;
}

export interface Description16 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface PepeWc {
  type?: string;
  transactions?: Transaction37[];
  description?: Description17;
}

export interface Transaction37 {
  type?: string;
  sender?: Sender20;
  receiver?: Receiver20;
  amount?: number;
  amount_usd?: number;
  currency?: Currency20;
  transaction?: Transaction38;
  block?: Block20;
}

export interface Sender20 {
  address?: string;
}

export interface Receiver20 {
  address?: string;
}

export interface Currency20 {
  symbol?: string;
  address?: string;
}

export interface Transaction38 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block20 {
  height?: number;
  timestamp?: Timestamp20;
}

export interface Timestamp20 {
  time?: string;
}

export interface Description17 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Matt {
  type?: string;
  transactions?: Transaction39[];
  description?: Description18;
}

export interface Transaction39 {
  type?: string;
  sender?: Sender21;
  receiver?: Receiver21;
  amount?: number;
  amount_usd?: number;
  currency?: Currency21;
  transaction?: Transaction40;
  block?: Block21;
}

export interface Sender21 {
  address?: string;
}

export interface Receiver21 {
  address?: string;
}

export interface Currency21 {
  symbol?: string;
  address?: string;
}

export interface Transaction40 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block21 {
  height?: number;
  timestamp?: Timestamp21;
}

export interface Timestamp21 {
  time?: string;
}

export interface Description18 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface SShib {
  type?: string;
  transactions?: Transaction41[];
  description?: Description19;
}

export interface Transaction41 {
  type?: string;
  sender?: Sender22;
  receiver?: Receiver22;
  amount?: number;
  amount_usd?: number;
  currency?: Currency22;
  transaction?: Transaction42;
  block?: Block22;
}

export interface Sender22 {
  address?: string;
}

export interface Receiver22 {
  address?: string;
}

export interface Currency22 {
  symbol?: string;
  address?: string;
}

export interface Transaction42 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block22 {
  height?: number;
  timestamp?: Timestamp22;
}

export interface Timestamp22 {
  time?: string;
}

export interface Description19 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Merm {
  type?: string;
  transactions?: Transaction43[];
  description?: Description20;
}

export interface Transaction43 {
  type?: string;
  sender?: Sender23;
  receiver?: Receiver23;
  amount?: number;
  amount_usd?: number;
  currency?: Currency23;
  transaction?: Transaction44;
  block?: Block23;
}

export interface Sender23 {
  address?: string;
}

export interface Receiver23 {
  address?: string;
}

export interface Currency23 {
  symbol?: string;
  address?: string;
}

export interface Transaction44 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block23 {
  height?: number;
  timestamp?: Timestamp23;
}

export interface Timestamp23 {
  time?: string;
}

export interface Description20 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Bonky {
  type?: string;
  transactions?: Transaction45[];
  description?: Description21;
}

export interface Transaction45 {
  type?: string;
  sender?: Sender24;
  receiver?: Receiver24;
  amount?: number;
  amount_usd?: number;
  currency?: Currency24;
  transaction?: Transaction46;
  block?: Block24;
}

export interface Sender24 {
  address?: string;
}

export interface Receiver24 {
  address?: string;
}

export interface Currency24 {
  symbol?: string;
  address?: string;
}

export interface Transaction46 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block24 {
  height?: number;
  timestamp?: Timestamp24;
}

export interface Timestamp24 {
  time?: string;
}

export interface Description21 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface SPepe {
  type?: string;
  transactions?: Transaction47[];
  description?: Description22;
}

export interface Transaction47 {
  type?: string;
  sender?: Sender25;
  receiver?: Receiver25;
  amount?: number;
  amount_usd?: number;
  currency?: Currency25;
  transaction?: Transaction48;
  block?: Block25;
}

export interface Sender25 {
  address?: string;
}

export interface Receiver25 {
  address?: string;
}

export interface Currency25 {
  symbol?: string;
  address?: string;
}

export interface Transaction48 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block25 {
  height?: number;
  timestamp?: Timestamp25;
}

export interface Timestamp25 {
  time?: string;
}

export interface Description22 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface SDoge {
  type?: string;
  transactions?: Transaction49[];
  description?: Description23;
}

export interface Transaction49 {
  type?: string;
  sender?: Sender26;
  receiver?: Receiver26;
  amount?: number;
  amount_usd?: number;
  currency?: Currency26;
  transaction?: Transaction50;
  block?: Block26;
}

export interface Sender26 {
  address?: string;
}

export interface Receiver26 {
  address?: string;
}

export interface Currency26 {
  symbol?: string;
  address?: string;
}

export interface Transaction50 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block26 {
  height?: number;
  timestamp?: Timestamp26;
}

export interface Timestamp26 {
  time?: string;
}

export interface Description23 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface Shiv {
  type?: string;
  transactions?: Transaction51[];
  description?: Description24;
}

export interface Transaction51 {
  type?: string;
  sender?: Sender27;
  receiver?: Receiver27;
  amount?: number;
  amount_usd?: number;
  currency?: Currency27;
  transaction?: Transaction52;
  block?: Block27;
}

export interface Sender27 {
  address?: string;
}

export interface Receiver27 {
  address?: string;
}

export interface Currency27 {
  symbol?: string;
  address?: string;
}

export interface Transaction52 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block27 {
  height?: number;
  timestamp?: Timestamp27;
}

export interface Timestamp27 {
  time?: string;
}

export interface Description24 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface SGrok {
  type?: string;
  transactions?: Transaction53[];
  description?: Description25;
}

export interface Transaction53 {
  type?: string;
  sender?: Sender28;
  receiver?: Receiver28;
  amount?: number;
  amount_usd?: number;
  currency?: Currency28;
  transaction?: Transaction54;
  block?: Block28;
}

export interface Sender28 {
  address?: string;
}

export interface Receiver28 {
  address?: string;
}

export interface Currency28 {
  symbol?: string;
  address?: string;
}

export interface Transaction54 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block28 {
  height?: number;
  timestamp?: Timestamp28;
}

export interface Timestamp28 {
  time?: string;
}

export interface Description25 {
  sentTokenName?: string;
  sentTokenAddress?: string;
  sentAmount?: number;
  receivedTokenName?: string;
  receivedTokenAddress?: string;
  receivedAmount?: number;
  gasValue?: number;
  sentAmountUSD?: number;
  receivedAmountUSD?: number;
  timestamp?: string;
  profit?: number;
}

export interface OverallMergedSwaps {
  "ANDY2.0"?: Andy202;
  NITEFEEDER?: Nitefeeder2;
  PEVE?: Peve2;
  FOFAR?: Fofar2;
  DOVE?: Dove2;
  "NEKO?"?: Neko2;
  SHP420INU?: Shp420Inu2;
  ANDY?: Andy2;
  VONE?: Vone2;
  TRUMPSHIBA?: Trumpshiba2;
  HASH?: Hash2;
  yANDY?: YAndy2;
  MWAVE?: Mwave2;
  PepeWC?: PepeWc2;
  MATT?: Matt2;
  sSHIB?: SShib2;
  MERM?: Merm2;
  BONKY?: Bonky2;
  sPEPE?: SPepe2;
  sDOGE?: SDoge2;
  SHIV?: Shiv2;
  sGROK?: SGrok2;
}

export interface Andy202 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time[];
  "Sell Times"?: Time2[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of ANDY2.0"?: number;
  "Buy Amount of ANDY2.0"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time {
  time?: string;
}

export interface Time2 {
  time?: string;
}

export interface Nitefeeder2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time3[];
  "Sell Times"?: Time4[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of NITEFEEDER"?: number;
  "Buy Amount of NITEFEEDER"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time3 {
  time?: string;
}

export interface Time4 {
  time?: string;
}

export interface Peve2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time5[];
  "Sell Times"?: Time6[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of PEVE"?: number;
  "Buy Amount of PEVE"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time5 {
  time?: string;
}

export interface Time6 {
  time?: string;
}

export interface Fofar2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time7[];
  "Sell Times"?: Time8[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of FOFAR"?: number;
  "Buy Amount of FOFAR"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time7 {
  time?: string;
}

export interface Time8 {
  time?: string;
}

export interface Dove2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time9[];
  "Sell Times"?: Time10[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of DOVE"?: number;
  "Buy Amount of DOVE"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time9 {
  time?: string;
}

export interface Time10 {
  time?: string;
}

export interface Neko2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time11[];
  "Sell Times"?: Time12[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of NEKO?"?: number;
  "Buy Amount of NEKO?"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time11 {
  time?: string;
}

export interface Time12 {
  time?: string;
}

export interface Shp420Inu2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time13[];
  "Sell Times"?: Time14[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of SHP420INU"?: number;
  "Buy Amount of SHP420INU"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time13 {
  time?: string;
}

export interface Time14 {
  time?: string;
}

export interface Andy2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time15[];
  "Sell Times"?: Time16[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of ANDY"?: number;
  "Buy Amount of ANDY"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time15 {
  time?: string;
}

export interface Time16 {
  time?: string;
}

export interface Vone2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time17[];
  "Sell Times"?: Time18[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of VONE"?: number;
  "Buy Amount of VONE"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time17 {
  time?: string;
}

export interface Time18 {
  time?: string;
}

export interface Trumpshiba2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time19[];
  "Sell Times"?: Time20[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of TRUMPSHIBA"?: number;
  "Buy Amount of TRUMPSHIBA"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time19 {
  time?: string;
}

export interface Time20 {
  time?: string;
}

export interface Hash2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time21[];
  "Sell Times"?: Time22[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of HASH"?: number;
  "Buy Amount of HASH"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time21 {
  time?: string;
}

export interface Time22 {
  time?: string;
}

export interface YAndy2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time23[];
  "Sell Times"?: Time24[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of yANDY"?: number;
  "Buy Amount of yANDY"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time23 {
  time?: string;
}

export interface Time24 {
  time?: string;
}

export interface Mwave2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: any;
  "Buy Times"?: Time25[];
  "Sell Times"?: any[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of MWAVE"?: number;
  "Buy Amount of MWAVE"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time25 {
  time?: string;
}

export interface PepeWc2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time26[];
  "Sell Times"?: Time27[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of PepeWC"?: number;
  "Buy Amount of PepeWC"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time26 {
  time?: string;
}

export interface Time27 {
  time?: string;
}

export interface Matt2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time28[];
  "Sell Times"?: Time29[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of MATT"?: number;
  "Buy Amount of MATT"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time28 {
  time?: string;
}

export interface Time29 {
  time?: string;
}

export interface SShib2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time30[];
  "Sell Times"?: Time31[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of sSHIB"?: number;
  "Buy Amount of sSHIB"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time30 {
  time?: string;
}

export interface Time31 {
  time?: string;
}

export interface Merm2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time32[];
  "Sell Times"?: Time33[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of MERM"?: number;
  "Buy Amount of MERM"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time32 {
  time?: string;
}

export interface Time33 {
  time?: string;
}

export interface Bonky2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time34[];
  "Sell Times"?: Time35[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of BONKY"?: number;
  "Buy Amount of BONKY"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time34 {
  time?: string;
}

export interface Time35 {
  time?: string;
}

export interface SPepe2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time36[];
  "Sell Times"?: Time37[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of sPEPE"?: number;
  "Buy Amount of sPEPE"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time36 {
  time?: string;
}

export interface Time37 {
  time?: string;
}

export interface SDoge2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time38[];
  "Sell Times"?: Time39[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of sDOGE"?: number;
  "Buy Amount of sDOGE"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time38 {
  time?: string;
}

export interface Time39 {
  time?: string;
}

export interface Shiv2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time40[];
  "Sell Times"?: Time41[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of SHIV"?: number;
  "Buy Amount of SHIV"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time40 {
  time?: string;
}

export interface Time41 {
  time?: string;
}

export interface SGrok2 {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time42[];
  "Sell Times"?: Time43[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of sGROK"?: number;
  "Buy Amount of sGROK"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time42 {
  time?: string;
}

export interface Time43 {
  time?: string;
}

export interface NotClosedPosition {
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: any;
  "Buy Times"?: Time44[];
  "Sell Times"?: any[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of MWAVE"?: number;
  "Buy Amount of MWAVE"?: number;
  Balance?: number;
  "Currency Address"?: string;
}

export interface Time44 {
  time?: string;
}

export interface PartiallyClosedPosition {
  tokenName?: string;
  isPartiallyClosed?: boolean;
  "Currency Address": string;
  tokenAddress: string;
  balance?: number;
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  imageUrl?: string | undefined;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time45[];
  "Sell Times"?: Time46[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of ANDY2.0"?: number;
  "Buy Amount of ANDY2.0"?: number;
  "Sell Amount of NITEFEEDER"?: number;
  "Buy Amount of NITEFEEDER"?: number;
  "Sell Amount of FOFAR"?: number;
  "Buy Amount of FOFAR"?: number;
  "Sell Amount of DOVE"?: number;
  "Buy Amount of DOVE"?: number;
  "Sell Amount of SHP420INU"?: number;
  "Buy Amount of SHP420INU"?: number;
  "Sell Amount of ANDY"?: number;
  "Buy Amount of ANDY"?: number;
  "Sell Amount of VONE"?: number;
  "Buy Amount of VONE"?: number;
  "Sell Amount of TRUMPSHIBA"?: number;
  "Buy Amount of TRUMPSHIBA"?: number;
  "Sell Amount of HASH"?: number;
  "Buy Amount of HASH"?: number;
  "Sell Amount of yANDY"?: number;
  "Buy Amount of yANDY"?: number;
  "Sell Amount of PepeWC"?: number;
  "Buy Amount of PepeWC"?: number;
  "Sell Amount of sSHIB"?: number;
  "Buy Amount of sSHIB"?: number;
  "Sell Amount of BONKY"?: number;
  "Buy Amount of BONKY"?: number;
  "Sell Amount of sPEPE"?: number;
  "Buy Amount of sPEPE"?: number;
  "Sell Amount of SHIV"?: number;
  "Buy Amount of SHIV"?: number;
}

export interface Time45 {
  time?: string;
}

export interface Time46 {
  time?: string;
}

export interface FullyClosedPosition {
  tokenName?: string;
  isFullyClosed?: boolean;
  balance?: number;
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time47[];
  "Sell Times"?: Time48[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of PEVE"?: number;
  "Buy Amount of PEVE"?: number;
  Balance?: number;
  "Currency Address"?: string;
  "Sell Amount of NEKO?"?: number;
  "Buy Amount of NEKO?"?: number;
  "Sell Amount of MATT"?: number;
  "Buy Amount of MATT"?: number;
  "Sell Amount of MERM"?: number;
  "Buy Amount of MERM"?: number;
  "Sell Amount of sGROK"?: number;
  "Buy Amount of sGROK"?: number;
}

export interface Time47 {
  time?: string;
}

export interface Time48 {
  time?: string;
}

export interface Balance {
  tokenName?: string;
  balanceType?: string;
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time49[];
  "Sell Times"?: Time50[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of MWAVE"?: number;
  "Buy Amount of MWAVE"?: number;
  Balance?: number;
  "Currency Address"?: string;
  tokenPrice?: any;
  totalReserveInUSD?: string;
  currentValue?: number;
  currentProfit?: number;
  isPartiallyClosed?: boolean;
  "Sell Amount of ANDY2.0"?: number;
  "Buy Amount of ANDY2.0"?: number;
  "Sell Amount of NITEFEEDER"?: number;
  "Buy Amount of NITEFEEDER"?: number;
  "Sell Amount of FOFAR"?: number;
  "Buy Amount of FOFAR"?: number;
  "Sell Amount of DOVE"?: number;
  "Buy Amount of DOVE"?: number;
  "Sell Amount of SHP420INU"?: number;
  "Buy Amount of SHP420INU"?: number;
  "Sell Amount of ANDY"?: number;
  "Buy Amount of ANDY"?: number;
  "Sell Amount of VONE"?: number;
  "Buy Amount of VONE"?: number;
  "Sell Amount of TRUMPSHIBA"?: number;
  "Buy Amount of TRUMPSHIBA"?: number;
  "Sell Amount of HASH"?: number;
  "Buy Amount of HASH"?: number;
  "Sell Amount of yANDY"?: number;
  "Buy Amount of yANDY"?: number;
  "Sell Amount of PepeWC"?: number;
  "Buy Amount of PepeWC"?: number;
  "Sell Amount of sSHIB"?: number;
  "Buy Amount of sSHIB"?: number;
  "Sell Amount of BONKY"?: number;
  "Buy Amount of BONKY"?: number;
  "Sell Amount of sPEPE"?: number;
  "Buy Amount of sPEPE"?: number;
  "Sell Amount of SHIV"?: number;
  "Buy Amount of SHIV"?: number;
}

export interface Time49 {
  time?: string;
}

export interface Time50 {
  time?: string;
}

export interface SwapWallet {
  tokenName?: string;
  isPartiallyClosed?: boolean;
  balance?: number;
  imageUrl?: string;
  balanceType?: string;
  "Buy Amount"?: number;
  "Buy Amount (USD)"?: number;
  "Sell Amount"?: number;
  "Sell Amount (USD)"?: number;
  Profit?: number;
  "Entry Price"?: number;
  "Exit Price"?: number;
  "Buy Times"?: Time51[];
  "Sell Times"?: Time52[];
  "Num of Buy Times"?: number;
  "Num of Sell Times"?: number;
  "Sell Amount of ANDY2.0"?: number;
  "Buy Amount of ANDY2.0"?: number;
  Balance?: number;
  "Currency Address"?: string;
  tokenPrice?: any;
  totalReserveInUSD?: string;
  currentValue?: number;
  currentProfit?: number;
  "Sell Amount of NITEFEEDER"?: number;
  "Buy Amount of NITEFEEDER"?: number;
  "Sell Amount of FOFAR"?: number;
  "Buy Amount of FOFAR"?: number;
  "Sell Amount of DOVE"?: number;
  "Buy Amount of DOVE"?: number;
  "Sell Amount of SHP420INU"?: number;
  "Buy Amount of SHP420INU"?: number;
  "Sell Amount of ANDY"?: number;
  "Buy Amount of ANDY"?: number;
  "Sell Amount of VONE"?: number;
  "Buy Amount of VONE"?: number;
  "Sell Amount of TRUMPSHIBA"?: number;
  "Buy Amount of TRUMPSHIBA"?: number;
  "Sell Amount of HASH"?: number;
  "Buy Amount of HASH"?: number;
  "Sell Amount of yANDY"?: number;
  "Buy Amount of yANDY"?: number;
  "Sell Amount of PepeWC"?: number;
  "Buy Amount of PepeWC"?: number;
  "Sell Amount of sSHIB"?: number;
  "Buy Amount of sSHIB"?: number;
  "Sell Amount of BONKY"?: number;
  "Buy Amount of BONKY"?: number;
  "Sell Amount of sPEPE"?: number;
  "Buy Amount of sPEPE"?: number;
  "Sell Amount of SHIV"?: number;
  "Buy Amount of SHIV"?: number;
  isFullyClosed?: boolean;
  "Sell Amount of PEVE"?: number;
  "Buy Amount of PEVE"?: number;
  "Sell Amount of NEKO?"?: number;
  "Buy Amount of NEKO?"?: number;
  "Sell Amount of MATT"?: number;
  "Buy Amount of MATT"?: number;
  "Sell Amount of MERM"?: number;
  "Buy Amount of MERM"?: number;
  "Sell Amount of sGROK"?: number;
  "Buy Amount of sGROK"?: number;
}

export interface Time51 {
  time?: string;
}

export interface Time52 {
  time?: string;
}

export interface AggregatedSendTransactions {
  ETH?: Eth2;
}

export interface Eth2 {
  totalAmountUSD?: number;
  totalAmount?: number;
  currencyAddress?: string;
  transactions?: Transaction55[];
}

export interface Transaction55 {
  type?: string;
  sender?: Sender29;
  receiver?: Receiver29;
  amount?: number;
  amount_usd?: number;
  currency?: Currency29;
  transaction?: Transaction56;
  block?: Block29;
}

export interface Sender29 {
  address?: string;
}

export interface Receiver29 {
  address?: string;
}

export interface Currency29 {
  symbol?: string;
  address?: string;
}

export interface Transaction56 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block29 {
  height?: number;
  timestamp?: Timestamp29;
}

export interface Timestamp29 {
  time?: string;
}

export interface AggregatedReceiveTransactions {
  "Get $MWAVE reward at https://themeshwave.com"?: GetMwaveRewardAtHttpsThemeshwaveCom;
  "$ Visit ETH200k.com to claim $200k"?: VisitEth200kComToClaim200k;
  "Get free $TRUMPSHIBA at https://trumpshiba.com"?: GetFreeTrumpshibaAtHttpsTrumpshibaCom;
  ETH?: Eth3;
}

export interface GetMwaveRewardAtHttpsThemeshwaveCom {
  totalAmountUSD?: number;
  totalAmount?: number;
  currencyAddress?: string;
  transactions?: Transaction57[];
}

export interface Transaction57 {
  type?: string;
  sender?: Sender30;
  receiver?: Receiver30;
  amount?: number;
  amount_usd?: number;
  currency?: Currency30;
  transaction?: Transaction58;
  block?: Block30;
}

export interface Sender30 {
  address?: string;
}

export interface Receiver30 {
  address?: string;
}

export interface Currency30 {
  symbol?: string;
  address?: string;
}

export interface Transaction58 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block30 {
  height?: number;
  timestamp?: Timestamp30;
}

export interface Timestamp30 {
  time?: string;
}

export interface VisitEth200kComToClaim200k {
  totalAmountUSD?: number;
  totalAmount?: number;
  currencyAddress?: string;
  transactions?: Transaction59[];
}

export interface Transaction59 {
  type?: string;
  sender?: Sender31;
  receiver?: Receiver31;
  amount?: number;
  amount_usd?: number;
  currency?: Currency31;
  transaction?: Transaction60;
  block?: Block31;
}

export interface Sender31 {
  address?: string;
}

export interface Receiver31 {
  address?: string;
}

export interface Currency31 {
  symbol?: string;
  address?: string;
}

export interface Transaction60 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block31 {
  height?: number;
  timestamp?: Timestamp31;
}

export interface Timestamp31 {
  time?: string;
}

export interface GetFreeTrumpshibaAtHttpsTrumpshibaCom {
  totalAmountUSD?: number;
  totalAmount?: number;
  currencyAddress?: string;
  transactions?: Transaction61[];
}

export interface Transaction61 {
  type?: string;
  sender?: Sender32;
  receiver?: Receiver32;
  amount?: number;
  amount_usd?: number;
  currency?: Currency32;
  transaction?: Transaction62;
  block?: Block32;
}

export interface Sender32 {
  address?: string;
}

export interface Receiver32 {
  address?: string;
}

export interface Currency32 {
  symbol?: string;
  address?: string;
}

export interface Transaction62 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block32 {
  height?: number;
  timestamp?: Timestamp32;
}

export interface Timestamp32 {
  time?: string;
}

export interface Eth3 {
  totalAmountUSD?: number;
  totalAmount?: number;
  currencyAddress?: string;
  transactions?: Transaction63[];
}

export interface Transaction63 {
  type?: string;
  sender?: Sender33;
  receiver?: Receiver33;
  amount?: number;
  amount_usd?: number;
  currency?: Currency33;
  transaction?: Transaction64;
  block?: Block33;
}

export interface Sender33 {
  address?: string;
}

export interface Receiver33 {
  address?: string;
}

export interface Currency33 {
  symbol?: string;
  address?: string;
}

export interface Transaction64 {
  hash?: string;
  gasValue?: number;
  gasPrice?: number;
}

export interface Block33 {
  height?: number;
  timestamp?: Timestamp33;
}

export interface Timestamp33 {
  time?: string;
}
