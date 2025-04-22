"use client";

import { LogOutIcon, User2, User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import useUserStore from "@/store/User";
import { useRouter } from "next/navigation";
import { useCookie } from "react-use";
import { useOutsideAlerter } from "@/hooks/OutsideClick";
import { createRedirectUrl } from "@/utils/redirect";

const ProfileButton = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const [values, updateCookie] = useCookie("_DEX_TRADING_TOKN");
  const ref = useRef<HTMLDivElement>(null);

  const handleOutSideClick = () => {
    if (openProfile) setOpenProfile(false)
  }

  useOutsideAlerter(ref, handleOutSideClick)


  const handleLogout = () => {
    updateCookie("");
    setUser(null, false);
    router.push("/");
  };

  return (
    <>
      <Button
        onClick={() => setOpenProfile((prev) => !prev)}
        variant="ghost"
        aria-label="profile"
        size="icon"
      >
        <User2 className="text-2xl" />
      </Button>
      <div
        tabIndex={0}
        ref={ref}
        className="relative"
      >
        {openProfile && (
          <div
            onClick={() => setOpenProfile(false)}
            onBlur={() => {
              console.log("clickeeddd!!!!");

              setOpenProfile(false);
            }}
            className="flex flex-col absolute top-[14px] -left-[50px] w-[150px] bg-secondary rounded-md z-10 cursor-pointer"
          >
            {user ? (
              <>
                <Button
                  onClick={() => {
                    router.push("/dashboard/overview");
                  }}
                  aria-label="profile"
                  className="bg-transparent text-[hsl(var(--foreground))] border-0 shadow-none hover:bg-secondary"
                >
                  <div className="mr-3">
                    <User2Icon width={18} />
                  </div>
                  <div className="">Profile</div>
                </Button>
                <Button
                  onClick={handleLogout}
                  aria-label="logout"
                  className="bg-transparent text-[hsl(var(--foreground))] border-0 shadow-none hover:bg-secondary"
                >
                  <div className="mr-3">
                    <LogOutIcon width={18} />
                  </div>
                  <div>Logout</div>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    router.push("/dashboard/overview");
                  }}
                  aria-label="dashboard"
                  className="bg-transparent text-[hsl(var(--foreground))] border-0 shadow-none hover:bg-secondary"
                >
                  <div className="mr-3">
                    <User2Icon width={18} />
                  </div>
                  <div className="">Dashboard</div>
                </Button>
                <Button
                  onClick={() => {
                    router.push("/register");
                  }}
                  aria-label="register user"
                  className="flex items-center justify-center bg-transparent text-[hsl(var(--foreground))] border-0 shadow-none hover:bg-secondary"
                >
                  <div className="ml-1 mr-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M19 16V13M19 13V10M19 13H16M19 13H22M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
                        stroke={"hsl(var(--primary))"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-full text-left">Sign up</div>
                </Button>
                <Button
                  onClick={() => {
                    console.log("Email Login");
                    router.push(`/login?redirect=${createRedirectUrl(window.location)}`);
                  }}
                  aria-label="login user"
                  className="flex items-center justify-center bg-transparent text-[hsl(var(--foreground))] border-0 shadow-none hover:bg-secondary"
                >
                  <div className="mr-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 9L8 12M8 12L11 15M8 12H16M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
                        stroke={"hsl(var(--primary))"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-full text-left">Email Login</div>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileButton;
