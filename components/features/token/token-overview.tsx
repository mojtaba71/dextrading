"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IToken } from "@/types/token.type";
import dayjs from "dayjs";
import { KeyValue } from "@/components/ui/key-value";
import { useLoadingStore, useWatchlistStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getLogo } from "@/services/http/image.http";
import { getToken, searchToken } from "@/services/http/token.http";
import { merge } from "@/utils/merger";
import { FiAlertTriangle } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import TokenActiveHeaderContent from "./TokenActiveHeaderContent";
import DesktopOverview from "./DesktopOverview";
import MobileTokenOverview from "./MobileTokenOverview";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const ActiveHeader = dynamic(() => import("../header/active-header"), {
  ssr: false,
});


interface Props {
  tokenAddress: string;
  token: IToken;
  network: string;
}

export default function TokenOverview({
  token: tokenDataFromServer,
  tokenAddress,
  network,
}: Props) {
  const { data: alternateLogo } = useQuery({
    queryKey: ["logo", tokenAddress, network],
    queryFn: () => getLogo(tokenAddress, network),
    enabled: !!tokenAddress && !!network,
  });
  const {
    data: logo,
    isLoading: logoLoading,
    error: logoError,
  } = useQuery({
    queryKey: ["logo url", tokenAddress, network],
    queryFn: () => searchToken({ params: { currencyAddress: tokenAddress } }),
    select: (data) => data.data?.[0]?.imageUrl2,
  });
  //get token
  const {
    data: tokenData,
    isLoading: tokenLoading,
    error: tokenError,
  } = useQuery({
    queryKey: ["token", tokenAddress, network],
    queryFn: () => getToken(tokenAddress, { params: { network } }),
    enabled: !!tokenAddress && !!network,
  });
  const token = merge(tokenDataFromServer, tokenData) as IToken;

  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlistStore();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const setLoading = useLoadingStore((state) => state.setLoading);

  // Extract token attributes
  const tokenName = token?.data?.[0]?.attributes?.name || "Unknown Token";

  // Format the price with 10 decimals
  const priceValue = token?.data?.[0]?.attributes?.base_token_price_usd;
  const price = priceValue ? Number(priceValue).toFixed(10) : "N/A";

  // Format liquidity (reserve in USD) to 2 decimals
  const liquidityValue = token?.data?.[0]?.attributes?.reserve_in_usd;
  const liquidity = liquidityValue ? Number(liquidityValue).toFixed(2) : "N/A";

  // Format the creation date using dayjs
  const createdAt = token?.data?.[0]?.attributes?.pool_created_at
    ? dayjs(token.data[0].attributes.pool_created_at).format("YYYY-MM-DD")
    : "N/A";

  // Format the 24hr price change to 2 decimals and append a percentage sign
  const priceChangeValue =
    token?.data?.[0]?.attributes?.price_change_percentage?.h24;
  const priceChange = priceChangeValue
    ? Number(priceChangeValue).toFixed(2) + "%"
    : "N/A";

  // Get the base token id and split into network and address
  const baseTokenId =
    token?.data?.[0]?.relationships?.base_token?.data?.id || "N/A";
  const [bnetwork, baseTokenAddress] =
    baseTokenId !== "N/A" ? baseTokenId.split("_") : ["N/A", "N/A"];

  // Get the listed exchange id from relationships.dex.data.id
  const listedExchange =
    token?.data?.[0]?.relationships?.dex?.data?.id || "N/A";

  // Build the alt text as a natural sentence
  const altText = `${tokenName} is now live, trading at a price of $${price} with liquidity of $${liquidity}. Launched on ${createdAt}, it has seen a 24-hour change of ${priceChange}. Operating on the ${bnetwork} network with base token address ${baseTokenAddress} and listed on ${listedExchange}, this token offers live chart tracking, real-time predictions, and secure trading on our DEX.`;

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  if (tokenLoading) {
    return <Skeleton className="h-[234px] w-full"></Skeleton>;
  }

  return (
    <div
      id="token-capture"
      className="flex flex-col items-stretch justify-stretch lg:flex-row gap-4 w-full relative"
    >
      <div className="absolute top-1 right-1">
        {token.ScoreData?.details != undefined && (
          <div className="bg-yellow-50 md:py-2  py-1 px-3 rounded-lg">
            <h3 className="text-xs text-yellow-600 flex flex-row gap-2 items-center">
              <FiAlertTriangle size={18} /> {token.ScoreData?.details}
            </h3>
          </div>
        )}
      </div>

      <ActiveHeader
        content={
          <TokenActiveHeaderContent
            tokenOverview={{
              token,
              altText,
              logo,
              logoError,
              logoLoading,
              alternateLogo,
            }}
          />
        }
      />
      <Card className="w-full flex-1">
        <CardContent className="relative p-1 md:p-6">
          <DesktopOverview
            tokenOverview={{
              token,
              altText,
              logo,
              logoError,
              logoLoading,
              alternateLogo,
              tokenAddress,
              tokenError,
              tokenLoading,
            }}
          />
          <MobileTokenOverview
            tokenOverview={{
              token,
              altText,
              logo,
              logoError,
              logoLoading,
              alternateLogo,
              tokenAddress,
              tokenError,
              tokenLoading,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function PriceChange({ token }: { token: IToken }) {
  const raising =
    +token!.data![0].attributes!.price_change_percentage!.h24! > 0;

  return token?.data &&
    token?.data[0]?.attributes?.price_change_percentage?.h24 != undefined ? (
    <div className="text-xs md:text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">24h</span>
        <span
          className={`text-muted-foreground flex items-center g-2 ${
            raising ? "text-success" : "text-error"
          }`}
        >
          {raising ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          {`${token!.data![0].attributes!.price_change_percentage!.h24!}%`}
        </span>
      </div>
    </div>
  ) : (
    <p>No 24hr change data</p>
  );
}

export function HolderInterest({ token }: { token: IToken }) {
  return token?.BalancesData?.numberOfAddresses != undefined ? (
    <KeyValue
      title="Holder interest"
      value={token?.BalancesData?.numberOfAddresses}
      variant={token!.BalancesData!.numberOfAddresses! > 10 ? "good" : "bad"}
    />
  ) : (
    <KeyValue title="Holder interest" value={0} variant={"bad"} />
  );
}
