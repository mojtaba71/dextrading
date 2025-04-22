import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SwapComponent } from "../swap/SwapComponent";
import useNetworkSelector from "@/store/tokenChains/networks";
import swapNetworks from "../../../utils/swap_chains.json";

const toTokenArray = [
  { id: "solana", contract: "11111111111111111111111111111111" },
  { id: "eth", contract: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  { id: "base", contract: "0x4200000000000000000000000000000000000006" },
  { id: "arbitrum", contract: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
  { id: "tron", contract: "TSbg8U8kP3uks3CeYAfKLkV5digq2XyeWa" },
  { id: "bsc", contract: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
];

function SwapDrawer({
  fromTokenContractAddress,
  toTokenContractAddress,
}: {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
}) {
  const { selectedChain } = useNetworkSelector();

  const handleToToken = () => {
    const result =
      toTokenArray.find((item) => item.id === selectedChain.id)?.contract ??
      toTokenContractAddress;
    return result;
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <div className="bg-brand mt-3 ml-3 rounded-md p-4">
          Buy / Sell
        </div>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="fixed bottom-0 top-0 right-0 outline-none w-96">
          <SwapComponent
            selectedNetwrok={
              swapNetworks.find((item) => item.id === selectedChain.id)?.chainId
            }
            fromTokenContractAddress={fromTokenContractAddress}
            toTokenContractAddress={handleToToken()}
          />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

export default SwapDrawer;
