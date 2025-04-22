// src/components/trade-report/TradeReportColumns.tsx

import React from "react";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Icons } from "@/components/ui/icon";
import { FaEthereum } from "react-icons/fa";
import { format } from "date-fns";
import { minifyContract } from "@/utils/truncate";
import Copy from "@/components/ui/copy";
import Image from "next/image";
import PriceFormatter from "@/utils/PriceFormatter";
import { ITradingItem } from "@/types/Tradinglist.type";
import { TokenChain } from "@/store/tokenChains/networks";
import dayjs from "dayjs";
import { walletRoute } from "@/utils/routeGenerator";
import Link from "next/link";

interface SortableHeaderProps<T> {
  column: Column<T, unknown>;
  label: string;
}

const SortableHeader = <T,>({ column, label }: SortableHeaderProps<T>) => {
  const isSortedAsc = column.getIsSorted() === "asc";
  const isSortedDesc = column.getIsSorted() === "desc";

  const toggleSorting = () => {
    if (isSortedAsc) {
      column.toggleSorting(true);
    } else if (isSortedDesc) {
      column.clearSorting();
    } else {
      column.toggleSorting(false);
    }
  };

  return (
    <Button variant="ghost" onClick={toggleSorting}>
      {label}
      {isSortedAsc && <ArrowUpIcon className="ml-2 h-4 w-4" />}
      {isSortedDesc && <ArrowDownIcon className="ml-2 h-4 w-4" />}
      {!column.getIsSorted() && <Icons.sort className="ml-2 h-4 w-4" />}
    </Button>
  );
};

const customSorting = (
  a: Row<ITradingItem>,
  b: Row<ITradingItem>,
  getValueFn: (obj: any) => number
) => {
  const valueA = getValueFn(a.original);
  const valueB = getValueFn(b.original);
  return valueA - valueB;
};

const customDateSorting = (
  a: Row<ITradingItem>,
  b: Row<ITradingItem>,
  getValueFn: (obj: any) => number
) => {
  const valueA = getValueFn(a.original);
  const valueB = getValueFn(b.original);
  const dateA = new Date(valueA).getTime();
  const dateB = new Date(valueB).getTime();
  return dateA - dateB;
};

const isEligibleNetwork = (network: string) =>
  network.includes("eth") ||
  network.includes("solana") ||
  network.includes("bsc") ||
  network.includes("arbitrum");

export const columns = (
  tokenName: string,
  router: ReturnType<typeof useRouter>,
  availableChains: TokenChain[]
): ColumnDef<ITradingItem>[] => [
  {
    accessorKey: "block_timestamp",
    header: ({ column }) => <SortableHeader column={column} label="Date" />,
    cell: ({ row }) => {
      const blockTimestamp = new Date(
        row.original.attributes.block_timestamp
      ).getTime();
      return blockTimestamp - Date.now() < 86400000
        ? dayjs(blockTimestamp).fromNow()
        : blockTimestamp
        ? format(blockTimestamp, "MMMM d HH:mm:ss")
        : null;
    },
    sortingFn: (a, b) =>
      customDateSorting(a, b, (obj) => obj.attributes.block_timestamp),
  },
  {
    accessorKey: "kind",
    header: ({ column }) => <SortableHeader column={column} label="TX Type" />,
    cell: ({ row }) => (
      <span
        className={`capitalize ${
          row.original.attributes.kind === "sell"
            ? "text-red-400"
            : "text-success"
        }`}
      >
        {row.original.attributes.kind ?? null}
      </span>
    ),
    sortingFn: (a, b) =>
      customSorting(a, b, (obj) => (obj.attributes.kind === "sell" ? 1 : -1)),
  },
  {
    accessorKey: "volume_in_usd",
    header: ({ column }) => (
      <SortableHeader column={column} label="Value (usd)" />
    ),
    cell: ({ row }) =>
      row.original.attributes.volume_in_usd ? (
        <PriceFormatter
          value={(+row.original.attributes.volume_in_usd).toFixed(2)}
          dollarSign={true}
        />
      ) : null,
    sortingFn: (a, b) =>
      customSorting(a, b, (obj) => +obj.attributes.volume_in_usd),
  },
  {
    accessorKey: "price_from_in_usd",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label={`${tokenName.split("/")[0]} Price`}
      />
    ),
    cell: ({ row }) =>
      row.original.attributes.kind === "buy" ? (
        <PriceFormatter
          value={+row.original.attributes.price_to_in_usd}
          dollarSign={true}
        />
      ) : (
        <PriceFormatter
          value={+row.original.attributes.price_from_in_usd}
          dollarSign={true}
        />
      ),
    sortingFn: (a, b) =>
      customSorting(a, b, (obj) =>
        obj.attributes.kind === "buy"
          ? +obj.attributes.price_to_in_usd
          : +obj.attributes.price_from_in_usd
      ),
  },
  {
    accessorKey: "from_token_amount",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label={`${tokenName.split("/")[1]} Amount`}
      />
    ),
    cell: ({ row }) =>
      row.original.attributes.kind === "buy"
        ? (+row.original.attributes.from_token_amount).toFixed(4)
        : (+row.original.attributes.to_token_amount).toFixed(4),
    sortingFn: (a, b) =>
      customSorting(a, b, (obj) =>
        obj.attributes.kind === "buy"
          ? +obj.attributes.from_token_amount
          : +obj.attributes.to_token_amount
      ),
  },
  {
    accessorKey: "tx_from_address",
    header: "Maker",
    cell: ({ row }) => {
      const tx_from_address = row.original.attributes.tx_from_address;
      return (
        <TooltipProvider>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/Dextrading-logo3.png"
                  width={20}
                  height={20}
                  alt="dextrading-symbol"
                  className="min-w-[20px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (
                      tx_from_address &&
                      isEligibleNetwork(row.original.id.split("_")[0])
                    )
                      router.push(
                        walletRoute(
                          tx_from_address,
                          row.original.id.split("_")[0]
                        )
                      );
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Browse in Dextrading</p>
              </TooltipContent>
            </Tooltip>
            {tx_from_address ? (
              <Copy
                value={tx_from_address}
                href={
                  isEligibleNetwork(row.original.id.split("_")[0])
                    ? walletRoute(
                        tx_from_address,
                        row.original.id.split("_")[0]
                      )
                    : undefined
                }
                target="_blank"
                text={minifyContract(tx_from_address)}
              />
            ) : (
              "N/A"
            )}
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "tx_hash",
    header: "TX Hash",
    cell: ({ row }) => {
      const tx_hash = row.original.attributes.tx_hash;
      const network = row.original.id.split("_")[0];

      const getExplorerUrl = (network: string, tx_hash: string) => {
        switch (network) {
          case "solana":
            return `https://solscan.io/tx/${tx_hash}`;
          case "eth":
            return `https://etherscan.io/tx/${tx_hash}`;
          case "bsc":
            return `https://bscscan.com/tx/${tx_hash}`;
          case "arbitrum":
            return `https://arbiscan.io/tx/${tx_hash}`;
          case "base":
            return `https://basescan.org/tx/${tx_hash}`;
          case "optimism":
            return `https://optimistic.etherscan.io/tx/${tx_hash}`;
          default:
            return "#";
        }
      };

      const explorerUrl = getExplorerUrl(network, tx_hash);

      return tx_hash ? (
        <div className="flex items-center gap-2">
          <Link href={explorerUrl} target="_blank" rel="noopener noreferrer">
            <Image
              unoptimized
              className="min-w-[20px]"
              src={
                availableChains.find(
                  (chain: TokenChain) => chain.id === network
                )?.imageUrl?.small ?? "/networks/eth.png"
              }
              height={20}
              width={20}
              alt={network}
            />
          </Link>
          <Copy
            href={explorerUrl}
            target="_blank"
            value={tx_hash}
            text={minifyContract(tx_hash)}
          />
        </div>
      ) : (
        "N/A"
      );
    },
    sortingFn: (a, b) => customSorting(a, b, (obj) => obj.attributes.tx_hash),
  },
];
