"use client";

import React, { useState } from "react";
import { IoNewspaperOutline, IoSearchOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Accordion } from "@/components/ui/accordion";
import Articles from "../news-drawer/Articles";
import SearchHistory from "../news-drawer/SearchHistory";
import Posts from "../news-drawer/Posts";
import LatestSwaps from "../news-drawer/LatestSwaps";
import SocialMedias from "../news-drawer/SocialMedias";
import Spotlight from "./spotlight";
import Watchlists from "../news-drawer/Watchlists";

const NewsDrawer = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpen = (value: any) => {
    setOpenSearch(value);
  };

  return (
    <Drawer
      onOpenChange={(value: boolean) => setOpenDrawer(value)}
      direction="right"
    >
      <DrawerTrigger>
        <div aria-label="News">
          <IoNewspaperOutline className="text-xl" />
          <p className="h-0 w-0 invisible">News</p>
        </div>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="fixed bottom-0 top-0 right-0 outline-none w-96 overflow-auto">
          <div
           
            className="flex items-center bg-secondary px-2 rounded-xl"
          >
            <IoSearchOutline />
           
            <Spotlight handleOn={handleOpen} on={openSearch} />
          </div>

          <div>
            <Accordion
              type="single"
              collapsible
              // value="Trending Tokens 1"
              className="w-full max-w-4xl"
            >
              <SearchHistory />
              <Posts />
              <Articles />
              <LatestSwaps />
              <SocialMedias />
              <Watchlists />
            </Accordion>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default React.memo(NewsDrawer);
