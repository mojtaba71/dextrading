import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { localStorageItem } from "@/types/localstorage.type";
import { tokenRoute, walletRoute } from "@/utils/routeGenerator";
import { minifyContract, minifyTokenName } from "@/utils/truncate";
import React from "react";
import { get } from "local-storage";
import { useLoadingStore } from "@/store";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import WalletSvg from "@/components/svg/WalletSvg";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import dayjs from "dayjs";

function SearchHistory() {
  const historySearches: localStorageItem[] =
    (get("historySearches") as localStorageItem[]) || [];
  const setLoading = useLoadingStore((state) => state.setLoading);
  const router = useRouter();

  return (
    <div>
      <AccordionItem className="my-2 border-0" value={"Search History"}>
        <AccordionTrigger
          isPlusMinus={false}
          className="bg-secondary text-left rounded-md transition-colors h-[32px] pl-4 text-muted-foreground"
        >
          Search History
        </AccordionTrigger>
        <AccordionContent className="px-4 py-4 flex flex-col text-left">
          {historySearches.map((item) => (
            <li
              key={item.address}
              className="cursor-pointer flex items-center justify-start gap-2 my-1"
              onClick={() => {
                if (item.network === undefined) {
                  router.push(walletRoute(item.address));
                  setLoading(true);
                } else {
                  router.push(tokenRoute(item.address, item.network));
                }
              }}
            >
              {item.network === undefined ? (
                <div className="flex items-center justify-start gap-1 w-full md:gap-2">
                  <div className="bg-muted flex justify-center items-center w-[40px] h-[40px] rounded-xl">
                    <WalletSvg />
                  </div>
                  <p>{minifyContract(item.address)}</p>
                  {item.searchedTime && (
                    <p className="ml-auto text-xs text-muted-foreground">
                      {dayjs(item.searchedTime).fromNow()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-start gap-1 w-full md:gap-2">
                  <Avatar>
                    <AvatarImage
                      // src={getImageUrl(item.address)}
                      src={item.imageUrl}
                      alt="token logo"
                    />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p>{minifyTokenName(item.name)}</p>
                  {item.price_change_percentage && (
                    <div
                      className={`${
                        Number(item.price_change_percentage) > 0
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      <p className="flex items-center gap-2">
                        {Number(item.price_change_percentage) > 0 ? (
                          <IoMdArrowDropup />
                        ) : (
                          <IoMdArrowDropdown />
                        )}
                        {`${item.price_change_percentage}`} %
                      </p>
                    </div>
                  )}
                  {item.searchedTime && (
                    <p className="ml-auto text-xs text-muted-foreground">
                      {dayjs(item.searchedTime).fromNow()}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

export default SearchHistory;
