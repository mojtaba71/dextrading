import { IToken } from "@/types/token.type";
import React, { useState } from "react";
import { IoMdTrendingDown } from "react-icons/io";
import { IoTrendingUp } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";

interface Props {
  token: IToken;
}

const TransactionStats = ({ token }: Props) => {
  const [selectedTime, setSelectedTime] = useState<string>("h24");

  const transactions =
    token.data &&
    token.data.length > 0 &&
    token.data[0].attributes?.transactions &&
    token.data[0].attributes?.transactions[selectedTime];

  const sells = transactions?.sells || 0;
  const buys = transactions?.buys || 0;

  const sellers = transactions?.sellers || 0;
  const buyers = transactions?.buyers || 0;

  return (
    <div className="rounded-md mt-3">
      <div className="flex flex-col md:flex-row justify-between gap-2 md:justify-end text-xs ">
        <div className="flex items-center justify-between gap-2 w-full">
          {sells > 0 && (
            <div className="w-full flex gap-2 items-center border border-base-content/50 justify-center py-1 px-2 rounded-lg lg:border-1">
              {sells > 0 && (
                <span className="whitespace-nowrap flex items-center gap-1">
                  <span>{sells} Sells</span>
                  <IoMdTrendingDown className="text-lg text-error" />
                </span>
              )}
            </div>
          )}
          {buys > 0 && (
            <div className="w-full flex gap-2 items-center border border-base-content/50 justify-center py-1 px-2 rounded-lg lg:border-1">
              {buys > 0 && (
                <span className="whitespace-nowrap flex items-center gap-1">
                  <span>{buys} Buys</span>
                  <IoTrendingUp className="text-lg text-success" />
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          {sellers > 0 && (
            <div className="w-full flex gap-2 items-center border border-base-content/50 justify-center py-1 px-2 rounded-lg lg:border-1">
              {sellers > 0 && (
                <span className="whitespace-nowrap flex items-center gap-1">
                  <span>{sellers} Sellers</span>
                  <LuWallet className="text-lg text-error" />
                </span>
              )}
            </div>
          )}
          {buyers > 0 && (
            <div className="w-full flex gap-2 items-center border border-base-content/50 justify-center py-1 px-2 rounded-lg lg:border-1">
              {buyers > 0 && (
                <span className="whitespace-nowrap flex items-center gap-1">
                  <span>{buyers} Buyers</span>
                  <LuWallet className="text-lg text-success" />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionStats;
