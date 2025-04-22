import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLatestSwaps } from "@/services/http/news-drawer.http";
import { COLORS_CLASS } from "@/utils/colors";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineSwap } from "react-icons/ai";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "wagmi";
import ConnectWallet from "../connect-wallet/ConnectWallet";
import { Button } from "@/components/ui/button";
import useNetworkSelector from "@/store/tokenChains/networks";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";
dayjs.extend(utc);

function LatestSwaps() {
  const { connected: phantomConnected, publicKey } = useWallet();
  const { isConnected: connectWalletConnected, address } = useAccount();
  const { selectedChain } = useNetworkSelector();

  const { data } = useQuery({
    queryKey: ["news-latestswaps"],
    queryFn: () =>
      getLatestSwaps(
        phantomConnected
          ? publicKey?.toString() ?? ""
          : connectWalletConnected
          ? address ?? ""
          : "",
        selectedChain.id
      ),
    enabled: phantomConnected || connectWalletConnected,
  });

  return (
    <ErrorBoundary>
      <AccordionItem className="my-2 border-0" value={"Latest Swaps"}>
        <AccordionTrigger
          isPlusMinus={false}
          className="bg-secondary text-left rounded-md transition-colors h-[32px] pl-4 text-muted-foreground"
        >
          Trading Activities
        </AccordionTrigger>
        <AccordionContent className="px-4 py-8 flex flex-col gap-2 text-left">
          {connectWalletConnected || phantomConnected ? (
            <>
              {data?.data.data.swapsResponse.length > 0 ? (
                <>
                  {data?.data.data.swapsResponse.map((swap: any) => (
                    <div
                      className="flex items-center gap-3 border-b py-2 border-border"
                      key={swap.description.hash}
                    >
                      <div className="flex items-center">
                        <Avatar className="rounded-full w-[24px] h-[24px]">
                          <AvatarImage
                            src={swap.description?.sentTokenImageUrl}
                            alt={`sent ${swap.description?.sentTokenName}`}
                          />
                          <AvatarFallback>
                            {swap.description?.sentTokenName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="rounded-full w-[24px] h-[24px] relative -left-3">
                          <AvatarImage
                            src={swap.description?.receivedTokenImageUrl}
                            alt={`recieved ${swap.description?.receivedTokenName}`}
                          />
                          <AvatarFallback>
                            {swap.description?.receivedTokenName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <p className="text-muted-foreground">
                            {swap.description.sentAmount.toFixed(4)}
                          </p>
                          <p>{swap.description?.sentTokenName}</p>
                          <AiOutlineSwap
                            className={`text-xl ${
                              swap.type === "sell swap"
                                ? COLORS_CLASS.RED
                                : COLORS_CLASS.GREEN
                            }`}
                          />

                          <p className="text-muted-foreground">
                            {swap.description.receivedAmount.toFixed(4)}
                          </p>
                          <p>{swap.description?.receivedTokenName}</p>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {dayjs.utc(swap.description.timestamp).fromNow()}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>No Data Found!</>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-xs">
                Log in to view your wallet&apos;s activity.
              </p>
              <ConnectWallet opened={true}>
                <Button variant={"secondary"} className="bg-accent w-fit">
                  Connect
                </Button>
              </ConnectWallet>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </ErrorBoundary>
  );
}

export default LatestSwaps;
