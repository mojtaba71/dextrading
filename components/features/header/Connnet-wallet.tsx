"use client";

import { Button } from "@/components/ui/button";
import { minifyContract } from "@/utils/truncate";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LuWallet } from "react-icons/lu";
import { useAccount, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCampaignStatus } from "@/services/http/campaign.http";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import localforage from "localforage";
import Countdown from "react-countdown";
import { IoMdTime } from "react-icons/io";
import { UnplugIcon } from "lucide-react";
import WalletSvg from "@/components/ui/icons/WalletSvg";

interface CampaignStatus {
  name?: string;
  description?: string;
  duration?: string;
  specialOffer?: {
    originalPrice: number;
    discountedPrice: number;
    discountDuration: string;
  };
  eligibility: {
    isEligible: boolean;
  };
}

export default function ConnectWalletButton({ opened }: { opened: boolean }) {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = useWindowSize();
  const [openDisconnectWallet, setOpenDisconnectWallet] = useState(false);
  const router = useRouter();

  // const { data: campaignStatus, refetch } = useQuery<CampaignStatus>({
  //   queryKey: ["campaignStatus", address],
  //   queryFn: () => getCampaignStatus({ params: { address: address } }),
  //   enabled: false,
  // });

  useEffect(() => {
    const checkCampaignStatus = async () => {
      if (isConnected && address) {
        const storedCampaignStatus = await localforage.getItem(
          "campaignStatus"
        );
        if (!storedCampaignStatus) {
          // refetch().then((result) => {
          //   if (result.data?.eligibility.isEligible) {
          //     setIsOpen(true);
          //     localforage.setItem("campaignStatus", result.data);
          //   }
          // });
        }
      }
    };

    checkCampaignStatus();
  }, [isConnected, address]);
  // }, [isConnected, address, refetch]);

  useEffect(() => {
    if (!isConnected) {
      localforage.removeItem("campaignStatus");
    }
  }, [isConnected]);

  const calculateEndDate = (duration: string) => {
    const durationInDays = parseInt(duration.split(" ")[0]);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationInDays);
    return endDate;
  };

  const handleButtonClick = () => {
    if (isConnected) {
      // router.push('/dashboard');
      setOpenDisconnectWallet((prev) => !prev);
    } else {
      open();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setOpenDisconnectWallet(false);
  };

  return (
    <div className="relative w-full">
      <Button
        variant="ghost"
        size="icon"
        aria-label="wallet"
        className={`flex items-center justify-${
          opened ? "start" : "center"
        } gap-3 bg-primary-foreground w-full md:w-full p-2`}
        onClick={handleButtonClick}
        style={{minHeight: 48}}
      >
        <WalletSvg />
        {opened && (
          <h3 className="block">
            {isConnected && address
              ? minifyContract(address)
              : "Connect Wallet"}
          </h3>
        )}
      </Button>
      {openDisconnectWallet && (
        <div className="absolute top-[48px] left-0 bg-secondary rounded-md w-full z-10 cursor-pointer">
          <Button
            aria-label="disconnect"
            onClick={handleDisconnect}
            className="bg-transparent text-[hsl(var(--foreground))] border-0 shadow-none hover:bg-secondary"
          >
            <div className="mr-3">
              <UnplugIcon width={18} />
            </div>
            <div>Disconnect</div>
          </Button>
        </div>
      )}
      {/* <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Congratulations!</AlertDialogTitle>
            <AlertDialogDescription>
              {campaignStatus?.name && (
                <>
                  <h2>{campaignStatus.name}</h2>
                  <p>{campaignStatus.description}</p>
                  <div className="offer">
                    <Card className="mt-5">
                      <CardHeader>
                        <CardTitle>Special Offer 🎉</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <span className="text-lg line-through decoration-2">
                          ${campaignStatus.specialOffer?.originalPrice}
                        </span>
                        <span className="text-lg ml-2">
                          ${campaignStatus.specialOffer?.discountedPrice}
                        </span>{" "}
                        / {campaignStatus.specialOffer?.discountDuration}
                        <div className="flex items-center justify-start gap-1">
                          <IoMdTime />
                          <strong>Time left:</strong>
                          <p>
                            {campaignStatus.duration && (
                              <Countdown
                                date={calculateEndDate(campaignStatus.duration)}
                              />
                            )}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <li className="flex items-center justify-start gap-2">
                          <form
                            action="https://www.coinpayments.net/index.php"
                            method="post"
                          >
                            <input type="hidden" name="cmd" value="_pay" />
                            <input type="hidden" name="reset" value="1" />
                            <input
                              type="hidden"
                              name="merchant"
                              value="b632cb0b942adad65d424d9382f957d7"
                            />
                            <input
                              type="hidden"
                              name="item_name"
                              value="Dextrading Subscription"
                            />
                            <input type="hidden" name="currency" value="USD" />
                            <input
                              type="hidden"
                              name="amountf"
                              value={
                                campaignStatus.specialOffer?.discountedPrice
                              }
                            />
                            <input type="hidden" name="quantity" value="1" />
                            <input
                              type="hidden"
                              name="allow_quantity"
                              value="0"
                            />
                            <input
                              type="hidden"
                              name="want_shipping"
                              value="0"
                            />
                            <input type="hidden" name="allow_extra" value="0" />
                            <input
                              type="image"
                              src="https://www.coinpayments.net/images/pub/buynow-grey.png"
                              alt="Buy Now with CoinPayments.net"
                            />
                          </form>
                          <p>USDT-TRC20, Solana, TRX</p>
                        </li>
                      </CardFooter>
                    </Card>
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      {isOpen && <Confetti width={width} height={height} />}
    </div>
  );
}
