"use client";

import React, { Fragment, useEffect } from "react";

import TopHotTokensInline from "./TopHotTokensInline";
import TokenDetail from "./token-detail";
import { IToken } from "@/types/token.type";
import MobileNavigator from "./MobileNavigator";
import dynamic from "next/dist/shared/lib/dynamic";
import { TOKEN_PAGE_PARAMS } from "@/utils/pageParams";
import useNetworkSelector from "@/store/tokenChains/networks";
import TokenOverview from "./token-overview";

// const TokenOverview = dynamic(() => import("./token-overview"), {
//   ssr: false,
// });

interface Props {
  params: IParam;
  searchParams?: searchParams;
  token: IToken;
}

type IParam = {
  params: [string, string];
};

type searchParams = {
  network: string;
};

const TokenPage = ({ params, token }: Props) => {
  const { setSelectedChain, availableChains } = useNetworkSelector();

  useEffect(() => {
    if (params.params[TOKEN_PAGE_PARAMS.NETWORK]) {
      const urlNetwwork = availableChains.find(
        (chain) => chain.id === params.params[TOKEN_PAGE_PARAMS.NETWORK]
      );

      if (urlNetwwork) setSelectedChain(urlNetwwork);
    }
  }, [availableChains, params.params, setSelectedChain]);

  return (
    <Fragment>
      <div className="hidden md:flex flex-col gap-6 items-center justify-center w-full">
        <TokenOverview
          token={token}
          tokenAddress={params.params[TOKEN_PAGE_PARAMS.CONTRACT_ADDRESS]}
          network={params.params[TOKEN_PAGE_PARAMS.NETWORK]}
        />
        <TopHotTokensInline />

        <TokenDetail
          token={token}
          tokenAddress={params.params[TOKEN_PAGE_PARAMS.CONTRACT_ADDRESS]}
          network={params.params[TOKEN_PAGE_PARAMS.NETWORK]}
        />
      </div>
      <div className="flex md:hidden">
        <MobileNavigator
          token={token}
          tokenAddress={params.params[TOKEN_PAGE_PARAMS.CONTRACT_ADDRESS]}
          network={params.params[TOKEN_PAGE_PARAMS.NETWORK]}
        />
      </div>
    </Fragment>
  );
};

export default TokenPage;
