'use client'

import PriceFormatter from "@/utils/PriceFormatter";
import { formatCash } from "@/utils/numbers";
import Image from "next/image";

import React, { useState } from 'react';
import { ColumnDef, Row } from "@tanstack/react-table";

import { ImageType } from "@/types/Image.type";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Icons } from "@/components/ui/icon";


import { ClientSideSmartTable } from '@/components/ui/smart-table/ClientSideSmartTable';
import FilterDialog, { Filter } from '@/components/ui/smart-table/FilterDialog';
import { cex, Dex2, IToken } from "@/types/token.type"


interface Props {
    // extend 2 type
    initTokenData: Dex2[]
    type?: 'DEX' | 'CEX'

}

const getRange = (data: Dex2[], key: string): [number, number] => {
    const values = data.map(token => parseFloat(token.last || "0"));
    return [Math.min(...values), Math.max(...values)];
};

const getVolumeRange = (data: Dex2[]): [number, number] => {
    const values = data.map(token => parseFloat(token.converted_volume?.usd || "0"));
    return [Math.min(...values), Math.max(...values)];
};
export default function NewExchangeTable({ initTokenData, type = 'DEX' }: Props) {
    const priceRange = getRange(initTokenData, 'last');
    const volumeRange = getVolumeRange(initTokenData);


    const [priceRangeState, setPriceRange] = useState<[number, number]>(priceRange);
    const [volumeRangeState, setVolumeRange] = useState<[number, number]>(volumeRange);


    const customSorting = (a: Row<Dex2>, b: Row<Dex2>, getValueFn: (obj: any) => number) => {
        const valueA = getValueFn(a.original);
        const valueB = getValueFn(b.original);
        return valueA - valueB;
    };

    const columns: ColumnDef<Dex2>[] = [

        {
            accessorKey: 'index',
            accessorFn: (row, index) => index + 1,
            header: '#',
            //@ts-ignore
            lock: true,
            cell: ({ row }) => <div>{row.index + 1}</div>,
        },

        {
            accessorKey: 'exchange',
            accessorFn: row => row.original?.market.name,
            header: 'Exchange',
            //@ts-ignore
            lock: true,
            cell: ({ row }) => {
                return (
                    <div>
                        {
                            row.original?.market?.name &&
                            <div className="flex flex-col md:flex-row text-xs md:text-md text-muted-foreground items-center gap-2">
                                <Image
                                    width={24}
                                    height={24}
                                    src={`/${type}/${row.original?.market.name}.png`}
                                    alt={row.original?.market.name}
                                    onError={
                                        (e) => { 
                                            console.log(e)
                                        }
                                    }
                                />
                                <div className="font-medium">
                                    {row.original?.market.name}
                                </div>
                            </div>
                        }
                    </div>
                );
            },
        },
        {
            accessorKey: 'pair',
            header: 'Pair',
            accessorFn: row => row.original?.coin_id,
            cell: ({ row }) => <div>
                {
                    row.original?.trade_url && row.original?.coin_id && row.original?.target_coin_id &&
                    <a href={row.original?.trade_url} target="_blank">
                        {row.original?.coin_id}/{row.original?.target_coin_id}
                    </a>
                }
            </div>
        },
        {
            accessorKey: 'price',
            accessorFn: row => parseFloat(row.last || "0"),
            header: ({ column }) => {
                const isSortedAsc = column.getIsSorted() === 'asc';
                const isSortedDesc = column.getIsSorted() === 'desc';

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
                    <Button
                        variant="ghost"
                        onClick={toggleSorting}
                    >
                        Price
                        {isSortedAsc && <ArrowUpIcon className="ml-2 h-4 w-4" />}
                        {isSortedDesc && <ArrowDownIcon className="ml-2 h-4 w-4" />}
                        {!column.getIsSorted() && <Icons.sort className="ml-2 h-4 w-4" />}
                    </Button>
                );
            },
            cell: ({ row }) => <div>
                {
                    row.original?.last &&
                    <PriceFormatter value={row.original?.last} />
                }
            </div>,
            sortingFn: (a, b) => customSorting(a, b, (obj) => {
                console.log('obj', obj)
                return parseFloat(obj.last || "0")
            }),
        },
        {
            accessorKey: 'volume',
            accessorFn: row => parseFloat(row.converted_volume?.usd || "0"),
            header: ({ column }) => {
                const isSortedAsc = column.getIsSorted() === 'asc';
                const isSortedDesc = column.getIsSorted() === 'desc';

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
                    <Button
                        variant="ghost"
                        onClick={toggleSorting}
                    >
                        Volume
                        {isSortedAsc && <ArrowUpIcon className="ml-2 h-4 w-4" />}
                        {isSortedDesc && <ArrowDownIcon className="ml-2 h-4 w-4" />}
                        {!column.getIsSorted() && <Icons.sort className="ml-2 h-4 w-4" />}
                    </Button>
                );
            },
            cell: ({ row }) => <div>
                {
                    row.original?.converted_volume?.usd &&
                    <>
                        ${formatCash(+row.original?.converted_volume.usd)}
                    </>
                }
            </div>,
            sortingFn: (a, b) => customSorting(a, b, (obj) => parseFloat(obj.converted_volume.usd || "0")),
        }
    ];

    const filteredData = initTokenData.filter(token =>
        parseFloat(token.last || "0") >= priceRangeState[0] && parseFloat(token.last || "0") <= priceRangeState[1]
        &&
        parseFloat(token.converted_volume?.usd || "0") >= volumeRangeState[0] && parseFloat(token.converted_volume?.usd || "0") <= volumeRangeState[1]

    );
    const filters: Filter[] = [
        // {
        //     name: 'Price Range',
        //     type: 'range',
        //     state: priceRangeState,
        //     setState: setPriceRange,
        //     defaultRange: priceRange,
        // },
        {
            name: 'Volume Range',
            type: 'range',
            state: volumeRangeState,
            setState: setVolumeRange,
            defaultRange: volumeRange,
        },
    ];

    return (
        <ClientSideSmartTable
            data={filteredData}
            columns={columns}
            searchColumnAccessorKey='exchange'
        >
            <FilterDialog filters={filters} />
        </ClientSideSmartTable >

    );
}
