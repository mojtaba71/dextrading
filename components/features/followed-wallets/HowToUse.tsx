import React from "react";
import { Accordion } from "@/components/ui/accordion";
import HowToUseTrackedWalletAccordionItem from "./HowToUseTrackedWalletAccordionItem";

function HowToUse() {
  return (
    <Accordion type="single" collapsible className="w-full mt-3">
      <HowToUseTrackedWalletAccordionItem />
    </Accordion>
  );
}

export default HowToUse;
