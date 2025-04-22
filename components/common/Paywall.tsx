"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

export default function Paywall({open, handleClick}: {open: boolean, handleClick: (value: boolean) => void}) {
  return (
    <Dialog open={open} onOpenChange={handleClick}>
      <DialogContent
        overlayClassName="bg-black/10 backdrop-blur-[12px]"
        className="bg-transparent border-0"
      >
        <DialogTitle></DialogTitle>
        <div className="rounded-lg text-center max-w-md mx-auto flex items-center flex-col gap-5">
          {/* <h2 className="text-2xl font-semibold">Access Premium Content</h2>
            <p className="mb-6">
                You&apos;ve reached a premium area that&apos;s reserved for our subscribers. Unlock this content and enjoy a wealth of resources tailored to meet your needs.
            </p>
            <ul className="mb-6 flex flex-col gap-2 items-start justify-start max-w-md list-disc list-inside ">
                <li>Exclusive insights and tools.</li>
                <li>Advanced analytics and reports.</li>
                <li>Continued access to our expert content.</li>
            </ul>
            <div className="flex items-center justify-center gap-2">
                <Button onClick={() => window.location.href = '/pricing'} variant="default">
                    View Subscription Plans
                </Button>
                <Button onClick={() => window.location.href = '/login'} variant="outline">
                    login
                </Button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
                Learn more about our <Link href="/pricing" className="underline text-blue-600">pricing options</Link> and find the plan that best suits your needs.
            </p> */}
          <Image
            src={"/dextrading-logo.png"}
            width={48}
            height={48}
            alt="Dex Trading Logo"
          />
          <p className="text-muted-foreground">
            Upgrade to Premium to unlock advanced wallet details and gain deeper
            insights into your transactions!
          </p>
          <div className="flex items-center gap-3 justify-center">
            <Link href={"/pricing"}>
              <Button variant={"default"} className="bg-brand gap-2">
                View Plans
                <IoIosArrowForward />
              </Button>
            </Link>
            <Link href={"/login"} className="bg-secondary">
              <Button variant={"outline"} className="gap-2">
                {" "}
                Go To Login
                <IoIosArrowForward />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
