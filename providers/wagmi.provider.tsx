"use client";

import React, { ReactNode } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { config, projectId } from "@/config/wagmi.config";
import { useTheme } from "next-themes";



// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  themeMode: 'dark', //FIXME: pass the theme dynamically from root classname or next-theme lib
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function WagmiiProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
