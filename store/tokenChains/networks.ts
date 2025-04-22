import { create } from "zustand";
import networksJson from "../../utils/networks.json";
import { get, set } from "local-storage";

export type TokenChain = {
  id: string;
  type: string;
  chainId?: number;
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
  setSelectedChain: (chain: TokenChain) => void;
  addChain: (tokenChain: TokenChain) => void;
  removeChain: (id: string) => void;
}

const SELECTED_CHAIN = "selectedChainnn";

const storeNetworkToLocalStorage = (selectedChain: TokenChain) => {
  set(SELECTED_CHAIN, selectedChain);
};

const getSelectedChainFromLocalStorage = (): TokenChain => {
  const selectedChain = get(SELECTED_CHAIN);
  return selectedChain ? selectedChain as TokenChain : {
    id: "solana",
    type: "network",
    attributes: {
      name: "Solana",
      coingecko_asset_platform_id: "solana",
      abbreviation: "SOL",
    },
    imageUrl: {
      thumb: "https://coin-images.coingecko.com/asset_platforms/images/5/thumb/solana.png?1706606708",
      small: "https://coin-images.coingecko.com/asset_platforms/images/5/small/solana.png?1706606708",
      large: "https://coin-images.coingecko.com/asset_platforms/images/5/large/solana.png?1706606708",
    },
  };
};

// Create the store
const useNetworkSelector = create<TokenChainState>((set, get) => ({
  availableChains: networksJson.slice(0,8),
  selectedChain: getSelectedChainFromLocalStorage(),

  // Method to set the selected chain by its ID
  setSelectedChain: (item: TokenChain) => {
    set({ selectedChain: item });
    storeNetworkToLocalStorage(item);
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

export default useNetworkSelector;
