import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TickAccordionContent {
  description: string;
  items: { title: string; list: string[] }[];
  tip: string;
}

export interface TickAccordion {
  data: { title: string; content: TickAccordionContent }[];
}

function AccordionWithTick({ data }: TickAccordion) {
  return (
    <Accordion type="single" collapsible className="w-full mt-3">
      {data.map((accordionItem) => (
        <AccordionItem
          key={accordionItem.title}
          className="my-1"
          value={accordionItem.title}
        >
          <AccordionTrigger className="text-left rounded-xl transition-colors h-[48px] pl-4 my-2">
            {accordionItem.title}
          </AccordionTrigger>
          <AccordionContent className="px-4 py-8 text-left">
            <p className="text-muted-foreground">
              {accordionItem.content.description}
            </p>
            {accordionItem.content.items.map((accordion) => (
              <div key={accordion.title}>
                <h6 className="text-lg font-bold mt-6 mb-2">
                  ✅ {accordion.title}
                </h6>
                <ul
                  className="text-muted-foreground ml-4"
                  style={{ listStyle: "circle" }}
                >
                  {accordion.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="mt-4">
              🚀 <span className="font-bold">Pro Tip:</span>{" "}
              {accordionItem.content.tip}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccordionWithTick;
