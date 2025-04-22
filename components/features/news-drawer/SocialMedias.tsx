"use client";

import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiTelegram } from "react-icons/si";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/User";
import { connectTelegram, generateOuthUrl } from "@/services/http/user.http";
import { useCookie } from "react-use";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

function SocialMedias() {
  const user = useUserStore((state) => state.user);
  const [value] = useCookie("_DEX_TRADING_TOKN");

  const headers = {
    Authorization: `Bearer ${value}`,
  };

  const verifyTelegram = () => {
    connectTelegram({}, headers)
      .then((res: any) => {
        window.location.href = res.data.oauthUrl;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTwitterOuth = () => {
    generateOuthUrl(headers)
      .then((res: any) => {
        window.location.href = res.data.oauthUrl;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ErrorBoundary>
      <AccordionItem className="my-2 border-0" value={"Social Media"}>
        <AccordionTrigger
          isPlusMinus={false}
          className="bg-secondary text-left rounded-md transition-colors h-[32px] pl-4 text-muted-foreground"
        >
          Connected Social Media
        </AccordionTrigger>
        <AccordionContent className="px-4 py-4 flex flex-col text-left">
          {user ? (
            <>
              <div className="border-b border-border py-4 w-full">
                <div className="flex items-center gap-5">
                  <SiTelegram className="text-[#37AEE2] text-2xl" />
                  {user && user.telegram_verified ? (
                    <p className="text-xs flex items-center gap-2">
                      {user.telegram_handle}
                      <CheckIcon color="hsl(var(--success))" size={18} />
                    </p>
                  ) : (
                    <Button
                      variant={"secondary"}
                      className="text-xs w-fit ml-auto"
                      onClick={verifyTelegram}
                    >
                      Verify Telegram
                    </Button>
                  )}
                </div>
              </div>
              <div className="border-b border-border py-4 w-full">
                <div className="flex items-center gap-5">
                  <FaSquareXTwitter className="text-primary text-2xl" />
                  {user && !user.twitter_verified ? (
                    <p className="text-xs flex items-center gap-2">
                      {user.twitter_handle}
                      <CheckIcon color="hsl(var(--success))" size={18} />
                    </p>
                  ) : (
                    <Button
                      variant={"secondary"}
                      className="text-xs w-fit ml-auto"
                      onClick={getTwitterOuth}
                    >
                      Verify X
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-xs">Log in to view your activity.</p>
              <Link href={"/login"}>
                <Button variant={"secondary"} className="bg-accent w-fit">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </ErrorBoundary>
  );
}

export default SocialMedias;
