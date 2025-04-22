"use client";

import React, { useState } from "react";
import useTokenChainStore from "@/store/tokenChains";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getChainData } from "@/services/http/token.http";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChainSelector() {
  const { availableChains, selectedChain, setSelectedChain } =
    useTokenChainStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {
    isLoading,
    error,
    data: chainInfo,
  } = useQuery({
    queryKey: ["chainData", selectedChain.id],
    queryFn: () =>
      getChainData({
        params: {
          network: selectedChain.id,
        },
      }).then((data) => data),
    refetchInterval: 5000,
  });

  const pathname = usePathname();
  const handleSelect = (value: string) => {
    setSelectedChain(value);
    setIsOpen(!isOpen);

    if (pathname.includes("/wallet/") || pathname.includes("/token/")) {
      router.push("/");
    }
  };

  return (
    <div className="chain-selector flex items-center justify-end gap-2 w-auto text-nowrap flex-nowrap">
      <div className="hidden md:block text-xs text-muted-foreground">
        {selectedChain.id &&
          chainInfo?.data?.routeSummary?.gasUsd != undefined &&
          chainInfo?.data?.routeSummary?.amountInUsd != undefined && (
            <div className="flex items-center gap-1">
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6758 2.625C13.3659 2.62551 13.0662 2.73557 12.8296 2.93572C12.593 3.13587 12.4348 3.41323 12.383 3.71875H11.9258C11.6938 3.71902 11.4714 3.81129 11.3074 3.97533C11.1433 4.13936 11.051 4.36177 11.0508 4.59375V9.625C11.0508 9.68302 11.0277 9.73866 10.9867 9.77968C10.9457 9.8207 10.89 9.84375 10.832 9.84375C10.774 9.84375 10.7184 9.8207 10.6774 9.77968C10.6363 9.73866 10.6133 9.68302 10.6133 9.625V7C10.6129 6.71002 10.4976 6.43202 10.2926 6.22698C10.0875 6.02194 9.80951 5.90659 9.51953 5.90625H9.08203V0.875C9.08169 0.759073 9.03549 0.64799 8.95351 0.566017C8.87154 0.484043 8.76046 0.43784 8.64453 0.4375H2.08203C1.9661 0.43784 1.85502 0.484043 1.77305 0.566017C1.69108 0.64799 1.64487 0.759073 1.64453 0.875V11.4034C1.45666 11.4516 1.29018 11.561 1.17135 11.7143C1.05252 11.8676 0.98811 12.056 0.988282 12.25V13.125C0.988622 13.2409 1.03483 13.352 1.1168 13.434C1.19877 13.516 1.30985 13.5622 1.42578 13.5625H9.30078C9.41671 13.5622 9.52779 13.516 9.60976 13.434C9.69174 13.352 9.73794 13.2409 9.73828 13.125V12.25C9.73845 12.056 9.67404 11.8676 9.55522 11.7143C9.43639 11.561 9.2699 11.4516 9.08203 11.4034V6.78125H9.51953C9.57752 6.78133 9.63312 6.8044 9.67413 6.8454C9.71513 6.88641 9.73821 6.94201 9.73828 7V9.625C9.73828 9.91508 9.85352 10.1933 10.0586 10.3984C10.2638 10.6035 10.542 10.7188 10.832 10.7188C11.1221 10.7188 11.4003 10.6035 11.6054 10.3984C11.8105 10.1933 11.9258 9.91508 11.9258 9.625V6.78125H12.3633C12.5953 6.78098 12.8177 6.68871 12.9817 6.52467C13.1457 6.36064 13.238 6.13823 13.2383 5.90625V3.9375C13.2384 3.8215 13.2845 3.71029 13.3666 3.62827C13.4486 3.54625 13.5598 3.50012 13.6758 3.5C13.7918 3.5 13.9031 3.45391 13.9851 3.37186C14.0672 3.28981 14.1133 3.17853 14.1133 3.0625C14.1133 2.94647 14.0672 2.83519 13.9851 2.75314C13.9031 2.67109 13.7918 2.625 13.6758 2.625ZM6.45703 7C6.45703 6.88397 6.50313 6.77269 6.58517 6.69064C6.66722 6.60859 6.7785 6.5625 6.89453 6.5625H7.33203C7.44806 6.5625 7.55934 6.60859 7.64139 6.69064C7.72344 6.77269 7.76953 6.88397 7.76953 7C7.76953 7.11603 7.72344 7.22731 7.64139 7.30936C7.55934 7.39141 7.44806 7.4375 7.33203 7.4375H6.89453C6.7785 7.4375 6.66722 7.39141 6.58517 7.30936C6.50313 7.22731 6.45703 7.11603 6.45703 7ZM2.95703 2.1875C2.95703 2.07147 3.00313 1.96019 3.08517 1.87814C3.16722 1.79609 3.2785 1.75 3.39453 1.75H7.33203C7.44806 1.75 7.55934 1.79609 7.64139 1.87814C7.72344 1.96019 7.76953 2.07147 7.76953 2.1875V4.8125C7.76953 4.92853 7.72344 5.03981 7.64139 5.12186C7.55934 5.20391 7.44806 5.25 7.33203 5.25H3.39453C3.2785 5.25 3.16722 5.20391 3.08517 5.12186C3.00313 5.03981 2.95703 4.92853 2.95703 4.8125V2.1875ZM3.39453 6.5625H5.58203C5.69806 6.5625 5.80934 6.60859 5.89139 6.69064C5.97344 6.77269 6.01953 6.88397 6.01953 7C6.01953 7.11603 5.97344 7.22731 5.89139 7.30936C5.80934 7.39141 5.69806 7.4375 5.58203 7.4375H3.39453C3.2785 7.4375 3.16722 7.39141 3.08517 7.30936C3.00313 7.22731 2.95703 7.11603 2.95703 7C2.95703 6.88397 3.00313 6.77269 3.08517 6.69064C3.16722 6.60859 3.2785 6.5625 3.39453 6.5625ZM8.86328 12.6875H1.86328V12.25H8.86328V12.6875ZM11.9258 5.90625V4.59375H12.3633L12.3637 5.90625H11.9258Z"
                  fill={"hsl(var(--muted-foreground)"}
                />
              </svg>
              <span>
                $ {(+chainInfo.data.routeSummary.gasUsd).toFixed(2) + " "}
              </span>
            </div>
          )}
      </div>
      <Select
        defaultValue={"eth"}
        value={selectedChain.id.toString()}
        onValueChange={handleSelect}
        name="chain"
      >
        <SelectTrigger aria-label="chain name" className="w-auto bg-secondary">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-secondary">
          {availableChains.map((chain) => (
            <SelectItem key={chain.id} value={chain.id.toString()}>
              <div className="flex items-center gap-3 overflow-hidden">
                <Image
                  src={chain.imageUrl?.large ?? ""}
                  height={20}
                  width={20}
                  alt={"informations on chain:" + chain.attributes?.name}
                  aria-label={chain.attributes?.name + "chain"}
                />
                <div>{chain.attributes?.name}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
