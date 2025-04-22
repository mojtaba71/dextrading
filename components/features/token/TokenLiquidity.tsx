import { KeyValue } from "@/components/ui/key-value";
import { IToken } from "@/types/token.type";
import { formatCash } from "@/utils/numbers";
import React from "react";

function TokenLiquidity({ token }: { token: IToken }) {
  return token?.data &&
    token?.data[0]?.attributes?.reserve_in_usd != undefined ? (
    <div className="flex items-center text-muted-foreground md:text-foreground md:font-bold text-xs md:text-sm justify-center md:justify-center">
      <p>{`Liquidity : `}</p>
      <p>${formatCash(+token!.data![0].attributes!.reserve_in_usd!)}</p>
    </div>
  ) : (
    <p>No liquidity data</p>
  );
}

export default TokenLiquidity;
