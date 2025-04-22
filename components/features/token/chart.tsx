"use client";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
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

  const mergeData = (
    minuteData: IOhlcvData[],
    hourData: IOhlcvData[],
    dayData: IOhlcvData[]
  ): IOhlcvData[] => {
    const mergedData: IOhlcvData[] = [];
    let i = 0,
      j = 0,
      k = 0;

    while (i < minuteData.length || j < hourData.length || k < dayData.length) {
      const minuteTime = i < minuteData.length ? minuteData[i].time : Infinity;
      const hourTime = j < hourData.length ? hourData[j].time : Infinity;
      const dayTime = k < dayData.length ? dayData[k].time : Infinity;

      const minTime = Math.min(minuteTime, hourTime, dayTime);

      if (
        minuteTime === minTime &&
        hourTime === minTime &&
        dayTime === minTime
      ) {
        mergedData.push(dayData[k]); // Prefer dayData when all match
        i++;
        j++;
        k++;
      } else if (hourTime === minTime && minuteTime === minTime) {
        mergedData.push(hourData[j]); // Prefer hourData over minuteData
        i++;
        j++;
      } else if (dayTime === minTime && hourTime === minTime) {
        mergedData.push(dayData[k]); // Prefer dayData over hourData
        j++;
        k++;
      } else if (dayTime === minTime) {
        mergedData.push(dayData[k]);
        k++;
      } else if (hourTime === minTime) {
        mergedData.push(hourData[j]);
        j++;
      } else if (minuteTime === minTime) {
        mergedData.push(minuteData[i]);
        i++;
      }
    }

    return mergedData;
  };

  const isSuccess = useMemo(
    () => isMinuteDataSuccess && isHourDataSuccess && isDayDataSuccess,
    [isMinuteDataSuccess, isHourDataSuccess, isDayDataSuccess]
  );

  const [ohlcvData, setOhlcvData] = useState<any>([]);
  useEffect(() => {
    console.log("triggered | data changed");
    // Define the resolutions that should use only the daily data
    const dailyResolutions = ["1440", "D", "3D", "W", "M"];
    // Provide a fallback value in case defaultWidgetProps.interval is undefined.
    const currentInterval = defaultWidgetProps.interval || "4H";

    if (dailyResolutions.includes(currentInterval)) {
      // For daily or higher resolutions, use only the day data from the API
      setOhlcvData(isSuccess ? getOhlcvData(dayDatafeed!) : []);
    } else {
      // For lower resolutions, merge minute, hour, and day data
      setOhlcvData(
        isSuccess
          ? mergeData(
              getOhlcvData(minuteDatafeed!),
              getOhlcvData(hourDatafeed!),
              getOhlcvData(dayDatafeed!)
            )
          : []
      );
    }
  }, [minuteDatafeed, hourDatafeed, dayDatafeed, isSuccess]);

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
      {isSuccess && ohlcvData.length > 0 ? (
        <div className="h-full w-full my-6 md:my-7">
          <MyTradingView
            chartOptions={{
              ...defaultWidgetProps,
              symbol:
                minuteDatafeed!.meta.base.name +
                "/" +
                minuteDatafeed!.meta.quote.symbol,
            }}
            ohlcvData={ohlcvData}
            theme={theme === "dark" ? "dark" : "light"}
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
