import React from 'react';
import { Skeleton } from '../ui/skeleton';

interface Props {
    times: number
}

export default function Loading({ times = 2 }: Props) {
    return (
        <div className="w-full relative overflow-hidden flex flex-col justify-center gap-5 p-4">
            {Array.from({ length: times }).map((_, index) => (
                <div key={index} className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[210px]" />
                </div>
            ))}
        </div>
    );
}
