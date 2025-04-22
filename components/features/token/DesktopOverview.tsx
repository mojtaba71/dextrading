import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { minifyContract, minifyTokenName } from "@/utils/truncate";
import React, { useEffect, useState } from "react";
import SocialMedia from "./social-media";
import ShareToken from "@/components/ui/share-screenshot/ShareToken";
import { KeyValue } from "@/components/ui/key-value";
import { RiLoader5Line } from "react-icons/ri";
import { formatCash } from "@/utils/numbers";
import { HolderInterest } from "./token-overview";
import SwapDrawer from "./SwapDrawer";
import Renounce from "./Renounce";
import TransactionStats from "./TransactionStats";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import TokenPrice from "./TokenPrice";
import TokenBuySellTaxes from "./TokenBuySellTaxes";
import dayjs from "dayjs";
import { TokenOverview } from "@/types/token.type";
import { useWatchlistStore } from "@/store";
import Copy from "@/components/ui/copy";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

function DesktopOverview({
  tokenOverview,
}: {
  tokenOverview: TokenOverview & {
    tokenAddress: string;
    tokenLoading: boolean;
    tokenError: Error | null;
  };
}) {
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlistStore();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const volumeUSD =
    tokenOverview.token.data &&
    tokenOverview.token.data.length > 0 &&
    tokenOverview.token.data[0].attributes?.volume_usd &&
    tokenOverview.token.data[0].attributes.volume_usd["h24"];

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(tokenOverview.tokenAddress);
    } else {
      if (
        tokenOverview.token.data &&
        tokenOverview.token.data.length > 0 &&
        tokenOverview.token.data[0]?.attributes?.name
      )
        addToWatchlist({
          name: tokenOverview.token.data[0].attributes.name,
          contractAddress: tokenOverview.tokenAddress,
          type: "token",
        });
    }
    setIsInWatchlist(!isInWatchlist);
  };

  useEffect(() => {
    const inWatchlist = watchlist.some(
      (w) => w.contractAddress === tokenOverview.tokenAddress
    );
    setIsInWatchlist(inWatchlist);
  }, [watchlist, tokenOverview.tokenAddress]);

  return (
    <ErrorBoundary>
      <div className="hidden md:flex pt-6 flex-col sm:flex-wrap lg:flex-nowrap md:flex-row items-start lg:items-stretch justify-between h-full">
        {/* LEFT SIDE */}
        <div className="left flex flex-col gap-5">
          <div className="top flex flex-row items-center md:items-center justify-start gap-5">
            <Avatar className="w-10 h-10 rounded-full md:h-10 md:w-10">
              {tokenOverview.logoLoading ? (
                <AvatarFallback>Loading...</AvatarFallback>
              ) : tokenOverview.logoError ? (
                <AvatarFallback>Error</AvatarFallback>
              ) : (
                <AvatarImage
                  src={
                    tokenOverview.logo ?? tokenOverview.alternateLogo?.imageUrl
                  }
                  alt={tokenOverview.altText}
                />
              )}
              <AvatarFallback>
                {tokenOverview.token?.data?.[0]?.attributes?.name?.charAt(0) ||
                  "N/A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col sm:flex-row md:items-start items-center justify-center gap-0 lg:gap-6">
              {tokenOverview.token?.data?.[0]?.attributes?.name != undefined &&
              tokenOverview.token?.data[0]?.id != undefined ? (
                <>
                  <div className="flex flex-row  items-center justify-start gap-2">
                    <div className="flex items-center flex-wrap">
                      <h1 className="font-bold text-lg xl:text-3xl m-0 p-0 mr-2">
                        {minifyTokenName(
                          tokenOverview.token!.data![0].attributes!.name.split(
                            "/"
                          )[0]
                        )}
                      </h1>
                      <h2 className="text-sm m-0 p-0 font-light">
                        {minifyTokenName(
                          tokenOverview.token!.data![0].attributes!.name
                        )}
                      </h2>
                    </div>
                    <div
                      className="cursor-pointer flex items-center justify-center"
                      onClick={handleWatchlistToggle}
                    >
                      <div className="bg-accent p-1 rounded-md mr-2 w-[26px] h-[26px] flex items-center justify-center">
                        {isInWatchlist ? (
                          <AiFillStar size={20} />
                        ) : (
                          <AiOutlineStar size={20} />
                        )}
                      </div>
                      <SocialMedia token={tokenOverview.token} />

                      <ShareToken
                        token={tokenOverview.token}
                        logo={tokenOverview.logo}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <p>No token name :</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start gap-1 text-xs flex-wrap">
            <div className="flex items-center mr-2 border border-border rounded-xl p-2">
              <div className="flex items-center justify-start gap-1 mr-4">
                <KeyValue
                  title="chain"
                  value={
                    tokenOverview.token?.data?.[0]?.id?.split("_")[0] || "N/A"
                  }
                  className="text-xs "
                  itemIconUrl={tokenOverview.token?.data?.[0]?.logo_url}
                  iconWidth={32}
                  variant={"dark"}
                />
              </div>

              {tokenOverview.token.data &&
                tokenOverview.token.data[0] &&
                tokenOverview.token.data[0].relationships?.base_token?.data
                  ?.id != undefined && (
                  <Copy
                    className="text-blue-400"
                    value={
                      tokenOverview.token.data[0].relationships?.base_token?.data?.id?.split(
                        "_"
                      )[1] || ""
                    }
                    text={minifyContract(
                      tokenOverview.token.data[0].relationships?.base_token?.data?.id?.split(
                        "_"
                      )[1]
                    )}
                  />
                )}
            </div>
            {tokenOverview.tokenLoading ? (
              <div className="w-5 h-5">
                <RiLoader5Line className="animate-spin text-4xl" />
              </div>
            ) : tokenOverview.tokenError ? (
              <div>Error fetching data</div>
            ) : (
              <div className="flex lg:flex-row flex-col gap-2">
                <TokenBuySellTaxes token={tokenOverview.token} />
              </div>
            )}
          </div>
          <div className="right flex sm:flex-row sm:items-center items-start flex-col gap-2 lg:gap-6 !text-xs ">
            {tokenOverview.token.data != undefined &&
              tokenOverview.token.data[0]?.attributes?.pool_created_at !=
                undefined && (
                <KeyValue
                  title="Age"
                  value={dayjs(
                    tokenOverview.token.data[0].attributes?.pool_created_at
                  ).fromNow()}
                  variant={"dark"}
                  className="text-sm "
                />
              )}
            {volumeUSD && (
              <div className="h-full mx-auto rounded-md text-sm w-full flex justify-start items-center">
                <span className="text-start dark:text-white whitespace-nowrap">
                  Volume: $ {formatCash(+parseFloat(volumeUSD).toFixed(2))}
                </span>
              </div>
            )}
            <HolderInterest token={tokenOverview.token} />
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex lg:flex-row flex-col md:items-start justify-start items-center sm:justify-between  gap-2 lg:gap-6">
          <div className="">
            {<TokenPrice token={tokenOverview.token} />}

            <SwapDrawer
              fromTokenContractAddress={tokenOverview.tokenAddress}
              toTokenContractAddress={
                "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
              }
            />
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex flex-col sm:w-full sm:flex-row justify-between lg:flex-col md:items-center lg:w-fit md:mt-3 xl:mt-0 xl:w-fit xl:flex-col xl:items-center lg:justify-between">
          <div className="flex items-end justify-between">
            {tokenOverview.token.FunctionCallsData && (
              <Renounce
                active={
                  tokenOverview.token.FunctionCallsData?.renounceOwnership
                    ?.status === "renounced"
                }
                text={
                  tokenOverview.token.FunctionCallsData?.renounceOwnership?.Date
                    ? `Contract was Renounced at ${tokenOverview.token.FunctionCallsData?.renounceOwnership?.Date}`
                    : `Contract is not Renounced`
                }
                status={tokenOverview.token?.ScoreData?.status || ""}
              />
            )}
          </div>
          <div className="mt-auto">
            {tokenOverview.token?.data &&
            tokenOverview.token?.data.length > 0 ? (
              <TransactionStats token={tokenOverview.token} />
            ) : (
              <p>Data is not available :(</p>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default DesktopOverview;
