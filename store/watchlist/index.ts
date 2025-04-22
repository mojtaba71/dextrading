// Import persist from zustand middleware
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IWatchlistItem {
  name: string;
  contractAddress: string;
  type: "wallet" | "token";
  image?: string
}

interface WatchlistState {
  watchlist: IWatchlistItem[];
  addToWatchlist: (token: IWatchlistItem) => void;
  removeFromWatchlist: (contractAddress: string) => void;
}

const useWatchlistStore = create(
  persist<WatchlistState>(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (token) => {
        const { watchlist } = get();
        if (
          !watchlist.some((w) => w.contractAddress === token.contractAddress)
        ) {
          set({ watchlist: [...watchlist, token] });
        }
      },

      removeFromWatchlist: (contractAddress) => {
        const { watchlist } = get();
        set({
          watchlist: watchlist.filter(
            (token) => token.contractAddress !== contractAddress
          ),
        });
      },
    }),
    {
      name: "watchlist-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useWatchlistStore;
