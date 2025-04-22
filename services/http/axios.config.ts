import { log, logError } from "@/utils/logger";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async <T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  const maxRetries = 10;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await axiosInstance.get<T>(url, options);
      if (response.data && (response.data as any).error === 'server busy') {
        throw new Error('server busy');
      }
      return response.data;
    } catch (error: any) {
      attempts++;
      logError(`API call failed on attempt ${attempts}:`, error.message);
      logError("Error Url is:", url);

      if (attempts >= maxRetries) {
        throw new Error('Maximum retries exceeded');
      }

      await delay(2000 * attempts); // Exponential backoff
    }
  }

  throw new Error('Maximum retries exceeded');
};

export const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    log(
      `Sending request to ${config.url} with method ${config.method} and data:`,
      config.data
    );
    return config;
  },
  (error) => {
    logError("Failed to make request:", error.config);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    log(
      `Received response from ${response.config.url} with status ${response.status}:`,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      logError(
        `Request to ${error.response.config.url} failed with status ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      logError("No response received:", error.request);
    } else {
      logError("Error setting up request:", error.message);
    }

    if (error.code !== "ERR_CANCELED") {
      logError("Unhandled error:", error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
