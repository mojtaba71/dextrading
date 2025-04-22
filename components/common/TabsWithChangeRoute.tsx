"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { Tabs } from "../ui/tabs";
import { usePathname, useRouter } from "next/navigation";

function TabsWithChangeRoute({
  children,
  defaultValue,
  defaultUrl,
  className = "",
}: {
  children: ReactNode;
  defaultValue: string;
  defaultUrl: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [urlParts, setUrlParts] = useState(pathname.split("/"));

  // Extract the current tab from the URL
  const getCurrentTab = () => {
    return urlParts[urlParts.length - 1] || defaultValue;
  };

  const [currentTab, setCurrentTab] = useState(getCurrentTab());

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (defaultUrl.length > 0) {
      router.push(`/${defaultUrl}/${value}`);
    } else {
      router.push(`/${value}`);
    }
  };

  // Sync tab state with URL when navigating back/forward
  useEffect(() => {
    setCurrentTab(getCurrentTab());
  }, [pathname]);

  return (
    <Tabs
      defaultValue={currentTab}
      className={`${className}`}
      onValueChange={handleTabChange}
    >
      {children}
    </Tabs>
  );
}

export default TabsWithChangeRoute;
