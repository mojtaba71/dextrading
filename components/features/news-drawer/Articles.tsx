import { getArticles } from "@/services/http/news-drawer.http";
import { NewsDrawer } from "@/types/news-drawer.type";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

function Articles() {
  const { data } = useQuery<NewsDrawer[]>({
    queryKey: ["news-articles"],
    queryFn: getArticles,
  });

  return (
    <ErrorBoundary>
      <AccordionItem className="my-2 border-0" value={"Articles"}>
        <AccordionTrigger
          isPlusMinus={false}
          className="bg-secondary text-left rounded-md transition-colors h-[32px] pl-4 text-muted-foreground"
        >
          Top Articles
        </AccordionTrigger>
        <AccordionContent className="px-4 py-8 text-left">
          {data &&
            data.map((news: NewsDrawer) => (
              <Link
                href={news.link}
                target="_blank"
                key={news.title}
                className="flex items-center py-4 border-t gap-2"
              >
                <div className="rounded-full bg-foreground min-w-8 min-h-8 w-8 h-8 flex items-center justify-center">
                  <Image
                    unoptimized
                    src={news.image}
                    width={24}
                    height={24}
                    alt={news.title}
                    className="rounded-full"
                  />
                </div>
                <div className="text-xs">
                  <p>{news.title}</p>
                  <div className="text-muted-foreground text-[10px]">
                    <span>{news.link}</span> |{" "}
                    <span>{dayjs.utc(news.time).fromNow()}</span>
                  </div>
                </div>
              </Link>
            ))}
        </AccordionContent>
      </AccordionItem>
    </ErrorBoundary>
  );
}

export default Articles;
