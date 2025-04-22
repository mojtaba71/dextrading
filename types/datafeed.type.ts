export interface IDatafeed {
  data: Data | null;
  meta: Meta;
}

export interface Data {
  id: string;
  type: string;
  attributes: Attributes;
}

export interface Attributes {
  ohlcv_list: number[][];
}

export interface Meta {
  base: Base;
  quote: Quote;
}

export interface Base {
  address: string;
  name: string;
  symbol: string;
}

export interface Quote {
  address: string;
  name: string;
  symbol: string;
}

export interface IOhlcvData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}