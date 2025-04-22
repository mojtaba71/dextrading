import Copy from "@/components/ui/copy";
import { minifyContract } from "@/utils/truncate";
import React from "react";

interface SwapMessagesProps {
  error: any;
  isConfirmed: boolean;
  hash: string | undefined;
  isConfirming: boolean;
}

const SwapMessages: React.FC<SwapMessagesProps> = ({ error, isConfirmed, hash, isConfirming }) => {
  return (
    <div>
      {(hash || isConfirmed || isConfirming || error) && (
        <div className="my-3 ring-1 ring-muted-foreground rounded-md p-4 flex flex-col gap-3">
          {hash && (
            <div className="flex items-center justify-between text-muted-foreground text-sm p-2">
              Transaction Hash:{" "}
              <Copy text={minifyContract(hash, 8, 8)} value={hash} />
            </div>
          )}
          {isConfirming && (
            <div className="text-yellow-600 text-center">
              Waiting for confirmation...
            </div>
          )}
          {isConfirmed && (
            <div className="text-success text-center">
              Transaction confirmed successfully!
            </div>
          )}
          {error && <div className="text-error">Error: {error.message}</div>}
        </div>
      )}
    </div>
  );
};

export default SwapMessages;
