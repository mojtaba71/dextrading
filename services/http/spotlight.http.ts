import { AxiosRequestConfig } from "axios";
import { fetchData } from "./axios.config";
import { SpotlightSearchType } from "@/types/spotlight.type";

export const spotlightSearch = (
  options: AxiosRequestConfig
): Promise<SpotlightSearchType> =>
  fetchData<SpotlightSearchType>(
    `${process.env.NEXT_PUBLIC_BASE_URL_ONE}/search`,
    options
  );
