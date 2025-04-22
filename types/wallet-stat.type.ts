export interface WalletStatType {
  data?: Data;
  loadingMessage?: LoadingMessage;
  detail1?: string;
  detail2?: string;
}

export interface Data {
  ethereum?: Ethereum;
}

export interface Ethereum {
  addressStats?: AddressStat[];
}

export interface AddressStat {
  address?: Address;
}

export interface Address {
  address?: Address2;
  daysWithTransactions?: string;
  sendAmount?: number;
  sendToCount?: string;
  sendTxCount?: string;
  sendToCurrencies?: string;
  receiveAmount?: number;
  receiveTxCount?: string;
  receiveFromCount?: string;
  receiveFromCurrencies?: string;
  feeAmount?: number;
  balance?: number;
  firstTxAt?: FirstTxAt;
  firstTransferAt?: FirstTransferAt;
  lastTxAt?: LastTxAt;
  lastTransferAt?: LastTransferAt;
  daysWithReceived?: string;
  daysWithSent?: string;
  daysWithTransfers?: string;
  callTxCount?: string;
  calledTxCount?: string;
  otherTxCount?: string;
}

export interface Address2 {
  address?: string;
  annotation?: any;
}

export interface FirstTxAt {
  time?: string;
}

export interface FirstTransferAt {
  time?: string;
}

export interface LastTxAt {
  time?: string;
}

export interface LastTransferAt {
  time?: string;
}

export interface LoadingMessage {
  totalTransfersMessage?: string;
  latestTransferMessage?: string;
  daysWithTransactions?: string;
}
