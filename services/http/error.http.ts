import { AxiosRequestConfig } from "axios";
import { fetchData } from "./axios.config";
import { ImageEndpoint, ImageType } from "@/types/Image.type";

export const postError = (
  options?: AxiosRequestConfig
): Promise<ImageEndpoint> =>
  fetchData<ImageEndpoint>(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/error`,
    options
  );