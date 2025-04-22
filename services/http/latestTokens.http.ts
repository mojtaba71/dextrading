import { AxiosRequestConfig } from "axios";
import { fetchData } from "./axios.config";
import { ILatestToken } from "@/types/latestToke.type";

export const getLatestTokens = (
  network: string,
  options?: AxiosRequestConfig
): Promise<ILatestToken> =>
  fetchData<ILatestToken>(
    // FIXME: network/chain must be sent as a query param to the backend. Backend must fix this
    `${process.env.NEXT_PUBLIC_BASE_URL_THREE}/processedData/latesttime/${network}`,
    options
  );
