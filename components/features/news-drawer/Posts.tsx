import { getArticles, getPosts } from "@/services/http/news-drawer.http";
import { NewsDrawer } from "@/types/news-drawer.type";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import utc from "dayjs/plugin/utc";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

dayjs.extend(utc);

function Posts() {
  const { data } = useQuery<NewsDrawer[]>({
    queryKey: ["news-posts"],
    queryFn: getPosts,
  });

  return (
    <ErrorBoundary>
      <AccordionItem className="my-2 border-0" value={"Posts"}>
        <AccordionTrigger
          isPlusMinus={false}
          className="bg-secondary text-left rounded-md transition-colors h-[32px] pl-4 text-muted-foreground"
        >
          Latest Features
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
                <div className="rounded-full bg-foreground min-w-8 min-h-8 w-8 h-8 p-2 flex items-center justify-center">
                  <Image
                    unoptimized
                    src={news.image}
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt={news.title}
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

export default Posts;
