"use client"

import useUserStore from "@/store/User";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useUserDetails } from "./UserDetails";
import { v4 as uuidv4 } from "uuid";

const TAB_LIMIT = 15;
const OPEN_TABS = "open_tabs";

const getOpenTabs = () => {
  return JSON.parse(localStorage.getItem(OPEN_TABS) ?? "[]");
};

const incrementTabCount = (tabId: string) => {
  const currentTabs = getOpenTabs();
  currentTabs.push({id: tabId, time: Date.now()});
  localStorage.setItem(OPEN_TABS, JSON.stringify(currentTabs));
};

const decrementTabCount = (tabId: string) => {
  const currentTabs = getOpenTabs();
  localStorage.setItem(
    OPEN_TABS,
    JSON.stringify(currentTabs.filter((tab: any) => tab.id !== tabId))
  );
};

const initTabSession = (tabId: string) => {
  if (!sessionStorage.getItem("tabSession")) {
    sessionStorage.setItem("tabSession", "true");
    incrementTabCount(tabId); // Increment count when new tab is opened
  }
};

const cleanupTabSession = (tabId: string) => {
  if (sessionStorage.getItem("tabSession")) {
    sessionStorage.removeItem("tabSession");
    decrementTabCount(tabId); // Decrement count when tab is closed
  }
};

// Custom Hook
export const useTabLimit = () => {
  const [reachedTabLimit, setReachedTabLimit] = useState(false);
  const hasLicense = useUserStore((state) => state.hasLicense);
  const pathname = usePathname();
  const { loading } = useUserDetails();
  const tabId = uuidv4();


  const cleanStaleTabs = () => {
    const now = Date.now();
    const threshold = 2*3600000; // 2 hours threshold for inactivity
  
    const currentTabs = getOpenTabs().filter(
      (tab:any) => now - tab.time <= threshold
    );
    localStorage.setItem(OPEN_TABS, JSON.stringify(currentTabs));
  };
  
  useEffect(() => {
    cleanStaleTabs(); // Run on mount to clean any stale tabs
  }, []);
  

  const checkCondition = useCallback(() => {

    return getOpenTabs().length > TAB_LIMIT && !hasLicense;
  }, [hasLicense]);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      // This is a simple check. You might want to adjust the threshold as needed.
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Check on mount
    checkIfDesktop();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  useEffect(() => {
    // Check if we have reached the tab limit
    if (checkCondition()) {
      setReachedTabLimit(true);
      return;
    } else {
      setReachedTabLimit(false);
    }

    // Initialize tab session and increment tab count
    initTabSession(tabId);

    const handleTabClose = () => {
      cleanupTabSession(tabId); // Decrement tab count when the tab is closed
    };

    const handleStorageChange = (e: any) => {
      // Synchronize tab count across all open tabs when localStorage changes
      // if (e.key === OPEN_TABS) {
      //   if (checkCondition()) {
      //     setReachedTabLimit(true);
      //   } else {
      //     setReachedTabLimit(false);
      //   }
      // }
    };

    window.addEventListener("beforeunload", handleTabClose);
    window.addEventListener("unload", handleTabClose);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      window.removeEventListener("storage", handleStorageChange);
      cleanupTabSession(tabId); // Check if tab session is cleaned up on unmount
    };
  }, [hasLicense, checkCondition]);

  return {
    reachedTabLimit: pathname.includes("login")
      ? false
      : reachedTabLimit && !loading && isDesktop,
  };
};
