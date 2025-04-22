export interface SpotlightSearchType {
  network: Network;
  subject: Subject;
}

export interface Network {
  network: string;
  protocol: string;
}

export interface Subject {
  address: string;
  name: string;
  symbol: string;
  IToken: string;
  properties: any;
  label: string;
}
