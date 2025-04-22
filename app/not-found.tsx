import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function notFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-10">
            <div className='flex items-center justify-center gap-6 text-9xl'>
                <span>
                    4
                </span>
                <Image
                    src='/bitcoin.png'
                    height={90}
                    width={90}
                    alt='bitcoin.png'
                />
                <span>
                    4
                </span>
            </div>
            <p>
                The page you’re looking for doesn’t exist.
            </p>
            <div className='flex items-center justify-center gap-5'>
                <Button>
                    <Link href='/'>Homepage</Link>
                </Button>
                <a href="mailto:Info@dextrading.com">
                    Contact us
                </a>
            </div>
        </div>
    )
}
