import { KeyValue } from "@/components/ui/key-value";
import { IToken } from "@/types/token.type";
import React from "react";

function TokenBuySellTaxes({ token }: { token: IToken }) {
  return (
    <div className="flex items-center justify-start gap-2 text-xs md:text-xl">
      {token.SecurityData?.tokenSecurity?.details?.buy_tax != undefined ? (
        <KeyValue
          title="Buy tax"
          value={`${
            +token!.SecurityData!.tokenSecurity!.details!.buy_tax! * 100
          }%`}
          variant="good"
          valueClassName="font-bold"
          className="text-sm"
        />
      ) : (
        <p>Buy Tax = 0</p>
      )}
      {token.SecurityData?.tokenSecurity?.details?.sell_tax != undefined ? (
        <KeyValue
          title="Sell tax"
          value={`${
            +(+token!.SecurityData!.tokenSecurity!.details!.sell_tax!).toFixed(
              2
            ) * 100
          }%`}
          variant="bad"
          valueClassName="font-bold"
          className="text-sm"
        />
      ) : (
        <p>Sell Tax = 0</p>
      )}
    </div>
  );
}

export default TokenBuySellTaxes;
