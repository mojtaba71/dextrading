"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTrends } from "@/services/http/trends.http";
import { Daum } from "@/types/token.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Copy from "@/components/ui/copy";
import { minifyContract } from "@/utils/truncate";
import PriceFormatter from "@/utils/PriceFormatter";
import useUserStore from "@/store/User";
import HotTokens from "./HotTokens";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import useNetworkSelector, { TokenChain } from "@/store/tokenChains/networks";
import { tokenRoute } from "@/utils/routeGenerator";
import { getGems } from "@/services/http/token.http";
import TrendingPairStory from "../dashboard/dashboard/components/TrendingPairStory";

const PARAMS = {
  NETWORK: 1,
  TAB: 0,
};

export default function TrendingPairs({
  params,
}: {
  params?: { params: [string, string] };
}) {
  const { selectedChain, setSelectedChain, availableChains } =
    useNetworkSelector();
  const hasLicense = useUserStore((state) => state.hasLicense);
  const router = useRouter();
  const [tab, setTab] = useState<string>(
    params
      ? params.params[PARAMS.TAB]
      : selectedChain.id === "eth" || selectedChain.id === "solana"
      ? "HotGems"
      : "TrendingPairs"
  );

  // useEffect(() => {
  //   router.push(`/trending-pairs/${tab}/${selectedChain.id}`);
  // }, [selectedChain, tab, router]);

  // useEffect(() => {
  //   if (params && params.params[PARAMS.NETWORK] && availableChains) {
  //     const selected = availableChains.find(
  //       (item) => item.id === params.params[PARAMS.NETWORK]
  //     );
  //     if (selected) {
  //       setSelectedChain(selected);
  //     }
  //   } else if (!params) {
  //     router.push(`/trending-pairs/${tab}/${selectedChain.id}`);
  //   }
  // }, []);

  const [buyPressureChunk, setBuyPressureChunk] = useState<any[]>([]);
  const [trackingChunk, setTrackingChunk] = useState<any[]>([]);
  const [fastGrowingChunk, setFastGrowingChunk] = useState<any[]>([]);

  const { data: gems } = useQuery({
    queryKey: ["gems", selectedChain.id],
    queryFn: () =>
      getGems({
        params: {
          network: selectedChain.id,
          sortBy: "score",
          sortOrder: "asc",
          limit: 5,
          insight: true,
        },
      }),

    refetchInterval: 15000,
    select: (data) => {
      if (data.error) return;
      return data;
    },
  });

  const {
    isLoading,
    error,
    data: trends,
  } = useQuery({
    queryKey: [
      "trends",
      params ? params.params[PARAMS.NETWORK] : selectedChain.id,
    ],
    queryFn: () =>
      getTrends(params ? params.params[PARAMS.NETWORK] : selectedChain.id),
    refetchInterval: 300000,
  });

  useEffect(() => {
    if (gems) {
      const chunkSize = 1;
      const buyPressure: any[] = [];
      const tracking: any[] = [];
      const fastGrowing: any[] = [];
      if (gems && gems.buyPressure.length > 0) {
        for (let i = 0; i < gems.buyPressure?.length; i += chunkSize) {
          buyPressure.push(gems.buyPressure.slice(i, i + chunkSize));
        }
      }
      if (gems && gems.tracking.length > 0) {
        for (let i = 0; i < gems.tracking.length; i += chunkSize) {
          tracking.push(gems.tracking.slice(i, i + chunkSize));
        }
      }
      if (gems && gems.fastGrowing?.length > 0) {
        for (let i = 0; i < gems.fastGrowing.length; i += chunkSize) {
          fastGrowing.push(
            gems.fastGrowing.slice(i, i + chunkSize).map((item: any) => {
              return {
                ...item,
                tokenName: item.token_name,
                contractAddress: item.contract_address,
              };
            })
          );
        }
      }
      setBuyPressureChunk(buyPressure);
      setTrackingChunk(tracking);

      setFastGrowingChunk(fastGrowing);
    }
  }, [gems]);

  if (error) return <div>Failed to load trends, please try again.</div>;
  if (isLoading)
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex items-center space-x-4 w-full">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
        ))}
      </div>
    );

  const setTabQuery = (tab: string) => {
    router.push(`/trending-pairs/${tab}/${selectedChain.id}`);
  };

  return (
    <div className="px-2 relative">
      <Tabs
        onValueChange={(value) => {
          setTabQuery(value);
        }}
        defaultValue={tab}
        className="w-full no-scrollbar"
      >
        <TabsList className="bg-transparent p-0 m-0 w-full overflow-y-scroll flex items-center justify-start">
          <TabsTrigger value="HotGems" className="text-[17px] md:text-lg">
            Trending Gems
          </TabsTrigger>
          <TabsTrigger value="TrendingPairs" className="text-[17px] md:text-lg">
            Trending Pairs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="TrendingPairs" className="mt-5">
          <h1 className="text-lg md:text-2xl my-2">Price Trending Tokens</h1>
          <p className="text-muted-foreground text-xs md:text-sm mb-3">
            Tokens experiencing significant price movement, either upward or
            downward, based on market trends and trading activity.
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hasLicense
                  ? trends!.data != undefined &&
                    trends!.data.map((d: any) => (
                      <Record
                        key={d.id}
                        token={d}
                        selectedChain={selectedChain}
                      />
                    ))
                  : trends!.data != undefined &&
                    trends!.data
                      .slice(0, 15)
                      .map((d: any) => (
                        <Record
                          key={d.id}
                          token={d}
                          selectedChain={selectedChain}
                        />
                      ))}
              </TableBody>
            </Table>
            {!hasLicense && (
              <div className="absolute z-10 bottom-0 left-0 right-0 w-full h-96 bg-gradient-to-t from-muted via-background flex flex-col items-center justify-center gap-6 md:gap-5 px-10 text-center">
                <p className="text-2xl font-medium">
                  Please login to see more trending tokens
                </p>
                <Link
                  href="/login"
                  className="p-2 px-4 rounded-md text-base cursor-pointer"
                >
                  login
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="HotGems">
          <h1 className="text-lg md:text-2xl my-2">
            Top Traded Tokens Preferred by Smart Money on DEXs
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm mb-3">
            A list of top-traded tokens on DEXs favored by smart money traders.
            See which assets are gaining traction among strategic investors.
          </p>
          <div className="flex w-full flex-wrap gap-4 mb-6">
            <TrendingPairStory
              className="w-full md:w-[calc(33%-8px)]"
              type={"buyPressure"}
              data={buyPressureChunk}
            />
            <TrendingPairStory
              className="w-full md:w-[calc(33%-8px)]"
              type={"tracking"}
              data={trackingChunk}
            />
            <TrendingPairStory
              className="w-full md:w-[calc(33%-8px)]"
              type={"fastGrowing"}
              data={fastGrowingChunk}
            />
          </div>
          <HotTokens />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Record = ({
  token,
  selectedChain,
}: {
  token: Daum;
  selectedChain: TokenChain;
}) => {
  return (
    <TableRow>
      <TableCell className="flex items-center justify-start gap-4">
        <Avatar>
          <AvatarImage src={token.logo_url} alt="token logo" />
          <AvatarFallback>{token.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="token flex flex-col items-start justify-start gap-2">
          <Link
            className="font-medium hover:underline"
            href={tokenRoute(token.address, selectedChain.id.toLowerCase())}
          >
            {minifyContract(token.name)}
          </Link>
          <Copy
            className="text-sm !text-muted-foreground link p-2"
            value={token.address}
            text={minifyContract(token.address)}
          />
        </div>
      </TableCell>
      <TableCell>
        {token.price_stats?.usd?.price != undefined && (
          <PriceFormatter
            value={token.price_stats?.usd?.price}
            dollarSign={true}
          />
        )}
      </TableCell>
      <TableCell>
        {token.price_stats?.usd?.volume_24h != undefined && (
          <PriceFormatter
            value={+token.price_stats?.usd?.volume_24h}
            dollarSign={true}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
