import Image from "next/image";
import React, { ReactNode, useEffect, useState, useTransition } from "react";
import swapNetworks from "../../../utils/swap_chains.json";
import { TokenChain } from "@/store/tokenChains/networks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const swapChains = [
  {
    chainId: "1",
    imageUrl: "/networks/eth.png",
    title: "Etherium",
  },
  // {
  //   chainId: "501",
  //   imageUrl: "/networks/solana.png",
  //   title: "Solana",
  // },
  {
    chainId: "10",
    imageUrl: "/networks/optimism.png",
    title: "Optimism",
  },
  {
    chainId: "56",
    imageUrl: "/networks/bsc.png",
    title: "BSC",
  },
  {
    chainId: "8453",
    imageUrl: "/networks/base.png",
    title: "Base",
  },
];

// const ChainItem = ({chain, selectedChainId}: TokenChain) => {
//   return (
//     <div
//       key={chain.chainId}
//       className={`p-1 cursor-pointer border border-${
//         chainId === chain.chainId ? "primary" : "border"
//       } rounded-md`}
//       onClick={() => setChainId && setChainId(chain.chainId.toString())}
//     >
//       <Image
//         unoptimized
//         src={chain.imageUrl ?? ""}
//         alt=""
//         width={24}
//         title={chain.chainId}
//         height={24}
//       />
//     </div>
//   );
// };

function SwapChains({
  chainId,
  setChainId,
}: {
  chainId: string;
  setChainId?: (value: string) => void;
}) {
  const [filteredOptions, setFilteredOptions] =
    useState<TokenChain[]>(swapNetworks);
  const [selectedItem, setSelectedItem] = useState<TokenChain>();
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    startTransition(() => {
      setFilteredOptions(
        searchValue
          ? swapNetworks.filter((item) =>
              item.id.toLowerCase().includes(searchValue)
            )
          : swapNetworks
      );
    });
  };

  useEffect(() => {
    if (chainId) {
      setSelectedItem(swapNetworks.find((item) => item.chainId === +chainId));
    }
  }, [chainId]);

  const NetworkContainer = ({
    condition = true,
    children,
    className,
    onClick,
  }: {
    condition?: boolean;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }) => {
    return (
      <div
        className={`hover:bg-accent p-1 cursor-pointer border border-${
          condition ? "primary" : "border"
        } rounded-md ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="flex w-full justify-center items-center gap-3">
      {swapNetworks.slice(0, 4).map((chain) => (
        <NetworkContainer
          key={chain.chainId}
          condition={+chainId === chain.chainId}
          onClick={() => {
            setSelectedItem(chain);
            setChainId && setChainId(chain.chainId.toString());
          }}
        >
          <Image
            unoptimized
            src={chain.imageUrl.large ?? ""}
            alt=""
            width={24}
            title={chain.id}
            height={24}
          />
        </NetworkContainer>
      ))}
      {selectedItem &&
        !swapNetworks
          .slice(0, 4)
          .map((item) => item.id)
          .includes(selectedItem.id) && (
          <NetworkContainer condition={true}>
            <Image
              unoptimized
              src={selectedItem?.imageUrl?.large ?? ""}
              alt=""
              width={24}
              title={selectedItem.id}
              height={24}
            />
          </NetworkContainer>
        )}
      <Dialog open={showModal} onOpenChange={(value) => setShowModal(value)}>
        <DialogTrigger asChild>
          {/* <div className="hover:bg-accent text-xs text-muted-foreground rounded-md flex items-center justify-center cursor-pointer border border-border">
            +30
          </div> */}
          <NetworkContainer
            condition={false}
            className="h-[34px] w-[45px] text-xs text-muted-foreground flex items-center justify-center"
          >
            <span>+30</span>
          </NetworkContainer>
        </DialogTrigger>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>
              <span>Select Network</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <Input
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search Network ..."
            />
          </div>
          <div className="overflow-auto h-[300px]">
            {isPending
              ? "Loading Data ..."
              : filteredOptions.map((item: TokenChain) => (
                  <div
                    onClick={() => {
                      setSelectedItem(item);
                      item.chainId &&
                        setChainId &&
                        setChainId(item.chainId.toString());
                      setShowModal(false);
                    }}
                    className="flex items-center justify-between my-2 bg-transparent hover:bg-accent transition-all duration-200 border border-border rounded-lg p-2 cursor-pointer"
                    key={item.chainId}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        unoptimized
                        src={item.imageUrl?.large ?? ""}
                        width={32}
                        height={32}
                        alt={item.id}
                      />
                      {item.id}
                    </div>
                  </div>
                ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SwapChains;
