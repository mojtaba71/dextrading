'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IToken, cex } from "@/types/token.type"
import PriceFormatter from "@/utils/PriceFormatter";
import { formatCash } from "@/utils/numbers";
import Image from "next/image";
import { useState } from "react";

interface Props {
    token: IToken
}


export default function CentralizedExchange({ token }: Props) {
    const [page, setPage] = useState(0);
    const handleNext = () => setPage((prev) => prev + 1);
    const handlePrev = () => setPage((prev) => prev - 1);

    return (

        <Table className="table-pin-rows table-pin-cols bg-transparent rounded-lg overflow-hidden">
            <TableCaption>Centralized Exchanges</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center  w-[50px]">
                        #
                    </TableHead>
                    <TableHead className="">
                        Exchange
                    </TableHead>
                    <TableHead className="">
                        Pair
                    </TableHead>
                    <TableHead className="">
                        Price
                    </TableHead>
                    <TableHead className="">
                        Volume
                    </TableHead>
                </TableRow>
            </TableHeader>
            {token && token.TickersData?.cex ? (
                <TableBody>
                    {token.TickersData.cex
                        .slice(page * 10, (page + 1) * 10)
                        .map((data, id) => (
                            <Record
                                key={data.id}
                                id={id + 1}
                                data={data}
                                page={page}
                            />
                        ))}
                </TableBody>
            ) : (
                <p></p>
            )}
        </Table>

    )
}



const Record = ({ data, id, page }: { data: cex; id: number; page: any; }) => {
    return (
        <TableRow>
            <TableCell className="text-base-content text-center">
                {id + 10 * page}
            </TableCell>

            <TableCell className="text-base-content w-64 flex items-center justify-start gap-3">
                {
                    data?.market?.name &&
                    <>
                        <Image
                            width={40}
                            height={40}
                            src={`/CEX/${data.market.name}.png`}
                            alt={data.market.name}
                            onError={(e) => { (e.target as HTMLImageElement).src = "/NotExists.png"; }}
                        />
                        <div className="font-medium">
                            {data.market.name}
                        </div>
                    </>
                }
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium text-info cursor-pointer link link-hover">
                {
                    data.trade_url && data.base && data.target &&
                    <a href={data.trade_url} target="_blank">
                        {data.base}/{data.target}
                    </a>
                }
            </TableCell>

            <TableCell className="text-base-content whitespace-nowrap">
                {
                    data.last &&
                    <PriceFormatter value={data.last} />
                }
            </TableCell>

            <TableCell className="text-base-content whitespace-nowrap">
                {
                    data.volume &&
                    <>
                        ${formatCash(data.volume)}
                    </>
                }
            </TableCell>
        </TableRow >

    );
};
