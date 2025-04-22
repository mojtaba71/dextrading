"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import clsx from "clsx";
import { Wallet2Icon } from "lucide-react";
import WalletSvg from "@/components/ui/icons/WalletSvg";
import ConnectWallet from "@/components/features/connect-wallet/ConnectWallet";

export function ConnectWalletMessage({
  message = "Connect with wallet to see info",
}: {
  message?: string;
}) {
  const { open } = useWeb3Modal();

  return (
    <div className="flex flex-col items-center justify-center gap-2 my-5">
      <Button variant="outline" onClick={() => open()}>
        {message}
      </Button>
    </div>
  );
}
export function ConnectWalletSection() {
  // const { open } = useWeb3Modal();

  return (
    <div className="flex items-center flex-col h-full justify-between gap-2 mt-5">
      <div className="text-brand flex items-start xl:items-center bg-accent p-4 rounded-xl w-full">
        <div className="min-w-1 mr-3">
          <WalletSvg fill="hsl(var(--brand))" />
        </div>
        <p>You can sign in with your wallets when connecting them below</p>{" "}
      </div>
      <div className="w-full">
        <ConnectWallet opened={true}>
          <Button
            className="flex items-center mt-3 w-full bg-brand gap-3"
            variant="outline"
          >
            <WalletSvg />
            <div>Link Wallet</div>
          </Button>
        </ConnectWallet>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  iconPath: string;
  children: React.ReactNode;
  classNames?: string;
}

export function DashboardCard({
  title,
  iconPath,
  children,
  classNames,
}: DashboardCardProps) {
  return (
    <Card className={clsx("w-full h-full", classNames)}>
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d={iconPath} />
        </svg>
      </CardHeader>
      <div className="w-full h-[1px] bg-[hsl(var(--muted))] mb-3"></div>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
