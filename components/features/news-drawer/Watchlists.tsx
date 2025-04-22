import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Watchlist } from "../dashboard/dashboard/components/dashboard-watchlist";
import { useWatchlistStore } from "@/store";
import { IWatchlistItem } from "@/store/watchlist";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { minifyContract, minifyTokenName } from "@/utils/truncate";
import Divider from "@/components/common/Divider";

function Watchlists() {
  const { watchlist, removeFromWatchlist } = useWatchlistStore();

  const handleStarClick = (wallet: {
    name: string;
    contractAddress: string;
    type: "token";
  }) => {
    removeFromWatchlist(wallet.contractAddress);
  };

  return (
    <AccordionItem className="my-2 border-0" value={"Watchlist"}>
      <AccordionTrigger
        isPlusMinus={false}
        className="bg-secondary text-left rounded-md transition-colors h-[32px] pl-4 text-muted-foreground"
      >
        Watchlist
      </AccordionTrigger>
      <AccordionContent className="px-4 py-4 flex flex-col text-left">
        <h5>Wallets</h5>
        <p className="text-muted-foreground text-xs">Your Favorite Wallets</p>
        {watchlist
          .filter((item: IWatchlistItem) => item.type === "wallet")
          .map((wallet) => (
            <div className="my-2" key={wallet.contractAddress}>
              <Link
                href={`/${wallet.type}/${wallet.contractAddress}`}
                key={wallet.contractAddress}
                className="flex items-center"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {wallet.contractAddress?.substring(0, 2) || "NA"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {wallet.name ? minifyTokenName(wallet.name) : "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {wallet.contractAddress
                      ? minifyContract(wallet.contractAddress)
                      : "No URL provided"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        <Divider />
        <h5>Tokens</h5>
        <p className="text-muted-foreground text-xs">Your Favorite Tokens</p>
        {watchlist
          .filter((item: IWatchlistItem) => item.type === "token")
          .map((token) => (
            <div className="my-2" key={token.contractAddress}>
              <Link
                href={`/${token.type}/${token.contractAddress}`}
                key={token.contractAddress}
                className="flex items-center"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={token.image}
                    alt={token.contractAddress || "N/A"}
                  />
                  <AvatarFallback>
                    {token.contractAddress?.substring(0, 2) || "NA"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {token.name ? minifyTokenName(token.name) : "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {token.contractAddress
                      ? minifyContract(token.contractAddress)
                      : "No URL provided"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export default Watchlists;
