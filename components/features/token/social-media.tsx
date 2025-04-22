"use client";
import { Button } from "@/components/ui/button";
import { IToken } from "@/types/token.type";
import React from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  token: IToken;
}

export default function SocialMedia({ token }: Props) {
  return (
    <div className="top flex items-end justify-center gap-1">
      {token?.TokenMedia?.Token_Discord != undefined && (
        <Link
          href={token.TokenMedia.Token_Discord as string}
          className="rounded-full text-xs py-0 border border-border text-muted-foreground"
          target="_blank"
        >
          <FaDiscord size={20} />
          <span className="hidden xl:flex">Discord</span>
        </Link>
      )}
      {token?.TokenMedia?.Token_Website?.[0] && (
        <Link
          href={token.TokenMedia!.Token_Website[0]}
          target="_blank"
          className="flex items-center gap-2 rounded-md text-xs !px-1 !py-1 !h-auto border border-border text-muted-foreground"
        >
          <IoEarth size={16} />
          <span className="hidden xl:flex">Website</span>
        </Link>
      )}
      {token?.TokenMedia?.Token_Telegram?.[0] && (
        <Link
          href={token.TokenMedia!.Token_Telegram[0]}
          target="_blank"
          className="flex items-center gap-2 rounded-md text-xs !px-1 !py-1 !h-auto border border-border text-muted-foreground"
        >
          <BiLogoTelegram size={16} />

          <span className="hidden xl:flex">Telegram</span>
        </Link>
      )}
      {token?.TokenMedia?.Token_Twitter?.[0] && (
        <Link
          href={token.TokenMedia.Token_Twitter[0]}
          target="_blank"
          className="flex items-center gap-2 rounded-md text-xs !px-1 !py-1 !h-auto border border-border text-muted-foreground"
        >
          <RiTwitterXFill size={16} />
          <span className="hidden xl:flex">Twitter</span>
        </Link>
      )}
    </div>
  );
}
