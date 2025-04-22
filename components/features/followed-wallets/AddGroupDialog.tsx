import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addGroup, editGroup } from "@/services/http/followed-wallets.http";
import { FollowedGroup } from "@/types/followed-wallet.type";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useCookie } from "react-use";

function AddGroupDialog({
  open,
  refetch,
  setOpen,
  editingGroup,
}: {
  open: boolean;
  refetch: () => void;
  setOpen: (value: boolean) => void;
  editingGroup?: FollowedGroup;
}) {
  const [values] = useCookie("_DEX_TRADING_TOKN");

  const [group, setGroup] = useState<FollowedGroup>({
    label: "",
    addresses: [],
    notificationThreshold: 0,
  });
  const [addresses, setAddresses] = useState<string[]>([]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (editingGroup) {
      console.log(editingGroup);

      setGroup(editingGroup);
    }
  }, [editingGroup]);

  const addAddress = () => {
    let temp = [...addresses];
    temp.push(walletAddress);
    setAddresses(temp);
    setWalletAddress("");
  };
  const removeAddress = (address: string) => {
    let temp = [...addresses];
    setAddresses(temp.filter((item) => item !== address));
  };

  const saveGroup = () => {
    let temp = {
      ...group,
      addresses: [...addresses],
    };

    if (values && group) {
      if (editingGroup) {
        editGroup(values, {
          groupId: group.id,
          newLabel: group.label,
          newThreshold: group.notificationThreshold,
        })
          .then((res) => {
            refetch();
            setOpen(false);
            toast.success("Wallet Edited Successfully");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something Went Wrong!");
          });
      } else {
        addGroup(values, temp)
          .then((res) => {
            toast.success("Group Edited Successfully");
            setOpen(false);
            refetch();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something Went Wrong!");
          });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Group</DialogTitle>
        </DialogHeader>
        {!editingGroup && (
          <div className="flex items-end gap-2">
            <Label className="w-full">
              Wallet Address
              <Input
                className="mt-2"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </Label>
            <Button variant={"outline"} onClick={addAddress}>
              <Plus />
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Label>
            Group Name
            <Input
              className="mt-2"
              value={group.label}
              onChange={(e) => setGroup({ ...group, label: e.target.value })}
            />
          </Label>
          <Label>
            Notification Threshold
            <Input
              className="mt-2"
              value={group.notificationThreshold}
              type="number"
              max={group.addresses.length}
              onChange={(e) =>
                setGroup({
                  ...group,
                  notificationThreshold: +e.target.value,
                })
              }
            />
          </Label>
        </div>
        <div className="flex flex-col gap-1">
          {addresses.map((address) => (
            <div
              className="bg-accent p-2 rounded-md flex items-center justify-between cursor-pointer"
              key={address}
              onClick={() => removeAddress(address)}
            >
              {address}
              <MdDeleteOutline />
            </div>
          ))}
        </div>
        <Button
          variant={"default"}
          className="bg-brand w-full mt-8 text-primary"
          onClick={saveGroup}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddGroupDialog;
