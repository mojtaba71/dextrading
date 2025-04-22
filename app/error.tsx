
"use client";

import { Button } from "@/components/ui/button";
import { postError } from "@/services/http/error.http";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // FIXME: email error to yourself
    postError({ data: error })
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-10">
      <div className='flex items-center justify-center gap-6 text-9xl'>
        <Image
          src='/bitcoin.png'
          height={90}
          width={90}
          alt='bitcoin.png'
          className="-rotate-180"
        />
      </div>
      <p>
        Something went wrong! Please try again
      </p>
      <div className='flex items-center justify-center gap-5'>
        <Button
          onClick={() => window.location.reload()}
        >
          Try again
        </Button>
        <a href="mailto:Info@dextrading.com">
          Contact us
        </a>
      </div>
    </div>
  );
}
