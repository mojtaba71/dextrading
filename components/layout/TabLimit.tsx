"use client";

import { useTabLimit } from "@/hooks/TabLimit";
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

const Logo = dynamic(() => import("../common/Logo"), {
  ssr: false,
});

export default function TabLimit({
  appContent,
}: {
  appContent: React.ReactNode;
}) {
  const { reachedTabLimit } = useTabLimit();

  return (
    <>
      {reachedTabLimit ? (
        <div
          className="flex flex-col gap-4  fixed w-[100vw] h-full top-0 left-0"
          style={{ zIndex: 100 }}
        >
          <Dialog open={true}>
            <DialogContent className="max-h-[90vh] text-center flex flex-col items-center">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <Logo />
              <p className="text-xl mt-6">
                It seems you have already too many instances of the app open in
                your browser.
              </p>
              <p className="text-gray-400">
                Since we want to provide you with a stable and high performant
                app, this instance has been terminated so that you can continue
                using the app in the other tabs without problems according to
                your subscription:
              </p>
              <div className="flex items-center">
                <PlusIcon />
                <span>Free users: 15</span>
              </div>
              <Link href={"/login"}>
                <Button variant={"outline"}>Go To Login</Button>
              </Link>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        appContent
      )}
    </>
  );
}
