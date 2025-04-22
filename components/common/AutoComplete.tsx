import { minifyTokenName } from "@/utils/truncate";
import Image from "next/image";
import React, { useEffect, useTransition } from "react";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import swapNetworks from "../../utils/swap_chains.json";
import { useQuery } from "@tanstack/react-query";
import { listAvailableTokens, searchSwapToken } from "@/utils/okx";

export interface OkxToken {
  decimals: string;
  tokenContractAddress: string;
  tokenLogoUrl: string;
  tokenName: string;
  tokenSymbol: string;
}

function TokenAutoComplete({
  token,
  items,
  onSelected,
  chainId,
}: {
  token?: OkxToken;
  items: OkxToken[];
  onSelected: (token: OkxToken) => void;
  chainId: string;
}) {
  const [filteredOptions, setFilteredOptions] = useState<OkxToken[]>(
    items.slice(0, 20)
  );
  const [selectedItem, setSelectedItem] = useState<OkxToken>(
    token || {
      tokenName: "",
      tokenLogoUrl: "",
      tokenContractAddress: "",
      tokenSymbol: "",
      decimals: "",
    }
  );
  const [showItems, setShowItems] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (token) setSelectedItem(token);
  }, [token]);

  useEffect(() => {
    setFilteredOptions(items.slice(0, 20));
  }, [items]);

  // const [searching, setSearching] = useState(false);
  const { data: tokens } = useQuery({
    queryKey: ["okxTokens-search", chainId, searchValue],
    queryFn: () => searchSwapToken({ chainId, inputContent: searchValue }),
  });

  useEffect(() => {
    if (tokens && tokens.data && tokens.data.thirdPartyList) {
      console.log(tokens.data.thirdPartyList);

      setFilteredOptions([...tokens.data.thirdPartyList, ...tokens.data.systemList]);
    } else {
      setFilteredOptions(
        searchValue
          ? items.filter(
              (item) =>
                item.tokenSymbol.toLowerCase().includes(searchValue) ||
                item.tokenContractAddress.includes(searchValue)
            )
          : items.slice(0, 20)
      );
    }
  }, [tokens]);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    startTransition(() => {
      // let temp = items.filter(
      //   (item) =>
      //     item.tokenSymbol.toLowerCase().includes(value) ||
      //     item.tokenContractAddress.includes(value)
      // )
      // if (temp.length > 0) {
      setFilteredOptions(
        value
          ? items.filter(
              (item) =>
                item.tokenSymbol.toLowerCase().includes(value) ||
                item.tokenContractAddress.includes(value)
            )
          : items.slice(0, 20)
      );
      // } else {
      //   setSearching(true)
      // }
    });
  };

  return (
    <div className="relative flex items-center gap-3 justify-end w-full cursor-pointer">
      <Dialog open={showItems} onOpenChange={(value) => setShowItems(value)}>
        <DialogTrigger asChild>
          <div
            onClick={() => setShowItems(true)}
            className="flex items-center cursor-pointer gap-2 text-[hsl(var(--card-foreground))]"
          >
            {selectedItem?.tokenLogoUrl && (
              <Image
                unoptimized
                src={selectedItem?.tokenLogoUrl}
                width={32}
                height={32}
                alt=""
              />
            )}
            <div className="max-w-[60px] overflow-hidden">{selectedItem?.tokenSymbol}</div>
            <MdOutlineKeyboardArrowDown />
          </div>
        </DialogTrigger>

        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>
              <span>Select Token</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <Input
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search Name , Contract Address ..."
            />
          </div>
          <div className="overflow-auto h-[300px]">
            {isPending
              ? "Loading Data ..."
              : filteredOptions.map((item: OkxToken) => (
                  <div
                    onClick={() => {
                      setSelectedItem(item);
                      setShowItems(false);
                      onSelected(item);
                    }}
                    className="flex items-center justify-between my-2 bg-transparent hover:bg-accent transition-all duration-200 border border-border rounded-lg p-2 cursor-pointer"
                    key={item.tokenContractAddress}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        unoptimized
                        src={item.tokenLogoUrl}
                        width={32}
                        height={32}
                        alt={item.tokenSymbol}
                      />
                      {item.tokenSymbol}
                    </div>
                    <div>
                      <Image
                        unoptimized
                        src={
                          swapNetworks.find((item) => item.chainId === +chainId)
                            ?.imageUrl.large ?? ""
                        }
                        alt=""
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TokenAutoComplete;
