"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import WalletList from "./WalletList";
import AddGroupDialog from "./AddGroupDialog";
import GroupList from "./GroupList";
import WalletsNotifications from "../wallets-notifications/WalletsNotifications";
import AddWalletDialog from "./AddWalletDialog";
import { listGroup, listWallet } from "@/services/http/followed-wallets.http";
import { FollowedGroup, FollowedWallet } from "@/types/followed-wallet.type";
import { useCookie } from "react-use";
import { useUserDetails } from "@/hooks/UserDetails";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import TrackedWalletsSection from "../homepage/followed-wallets/FollowedWalletsSection";
import HowToUse from "./HowToUse";
import HiddenElementForSeo from "@/components/common/HiddenElementForSeo";
import TrackedWalletsHiddenContentForSeo from "./TrackedWalletsHiddenContentForSeo";

function FollowedWalletsPage() {
  const [openWallet, setOpenWallet] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [wallets, setWallets] = useState<FollowedWallet[]>([]);
  const [groups, setGroups] = useState<FollowedGroup[]>([]);
  const [values] = useCookie("_DEX_TRADING_TOKN");
  const { userData } = useUserDetails();

  const setOpen = (value: boolean) => {
    setOpenWallet(value);
  };
  const setOpenGroupDialog = (value: boolean) => {
    setOpenGroup(value);
  };

  const fetchList = () => {
    if (userData && values) {
      listWallet(values)
        .then((res) => {
          setWallets(res.data.wallets);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const fetchGroup = () => {
    if (userData && values) {
      listGroup(values)
        .then((res) => {
          setGroups(res.data.groups);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    fetchList();
    fetchGroup();
  }, []);

  return (
    <div className="w-full">
      {userData ? (
        <>
          <AddWalletDialog
            open={openWallet}
            setOpen={setOpen}
            refetch={fetchList}
          />
          <AddGroupDialog
            refetch={fetchGroup}
            open={openGroup}
            setOpen={setOpenGroupDialog}
          />
          <div className="flex items-center gap-3 w-full">
            <h1 className="flex font-bold text-2xl justify-start">
              The Wallets you follow
            </h1>
            <Button
              onClick={() => setOpen(true)}
              variant={"default"}
              className="ml-auto"
            >
              Add Wallet
            </Button>
            <Button
              onClick={() => setOpenGroupDialog(true)}
              variant={"default"}
            >
              Add Group
            </Button>
          </div>
          <div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="bg-card rounded-2xl p-3 w-full md:w-[calc(66%-8px)]">
                <WalletsNotifications />
              </div>
              <div className="bg-card rounded-2xl p-3 w-full md:w-[calc(33%-8px)] overflow-auto">
                <Tabs defaultValue="wallets">
                  <TabsList>
                    <TabsTrigger value="wallets">Wallet List</TabsTrigger>
                    <TabsTrigger value="groups">Group List</TabsTrigger>
                  </TabsList>
                  <TabsContent value="wallets">
                    <WalletList wallets={wallets} refetch={fetchList} />
                  </TabsContent>
                  <TabsContent value="groups">
                    <GroupList groups={groups} refetch={fetchGroup} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      ) : (
        <TrackedWalletsSection />
      )}
      <HowToUse />
      <TrackedWalletsHiddenContentForSeo />
    </div>
  );
}

export default FollowedWalletsPage;
