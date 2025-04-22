"use client";

import { getUserData } from "@/services/http/user.http";
import useUserStore from "@/store/User";
import { UserData } from "@/types/user.types";
import { useCallback, useEffect, useState } from "react";
import { useCookie } from "react-use";

export const useUserDetails = () => {
  const [userData, setUserData] = useState<UserData>();
  const [values] = useCookie("_DEX_TRADING_TOKN");
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(
    (value: string) => {
      getUserData(value)
        .then((response: any) => {
          const res = response.data;
          setUserData(res);

          setUser(res, res.license_key);
        })
        .catch((err) => {
          console.error(err);
          setUser(null, false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setUser]
  );

  useEffect(() => {
    if (values) {
      getData(values);
    } else {
      setLoading(false);  
    }
  }, [getData, values]);

  return { userData, getData, loading };
};
