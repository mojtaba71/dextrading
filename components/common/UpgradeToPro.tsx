import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function UpgradeToPro({ description }: { description: string }) {
  return (
    <div className="flex justify-center w-full text-xs">
      <div className="flex items-center gap-3 bg-muted-foreground/10  rounded-lg p-3">
        <p>{description}</p>
        <Link href={"/pricing"}>
          <Button variant={"outline"} className="text-xs">
            Upgrade to Pro
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default UpgradeToPro;
