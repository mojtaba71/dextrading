import { useEffect, useState } from "react";
import { usePaidMember } from "./PaidMember";
import useUserStore from "@/store/User";

//Middleware request
export const useDailyAccess = (featureKey: string) => {
  // const { paidMember } = usePaidMember();
  const hasLicense = useUserStore((state) => state.hasLicense);

  const [limitedToday, setLimitedToday] = useState(false);

  useEffect(() => {
    // Check the last access time from local storage
    const lastAccess = localStorage.getItem(featureKey);
    const today = new Date().toDateString();
    
    // If lastAccess exists and it matches today's date, then the feature has been accessed today
    if (lastAccess === today) {
      setLimitedToday(true);
    } else {
      setLimitedToday(false);
    }
  }, [featureKey]);

  // Function to grant access and update the access date
  const grantAccess = () => {
    const today = new Date().toDateString();
    localStorage.setItem(featureKey, today);
    setLimitedToday(true);
  };

  return { limitedToday: hasLicense ? false : limitedToday, grantAccess };
};
