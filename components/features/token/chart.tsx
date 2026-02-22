"use client";
import Script from "next/script";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "@/public/static/charting_library";
import { IDatafeed, IOhlcvData } from "@/types/datafeed.type";
import { getDataFeed } from "@/services/http/token.http";
import { useQuery } from "@tanstack/react-query";
import MyTradingView from "./MyTradingView";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const TVChartContainer = dynamic(
  () => import("./TVChartContainer").then((mod) => mod.TVChartContainer),
  { ssr: false }
);

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  interval: "4H" as ResolutionString,
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
  debug: true,
  time_frames: [
    {
      text: "10m",
      resolution: "10" as ResolutionString,
      description: "10 Minutes",
    },
    {
      text: "15m",
      resolution: "15" as ResolutionString,
      description: "15 Minutes",
    },
    {
      text: "30m",
      resolution: "30" as ResolutionString,
      description: "30 Minutes",
    },
    { text: "1H", resolution: "60" as ResolutionString, description: "1 Hour" },
    {
      text: "4H",
      resolution: "240" as ResolutionString,
      description: "4 Hours",
    },
    {
      text: "8H",
      resolution: "480" as ResolutionString,
      description: "8 Hours",
    },
    {
      text: "12H",
      resolution: "720" as ResolutionString,
      description: "12 Hours",
    },
    { text: "D", resolution: "D" as ResolutionString, description: "1 Day" },
    { text: "3D", resolution: "3D" as ResolutionString, description: "3 Day" },
    { text: "W", resolution: "W" as ResolutionString, description: "1 Week" },
  ],
};

interface Props {
  network: string;
  tokenAddress: string;
  className?: string;
  tokenDescription: string;
  tokenExchange: string;
}


export default function Chart({
  tokenAddress,
  network,
  tokenExchange,
  tokenDescription,
  className,
}: Props) {
  const [isScriptReady, setIsScriptReady] = useState(false);

  const fetchData = async (
    timeframe: string,
    aggregate: number
  ): Promise<IDatafeed> => {
    return await getDataFeed({
      params: {
        contractAddress: tokenAddress,
        network: network,
        timeframe,
        aggregate,
      },
    });
  };

  const { data: minuteDatafeed, isSuccess: isMinuteDataSuccess } =
    useQuery<IDatafeed>({
      queryKey: ["ohlcvData", "minute", tokenAddress],
      queryFn: () => fetchData("minute", 5),
    });

  const { data: hourDatafeed, isSuccess: isHourDataSuccess } =
    useQuery<IDatafeed>({
      queryKey: ["ohlcvData", "hour", tokenAddress],
      queryFn: () => fetchData("hour", 1),
    });

  const { data: dayDatafeed, isSuccess: isDayDataSuccess } =
    useQuery<IDatafeed>({
      queryKey: ["ohlcvData", "day", tokenAddress],
      queryFn: () => fetchData("day", 1),
    });

  const getOhlcvData = (data: IDatafeed): IOhlcvData[] => {
    if (!data.data) return [];
    return data.data.attributes.ohlcv_list
      .map((item) => ({
        time: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        volume: item[5],
      }))
      .sort((a, b) => a.time - b.time);
  };


  const minuteData = useMemo(
    () => (isMinuteDataSuccess && minuteDatafeed ? getOhlcvData(minuteDatafeed) : []),
    [minuteDatafeed, isMinuteDataSuccess]
  );
  const hourData = useMemo(
    () => (isHourDataSuccess && hourDatafeed ? getOhlcvData(hourDatafeed) : []),
    [hourDatafeed, isHourDataSuccess]
  );
  const dayData = useMemo(
    () => (isDayDataSuccess && dayDatafeed ? getOhlcvData(dayDatafeed) : []),
    [dayDatafeed, isDayDataSuccess]
  );

  const isSuccess = useMemo(
    () => isMinuteDataSuccess && isHourDataSuccess && isDayDataSuccess,
    [isMinuteDataSuccess, isHourDataSuccess, isDayDataSuccess]
  );

  const { theme } = useTheme();

  return (
    <>
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onLoad={() => console.log("chart script loaded")}
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isSuccess && dayData.length > 0 ? (
        <div className="h-full w-full my-6 md:my-7">
          <MyTradingView
            chartOptions={{
              ...defaultWidgetProps,
              symbol:
                minuteDatafeed!.meta.base.name +
                "/" +
                minuteDatafeed!.meta.quote.symbol,
            }}
            minuteData={minuteData}
            hourData={hourData}
            dayData={dayData}
            theme={theme === "light" ? "light" : "dark"}
            tokenExchange={tokenExchange}
            tokenDescription={tokenDescription}
          />
        </div>
      ) : (
        <Skeleton className="w-full h-[600px]" />
      )}
    </>
  );
}
