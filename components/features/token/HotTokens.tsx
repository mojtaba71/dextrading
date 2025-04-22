"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import {
  fastGrowingTokens,
  getGems,
  getLatestGems,
} from "@/services/http/token.http";
import NewGem from "../homepage/homepage-tabs/NewGem";
import PerformanceGem from "../homepage/homepage-tabs/PerformanceGem";
import FilterDialog, { Filter } from "@/components/ui/smart-table/FilterDialog";
import { RiPriceTag3Line } from "react-icons/ri";
import { TiChartAreaOutline } from "react-icons/ti";
import { TbHours24, TbMoneybag, TbSortDescendingNumbers } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { format } from "date-fns";
import { BsCalendarDate } from "react-icons/bs";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useNetworkSelector from "@/store/tokenChains/networks";
import GrowingGems from "../homepage/homepage-tabs/GrowingGems";
import EnableNotification from "./EnableNotification";

type Sort =
  | "latestDate"
  | "score"
  | "count"
  | "buySwapCount"
  | "sellSwapCount"
  | "buyPressure"
  | "sellPressure"
  | "buySpeed"
  | "growthRate"
  | "averageRank";

const alertLinks: Record<string, string> = {
  base: "https://t.me/TokenTracker_base_bot",
  eth: "https://t.me/TokenTracker_eth_bot",
  bsc: "https://t.me/TokenTracker_bsc_bot",
  solana: "https://t.me/TokenTracker_solana_bot",
};

function HotTokens() {
  const { selectedChain, setSelectedChain } = useNetworkSelector();

  // FILTERS
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(200);
  const [countRange, setCountRange] = useState<[number, number]>([
    0, 5000000000,
  ]);
  const [buySwapRange, setBuySwapRange] = useState<[number, number]>([
    0, 10000000000,
  ]);
  const [sellSwapRange, setSellSwapRange] = useState<[number, number]>([
    0, 1500000000,
  ]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [search] = useDebounce(searchValue, 200);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  const [sortPerformanceBy, setPerformanceSortBy] = useState<Sort>("score");
  const [sortNewBy, setNewSortBy] = useState<Sort>("latestDate");
  const [sortGrowingBy, setGrowingSortBy] = useState<Sort>("buySpeed");

  const { data: tokenData } = useQuery({
    queryKey: [
      "tokenDetail",
      selectedChain.id,
      sortPerformanceBy,
      countRange,
      buySwapRange,
      sellSwapRange,
      search,
      sortPerformanceBy,
    ],
    queryFn: () =>
      getGems({
        params: {
          network: selectedChain.id,
          sortBy: "score",
          sort: sortPerformanceBy,
          sortOrder:
            sortPerformanceBy === "score" || sortPerformanceBy === "averageRank"
              ? "asc"
              : "desc",
          limit: limit,
          minCount: countRange[0],
          maxCount: countRange[1],
          buySwapMin: countRange[0],
          buySwapMax: countRange[1],
          sellSwapMin: countRange[0],
          sellSwapMax: countRange[1],
          search: search,
          fromDate: dateRange.from
            ? format(dateRange.from, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            : undefined,
          toDate: dateRange.to
            ? format(dateRange.to, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            : undefined,
        },
      }),
    refetchInterval: 100000,
    // enabled: selectedChain.id === "eth" || selectedChain.id === "solana",
  });

  const { data: gemData } = useQuery({
    queryKey: [
      "latesttokenDetail",
      selectedChain.id,
      sortNewBy,
      countRange,
      buySwapRange,
      sellSwapRange,
      search,
      sortNewBy,
    ],
    queryFn: () =>
      getLatestGems({
        params: {
          network: selectedChain.id,
          sortBy: "timeRank",
          sort: sortNewBy,
          sortOrder:
            sortNewBy === "score" || sortNewBy === "averageRank"
              ? "asc"
              : "desc",
          limit: limit,
          minCount: countRange[0],
          maxCount: countRange[1],
          buySwapMin: countRange[0],
          buySwapMax: countRange[1],
          sellSwapMin: countRange[0],
          sellSwapMax: countRange[1],
          search: search,
          fromDate: dateRange.from
            ? format(dateRange.from, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            : undefined,
          toDate: dateRange.to
            ? format(dateRange.to, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            : undefined,
        },
      }),
    refetchInterval: 100000,
    // enabled: selectedChain.id === "eth" || selectedChain.id === "solana",
  });
  const { data: growingData } = useQuery({
    queryKey: [
      "growing data",
      selectedChain.id,
      countRange,
      buySwapRange,
      sellSwapRange,
      search,
      sortGrowingBy,
    ],
    queryFn: () =>
      fastGrowingTokens(selectedChain.id, {
        params: {
          sortOrder: "desc",
          limit: 50,
          page: 1,
        },
      }),
    refetchInterval: 100000,
    // enabled: selectedChain.id === "eth" || selectedChain.id === "solana",
  });

  const chunkSize = 8;
  const chunks = [];
  if (tokenData && tokenData.length > 0) {
    for (let i = 0; i < tokenData.length; i += chunkSize) {
      chunks.push(tokenData.slice(i, i + chunkSize));
    }
  }
  const gemsSize = 8;
  const gems = [];
  if (gemData && gemData.length > 0) {
    for (let i = 0; i < gemData.length; i += gemsSize) {
      gems.push(gemData.slice(i, i + gemsSize));
    }
  }
  const growingSize = 6;
  const fastGrowing = [];
  if (growingData && growingData.length > 0) {
    for (let i = 0; i < growingData.length; i += growingSize) {
      fastGrowing.push(growingData.slice(i, i + growingSize));
    }
  }

  const filters: Filter[] = [
    {
      name: "Count",
      state: countRange,
      setState: setCountRange,
      defaultRange: [50, 500],
      type: "range",
      icon: <RiPriceTag3Line />,
    },
    {
      name: "Buy Swap",
      state: buySwapRange,
      setState: setBuySwapRange,
      defaultRange: [10, 100],
      icon: <TiChartAreaOutline />,
      type: "range",
    },
    {
      name: "Sell Swap",
      state: sellSwapRange,
      setState: setSellSwapRange,
      defaultRange: [5, 150],
      icon: <TbMoneybag />,
      type: "range",
    },
    {
      name: "Date Range",
      type: "date-range",
      state: dateRange,
      setState: setDateRange,
      icon: <BsCalendarDate />,
    },
  ];

  const SortBy = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (selectedValue: Sort) => void;
  }) => {
    return (
      <Select
        onValueChange={(selectedValue: Sort) => {
          onChange(selectedValue);
        }}
        value={value}
      >
        <SelectTrigger className="w-full min-w-32">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="score">
              <span className="flex items-center">
                <span>Score</span>
              </span>
            </SelectItem>
            <SelectItem value="latestDate">
              <span className="flex items-center">
                <span>Latest Date</span>
              </span>
            </SelectItem>
            <SelectItem value="buyPressure">
              <span className="flex items-center">
                <span>Buy Pressure</span>
              </span>
            </SelectItem>
            <SelectItem value="sellPressure">
              <span className="flex items-center">
                <span>Sell Pressure</span>
              </span>
            </SelectItem>
            <SelectItem value="averageRank">
              <span className="flex items-center">
                <span>Average Rank</span>
              </span>
            </SelectItem>
            <SelectItem value="count">
              <span className="flex items-center">
                <span>Count</span>
              </span>
            </SelectItem>
            <SelectItem value="buySwapCount">
              <span className="flex items-center">
                <span>Buy Swap Count</span>
              </span>
            </SelectItem>
            <SelectItem value="sellSwapCount">
              <span className="flex items-center">
                <span>Sell Swap Count</span>
              </span>
            </SelectItem>
            <SelectItem value="buySpeed">
              <span className="flex items-center">
                <span>Buy Speed</span>
              </span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  // Ensure selectedChain.id is one of the keys
  const url = alertLinks[selectedChain.id as keyof typeof alertLinks];

  return (
    <div>
      <div className="flex items-center gap-3 w-fit">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search token"
        />
        <FilterDialog filters={filters} />
      </div>

      <div className="flex flex-wrap items-stretch justify-between">
        <div className="w-full md:w-[calc(50%-8px)]">
          <Carousel className="bg-card rounded-xl mt-2 text-sm cursor-grab select-none p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg md:text-2xl my-2">Performance</h2>
                <p className="text-muted-foreground text-xs md:text-sm mb-3">
                  High DEX trading activity and notable buy/sell pressure
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <SortBy
                  value={sortPerformanceBy}
                  onChange={(value: Sort) => setPerformanceSortBy(value)}
                />
                <div className="flex md:hidden mt-3 w-full justify-end">
                  <CarouselPrevious />

                  <CarouselNext />
                </div>
              </div>
            </div>
            <CarouselContent className="flex items-center">
              {chunks.map((chunk, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-wrap justify-between"
                >
                  {chunk.map((token: any, idx: number) => {
                    return (
                      <PerformanceGem
                        index={idx}
                        key={idx}
                        item={token}
                        selectedChain={selectedChain}
                      />
                    );
                  })}
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-between gap-3 pt-3">
              <EnableNotification url={url} />
              <div className="hidden md:flex justify-end items-center">
                <CarouselPrevious />

                <CarouselNext />
              </div>
            </div>
          </Carousel>
        </div>
        <div className="w-full md:w-[calc(50%-8px)]">
          <Carousel className="bg-card rounded-xl mt-2 text-sm cursor-grab select-none p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <div className="">
                <h2 className="text-lg md:text-2xl my-2">New</h2>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Any recently trading DEX tokens
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <SortBy
                  value={sortNewBy}
                  onChange={(value: Sort) => setNewSortBy(value)}
                />
                <div className="mt-3 flex md:hidden w-full justify-end">
                  <CarouselPrevious />

                  <CarouselNext />
                </div>
              </div>
            </div>
            <CarouselContent className="flex items-center">
              {gems.map((chunk, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-wrap justify-between"
                >
                  {chunk.map((token: any, idx: number) => {
                    return (
                      <NewGem
                        index={idx}
                        key={idx}
                        item={token}
                        selectedChain={selectedChain}
                      />
                    );
                  })}
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:flex mt-3 w-full justify-end">
              <CarouselPrevious />

              <CarouselNext />
            </div>
          </Carousel>
        </div>
        <div className="w-full">
          <div className="bg-card rounded-xl mt-2 text-sm cursor-grab select-none p-4 flex flex-col justify-between">
            <Carousel className="bg-card rounded-xl mt-2 text-sm cursor-grab select-none p-4 flex flex-col justify-between">
              <div className="flex justify-between md:flex-row items-start">
                <div>
                  <h2 className="text-lg md:text-2xl my-2">Fast Growing</h2>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3">
                    Tokens with rapid DEX trader engagement growth
                  </p>
                </div>

                <div className="mt-1 flex flex-col items-center gap-3 justify-end">
                  <Select
                    onValueChange={(selectedValue: Sort) => {
                      setGrowingSortBy(selectedValue);
                    }}
                    value={sortGrowingBy}
                  >
                    <SelectTrigger className="w-full min-w-32">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="buySpeed">
                          <span className="flex items-center">
                            <span>Buy Speed</span>
                          </span>
                        </SelectItem>
                        {/* <SelectItem value="growthPercentage">
                        <span className="flex items-center">
                          <span>Traders Growth Percentage</span>
                        </span>
                      </SelectItem> */}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex md:hidden mt-3 w-full justify-end">
                    <CarouselPrevious />

                    <CarouselNext />
                  </div>
                </div>
              </div>
              <CarouselContent className="flex items-center">
                {fastGrowing.map((chunk, index) => (
                  <CarouselItem
                    key={index}
                    className="flex flex-wrap justify-between"
                  >
                    {chunk.map((token: any, idx: number) => {
                      return (
                        <GrowingGems
                          index={idx}
                          key={idx}
                          item={token}
                          selectedChain={selectedChain}
                        />
                      );
                    })}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-between gap-3 pt-3">
                <EnableNotification url={url} />
                <div className="hidden md:flex justify-end items-center">
                  <CarouselPrevious />

                  <CarouselNext />
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotTokens;
