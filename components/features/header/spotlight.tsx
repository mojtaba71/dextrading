"use client";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { spotlightSearch } from "@/services/http/spotlight.http";
import { searchToken } from "@/services/http/token.http";
import { useState, useEffect } from "react";
import { SpotlightSearchType } from "@/types/spotlight.type";
import { IToken } from "@/types/token.type";
import { get, set } from "local-storage";
import { minifyContract, minifyTokenName, truncate } from "@/utils/truncate";
import PriceFormatter from "@/utils/PriceFormatter";
import Loading from "@/components/common/Loading";
import { IoWalletOutline } from "react-icons/io5";
import { useDebouncedCallback, useDebounce } from "use-debounce";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { formatCash } from "@/utils/numbers";
import ChainImage from "@/utils/ChainImage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoadingStore } from "@/store";
import { getNetworkSymbol } from "@/utils/NetworkSymbol";
import { ImageComp } from "@/components/common/ImageComp";
import useNetworkSelector, { TokenChain } from "@/store/tokenChains/networks";
import { tokenRoute, walletRoute } from "@/utils/routeGenerator";
import { localStorageItem } from "@/types/localstorage.type";

dayjs.extend(relativeTime);

type PreviousSearchesProps = {
  router: ReturnType<typeof useRouter>;
  setOpen: (open: boolean) => void;
};

type SpotlightSearchResult = {
  type: "wallet" | "token";
  data: SpotlightSearchType | IToken;
};

const useSpotlightSearch = (
  debouncedSearchTerm: string,
  network: string
): UseQueryResult<SpotlightSearchResult | undefined, Error> => {
  return useQuery({
    queryKey: ["spotlightSearch", debouncedSearchTerm],
    queryFn: async (): Promise<SpotlightSearchResult | undefined> => {
      if (!debouncedSearchTerm) return;

      const tokenData = await searchToken({
        params: {
          currencyAddress: debouncedSearchTerm,
        },
      });

      if (tokenData.data && tokenData.data.length > 0) {
        return { type: "token", data: tokenData };
      }

      const data = await spotlightSearch({
        params: { address: debouncedSearchTerm },
      });

      if (data?.subject?.label?.includes("Wallet")) {
        return { type: "wallet", data };
      }

      return undefined;
    },
    enabled: !!debouncedSearchTerm,
  });
};

const addToLocalStorage = (item: localStorageItem): void => {
  if (!item) return;

  const historySearches = (get("historySearches") as localStorageItem[]) || [];

  const filteredHistroy = historySearches.filter(
    (i) => i.address !== item.address
  );

  set("historySearches", [item, ...filteredHistroy.splice(0, 20)]);
};

const PreviousSearches = ({ router, setOpen }: PreviousSearchesProps) => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  const historySearches: localStorageItem[] =
    (get("historySearches") as localStorageItem[]) || [];

  return historySearches.length ? (
    <>
      <h4>Previous searches:</h4>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {historySearches.splice(0, 5).map((item) => (
          <li
            key={item.address}
            className="cursor-pointer flex items-center justify-center"
            onClick={() => {
              if (item.network === undefined) {
                router.push(walletRoute(item.address));
                setLoading(true);
              } else {
                router.push(tokenRoute(item.address, item.network));
              }
              setOpen(false);
            }}
          >
            {item.network === undefined ? (
              <p>{minifyContract(item.address)}</p>
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
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  ) : null;
};

const Spotlight = ({
  on,
  handleOn,
}: {
  on?: boolean;
  handleOn: (value: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<SpotlightSearchType | undefined>();
  const [token, setToken] = useState<IToken | undefined>();
  const router = useRouter();
  const { selectedChain } = useNetworkSelector();
  const setLoadingStore = useLoadingStore((state) => state.setLoading);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (on !== undefined) {
      setOpen(on);
    }
  }, [on]);

  const {
    data: searchData,
    refetch: refetchSearchData,
    error: searchError,
  } = useSpotlightSearch(debouncedSearchTerm, selectedChain.id);

  useEffect(() => {
    if (searchData) {
      setLoading(false);
      if (searchData.type === "wallet") {
        setWallet(searchData.data as SpotlightSearchType);
      } else {
        setToken(searchData.data as IToken);
      }
    }
  }, [searchData]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      refetchSearchData();
    }
  }, [debouncedSearchTerm, refetchSearchData]);

  const onInputChange = useDebouncedCallback(
    (value: string) => {
      setSearchTerm(value);
      setToken(undefined);
      setWallet(undefined);
    },
    200,
    { maxWait: 2000 }
  );

  const pathname = usePathname();

  const handleNavigation = (url: string) => {
    if (pathname === "/" || !url.includes(pathname)) {
      setLoadingStore(true);
      router.push(url);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const historySearch = get("historySearches") as localStorageItem[];

  return (
    <>
      <div className="w-full max-w-[400px] relative">
        <Input
          onFocus={(e) => {
            e.preventDefault();
            handleOn((open: any) => !open);
          }}
          type="text"
          placeholder="Search for Wallets, Tokens, NFTs ..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <kbd className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </div>
      <Dialog open={open} onOpenChange={handleOn}>
        <DialogContent className="p-0 max-w-5xl rounded-md w-[99%] top-[10vh] translate-y-[0] md:top-[40%] md:translate-y-[-40%]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Search for Wallets, Tokens, NFTs ..."
            className="focus-visible:ring-0 h-12 rounded-b-none"
            onChange={(e) => onInputChange(e.target.value)}
          />
          {searchError && (
            <div className="pb-4 text-red-500">
              An error occurred while searching. Please try again.
            </div>
          )}
          {/* {imagesError && (
            <div className="pb-4 text-red-500">
              An error occurred while fetching images. Please try again.
            </div>
          )} */}
          {token || wallet ? (
            <>
              {wallet && (
                <div
                  className="cursor-pointer px-3 flex items-center gap-3 pb-4"
                  onClick={() => {
                    handleOn(!open);
                    addToLocalStorage({
                      name: wallet.subject.address,
                      address: wallet.subject.address,
                      searchedTime: Date.now(),
                    });
                    setSearchTerm("");
                    handleNavigation(
                      walletRoute(
                        wallet.subject.address,
                        getNetworkSymbol(wallet.network.network)
                      )
                    );
                  }}
                >
                  <IoWalletOutline className="text-xl" />
                  <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                      {wallet.subject.address}
                    </div>
                    <div className="block md:hidden">
                      {minifyContract(wallet.subject.address)}
                    </div>
                  </div>
                </div>
              )}
              {token && (
                <ScrollArea className="max-h-80 md:max-h-96 w-full px-3 pb-4">
                  <ScrollBar orientation="horizontal" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="sticky left-0  bg-[hsl(var(--background))] z-10">
                          Token
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Liquidity</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Chain</TableHead>
                        <TableHead>Dex</TableHead>
                        <TableHead>Age</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {token.data &&
                        token.data.map((item) => (
                          <TableRow
                            key={item.id}
                            className="cursor-pointer"
                            onClick={() => {
                              // if (
                              //   !existsInSearchHistory(
                              //     token.data?.[0]?.relationships?.base_token?.data?.id?.split(
                              //       "_"
                              //     )[1]!
                              //   )
                              // ) {
                              addToLocalStorage({
                                name: token.data![0].attributes!.name!,
                                address:
                                  token.data?.[0]?.relationships?.base_token?.data?.id?.split(
                                    "_"
                                  )[1]!,
                                network:
                                  token.data?.[0]?.relationships?.base_token?.data?.id?.split(
                                    "_"
                                  )[0]!,
                                imageUrl: token.data?.[0].imageUrl2,
                                price_change_percentage:
                                  token.data?.[0]?.attributes
                                    ?.price_change_percentage?.h24,
                                searchedTime: Date.now(),
                              });
                              // }
                              if (item?.relationships?.base_token?.data?.id) {
                                const [baseToken, tokenId] =
                                  item.relationships.base_token.data.id.split(
                                    "_"
                                  );
                                handleNavigation(
                                  tokenRoute(tokenId, baseToken)
                                );
                                setSearchTerm("");

                                handleOn(!open);
                              }
                            }}
                          >
                            <TableCell className="font-medium flex items-center justify-start gap-4 w-56 sticky left-0  bg-[hsl(var(--background))] z-10">
                              <div className="w-10 h-10">
                                {item.relationships?.base_token?.data?.id ? (
                                  // {item.relationships?.base_token?.data?.id &&
                                  // images != undefined ? (
                                  <Avatar>
                                    <AvatarImage
                                      src={item.imageUrl2}
                                      // src={getImageUrl(
                                      //   item.relationships.base_token.data.id.split(
                                      //     "_"
                                      //   )[1]
                                      // )}
                                      alt="token logo"
                                    />
                                    <AvatarFallback>
                                      {item.attributes?.name &&
                                        item.attributes.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                ) : (
                                  <ChainImage
                                    chainName={item.id!.split("_")[0]}
                                  />
                                )}
                              </div>
                              <div className="flex flex-col items-start justify-center gap-1">
                                <div className="whitespace-nowrap">
                                  {item.attributes?.name &&
                                    truncate(item.attributes?.name, 15)}
                                </div>
                                <div>
                                  {item.attributes?.address &&
                                    minifyContract(item.attributes.address)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {item?.attributes?.base_token_price_usd &&
                                PriceFormatter({
                                  value: +item.attributes.base_token_price_usd,
                                })}
                            </TableCell>
                            <TableCell>
                              {item.attributes?.price_change_percentage?.h24 &&
                                item.attributes.price_change_percentage.h24}
                              %
                            </TableCell>
                            <TableCell>
                              {item.attributes?.reserve_in_usd != undefined &&
                                `$${formatCash(
                                  +item.attributes.reserve_in_usd
                                )}`}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {item.attributes?.volume_usd?.h24 &&
                                `$${formatCash(
                                  +item.attributes.volume_usd.h24
                                )}`}
                            </TableCell>
                            <TableCell>
                              <ImageComp
                                src={`/networks/${item.id?.split("_")[0]}.png`}
                                height={20}
                                width={20}
                                alt={`${item.id
                                  ?.split("_")[0]
                                  .toLocaleLowerCase()}.png`}
                              />
                            </TableCell>
                            <TableCell>
                              {item.relationships?.dex?.data?.id &&
                                item.relationships.dex.data.id}
                            </TableCell>

                            <TableCell className="whitespace-nowrap">
                              {item.attributes?.pool_created_at &&
                                dayjs().to(item.attributes.pool_created_at)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </>
          ) : (
            <div className="pb-4">
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loading width={50} height={50} />
                </div>
              ) : (
                <p className="text-muted-foreground opacity-40 flex items-center justify-center">
                  Start typing to search
                </p>
              )}
            </div>
          )}
          <Separator />
          <div className="px-4 pb-4 flex flex-col md:flex-row items-start justify-start gap-6 md:gap-12">
            <PreviousSearches router={router} setOpen={handleOn} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Spotlight;
