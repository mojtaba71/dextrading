"use client";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "../features/header/Toggle-theme";
import Spotlight from "../features/header/spotlight";
import { Button } from "../ui/button";
import { LiaRobotSolid } from "react-icons/lia";
import Link from "next/link";
import ChainInfo from "../features/header/chain-info";
import clsx from "clsx";
import useHeaderStore from "@/store/ActiveHeader";
import { SearchIcon } from "lucide-react";
import ProfileButton from "@/components/common/ProfileButton";
import dynamic from "next/dist/shared/lib/dynamic";
import NetworkSelector from "./NetworkSelector";
import useNotification from "@/hooks/Notification";
import useUserStore from "@/store/User";
import NewsDrawer from "../features/header/news-drawer";


const Logo = dynamic(() => import("../common/Logo"), {
  ssr: false,
});
const NotificationToggle = dynamic(
  () => import("../features/header/notification"),
  {
    ssr: false,
  }
);

interface Props {
  className?: string;
}



export default function Header({ className }: Props) {
  const { walletList, groupMessages } = useNotification();

  const user = useUserStore((state) => state.user);

  const isActive = useHeaderStore((state) => state.isActive);
  const content = useHeaderStore((state) => state.content);
  const setNotification = useHeaderStore((state) => state.setNotification);
  const notificationIsOn = useHeaderStore((state) => state.notificationIsOn);
  const [open, setOpen] = useState(false);

  const handleOpen = (value: any) => {
    setOpen(value);
  };

  const toggleNotification = () => {
    setNotification(!notificationIsOn);
  };

  return (
    <header
      className={clsx(
        "w-[100vw] fixed top-0 right-0 left-0 z-40 px-5 2xl:px-0 py-2 bg-background flex flex-col items-center justify-center gap-4 flex-shrink-0 flex-grow flex-wrap",
        className
      )}
    >
      <div
        className="flex items-center justify-between w-full flex-wrap md:px-3"
        style={{ zIndex: 100 }}
      >
        <div className="flex items-center justify-start md:justify-center gap-2 w-full flex-nowrap lg:flex-nowrap">
          <div className="w-auto h-full flex items-center mr-2 md:mr-auto">
            <div className="ml-2">
              {isActive ? (
                <div className="">{content}</div>
              ) : (
                <Link href="/">
                  <Logo />
                  <p className="h-0 w-0 invisible">Home</p>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-4 ml-auto lg:hidden">
              <Button
                variant={"secondary"}
                onClick={() => setOpen(true)}
                aria-label="search"
                className="ml-2 text-secondary-foreground md:hidden w-[32px] h-[32px] p-0"
              >
                <SearchIcon />
              </Button>
              {/* <ChainSelector /> */}
            </div>
          </div>
          <div className="hidden lg:flex w-full">
            <Spotlight on={open} handleOn={handleOpen} />
          </div>

          <div className="flex ml-auto lg:hidden items-center justify-center gap-2">
            <div className="ml-auto">
              <NetworkSelector />
            </div>
            <div>
              <ProfileButton />
            </div>
            <div className="flex items-center">
              <ThemeToggle />
              {user && (
                <NotificationToggle
                  isOn={notificationIsOn}
                  onToggle={toggleNotification}
                />
              )}
            </div>
            <div className="flex flex-nowrap items-center">
              <Button variant="ghost" aria-label="robots" size="icon">
                <Link href="/robots" className="flex items-center">
                  <LiaRobotSolid className="text-2xl" />
                  <p className="h-0 w-0 invisible">Robots</p>
                </Link>
              </Button>
              <NewsDrawer />
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center gap-2">
            <div className="hidden lg:flex gap-2 flex-wrap md:flex-nowrap">
              <NetworkSelector />
              <ChainInfo />
              {/* <Link href={"/pricing"}>
              <Button
                className="flex items-center bg-new-year"
                style={{ height: 44 }}
              >
                <div className="ml-2 text-xs">
                  <div>Christmas Offer</div>
                  <div>
                    <Countdown date={new Date(1735845938509)} />
                  </div>
                </div>
                <Image
                  className="mb-2"
                  src={"/gift.gif"}
                  width={32}
                  height={32}
                  alt="gift"
                />
              </Button>
            </Link> */}
            </div>
            <ProfileButton />
            <ThemeToggle />
            {user && (
              <NotificationToggle
                isOn={notificationIsOn}
                onToggle={toggleNotification}
              />
            )}
            <Link href="/robots">
              <Button aria-label="robots" variant="ghost" size="icon">
                <LiaRobotSolid className="text-2xl" />
              </Button>
              <p className="h-0 w-0 invisible">Robots</p>
            </Link>

            <NewsDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
