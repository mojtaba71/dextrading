"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FiCopy } from "react-icons/fi";
import Link from "next/link";
import { stopPropagation } from "@/utils/stopPropagation";
import { Button } from "../button";

type Props = {
  className?: string;
  href?: string;
  target?: "_blank";
} & ({ text: string; value?: string } | { text?: string; value: string });

export default function Copy({ text, value, className, href, target }: Props) {
  const [copied, setCopied] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const content = (
    <div
      className="content flex items-center justify-start gap-2"
      ref={contentRef}
    >
      {text && <span className={clsx(className)}>{text}</span>}
    </div>
  );

  return (
    <div className="relative content flex items-center justify-end">
      <div className="ml-auto" ref={contentRef}>
        {href ? (
          <Link href={href} target={target} passHref>
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 md:h-7 md:w-7"
        aria-label="copy address"
        onClick={(e) => {
          e.stopPropagation();
          handleCopyAddress(value ? value : text!);
        }}
      >
        <FiCopy />
      </Button>
      {copied && (
        <div
          className="rounded-sm px-1 py-[3px] transition-all ease-in-out duration-200"
          style={{
            left: `${contentRef.current?.clientWidth! + 40}px`,
            top: "1px",
            opacity: `${copied ? "1" : "0"}`,
          }}
        >
          <p
            className="bg-background top-0 right-0 p-2 rounded-sm absolute" style={{zIndex: 100}}
          >
            Copied
          </p>
        </div>
      )}
    </div>
  );
}
