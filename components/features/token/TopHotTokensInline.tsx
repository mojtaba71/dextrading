"use client";
import { getTopTrends } from "@/services/http/token.http";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarPlaceholder } from "@/components/ui/avatar";
import Link from "next/link";
import { minifyTokenName } from "@/utils/truncate";
import {
  Carousel,
  CarouselContent,
  DefaultCarouselItem,
} from "@/components/ui/carousel";
// import { getImageUrl } from "@/lib/utils";
import { getImages } from "@/services/http/image.http";
import { imageUrl } from "@/utils/imageUrl";
import useNetworkSelector from "@/store/tokenChains/networks";
import { tokenRoute } from "@/utils/routeGenerator";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopHotTokensInline() {
  const { selectedChain } = useNetworkSelector();
  const [searchValue, setSearchValue] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 100000000,
  ]);
  const [volumeRange, setVolumeRange] = useState<[number, number]>([
    0, 100000000000,
  ]);
  const [liquidityRange, setLiquidityRange] = useState<[number, number]>([
    0, 100000000000,
  ]);
  const [priceChange24hRange, setPriceChange24hRange] = useState<
    [number, number]
  >([-100, 1000000000]);
  const [sortBy, setSortBy] = useState<string>("price_change_percentage.h24");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: tokenData, isLoading } = useQuery({
    queryKey: ["topTokens", selectedChain.id],
    queryFn: () =>
      getTopTrends({
        params: {
          network: selectedChain.id,
          page: 1,
          limit: 10,
          base_token_price_usdMin: priceRange[0],
          base_token_price_usdMax: priceRange[1],
          "volume_usd.h24Min": volumeRange[0],
          "volume_usd.h24Max": volumeRange[1],
          reserve_in_usdMin: liquidityRange[0],
          reserve_in_usdMax: liquidityRange[1],
          pool_created_atFrom: "2018-08-14T22:19:11Z",
          pool_created_atTill: "2024-08-14T22:19:11Z",
          "price_change_percentage.h24Min": priceChange24hRange[0],
          "price_change_percentage.h24Max": priceChange24hRange[1],
          search: searchValue,
          sortBy,
          sortOrder,
        },
      }),
  });

  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: () => getImages().then((data) => data.imageUrls),
  });

  if (isLoading) {
    return <Skeleton className="min-h-12 w-full">
    </Skeleton>
  }

  return (
    <Carousel className="cursor-grab select-none w-full flex flex-row items-center overflow-x-scroll flex-nowrap gap-4 relative min-h-16">
      <div className="w-full bg-accent rounded-md overflow-auto">
        <CarouselContent className="flex items-center gap-1 px-2">
          {tokenData?.data?.length &&
            tokenData.data?.map((token, index) => (
              <DefaultCarouselItem className="w-auto pl-2" key={index}>
                <div className="flex items-center gap-3 p-2 rounded-lg text-nowrap">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src={imageUrl(
                            token.relationships?.base_token?.data?.id?.split(
                              "_"
                            )[1] || "",
                            images ?? []
                          )}
                          alt={`${token.attributes?.name} token image`}
                        />
                        <AvatarPlaceholder />
                      </Avatar>
                      <div className="min-w-fit ">
                        <Link
                          href={tokenRoute(token.relationships?.base_token?.data?.id?.split(
                            "_"
                          )[1] || "", selectedChain.id.toLowerCase())}
                          className="text-xs"
                        >
                          {minifyTokenName(token.attributes?.name)}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {ChangePrice({
                      change: Math.floor(
                        parseFloat(
                          token.attributes?.price_change_percentage?.h24 || "0"
                        )
                      ),
                    })}
                  </div>
                </div>
              </DefaultCarouselItem>
            ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}

function ChangePrice({ change }: { change: number }) {
  return (
    <div
      className={`text-center ${change > 0 ? "text-success" : "text-red-400"}`}
    >
      {change}%
    </div>
  );
}
