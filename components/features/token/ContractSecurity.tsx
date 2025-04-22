import { Badge } from '@/components/ui/badge';
import { IToken } from '@/types/token.type';
import React from 'react'
import { IoWarningOutline } from 'react-icons/io5';
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineDangerous } from 'react-icons/md';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Props {
    token: IToken
}

export default function ContractSecurity({ token }: Props) {
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Contract Security</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-start justify-center gap-4'>
                    <div>
                        {
                            token?.ScoreData?.status &&
                            <div>
                                {token.ScoreData.status === "Safe" ? (
                                    <Success />
                                ) : token.ScoreData.status === "Currently Safe" ? (
                                    <Warning />
                                ) : (
                                    <Error />
                                )}
                            </div>
                        }
                    </div>
                    <div >
                        <Renouncement
                            active={
                                token?.FunctionCallsData?.renounceOwnership?.status === "renounced"
                            }
                            text={
                                token?.FunctionCallsData?.renounceOwnership?.status === "renounced"
                                    ? `Contract was Renounced at ${token.FunctionCallsData.renounceOwnership?.Date}`
                                    : `Contract is not Renounced`
                            }
                        />
                    </div>
                    <Separator />
                    <div >
                        {token.FunctionCallsData?.malFunc?.count != undefined && token.FunctionCallsData.malFunc?.uniqueNames && token.FunctionCallsData.malFunc?.similarNames && (
                            <div >
                                <span className='flex items-center justify-start' >
                                    <div className='bg-red-400 h-3 w-3 rounded-full mr-2' />
                                    {token.FunctionCallsData.malFunc?.count} Malicious Functions
                                </span>
                                <ul className="mt-3 list-disc pl-4">
                                    {[
                                        ...token.FunctionCallsData.malFunc?.uniqueNames,
                                        ...token.FunctionCallsData.malFunc?.similarNames,
                                    ]?.map((issue: string, idx: number) => (
                                        <li key={idx} className="mb-1 capitalize">
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div>

                        {token.FunctionCallsData?.maliciousLibraries?.count != undefined && (
                            <div>
                                <span className='flex items-center justify-start' >
                                    <div className='bg-red-400 h-3 w-3 rounded-full mr-2' />
                                    {token.FunctionCallsData.maliciousLibraries?.count} Interface
                                    Control
                                </span>
                                <ul className="mt-3 list-disc pl-4">
                                    {token.FunctionCallsData.maliciousLibraries?.libraries?.map(
                                        (issue: string, id: number) => (
                                            <li key={id} className="mb-1 capitalize">
                                                {issue}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}


const Success = () => (
    <Badge variant="outline">
        <AiOutlineSafety className="text-lg text-green-500 mr-2" />
        Contract is safe
    </Badge>
);
const Warning = () => (
    <Badge variant="outline">
        <IoWarningOutline className="text-lg text-yellow-500 mr-2" />
        Contract is safe but can be changed
    </Badge>
);
const Error = () => (
    <Badge variant="outline">
        <MdOutlineDangerous className="text-lg text-red-500 mr-2" />
        Contract is not Safe
    </Badge>
);

const Renouncement = ({ active, text }: { text: string, active: boolean }) => (
    <div>
        <Badge variant="outline">
            <div className='bg-red-400 h-3 w-3 rounded-full mr-2' />
            {text}
        </Badge>
    </div>
);
