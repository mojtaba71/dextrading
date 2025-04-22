import React from "react";
import Chart from "./chart";
import { IToken } from "@/types/token.type";
import Tradingview from "./Tradingview";
import TradeReport from "@/components/features/token/trade-report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

interface Props {
  token: IToken;
  network: string;
  tokenAddress: string;
}

export default function TokenSummary({ token, tokenAddress, network }: Props) {
  return (
    <ErrorBoundary>
      <div className="flex flex-col items-start justify-center gap-4">
        <Tabs defaultValue="dexChart" className="w-full">
          <TabsList>
            <TabsTrigger value="dexChart">DEX</TabsTrigger>
            <TabsTrigger value="cexChart">CEX</TabsTrigger>
          </TabsList>
          <TabsContent value="dexChart">
            <ErrorBoundary>
              <div className="w-full">
                {token!.data![0]?.id?.split("_")[1] != undefined &&
                token!.data![0]?.relationships?.dex?.data?.type &&
                token!.data![0]?.relationships?.dex?.data?.id ? (
                  <Chart
                    className="h-[600px]"
                    tokenAddress={token!.data![0]?.id!.split("_")[1]}
                    tokenDescription={
                      token!.data![0].attributes!.name + " Dextrading.com"
                    }
                    tokenExchange={token!.data![0].relationships.dex.data.id}
                    network={network}
                  />
                ) : (
                  <h3>Not Listed on DEX yet</h3>
                )}
              </div>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="cexChart">
            <ErrorBoundary>
              {token?.TickersData?.cex !== undefined &&
              token?.TickersData?.cex?.length > 0 &&
              token?.TickersData?.cex[0]?.market?.name !== undefined ? (
                <div
                  id="tradingviewcontainer"
                  className="my-6 md:my-7 w-full h-[600px] rounded-lg overflow-hidden"
                >
                  <Tradingview
                    symbol={`${token.TickersData.cex[0].market.name}:${token.TickersData.cex[0].base}${token.TickersData.cex[0].target}`}
                  />
                </div>
              ) : (
                <div className="h-[400px] flex items-center justify-center">
                  <h3 className="text-center ">Not Listed on CEX yet</h3>
                </div>
              )}
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
        {/* {token?.TickersData?.cex !== undefined &&
                token?.TickersData?.cex?.length > 0 &&
                token?.TickersData?.cex[0]?.market?.name !== undefined ? (
                <div id="tradingviewcontainer" className="my-6 md:my-7 w-full h-[600px] rounded-lg overflow-hidden">
                    <Tradingview
                        symbol={`${token.TickersData.cex[0].market.name}:${token.TickersData.cex[0].base}${token.TickersData.cex[0].target}`}
                    />
                </div>
            ) : (
                <div className='w-full'>
                    {token!.data![0]?.id?.split("_")[1] != undefined &&
                        token!.data![0]?.relationships?.dex?.data?.type &&
                        token!.data![0]?.relationships?.dex?.data?.id &&
                        (
                            <Chart className="h-[600px]" tokenAddress={token!.data![0]?.id!.split("_")[1]} tokenDescription={token!.data![0].attributes!.name + ' Dextrading.com'} tokenExchange={token!.data![0].relationships.dex.data.id} network={network} />
                        )}
                </div>
            )} */}
        {token.data && token.data[0]?.attributes?.name != undefined && (
          <TradeReport
            tokenAddress={token!.data![0]?.id!.split("_")[1]}
            tokenAddress2={tokenAddress}
            tokenName={token!.data![0].attributes!.name}
            network={network}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
