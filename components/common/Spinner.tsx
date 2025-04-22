import React from 'react';
import { RiLoader5Line } from 'react-icons/ri';

export default function Spinner() {
    return (
        <div className='absolute top-0 bottom-0 bg-background/55 flex justify-center items-center h-full w-full'>
            <RiLoader5Line className="animate-spin text-4xl" />
        </div>
    );
}
