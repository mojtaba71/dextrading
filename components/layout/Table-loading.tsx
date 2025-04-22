import React from 'react'
import { Skeleton } from '../ui/skeleton';

export default function TableLoading() {
    return <div className='flex flex-col gap-4'>
        {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center space-x-5 w-full">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/5" />
                </div>
            </div>
        ))}
    </div>;
}
