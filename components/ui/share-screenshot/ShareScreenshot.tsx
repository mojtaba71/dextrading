import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { snapshotImage } from "@/services/http/image.http";
import { useCookie } from "react-use";
import { Share1Icon } from "@radix-ui/react-icons";
import { CopyIcon, DownloadIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../button";
import Link from "next/link";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";

function ShareScreenshot({
  element,
  className,
}: {
  element: any;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [values] = useCookie("_DEX_TRADING_TOKN");

  // Share the image
  const sharePage = async () => {
    if (element) {
      const canvas = await html2canvas(element);
      // Convert canvas to Blob
      canvas.toBlob(async (blob) => {
        if (blob && values) {
          const formData = new FormData();
          formData.append("image", blob, "token-capture.png");

          snapshotImage(values, formData)
            .then((res: any) => {
              setImageSrc(res.data.imageUrl);
              setLoadingImage(false);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.error("Blob is null");
        }
      });
    } else {
      console.error("Element not found");
    }
  };

  // Download the image
  const downloadImage = async () => {
    if (element) {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "page-snapshot.png";
      link.click();
    } else {
      console.error("Element not found");
    }
  };

  return (
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
          <DialogTitle>Share Wallet Details</DialogTitle>
        </DialogHeader>
        {loadingImage ? (
          <div>{values ? "Loading Screenshot ..." : "Please Login!"}</div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Input value={imageSrc?.toString()} readOnly />
              <Button
                onClick={() => navigator.clipboard.writeText(imageSrc ?? "")}
                className="flex gap-3 bg-brand"
              >
                <CopyIcon className="text-xs" />
                Copy
              </Button>
            </div>
            <div className="flex flex-col items-center">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  unoptimized
                  alt=""
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div>
              <div className="mb-2">Share via</div>
              <div className="flex w-full gap-3 items-center">
                <Link
                  href={`https://x.com/intent/post?url=${imageSrc}&text=`}
                  target="_blank"
                  className="rounded-full border border-border w-[32px] h-[32px] flex items-center justify-center"
                >
                  <FaXTwitter />
                </Link>
                {/* <div className="rounded-full border border-border w-[32px] h-[32px] flex items-center justify-center">
                      <InstagramLogoIcon />
                    </div> */}
                <Link
                  href={`https://telegram.me/share/url?url=${imageSrc}&text=`}
                  target="_blank"
                  className="rounded-full border border-border w-[32px] h-[32px] flex items-center justify-center"
                >
                  <FaTelegram />
                </Link>
                <Button
                  onClick={downloadImage}
                  variant={"outline"}
                  className="h-[48px] ml-auto flex gap-3 text-sm"
                >
                  <DownloadIcon width={16} className="text-xs" />
                  Save
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ShareScreenshot;
