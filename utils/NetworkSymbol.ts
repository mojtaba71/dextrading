interface Chain {
  id: number;
  nativeTokenName: string;
  name: string;
  symbol: string;
  icon: string;
  url: string;
}

export const availableChains: Chain[] = [
  {
    id: 1,
    nativeTokenName: "eth",
    name: "Ethereum",
    symbol: "eth",
    icon: "eth.png",
    url: "eth",
  },
  {
    id: 7,
    nativeTokenName: "sol",
    name: "Solana",
    symbol: "solana",
    icon: "SOL.png",
    url: "sol",
  },
  {
    id: 6,
    nativeTokenName: "weth",
    name: "Base",
    symbol: "base",
    icon: "base.png",
    url: "base",
  },
  {
    id: 2,
    nativeTokenName: "bnb",
    name: "Binance Smart Chain",
    symbol: "bsc",
    icon: "bsc.png",
    url: "bsc",
  },
  {
    id: 4,
    nativeTokenName: "weth",
    name: "Arbitrum",
    symbol: "arbitrum",
    icon: "ARB.png",
    url: "arbitrum",
  },
  {
    id: 5,
    nativeTokenName: "weth",
    name: "Optimism",
    symbol: "optimism",
    icon: "OPT.png",
    url: "optimism",
  },
];

export function getNetworkSymbol(networkName: string): string | undefined {
  const chain = availableChains.find(
    (chain) => chain?.name.toLowerCase() === networkName.toLowerCase()
  );
  return chain ? chain.symbol : undefined;
}

