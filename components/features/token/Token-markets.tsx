import React from "react";
import Renounce from "./Renounce";
import CentralizedExchange from "./CentralizedExchange";
import DecentralizedExchange from "./DecentralizedExchange";
import { IToken } from "@/types/token.type";
import { Progress } from "@/components/ui/progress";
import TokenSecurityBox from "./TokenSecurity-old-shit/TokenSecurityBox";
import TokenSecurityCallActivity from "./TokenSecurity-old-shit/TokenSecurityCallActivity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewExchangeTable from "./NewExchangeTable";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

interface Props {
  token: IToken;
  tokenAddress: string;
}

export default function TokenMarkets({ token, tokenAddress }: Props) {
  return (
    <div className="flex flex-col items-start justify-center gap-10">
      <Tabs defaultValue="dex" className="w-full">
        <TabsList>
          <TabsTrigger value="dex">DEX</TabsTrigger>
          <TabsTrigger value="cex">CEX</TabsTrigger>
        </TabsList>
        <TabsContent value="dex">
          <ErrorBoundary>
            {token.TickersData?.dex && (
              <NewExchangeTable initTokenData={token.TickersData?.dex} />
            )}
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="cex">
          <ErrorBoundary>
            {token.TickersData?.cex && (
              <NewExchangeTable
                initTokenData={token.TickersData?.cex}
                type="CEX"
              />
            )}
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  );
}
