"use client";

import React, { ReactNode, useEffect, useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WalletSvg from "@/components/ui/icons/WalletSvg";
import ConnectWalletSvg from "@/components/svg/ConnectWalletSvg";
import PhantomSvg from "@/components/svg/PhantomSvg";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { minifyContract } from "@/utils/truncate";
import { UnplugIcon } from "lucide-react";
import SolanaSwapButton from "../swap/SolanaSwapButton";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletItemContainer = ({
  children,
  name,
  onClick,
  isConnected,
  handleDisconnect,
}: {
  children: ReactNode;
  name: string;
  isConnected: boolean;
  onClick: () => void;
  handleDisconnect: () => void;
}) => (
  <div
    onClick={onClick}
    className="border border-border p-3 rounded-md flex flex-col items-center gap-2 w-[150px] justify-center cursor-pointer hover:bg-accent transition-all duration-75"
  >
    {children}
    {isConnected ? (
      <Button
        aria-label="disconnect wallet"
        onClick={handleDisconnect}
        variant={"ghost"}
        className="text-error border-0 shadow-none hover:bg-secondary"
      >
        <div className="mr-3">
          <UnplugIcon width={18} />
        </div>
        <div>Disconnect</div>
      </Button>
    ) : (
      <p className="text-xs text-muted-foreground">{name}</p>
    )}
  </div>
);

function ConnectWallet({
  opened,
  className = "",
  children,
}: {
  opened: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const {
    isConnected: connectWalletIsConnected,
    address: connectWalletAddress,
  } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const [openDisconnectWallet, setOpenDisconnectWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWalletToConnect = () => {
    if (connectWalletIsConnected) {
      // router.push('/dashboard');
      setOpenDisconnectWallet((prev) => !prev);
    } else {
      open();
    }
  };

  const handleDisconnectConnectWallet = () => {
    disconnect();
    setWalletAddress("");
  };

  const {
    select,
    wallets,
    publicKey,
    connect,
    disconnect: disconnectPhantom,
    connecting,
    connected: phantomConnected,
  } = useWallet();

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toString());
    } else if (connectWalletAddress) {
      setWalletAddress(connectWalletAddress);
    }
  }, [publicKey, connectWalletAddress]);

  const handleConnectPhantom = async () => {
    try {
      // console.log(wall);

      if (wallets[0] && wallets[0].adapter) select(wallets[0].adapter.name); // Select the first available wallet
      await connect();
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          <div>{children}</div>
        ) : (
          <Button
            variant="ghost"
            className={`flex gap-3 justify-start items-center bg-primary-foreground ${className}`}
            style={{
              width: opened ? "100%" : 48,
              padding: 0,
              paddingLeft: 10,
              height: 48,
            }}
          >
            <WalletSvg />
            {opened && (
              <span
                className={`${connectWalletIsConnected ? "font-bold" : ""}`}
              >
                {walletAddress.length > 0
                  ? minifyContract(walletAddress, 4, 4)
                  : "Connect Wallet"}
              </span>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Select Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-3 mt-4">
          <WalletItemContainer
            onClick={handleConnectWalletToConnect}
            isConnected={connectWalletIsConnected}
            handleDisconnect={handleDisconnectConnectWallet}
            name="Connect Wallet"
          >
            <ConnectWalletSvg />
          </WalletItemContainer>

          {/* <SolanaSwapButton onConnected={onConnectedWallet} /> */}
          <WalletItemContainer
            onClick={handleConnectPhantom}
            isConnected={phantomConnected}
            handleDisconnect={() => {
              disconnectPhantom();
              setWalletAddress("");
            }}
            name="Phantom"
          >
            <PhantomSvg />
          </WalletItemContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConnectWallet;
