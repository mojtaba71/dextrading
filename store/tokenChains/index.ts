import { create } from "zustand";

export type TokenChain = {
  id: string;
  type: string;
  attributes: {
    name: string;
    coingecko_asset_platform_id: string | null;
    abbreviation: string;
  };
  imageUrl?: {
    thumb: string;
    small: string;
    large: string;
  };
};

// Define the type for the store's state
export interface TokenChainState {
  availableChains: TokenChain[];
  selectedChain: TokenChain;
  setSelectedChain: (id: string) => void;
  addChain: (tokenChain: TokenChain) => void;
  removeChain: (id: string) => void;
}

// Create the store
const useTokenChainStore = create<TokenChainState>((set, get) => ({
  availableChains: [
    {
      id: "eth",
      type: "network",
      attributes: {
        name: "Ethereum",
        coingecko_asset_platform_id: "ethereum",
        abbreviation: "ETH",
      },
      imageUrl: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/279/thumb/ethereum.png?1706606803",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/279/small/ethereum.png?1706606803",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/279/large/ethereum.png?1706606803",
      },
    },
    {
      id: "solana",
      type: "network",
      attributes: {
        name: "Solana",
        coingecko_asset_platform_id: "solana",
        abbreviation: "SOL",
      },
      imageUrl: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/5/thumb/solana.png?1706606708",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/5/small/solana.png?1706606708",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/5/large/solana.png?1706606708",
      },
    },
    {
      id: "base",
      type: "network",
      attributes: {
        name: "Base",
        coingecko_asset_platform_id: "base",
        abbreviation: "BAS",
      },
      imageUrl: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/131/thumb/base-network.png?1720533039",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/131/small/base-network.png?1720533039",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/131/large/base-network.png?1720533039",
      },
    },
    {
      id: "bsc",
      type: "network",
      attributes: {
        name: "BNB Chain",
        coingecko_asset_platform_id: "binance-smart-chain",
        abbreviation: "BSC",
      },
      imageUrl: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/1/thumb/bnb_smart_chain.png?1706606721",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/1/small/bnb_smart_chain.png?1706606721",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/1/large/bnb_smart_chain.png?1706606721",
      },
    },
    {
      id: "tron",
      type: "network",
      attributes: {
        name: "Tron",
        coingecko_asset_platform_id: "tron",
        abbreviation: "TRX",
      },
      image: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/1094/thumb/TRON_LOGO.png?1706606652",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/1094/small/TRON_LOGO.png?1706606652",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/1094/large/TRON_LOGO.png?1706606652",
      },
    },
    {
      id: "ton",
      type: "network",
      attributes: {
        name: "TON",
        coingecko_asset_platform_id: "the-open-network",
        abbreviation: "TON",
      },
      imageUrl: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/142/thumb/tonblockchain.jpeg?1706606805",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/142/small/tonblockchain.jpeg?1706606805",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/142/large/tonblockchain.jpeg?1706606805",
      },
    },
    {
      id: "arbitrum",
      type: "network",
      attributes: {
        name: "Arbitrum",
        coingecko_asset_platform_id: "arbitrum-one",
        abbreviation: "ARB",
      },
      imageUrl: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/33/thumb/AO_logomark.png?1706606717",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/33/small/AO_logomark.png?1706606717",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/33/large/AO_logomark.png?1706606717",
      },
    },
    {
      id: "optimism",
      type: "network",
      attributes: {
        name: "Optimism",
        coingecko_asset_platform_id: "optimistic-ethereum",
        abbreviation: "OPT",
      },
      imageUrl: {
        thumb:
          "https://coin-images.coingecko.com/asset_platforms/images/41/thumb/optimism.png?1706606778",
        small:
          "https://coin-images.coingecko.com/asset_platforms/images/41/small/optimism.png?1706606778",
        large:
          "https://coin-images.coingecko.com/asset_platforms/images/41/large/optimism.png?1706606778",
      },
    },
  ],
  selectedChain: {
    id: "solana",
    type: "network",
    attributes: {
      name: "Solana",
      coingecko_asset_platform_id: "solana",
      abbreviation: "SOL",
    },
    imageUrl: {
      thumb:
        "https://coin-images.coingecko.com/asset_platforms/images/5/thumb/solana.png?1706606708",
      small:
        "https://coin-images.coingecko.com/asset_platforms/images/5/small/solana.png?1706606708",
      large:
        "https://coin-images.coingecko.com/asset_platforms/images/5/large/solana.png?1706606708",
    },
  },

  // Method to set the selected chain by its ID
  setSelectedChain: (id) => {
    const chain = get().availableChains.find((chain) => chain.id === id);
    set({ selectedChain: chain });
  },

  // Method to add a new chain to the list of available chains
  addChain: (tokenChain) =>
    set((state) => ({
      availableChains: [...state.availableChains, tokenChain],
    })),

  // Method to remove a chain from the list of available chains by its ID
  removeChain: (id) =>
    set((state) => ({
      availableChains: state.availableChains.filter((chain) => chain.id !== id),
    })),
}));

export default useTokenChainStore;
