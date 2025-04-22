export interface IStrength {
  cachedData: CachedData;
  averageMarketStrength: number;
  history: History[];
}

export interface CachedData {
  base: Base;
  eth: Eth;
  solana: Solana;
}

export interface Base {
  totalItems: number;
  above10Count: number;
  belowMinus10Count: number;
  betweenMinus10And10Count: number;
  marketStrength: number;
}

export interface Eth {
  totalItems: number;
  above10Count: number;
  belowMinus10Count: number;
  betweenMinus10And10Count: number;
  marketStrength: number;
}

export interface Solana {
  totalItems: number;
  above10Count: number;
  belowMinus10Count: number;
  betweenMinus10And10Count: number;
  marketStrength: number;
}

export interface History {
  timestamp: number;
  data: Data;
  averageMarketStrength?: number;
}

export interface Data {
  base: Base2;
  eth: Eth2;
  solana: Solana2;
}

export interface Base2 {
  totalItems: number;
  above10Count: number;
  belowMinus10Count: number;
  betweenMinus10And10Count: number;
  marketStrength: number;
}

export interface Eth2 {
  totalItems: number;
  above10Count: number;
  belowMinus10Count: number;
  betweenMinus10And10Count: number;
  marketStrength?: number;
}

export interface Solana2 {
  totalItems: number;
  above10Count: number;
  belowMinus10Count: number;
  betweenMinus10And10Count: number;
  marketStrength?: number;
}
