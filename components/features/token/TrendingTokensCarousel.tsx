import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  selecComp: ReactNode;
  items: any[];
  children: (item: any) => ReactNode;
}

function TrendingTokensCarousel({
  title,
  description,
  selecComp,
  children,
  items,
}: Props) {
  return (
    <div className="bg-card rounded-xl mt-2 text-sm cursor-grab select-none p-4 flex flex-col justify-between">
      <Carousel className="bg-card rounded-xl mt-2 text-sm cursor-grab select-none p-4 flex flex-col justify-between">
        <div className="flex justify-between md:flex-row items-start">
          <div>
            <h2 className="text-lg md:text-2xl my-2">{title}</h2>
            <p className="text-muted-foreground text-xs md:text-sm mb-3">
              {description}
            </p>
          </div>

          <div className="mt-1 flex flex-col items-center gap-3 justify-end">
            {selecComp}
            <div className="flex md:hidden mt-3 w-full justify-end">
              <CarouselPrevious />

              <CarouselNext />
            </div>
          </div>
        </div>
        <CarouselContent className="flex items-center">
          {items.map((chunk, index) => (
            <CarouselItem
              key={index}
              className="flex flex-wrap justify-between"
            >
              {chunk.map((token: any, idx: number) => {
                return (
                  <React.Fragment key={idx}>
                    {children({ token: token })}
                  </React.Fragment>
                );
              })}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex mt-3 w-full justify-end">
          <CarouselPrevious />

          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}

export default TrendingTokensCarousel;
