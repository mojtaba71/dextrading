"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TokenOverview } from "@/types/token.type";
import PriceFormatter from "@/utils/PriceFormatter";
import { minifyTokenName } from "@/utils/truncate";
import React, { memo } from "react";
import { RiLoader5Line } from "react-icons/ri";

function TokenActiveHeaderContent({
  tokenOverview,
}: {
  tokenOverview: TokenOverview;
}) {
  return (
    <div className="left flex items-start justify-start gap-4">
      <div className="top flex flex-row  items-center justify-start gap-4">
        <Avatar className="h-10 w-10">
          {tokenOverview.logoLoading ? (
            <AvatarFallback>
              <RiLoader5Line className="animate-spin text-4xl" />
            </AvatarFallback>
          ) : tokenOverview.logoError ? (
            <AvatarFallback>Error</AvatarFallback>
          ) : (
            <AvatarImage
              src={tokenOverview.logo ?? tokenOverview.alternateLogo?.imageUrl}
              alt={tokenOverview.altText}
            />
          )}
          <AvatarFallback>
            {tokenOverview.token?.data?.[0]?.attributes?.name?.charAt(0) ||
              "N/A"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-xs items-start justify-center gap-1 ">
          {tokenOverview.token?.data?.[0]?.attributes?.name != undefined &&
            tokenOverview.token?.data[0]?.id != undefined && (
              <div className="flex items-center justify-start gap-2">
                <h2 className="m-0 p-0 font-light">
                  {minifyTokenName(
                    tokenOverview.token!.data![0].attributes!.name
                  )}
                </h2>
              </div>
            )}
          {tokenOverview.token?.data?.[0]?.attributes?.base_token_price_usd !=
            undefined && (
            <div className="flex ">
              <PriceFormatter
                dollarSign
                value={
                  tokenOverview.token!.data![0].attributes!
                    .base_token_price_usd!
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(TokenActiveHeaderContent);
