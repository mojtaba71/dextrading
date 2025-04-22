import { AxiosRequestConfig } from "axios";

export interface PostEndpoint {
  data: IPost[];
  count: number;
  pageSize: number;
  pageNo: number;
  totalPages?: string;
  //FIXME: add total pages to backend
}

export interface IPost {
  id: number;
  slug: string;
  metaTitle?: string;
  title: string;
  metaDescription?: string;
  summary: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  img: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  focusKeyword?: string;
  tags: string[];
  isPublic: boolean;
  author: string;
  content: string;
  toc: string;
}

export interface PostsQuery {
  pageSize?: number;
  pageNo?: number;
  sortField?: string;
  sortOrder?: string;
  filterByTrending?: string;
}

export interface PostsQueryConfig extends AxiosRequestConfig {
  params?: PostsQuery;
}
