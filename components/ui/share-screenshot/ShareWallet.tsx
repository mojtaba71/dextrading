import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { snapshotImage } from "@/services/http/image.http";
import { useCookie } from "react-use";
import { DownloadIcon, Share1Icon } from "@radix-ui/react-icons";
import { Button } from "../button";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import {
  AvatarPlaceholder,
} from "../avatar";
import { minifyContract } from "@/utils/truncate";
import * as htmlToImage from "html-to-image";
import { separate3digits } from "@/utils/numbers";
import { WalletSummaryType } from "@/types/wallet-summary.type";
import { Area, Tooltip } from "recharts";
import { AreaChart } from "recharts";
import { ResponsiveContainer } from "recharts";
import { IWalletProfit } from "@/types/Wallet.type";

function ShareWallet({
  className,
  wallet,
  walletAddress,
}: {
  wallet: WalletSummaryType;
  walletAddress: string;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [values] = useCookie("_DEX_TRADING_TOKN");

  let data: any[] = [];
  if (wallet && wallet.totalProfitsPerToken) {
    data = Object.values(wallet.totalProfitsPerToken).map(
      (item: IWalletProfit) => {
        return { name: item?.sellDate[0].time, profit: item?.profit };
      }
    );
  }
  data.push({ name: "", profit: 0 });
  data.reverse();

  // Share the image
  const sharePage = async () => {
    window.setTimeout(() => {
      const e = document.getElementById("screenshot-wallet");
      if (e && values) {
        htmlToImage
          .toPng(e)
          .then(async function (dataUrl) {
            const formData = new FormData();
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            formData.append("image", blob, "token-capture.png");

            snapshotImage(values, formData)
              .then((res: any) => {
                setImageSrc(res.data.imageUrl);
                setLoadingImage(false);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
      } else {
        console.error("e not found");
      }
    }, 500);
  };

  // Download the image
  const downloadImage = async () => {
    const e = document.getElementById("screenshot-wallet");
    if (e) {
      htmlToImage
        .toPng(e)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "page-snapshot.png";
          link.click();
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    } else {
      console.error("Element not found");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`w-[48px] ${className ?? ""}`}
            style={{ padding: 0 }}
            onClick={sharePage}
            variant={"ghost"}
          >
            <Share1Icon width={48} className="text-xl" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Share Wallet Details</DialogTitle>
          </DialogHeader>
          <div id="screenshot-wallet" className="bg-secondary p-4 rounded-lg">
            <div className="flex items-center gap-3 justify-center">
              <AvatarPlaceholder />
              <div>
                <div className="text-xl">{minifyContract(walletAddress)}</div>
                <div>{wallet.holdingTimeLabel}</div>
              </div>
              <div className="ml-auto text-xl">
                <h2 className="font-bold">Net Profit</h2>
                <div
                  className={`${
                    (wallet.netProfit ?? 0) > 0 ? "text-success" : "text-error"
                  }`}
                >
                  {"$" + separate3digits((wallet.netProfit ?? 0).toFixed(2))}
                </div>
              </div>
            </div>
            <div className="flex items-stretch justify-between gap-3 mt-4">
              <div className="w-[calc(33%-32px)]">
                <div className="flex flex-col items-center gap-1 my-3">
                  <div className="text-xs">Winrate</div>
                  <div className="text-xl">
                    {(+(wallet.winRate ?? 0)).toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 my-3">
                  <div className="text-xs">Avg Holding Time</div>
                  <div className="text-md mt-2">
                    {wallet.overallAverageHoldingTimeAndProfit?.HoldingTime}
                  </div>
                </div>
              </div>
              <div className="w-[calc(33%-32px)]">
                <div className="flex flex-col items-center gap-1 my-3">
                  <div className="text-xs">Highest Profit</div>
                  <div className="text-xl">
                    $
                    {separate3digits(
                      (wallet.highestProfit?.[0] ?? 0).toFixed(2)
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 my-3">
                  <div className="text-xs">Avg P&L</div>
                  <div className="text-xl">
                    {separate3digits(
                      wallet.overallAverageHoldingTimeAndProfit?.Profit?.toFixed(
                        2
                      ) ?? "0"
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[calc(33%-32px)] flex flex-col items-center justify-center">
                <ResponsiveContainer
                  className="mt-2"
                  width="100%"
                  height="100%"
                >
                  <AreaChart width={100} height={100} data={data}>
                    <defs>
                      <linearGradient id="success" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="error" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0} />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip formatter={(value: number) => value.toFixed(4)} />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke={
                        (wallet.netProfit ?? 0) > 0 ? "#82ca9d" : "#ef4444"
                      }
                      fill={
                        (wallet.netProfit ?? 0) > 0
                          ? "url(#success)"
                          : "url(#error)"
                      }
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {loadingImage ? (
            <div>{values ? "Loading Screenshot ..." : "Please Login!"}</div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div>Share via</div>
                <div className="w-[300px] h-[1px] bg-primary"></div>
              </div>
              <div className="flex w-full gap-3 items-center">
                <Link
                  href={`https://x.com/intent/post?url=${imageSrc}&text=`}
                  target="_blank"
                  className="bg-card rounded-full border border-border w-[64px] h-[64px] flex items-center justify-center"
                >
                  <FaXTwitter className="text-2xl" />
                </Link>
                {/* <div className="rounded-full border border-border w-[32px] h-[32px] flex items-center justify-center">
                      <InstagramLogoIcon />
                    </div> */}
                <Link
                  href={`https://telegram.me/share/url?url=${imageSrc}&text=`}
                  target="_blank"
                  className="bg-card rounded-full border border-border  w-[64px] h-[64px]  flex items-center justify-center"
                >
                  {/* <FaTelegramPlane className="text-3xl" /> */}
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M43.9181 8.71175C43.8863 8.56402 43.8159 8.42737 43.714 8.31574C43.6121 8.20412 43.4825 8.12151 43.3383 8.07634C42.7522 7.85426 41.7652 8.18738 41.7652 8.18738C41.7652 8.18738 6.71581 20.7969 4.71704 22.1787C4.28521 22.4872 4.14025 22.6538 4.0693 22.8573C3.72075 23.8506 4.80033 24.2886 4.80033 24.2886L13.8349 27.2343C13.9872 27.259 14.1432 27.2495 14.2914 27.2065C16.3457 25.9079 34.9576 14.1498 36.0403 13.7549C36.2069 13.7025 36.3487 13.7549 36.2994 13.8783C35.8706 15.3866 19.6985 29.7605 19.6985 29.7605C19.6585 29.8121 19.6244 29.8679 19.5967 29.927H19.5782L18.7362 38.8721C18.7362 38.8721 18.3814 41.6174 21.1267 38.8721C23.0637 36.9351 24.936 35.3157 25.8737 34.5261C28.9798 36.6852 32.3235 39.0449 33.7639 40.2848C34.0061 40.5188 34.2928 40.7019 34.607 40.8232C34.9211 40.9445 35.2564 41.0017 35.593 40.9912C36.9626 40.9388 37.345 39.4489 37.345 39.4489C37.345 39.4489 43.73 13.7457 43.9459 10.3003C43.9675 9.96406 43.9953 9.74815 43.9953 9.51681C44.0093 9.24613 43.9833 8.97486 43.9181 8.71175Z"
                      fill="#1D93D2"
                    />
                  </svg>
                </Link>
                <Link
                  href={`https://www.instagram.com/?url=${imageSrc}`}
                  target="_blank"
                  className="bg-card rounded-full border border-border  w-[64px] h-[64px]  flex items-center justify-center"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.3117 6H16.6934C13.8598 6.00401 11.1432 7.13099 9.13883 9.13406C7.1345 11.1371 6.0058 13.853 6 16.6866V31.3067C6.00401 34.14 7.13078 36.8563 9.13348 38.8606C11.1362 40.8649 13.8516 41.9938 16.685 42H31.3033C34.1366 41.996 36.8531 40.8696 38.8578 38.8673C40.8626 36.8651 41.9924 34.1501 42 31.3168V16.695C41.9942 13.8615 40.8666 11.1455 38.8636 9.14129C36.8606 7.13702 34.1453 6.00758 31.3117 6ZM38.1847 16.695V31.3151C38.182 33.1368 37.4569 34.883 36.1685 36.1709C34.88 37.4587 33.1334 38.1829 31.3117 38.1847H16.6934C14.8719 38.1825 13.1254 37.4581 11.8371 36.1704C10.5487 34.8826 9.82357 33.1366 9.82045 31.3151V16.695C9.82312 14.873 10.5481 13.1264 11.8364 11.8381C13.1248 10.5497 14.8714 9.82475 16.6934 9.82207H31.3117C33.1347 9.82296 34.8828 10.5472 36.1724 11.8358C37.4619 13.1244 38.1876 14.872 38.1898 16.695H38.1847ZM24.0048 14.0898C22.0357 14.0898 20.1106 14.6737 18.4734 15.7677C16.8362 16.8617 15.5602 18.4166 14.8066 20.2358C14.0531 22.055 13.856 24.0568 14.2402 25.9881C14.6243 27.9194 15.5724 29.6933 16.9647 31.0857C18.3571 32.4781 20.1311 33.4263 22.0623 33.8104C23.9936 34.1946 25.9955 33.9974 27.8147 33.2439C29.6339 32.4903 31.1888 31.2143 32.2828 29.577C33.3768 27.9398 33.9606 26.0149 33.9606 24.0458C33.9579 21.4061 32.9082 18.8754 31.0417 17.0088C29.1752 15.1423 26.6444 14.0925 24.0048 14.0898ZM30.1387 24.0458C30.1393 25.2595 29.7799 26.4461 29.1061 27.4556C28.4322 28.4651 27.4742 29.252 26.353 29.7169C25.2319 30.1817 23.998 30.3036 22.8076 30.0671C21.6171 29.8306 20.5234 29.2464 19.665 28.3882C18.8067 27.5301 18.2222 26.4367 17.9854 25.2464C17.7486 24.056 17.87 22.8221 18.3346 21.7008C18.7991 20.5795 19.5858 19.6212 20.5951 18.947C21.6044 18.2729 22.7911 17.9133 24.0048 17.9136C25.629 17.9185 27.1854 18.5657 28.3342 19.7139C29.4831 20.8621 30.131 22.4181 30.1368 24.0424L30.1387 24.0458ZM36.5512 15.4846C36.5512 16.6896 35.5744 17.6665 34.3694 17.6665C33.1644 17.6665 32.1875 16.6896 32.1875 15.4846C32.1875 14.2796 33.1644 13.3027 34.3694 13.3027C35.5744 13.3027 36.5512 14.2796 36.5512 15.4846Z"
                      fill="url(#paint0_linear_3006_6703)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3006_6703"
                        x1="7.13375"
                        y1="8.2512"
                        x2="39.7577"
                        y2="38.6253"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9CE34" />
                        <stop offset="0.531578" stop-color="#EE2A7B" />
                        <stop offset="1" stop-color="#6228D7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </Link>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    imageSrc || ""
                  )}`}
                  target="_blank"
                  className="bg-card rounded-full border border-border w-[64px] h-[64px] flex items-center justify-center"
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.3798 17.581H7.15279C6.83204 17.581 6.57214 17.841 6.57214 18.1617V41.3791C6.57214 41.6998 6.83204 41.9597 7.15279 41.9597H14.3798C14.7006 41.9597 14.9605 41.6998 14.9605 41.3791V18.1617C14.9605 17.841 14.7006 17.581 14.3798 17.581Z"
                      fill="#0075B5"
                    />
                    <path
                      d="M10.769 6.03906C8.13933 6.03906 6 8.17607 6 10.8028C6 13.4307 8.13933 15.5685 10.769 15.5685C13.3965 15.5685 15.5341 13.4306 15.5341 10.8028C15.5342 8.17607 13.3965 6.03906 10.769 6.03906Z"
                      fill="#0075B5"
                    />
                    <path
                      d="M32.7624 17.004C29.8598 17.004 27.7141 18.2518 26.4126 19.6696V18.1616C26.4126 17.841 26.1527 17.581 25.832 17.581H18.9108C18.59 17.581 18.3301 17.841 18.3301 18.1616V41.3791C18.3301 41.6998 18.59 41.9597 18.9108 41.9597H26.122C26.4428 41.9597 26.7027 41.6998 26.7027 41.3791V29.8918C26.7027 26.0209 27.7541 24.5129 30.4525 24.5129C33.3913 24.5129 33.6248 26.9304 33.6248 30.091V41.3792C33.6248 41.7 33.8847 41.9599 34.2054 41.9599H41.4194C41.7401 41.9599 42 41.7 42 41.3792V28.644C42 22.8881 40.9025 17.004 32.7624 17.004Z"
                      fill="#0075B5"
                    />
                  </svg>
                </Link>
                <Button
                  onClick={downloadImage}
                  variant={"outline"}
                  className="h-[48px] ml-auto flex gap-3 text-sm bg-card"
                >
                  <DownloadIcon width={16} className="text-xs" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShareWallet;
