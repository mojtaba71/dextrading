import {
  getGroupMessages,
  getMessages,
} from "@/services/http/followed-wallets.http";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCookie } from "react-use";
import { toast } from "react-toastify";
import useHeaderStore from "@/store/ActiveHeader";
import useUserStore from "@/store/User";

const useNotification = () => {
  const [values] = useCookie("_DEX_TRADING_TOKN");
  const user = useUserStore((state) => state.user);

  const [latestWalletId, setLatestWalletId] = useState<null | number>(null);
  const [latestGroupId, setLatestGroupId] = useState<null | number>(null);
  const notificationIsOn = useHeaderStore((state) => state.notificationIsOn);

  const { data: walletList } = useQuery({
    queryKey: ["messages"],
    queryFn: () => {
      if (values) {
        return getMessages(values).then((response) => {
          if (
            latestWalletId &&
            response.data.messages[0].id !== latestWalletId
          ) {
            toast.info("New Swap for wallet Detected!");
          }
          setLatestWalletId(response.data.messages[0].id);
          return response.data.messages;
        });
      }
      return Promise.resolve(undefined);
    },
    enabled: notificationIsOn && user && values ? true : false,
    refetchInterval: 10000,
  });

  const { data: groupMessages } = useQuery({
    queryKey: ["groupMessages"],
    queryFn: () => {
      if (values) {
        return getGroupMessages(values).then((response) => {
          if (
            latestGroupId &&
            response.data.groupmessages[0].id !== latestGroupId
          ) {
            toast.info("New Swap for Group Detected!");
          }

          setLatestGroupId(response.data.groupmessages[0].id);

          return response.data.groupmessages;
        });
      }
      return Promise.resolve(undefined);
    },
    enabled: notificationIsOn && user && values ? true : false,
    refetchInterval: 10000,
  });

  return { walletList, groupMessages };
};

export default useNotification;
