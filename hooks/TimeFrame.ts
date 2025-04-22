"use client";

import { useCallback, useState } from "react";
import { TimeLineProps } from "@/types/timeline.type";

export const useTimeFrame = (defaultPeriod: TimeLineProps = "2weeks") => {
  const [period, setPeriod] = useState<TimeLineProps>(defaultPeriod);

  const HOUR = 3600 * 1000;
  const EIGHT_HOURS = 8 * HOUR;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const TWO_WEEKS = 2*WEEK;
  const MONTH = 30 * DAY;
  const THREE_MONTH = 3 * MONTH;  
  const SIX_MONTH = 6 * MONTH;
  const YEAR = 12 * MONTH;

  const getTimeRange = useCallback((period: TimeLineProps) => {
    const now = new Date();
    let from, till;

    switch (period) {
      case "1hour":
        from = new Date(Date.now() - HOUR);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "8hour":
        from = new Date(Date.now() - EIGHT_HOURS);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "1day":
        from = new Date(Date.now() - DAY);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "1week":
        from = new Date(Date.now() - WEEK);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "2weeks":
        from = new Date(Date.now() - TWO_WEEKS);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "1month":
        from = new Date(Date.now() - MONTH);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "3months":
        from = new Date(Date.now() - THREE_MONTH);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "6months":
        from = new Date(Date.now() - SIX_MONTH);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "1year":
        from = new Date(Date.now() - YEAR);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      case "all":
        from = new Date(0);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
      default:
        from = new Date(0);
        till = new Date(now.setDate(now.getDate() + 1));
        break;
    }

    return {
      from: from.toISOString().split("T")[0],
      till: till.toISOString().split("T")[0],
    };
  }, []);

  const { from, till } = getTimeRange(period);

  return { period, setPeriod, from, till };
};
