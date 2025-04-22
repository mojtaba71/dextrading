import { AxiosResponse } from "axios";

export interface req {
  params?: params;
}

export interface params {
  [key: string]: string;
}

// export type res<T> = Promise<AxiosResponse<T>>;
