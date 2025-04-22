import GetAlertSvg from "@/components/svg/GetAlertSvg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function EnableNotification({
  url = "https://t.me/WatchlistDextradingBot",
}: {
  url?: string;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-muted-foreground">
        Enable Notification to be the first to know about changes.
      </p>
      <Link href={url} target="_blank">
        <Button variant={"outline"} className="text-brand gap-2">
          <GetAlertSvg />
          Get Alert
        </Button>
      </Link>
    </div>
  );
}

export default EnableNotification;
