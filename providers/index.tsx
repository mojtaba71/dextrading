"use client";
import React, { ErrorInfo } from "react";
import { ThemeProvider } from "./theme.provider";
import { WagmiiProvider } from "./wagmi.provider";
import QueryProvider from "./query.provider";
import { Toaster } from "@/components/ui/toast/toaster";
import { ErrorBoundary } from "react-error-boundary";
import { postError } from "@/services/http/error.http";
import { useLoadingStore } from "@/store";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
import AppWalletProvider from "@/components/features/swap/AppWalletProvider";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isLoading = useLoadingStore((state) => state.isLoading);

  const logError = (error: Error, info: ErrorInfo) => {
    postError({ data: error });
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <AppWalletProvider>
          <WagmiiProvider>
            <QueryProvider>
              <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
                {children}
              </ErrorBoundary>
            </QueryProvider>
            <Toaster />
            {isLoading && <LoadingOverlay />}
          </WagmiiProvider>
        </AppWalletProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

function Fallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
