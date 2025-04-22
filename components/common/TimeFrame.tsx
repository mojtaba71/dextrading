"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTimeFrame } from "@/hooks/TimeFrame";
import { MarketIndexTimeFrame } from "@/types/timeline.type";
import { useEffect } from "react";

interface Props {
  onChangeValue: (
    from: string,
    till: string,
    period: MarketIndexTimeFrame
  ) => void;
  defaultPeriod: MarketIndexTimeFrame;
}

export const TimeFrame = ({
  onChangeValue,
  defaultPeriod = "daily",
}: Props) => {
  const { period, setPeriod, from, till } = useTimeFrame(defaultPeriod);

  useEffect(() => {
    setPeriod(defaultPeriod);
  }, []);

  useEffect(() => {
    onChangeValue(from, till, period as MarketIndexTimeFrame);
  }, [from, till, period, onChangeValue]);

  return (
    <ToggleGroup
      type="single"
      onValueChange={(value: MarketIndexTimeFrame) =>
        setPeriod(value as "1week" | "1month" | "3months" | "1year" | "all")
      }
      value={period}
      defaultValue={defaultPeriod}
    >
      <ToggleGroupItem value="30min" title="30 Min" aria-label="Toggle week">
        30Min
      </ToggleGroupItem>
      <ToggleGroupItem value="12h" title="12 Hour" aria-label="Toggle month">
        12H
      </ToggleGroupItem>
      <ToggleGroupItem value="daily" title="Daily" aria-label="Toggle 3 months">
        1D
      </ToggleGroupItem>
      <ToggleGroupItem value="weekly" title="Weekly" aria-label="Toggle year">
        1W
      </ToggleGroupItem>
      <ToggleGroupItem value="monthly" title="Monthly" aria-label="Toggle all">
        1M
      </ToggleGroupItem>
      <ToggleGroupItem
        value="quarterly"
        title="Quarterly"
        aria-label="Toggle all"
      >
        Q
      </ToggleGroupItem>
    </ToggleGroup>
  );

  return;
};
