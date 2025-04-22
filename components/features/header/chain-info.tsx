"use client";
import { Button } from "@/components/ui/button";
import CryptographyAnimation from "@/components/ui/CryptographyAnimation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAi } from "@/services/http/token.http";
import { TooltipPortal } from "@radix-ui/react-tooltip";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useNetworkSelector from "@/store/tokenChains/networks";

interface AIData {
  trend?: string;
  categoryTrend?: string;
  importantTokens?: string[];
}

export default function ChainInfo() {
  const { selectedChain } = useNetworkSelector();
  const [data, setData] = useState<AIData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAi(
      selectedChain.attributes?.name.toLowerCase() === "solana" ? { params: { network: "solana" } } : {}
      // selectedChain.name === "Solana" ? { params: { network: "solana" } } : {}
    )
      .then((res: any) => {
        setData(res.firstToken);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedChain.attributes?.name]);

  if (isLoading)
    return (
      <div className="hidden md:flex items-center justify-center gap-8">
        <Skeleton className="w-12 h-2" />
        <Skeleton className="w-12 h-2" />
      </div>
    );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="hidden md:flex bg-[hsl(var(--primary-foreground))] text-secondary-foreground hover:bg-accent items-center gap-2"
            variant={"default"}
            style={{ height: 44 }}
          >
            <div>AI</div>
            <div>
              <svg
                width="18"
                viewBox="0 0 24 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3646 0.578247L14.9965 5.96826L10.3627 0.737567C9.78584 0.0871642 8.7951 0.0163847 8.13166 0.578247L0.566901 6.97755C-0.108349 7.54851 -0.192339 8.55894 0.37941 9.23357C0.950371 9.90882 1.9608 9.99282 2.63543 9.42107L9.0035 4.03105L13.6373 9.26175C14.2142 9.91215 15.2049 9.98293 15.8683 9.42107L23.4331 3.02176C24.1084 2.4508 24.1923 1.44038 23.6206 0.765738C22.9769 0.102562 21.9818 0.0616171 21.3646 0.578247Z"
                  fill={"hsl(var(--secondary-foreground))"}
                />
              </svg>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className="bg-gray-400 w-[250px] p-4 flex  flex-wrap items-center text-center justify-center">
            {isLoading ? (
              <Skeleton className="w-12 h-2" />
            ) : (
              <>
                {data?.trend && (
                  <CryptographyAnimation
                    className="text-black text-xl"
                    text={data.trend}
                  />
                )}
                {data?.categoryTrend && (
                  <CryptographyAnimation
                    className="text-black text-base my-3"
                    text={data.categoryTrend}
                  />
                )}

                <ul>
                  {data?.importantTokens &&
                    data.importantTokens.map((token) => (
                      <li key={token}>
                        <CryptographyAnimation
                          className="text-black text-base"
                          text={token}
                        />
                      </li>
                    ))}
                </ul>

                <Link href={"/pricing"}>
                  <CryptographyAnimation
                    className=" text-blue-600 mt-4"
                    text={"Get another trend to make money (Premium Option)"}
                  />
                </Link>
              </>
            )}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
