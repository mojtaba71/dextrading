"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addWallet, editWallet } from "@/services/http/followed-wallets.http";
import { FollowedWallet } from "@/types/followed-wallet.type";
import React, { useEffect, useState } from "react";
import { useCookie } from "react-use";
import { toast } from "react-toastify";
import { DialogTitle } from "@radix-ui/react-dialog";

function AddWalletDialog({
  open,
  setOpen,
  refetch,
  editingWallet,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
  editingWallet?: FollowedWallet;
}) {
  const [values] = useCookie("_DEX_TRADING_TOKN");

  const [wallet, setWallet] = useState<{
    address: string;
    label: string;
  }>({ label: "", address: "" });

  useEffect(() => {
    if (editingWallet) {
      setWallet(editingWallet);
    }
  }, [editingWallet]);

  const onSaveWallet = () => {
    if (values && wallet) {
      editWallet(values, wallet)
        .then((res) => {
          setOpen(false);
          refetch();
          toast.success("Wallet Edited Successfully");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something Went Wrong!");
        });
    }
  };
  const addNewWallet = () => {
    if (values && wallet) {
      addWallet(values, wallet)
        .then((res) => {
          setOpen(false);
          refetch();
          toast.success("Wallet Added Successfully");
        })
        .catch((err) => {
          toast.error("Something Went Wrong!");
          console.error(err);
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            {editingWallet ? "Edit" : "Add New"} Wallet
          </DialogTitle>
        </DialogHeader>
        <Label>
          Wallet Address
          <Input
            className="mt-2"
            value={wallet.address}
            disabled={editingWallet ? true : false}
            onChange={(e) => setWallet({ ...wallet, address: e.target.value })}
          />
        </Label>
        <Label>
          Wallet Label
          <Input
            className="mt-2"
            value={wallet.label}
            onChange={(e) => setWallet({ ...wallet, label: e.target.value })}
          />
        </Label>

        <Button
          variant={"default"}
          onClick={() => {
            if (editingWallet) {
              onSaveWallet();
            } else {
              addNewWallet();
            }
          }}
          className="bg-brand w-full mt-8 text-primary"
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddWalletDialog;
