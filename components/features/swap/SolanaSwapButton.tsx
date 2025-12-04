import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false,
  }
);

function SolanaSwapButton({
  onConnected,
}: {
  onConnected: (walletAdapter: any) => void;
}) {
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      onConnected(publicKey.toString());
    }
  }, [publicKey, onConnected]);

  return <WalletMultiButton />;
}

export default SolanaSwapButton;
