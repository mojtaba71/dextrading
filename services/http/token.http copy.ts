import { SpotlightSearchType } from "@/types/spotlight.type";
import { IToken } from "@/types/token.type";
import { fetchData } from "./axios.config";
import { AxiosRequestConfig } from "axios";
import { TradeReportType } from "@/types/trade-report.type";
import { IDatafeed } from "@/types/datafeed.type";

export const spotlightSearch = (
  options: AxiosRequestConfig
): Promise<SpotlightSearchType> =>
  fetchData<SpotlightSearchType>(
    `${process.env.NEXT_PUBLIC_BASE_URL_ONE}/search`,
    options
  );

export const searchToken = (options: AxiosRequestConfig): Promise<IToken> =>
  fetchData<IToken>(
    `${process.env.NEXT_PUBLIC_BASE_URL_ONE}/idsearch`,
    options
  );

export const getToken = (
  tokenAddress: string,
  options: AxiosRequestConfig
): Promise<IToken> =>
  fetchData<IToken>(
    `${process.env.NEXT_PUBLIC_BASE_URL_ONE}/token/${tokenAddress}`,
    options
  );

export const getTradeReport = (
  options: AxiosRequestConfig
): Promise<TradeReportType> =>
  fetchData<TradeReportType>(
    `${process.env.NEXT_PUBLIC_BASE_URL_ONE}/tradeReport`,
    options
  );

export const getDataFeed = (
  tokenAddress: string,
  options?: AxiosRequestConfig
): Promise<IDatafeed> =>
  fetchData<IDatafeed>(
    // FIXME: how to handle network in the url below?? backend? front? url param???
    `${process.env.NEXT_PUBLIC_BASE_URL_ONE}/ohlcv?network=base&contractAddress=${tokenAddress}&timeframe=day&aggregate=1`,
    options
  );
