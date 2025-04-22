"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddWalletDialog from "./AddWalletDialog";
import {
  listWallet,
  removeWallet,
} from "@/services/http/followed-wallets.http";
import { useCookie } from "react-use";
import { FollowedWallet } from "@/types/followed-wallet.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { minifyContract } from "@/utils/truncate";
import Copy from "@/components/ui/copy";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { log } from "console";
import { toast } from "react-toastify";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function WalletList({
  wallets,
  refetch,
}: {
  wallets: FollowedWallet[];
  refetch: () => void;
}) {
  const [openWallet, setOpenWallet] = useState(false);
  const [values] = useCookie("_DEX_TRADING_TOKN");
  const [walletToEdit, setWalletToEdit] = useState<
    FollowedWallet | undefined
  >();

  const setOpen = (value: boolean) => {
    setOpenWallet(value);
    if (value === false) {
      refetch();
    }
  };

  const handleEdit = (wallet: FollowedWallet) => {
    setWalletToEdit(wallet);
    setOpenWallet(true);
  };

  const handleRemove = (wallet: FollowedWallet) => {
    if (values && wallet.id) {
      removeWallet(values, wallet.id)
        .then((res) => {
          refetch();
        })
        .catch((err) => {
          toast.error("Something Went Wrong!");
        });
    }
  };

  return (
    <div>
      <AddWalletDialog
        open={openWallet}
        setOpen={setOpen}
        refetch={refetch}
        editingWallet={walletToEdit}
      />
      {wallets && wallets.length > 0 ? (
        <ScrollArea className="w-full rounded-md pb-4">
          <ScrollBar orientation="horizontal" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wallets.map((wallet) => (
                <WalletDetail
                  key={wallet.id}
                  wallet={wallet}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                />
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <div className="w-full flex justify-center items-center flex-col my-10">
          <Image src={"/emptyWallets.png"} alt="" width={300} height={300} />
          <h2 className="font-bold text-xl">
            The wallet has not been added yet!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Now you can add the first wallet
          </p>
          <Button
            onClick={() => setOpen(true)}
            variant={"secondary"}
            className="bg-brand flex items-center text-primary gap-3 mt-5"
          >
            <PlusIcon /> Create wallet list{" "}
          </Button>
        </div>
      )}
    </div>
  );
}

export default WalletList;

const WalletDetail = ({
  wallet,
  onEdit,
  onRemove,
}: {
  wallet: FollowedWallet;
  onEdit: (wallet: FollowedWallet) => void;
  onRemove: (wallet: FollowedWallet) => void;
}) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Image
            src={"/wallet.png"}
            alt={wallet.label}
            width={32}
            height={32}
          />
          <span className="text-ellipsis max-w-[100px] overflow-hidden">
            {wallet.label}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="token flex items-center justify-start gap-2">
          <div className="font-medium hover:underline">
            {minifyContract(wallet.address)}
          </div>
          <Copy
            className="text-sm !text-muted-foreground link p-2"
            value={wallet.address}
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex">
          <Button
            title="add wallet to group"
            aria-label="add wallet to group"
            variant={"outline"}
          >
            <PlusIcon />
          </Button>
          <Button
            title="edit wallet"
            aria-label="edit wallet"
            onClick={() => onEdit(wallet)}
            variant={"outline"}
          >
            <FiEdit3 />
          </Button>
          <Button
            onClick={() => onRemove(wallet)}
            title="remove wallet"
            aria-label="remove wallet"
            variant={"outline"}
          >
            <MdDeleteOutline />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
