import axios, { AxiosRequestConfig } from "axios";
import { fetchData } from "./axios.config";
import { ImageEndpoint, ImageType } from "@/types/Image.type";
import { headers } from "next/headers";

export const getImages = (
  options?: AxiosRequestConfig
): Promise<ImageEndpoint> =>
  fetchData<ImageEndpoint>(
    `${process.env.NEXT_PUBLIC_BASE_URL_TWO}/images`,
    options
  );

export const getLogo = (
  tokenAddress: string,
  network?: string,
  options?: AxiosRequestConfig
): Promise<ImageType> =>
  fetchData<ImageType>(
    `${process.env.NEXT_PUBLIC_BASE_URL_TWO}/${tokenAddress}/logo/${network}`,
    options
  );
export const snapshotImage = (token: string, image: any): Promise<ImageType> =>
  axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_TWO}/snapshot`, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
