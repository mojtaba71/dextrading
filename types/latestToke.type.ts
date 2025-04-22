export type ILatestToken = LatestIToken[];

export interface LatestIToken {
  tokenName: string;
  contractAddress: string;
  count: number;
  latestDate: string;
  rank: number;
}
