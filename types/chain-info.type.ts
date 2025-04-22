export interface IchainInfo {
  code: number;
  message: string;
  data: Data;
  requestId: string;
}

export interface Data {
  routeSummary: RouteSummary;
  routerAddress: string;
}

export interface RouteSummary {
  tokenIn: string;
  amountIn: string;
  amountInUsd: string;
  tokenInMarketPriceAvailable: boolean;
  tokenOut: string;
  amountOut: string;
  amountOutUsd: string;
  tokenOutMarketPriceAvailable: boolean;
  gas: string;
  gasPrice: string;
  gasUsd: string;
  extraFee: ExtraFee;
  route: Route[][];
  extra: Extra;
}

export interface ExtraFee {
  feeAmount: string;
  chargeFeeBy: string;
  isInBps: boolean;
  feeReceiver: string;
}

export interface Route {
  pool: string;
  tokenIn: string;
  tokenOut: string;
  limitReturnAmount: string;
  swapAmount: string;
  amountOut: string;
  exchange: string;
  poolLength: number;
  poolType: string;
  poolExtra?: PoolExtra;
  extra: any;
}

export interface PoolExtra {
  vault?: string;
  poolId?: string;
  tokenOutIndex?: number;
  blockNumber: number;
  fee?: number;
  feePrecision?: number;
}

export interface Extra {
  chunksInfo: any[];
}
