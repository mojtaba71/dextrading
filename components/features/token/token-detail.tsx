"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRankingStar } from "react-icons/fa6";
import { MdChecklist } from "react-icons/md";
import { RiExchangeDollarFill } from "react-icons/ri";
import { IToken } from "@/types/token.type";

import TokenSummary from "./TokenSummary";
import { IoShieldHalfOutline } from "react-icons/io5";
import { GrStakeholder } from "react-icons/gr";
import RenderConditionalComponent from "@/components/common/RenderConditionalComponent";
import Paywall from "@/components/common/Paywall";
import TokenSecurityOldShit from "./TokenSecurity-old-shit/TokenSecurity";
import TokenHolders from "./TokenHolders-old-dex/TokenHolders";
import TokenMarkets from "./Token-markets";
import TokenScoring from "./Token-scoring";
import { merge } from "@/utils/merger";
import { getToken } from "@/services/http/token.http copy";
import { useQuery } from "@tanstack/react-query";
import { getTokenDescription } from "@/services/http/token.http";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

interface Props {
  token: IToken;
  network: string;
  tokenAddress: string;
}

export default function TokenDetail({
  token: tokenDataFromServer,
  tokenAddress,
  network,
}: Props) {
  // const { data: tokenDescription } = useQuery({
  //   queryKey: ["token description", tokenAddress, network],
  //   queryFn: () => getTokenDescription(tokenAddress),
  //   enabled: !!tokenAddress && !!network,
  // });
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

  // const [tokenContent, setTokenContent] = useState<any | null>();

  // useEffect(() => {
  //   if (tokenDescription) {
  //     setTokenContent(tokenDescription.data.data);
  //   }
  // }, [tokenDescription]);

  return (
    <>
      <Tabs id="details" defaultValue="summary" className="w-full no-scrollbar">
        <TabsList className="bg-transparent p-0 m-0 w-full overflow-y-scroll flex items-center justify-start">
          <TabsTrigger value="summary">
            <MdChecklist />
            <span className="ml-1">Summary</span>
          </TabsTrigger>
          <TabsTrigger value="markets">
            <RiExchangeDollarFill />
            <span className="ml-1">Markets</span>
          </TabsTrigger>
          <TabsTrigger value="scoring">
            <FaRankingStar />
            <span className="ml-1">Scoring</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <IoShieldHalfOutline />
            <span className="ml-1">Security</span>
          </TabsTrigger>
          <TabsTrigger value="holders">
            <GrStakeholder />
            <span className="ml-1">Holders</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-5 !-px-0 ">
          <TokenSummary
            token={token}
            tokenAddress={tokenAddress}
            network={network}
          />
          {/* <div className="token-content mt-5">
            {tokenDescription && (
              <>
                <div
                  className="token-content-description"
                  dangerouslySetInnerHTML={{ __html: tokenDescription }}
                />
              </>
            )}
          </div> */}
        </TabsContent>
        <TabsContent value="markets" className="mt-5">
          <TokenMarkets token={token} tokenAddress={tokenAddress} />
        </TabsContent>
        <TabsContent value="scoring" className="mt-5">
          <TokenScoring token={token} />
        </TabsContent>
        <TabsContent value="security" className="mt-5">
          {/* FIXME: contract security must be uncommented and updated to replace the old next line */}
          {/* <ContractSecurity token={token} /> */}
          <TokenSecurityOldShit token={token} tokenAddress={tokenAddress} />
        </TabsContent>
        <TabsContent value="holders" className="mt-5">
          <ErrorBoundary>
            <RenderConditionalComponent
              // value={isPaidMember()}
              // FIXME: Fix conditional rendering compoent for promises!!!
              value={true}
              options={{
                trueValueComponent: (
                  <TokenHolders token={token} tokenAddress={tokenAddress} />
                ),
                // falseValueComponent: <Paywall />,
              }}
            />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </>
  );
}
