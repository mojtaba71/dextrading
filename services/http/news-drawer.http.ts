import { fetchData } from "./axios.config";
import { NewsDrawer } from "@/types/news-drawer.type";
import axios from "axios";

export const getArticles = async (): Promise<NewsDrawer[]> => {
  const response = await axios.get<{ data: NewsDrawer[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/api/articles`
  );
  return response.data.data;
};

export const getPosts = async (): Promise<NewsDrawer[]> => {
  const response = await axios.get<{ data: NewsDrawer[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_FIVE}/api/posts`
  );
  return response.data.data;
};


export const getLatestSwaps = async (walletAddress: string, network: string) => {
  const response = await axios.get(
    `https://hello.dextrading.com/api/combined-data?address=${walletAddress}&network=${network}`
  );
  return response;
};