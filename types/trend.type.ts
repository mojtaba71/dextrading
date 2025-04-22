export interface Trend {
  data: Daum[];
  total_pages: number;
  filters: Filters;
}

export interface Daum {
  name: string;
  url_name: string;
  api_id: string;
  active: boolean;
  symbol: string;
  derivative: boolean;
  type: string;
  rank: number;
  id: number;
  sprite_css_class?: string;
  price_stats: PriceStats;
  ath: Ath;
  address: string;
  logo_url: string;
}

export interface PriceStats {
  btc: Btc;
  usd: Usd;
  eth: Eth;
}

export interface Btc {
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

export interface Ath {
  usd: Usd2;
  btc: Btc2;
  eth: Eth2;
}

export interface Usd2 {
  price: number;
  price_formatted: string;
  percent_from: number;
  percent_to: number;
  updated_at: UpdatedAt;
}

export interface UpdatedAt {
  date: string;
  formatted: string;
  timetamp: number;
  ago: string;
}

export interface Btc2 {
  price: number;
  price_formatted: string;
  percent_from: number;
  percent_to: number;
  updated_at: UpdatedAt2;
}

export interface UpdatedAt2 {
  date: string;
  formatted: string;
  timetamp: number;
  ago: string;
}

export interface Eth2 {
  price: number;
  price_formatted: string;
  percent_from: number;
  percent_to: number;
  updated_at: UpdatedAt3;
}

export interface UpdatedAt3 {
  date: string;
  formatted: string;
  timetamp: number;
  ago: string;
}

export interface Filters {
  market_cap: MarketCap;
  volume_24h: Volume24h;
  price: Price;
  tags: Tags;
}

export interface MarketCap {
  type: string;
  options: Options;
}

export interface Options {
  all: All;
  "1b": N1b;
  "100m-1b": N100m1b;
  "10m-100m": N10m100m;
  "1m-10m": N1m10m;
  "100k-1mln": N100k1mln;
  "0-100k": N0100k;
}

export interface All {
  name: string;
  count: number;
}

export interface N1b {
  name: string;
  count: number;
}

export interface N100m1b {
  name: string;
  count: number;
}

export interface N10m100m {
  name: string;
  count: number;
}

export interface N1m10m {
  name: string;
  count: number;
}

export interface N100k1mln {
  name: string;
  count: number;
}

export interface N0100k {
  name: string;
  count: number;
}

export interface Volume24h {
  type: string;
  options: Options2;
}

export interface Options2 {
  all: All2;
  "10m": N10m;
  "1m": N1m;
  "100k": N100k;
  "10k": N10k;
  "1k": N1k;
}

export interface All2 {
  name: string;
  count: number;
}

export interface N10m {
  name: string;
  count: number;
}

export interface N1m {
  name: string;
  count: number;
}

export interface N100k {
  name: string;
  count: number;
}

export interface N10k {
  name: string;
  count: number;
}

export interface N1k {
  name: string;
  count: number;
}

export interface Price {
  type: string;
  options: Options3;
}

export interface Options3 {
  all: All3;
  "100+": N100;
  "1-100": N1100;
  "0.01-1.00": N001100;
  "0.0001-0.01": N00001001;
  "0-0.0001": N000001;
}

export interface All3 {
  name: string;
  count: number;
}

export interface N100 {
  name: string;
  count: number;
}

export interface N1100 {
  name: string;
  count: number;
}

export interface N001100 {
  name: string;
  count: number;
}

export interface N00001001 {
  name: string;
  count: number;
}

export interface N000001 {
  name: string;
  count: number;
}

export interface Tags {
  type: string;
  options: Options4;
}

export interface Options4 {
  erc20: number;
  "bnb-token": number;
  "recently-added": number;
  "sol-token": number;
  "matic-token": number;
  "smart-contracts": number;
  "nft-tokens": number;
  cryptocurrency: number;
  "artificial-intelligence": number;
  platform: number;
  "arbitrum-ecosystem": number;
  gaming: number;
  "meme-asset": number;
  "layer-1-l1": number;
  "avax-token": number;
  defi: number;
  metaverse: number;
  "base-token": number;
  "play-to-earn-p2e": number;
  "proof-of-work": number;
  "blockchain-service": number;
  exchange: number;
  "ftm-token": number;
  web3: number;
  "proof-of-stake": number;
  "privacy-security": number;
  payments: number;
  mining: number;
  "op-token": number;
  marketplace: number;
  stablecoin: number;
  "decentralized-applications": number;
  "events-entertainment": number;
  "layer-2-l2": number;
  "assets-management": number;
  governance: number;
  "big-data-data-storage": number;
  "tron-token": number;
  "finance-banking": number;
  "distributed-computing": number;
  "token-issuance": number;
  monetization: number;
  wallet: number;
  "trading-investing": number;
  dao: number;
  protocol: number;
  premine: number;
  brc20bitcointoken: number;
  "media-publishing": number;
  "delegated-proof-of-stake": number;
  staking: number;
  "telegram-bot": number;
  "one-token": number;
  "cross-chain": number;
  launchpad: number;
  "yield-farming": number;
  internet: number;
  "heco-token": number;
  scalable: number;
  "identity-verification": number;
  enterprise: number;
  "computing-cloud-infrastructure": number;
  "internet-of-things": number;
  "multicoin-capital-portfolio": number;
  masternode: number;
  education: number;
  "social-network": number;
  oracles: number;
  "ftx-holdings": number;
  "real-world-assets-rwa": number;
  sha256: number;
  "decentralized-exchange-dex": number;
  "byzantine-fault-tolerance": number;
  nep5: number;
  "business-services": number;
  software: number;
  sports: number;
  "pulsechain-token-prc-20": number;
  "ada-token": number;
  interoperability: number;
  "drugs-healthcare": number;
  filesharing: number;
  "commerce-advertising": number;
  mobile: number;
  "xrp-token": number;
  "zero-knowledge-zk": number;
  "stellar-token": number;
  "liquid-staking-tokens-lst": number;
  ethash: number;
  "waves-token": number;
  "charity-donations": number;
  sidechains: number;
  equihash: number;
  infrastructure: number;
  "casino-gambling": number;
  "automated-market-makers-amm": number;
  "celo-token": number;
  communication: number;
  scrypt: number;
  x11: number;
  cybersecurity: number;
  recruitment: number;
  "cronos-token": number;
  "dog-meme-token": number;
  "lightning-network": number;
  "liquid-staking-derivatives-lsd": number;
  loans: number;
  "art-music": number;
  "off-chain": number;
  "direct-acyclic-graph": number;
  cryptonight: number;
  "hybrid-consensus": number;
  feeless: number;
  "president-meme-token": number;
  segwit: number;
  "klaytn-token": number;
  "proof-of-authority": number;
  blake: number;
  "frog-meme-token": number;
  "eos-token": number;
  oracle: number;
  "cat-meme-token": number;
  "zksync-token": number;
  "erc-404": number;
  "auxiliary-proof-of-work": number;
  "supply-logistics": number;
  qrc20: number;
  x13: number;
  "energy-utilities": number;
  "myraid-groestl": number;
  banking: number;
  insurance: number;
  "real-estate": number;
  neutron: number;
  "blast-ecosystem": number;
  "open-source": number;
  "etc-token": number;
  card: number;
  ico: number;
  "centralized-exchange-cex": number;
  blockchain: number;
  lending: number;
  crowdsourcing: number;
  "qtum-token": number;
  escrow: number;
  "bch-token": number;
  "adult-18": number;
  "energi-token": number;
  "rsk-token": number;
  skein: number;
  "travel-tourism": number;
  groestl: number;
  vr: number;
  "tokenized-assets": number;
  substrate: number;
  quark: number;
  "loop-fault-tolerance": number;
  "private-chains": number;
  "environment-friendly": number;
  "proof-of-importance": number;
  lyra2re: number;
  "omni-token": number;
}
