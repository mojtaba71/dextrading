"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { listGroup, removeGroup } from "@/services/http/followed-wallets.http";
import { useCookie } from "react-use";
import { FollowedGroup } from "@/types/followed-wallet.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "react-toastify";
import AddGroupDialog from "./AddGroupDialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function GroupList({
  groups,
  refetch,
}: {
  groups: FollowedGroup[];
  refetch: () => void;
}) {
  const [openGroup, setOpenGroup] = useState(false);
  const [values] = useCookie("_DEX_TRADING_TOKN");
  const [groupToEdit, setGroupToEdit] = useState<FollowedGroup | undefined>();

  const setOpen = (value: boolean) => {
    setOpenGroup(value);
  };

  const handleEdit = (group: FollowedGroup) => {
    setGroupToEdit({
      ...group,
      notificationThreshold: group.notification_threshold,
    });
    setOpenGroup(true);
  };

  const handleRemove = (group: FollowedGroup) => {
    if (values && group.id) {
      removeGroup(values, group.id)
        .then((res) => {
          toast.success("Wallet Removed Successfully.");
          refetch();
        })
        .catch((err) => {
          toast.error("Something Went Wrong!");
        });
    }
  };

  return (
    <div>
      <AddGroupDialog
        open={openGroup}
        setOpen={setOpen}
        refetch={refetch}
        editingGroup={groupToEdit}
      />
      {groups && groups.length > 0 ? (
        <ScrollArea className="w-full rounded-md pb-4">
          <ScrollBar orientation="horizontal" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Notification Threshold</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <GroupDetail
                  key={group.id}
                  group={group}
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

export default GroupList;

const GroupDetail = ({
  group,
  onEdit,
  onRemove,
}: {
  group: FollowedGroup;
  onEdit: (wallet: FollowedGroup) => void;
  onRemove: (wallet: FollowedGroup) => void;
}) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <>
      <TableRow onClick={() => setShowItems((draft) => !draft)}>
        <TableCell>
          <div className="flex items-center flex-wrap gap-2">
            <Image
              src={"/wallet.png"}
              alt={group.label}
              width={32}
              height={32}
            />
            <span>{group.label}</span>
          </div>
        </TableCell>
        <TableCell>{group.notification_threshold}</TableCell>
        <TableCell className="flex gap-2">
          <Button
            title="edit wallet"
            aria-label="edit wallet"
            onClick={(e) => {
              e.stopPropagation();

              onEdit(group);
            }}
            variant={"outline"}
          >
            <FiEdit3 />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(group);
            }}
            title="remove wallet"
            aria-label="remove wallet"
            variant={"outline"}
          >
            <MdDeleteOutline />
          </Button>
        </TableCell>
      </TableRow>
      {showItems &&
        group.addresses.map((address) => (
          <div className="flex items-center gap-3 p-2" key={address}>
            <Image
              src={"/wallet.png"}
              alt={group.label}
              width={32}
              height={32}
            />
            {address}
          </div>
        ))}
    </>
  );
};
