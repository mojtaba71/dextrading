"use client";

import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion,
} from "@/components/ui/accordion";
import Image from "next/image";

function TokenAccordion({
  tokenDescription,
  tokenImageUrl,
}: {
  tokenDescription: string;
  tokenImageUrl: string;
}) {
  return (
    <>
      {tokenDescription && (
        <Accordion type="single" collapsible className="w-full mt-3">
          <AccordionItem className="my-1" value={"how to use"}>
            <AccordionTrigger className="text-left rounded-xl transition-colors pl-4 my-2 flex justify-between items-center text-sm md:text-base">
              <p>Token Overview</p>
              <Image
                unoptimized
                src={tokenImageUrl}
                alt="Token Image"
                width={50}
                height={50}
                className="w-1/6 object-cover rounded-lg ml-auto"
              />
            </AccordionTrigger>
            <AccordionContent className="px-4 py-8 text-left">
              <div
                className="token-content-description"
                dangerouslySetInnerHTML={{ __html: tokenDescription }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}

export default TokenAccordion;
