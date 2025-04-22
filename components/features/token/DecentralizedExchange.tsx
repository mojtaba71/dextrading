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
import { Dex2, IToken } from "@/types/token.type"
import PriceFormatter from "@/utils/PriceFormatter";
import { formatCash } from "@/utils/numbers";
import Image from "next/image";
import { useState } from "react";

interface Props {
    token: IToken
}


export default function DecentralizedExchange({ token }: Props) {
    const [page, setPage] = useState(0);
    const handleNext = () => setPage((prev) => prev + 1);
    const handlePrev = () => setPage((prev) => prev - 1);

    return (

        <Table className="table-pin-rows table-pin-cols bg-transparent rounded-lg overflow-hidden">
            <TableCaption>Decentralized Exchanges</TableCaption>
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
            {token && token.TickersData?.dex ? (
                <TableBody>
                    {token.TickersData.dex
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



const Record = ({ data, id, page }: { data: Dex2; id: number; page: any; }) => {
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
                            src={`/DEX/${data.market.name}.png`}
                            alt={data.market.name}
                            onError={(e) => {
                                console.log(e)
                            }}
                        />
                        <div className="font-medium">
                            {data.market.name}
                        </div>
                    </>
                }
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium text-info cursor-pointer link link-hover">
                {
                    data.trade_url && data.coin_id && data.target_coin_id &&
                    <a href={data.trade_url} target="_blank">
                        {data.coin_id}/{data.target_coin_id}
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
                    data.converted_volume?.usd &&
                    <>
                        ${formatCash(+data.converted_volume.usd)}
                    </>
                }

            </TableCell>
        </TableRow >

    );
};
