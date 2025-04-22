import { cookieStorage, createStorage } from 'wagmi';
import { http } from 'wagmi';
import { createConfig } from 'wagmi';
import { mainnet, sepolia, polygon, optimism, base } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

// Define the project ID for WalletConnect
export const projectId = '3a2c2689a8dfd99c86c278328a61f926';

const metadata = {
  name: 'DEX Trading App',
  description: 'A multi-chain DEX Trading App',
  url: 'https://dextrading.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const config = createConfig({
  connectors: [
    walletConnect({
      projectId,
      metadata,
      showQrModal: true,
    }),
  ],
  chains: [mainnet, sepolia, polygon, optimism, base],
  transports: {
    [mainnet.id]: http(mainnet.rpcUrls.default.http[0]),
    [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
    [polygon.id]: http(polygon.rpcUrls.default.http[0]),
    [optimism.id]: http(optimism.rpcUrls.default.http[0]),
    [base.id]: http(base.rpcUrls.default.http[0]),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
