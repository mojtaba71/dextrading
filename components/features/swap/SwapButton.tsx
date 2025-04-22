import React from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ConnectWalletMessage } from "./DashboardComponents";

interface SwapButtonProps {
  sendSwapRequest: () => void;
  isApproved: boolean;
  disabled: boolean; // Include the disabled prop
}

function SwapButton({
  sendSwapRequest,
  isApproved,
  disabled,
}: SwapButtonProps) {
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <Button
          onClick={sendSwapRequest}
          className={`bg-brand disabled:opacity-5 w-full`}
          disabled={disabled} // Pass the disabled prop to the button
        >
          Swap
        </Button>
      ) : (
        <ConnectWalletMessage message="Connect Wallet" />
      )}
    </div>
  );
}

export default SwapButton;
