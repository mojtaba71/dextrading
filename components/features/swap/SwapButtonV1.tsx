import React from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ConnectWalletMessage } from "./DashboardComponents";

interface SwapButtonProps {
  sendSwapRequest: () => void;
  isApproved: boolean;
}

function SwapButton({ sendSwapRequest, isApproved }: SwapButtonProps) {
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <Button
          onClick={sendSwapRequest}
          className="w-full bg-brand text-white rounded-[14px] relative"
        >
          {isApproved ? "Swap" : "Approve & Swap"}
        </Button>
      ) : (
        <ConnectWalletMessage message="Connect Wallet" />
      )}
    </div>
  );
}

export default SwapButton;
