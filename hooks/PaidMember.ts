import { isPaidMember } from "@/services/auth.service";
import { useEffect, useState } from "react";

//Middleware request
export const usePaidMember = () => {
    const [paidMember, setPaidMember] = useState(false);
    const [loadingPaidMember, setLoadingPaidMember] = useState(true);
    useEffect(() => {
        isPaidMember().then((result) => {
            setPaidMember(result);
            setLoadingPaidMember(false);
        });
    }, []);
    return { paidMember, loadingPaidMember };
};
