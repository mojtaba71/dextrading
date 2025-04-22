'use client'
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import React, { useState } from 'react';

interface Props {
    tabItems: string[];
    onClick: (tab: string) => void;
    className?: string
}

export default function Tab({ tabItems, onClick, className }: Props) {
    const [selectedTab, setSelectedTab] = useState<string>(tabItems[0]);

    const handleTabClick = (item: string) => {
        setSelectedTab(item);
        onClick(item); // Call the passed onClick function with the selected item
    };

    return (
        <div className={clsx('flex items-center justify-center md:justify-start')}>
            <ul className={clsx('inline-flex gap-3 items-center justify-between bg-card rounded-md p-2 w-auto', className)}>
                {tabItems.map((item, i) => (
                    <li key={i}>
                        <Button
                            variant='secondary'
                            onClick={() => handleTabClick(item)}
                            className={clsx(
                                selectedTab === item && 'bg-brand',
                                'text-foreground flex-1 w-full !shadow-none hover:!bg-transparent focus:!bg-brand'
                            )}>
                            {item}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
