import PriceFormatter from '@/utils/PriceFormatter';
import React from 'react'
import { PriceChange } from './token-overview';
import { IToken } from '@/types/token.type';
import TokenLiquidity from './TokenLiquidity';

function TokenPrice({ token }: { token: IToken }) {
    return (
      <div className="flex flex-row md:flex-col items-start md:items-center justify-start gap-2 lg:gap-6">
        {token?.data?.[0]?.attributes?.base_token_price_usd != undefined ? (
          <div className="flex flex-row md:flex-col items-center lg:my-0 gap-3 justify-center ">
            <PriceFormatter
              className="text-lg md:text-3xl font-bold"
              value={+token!.data![0].attributes!.base_token_price_usd!}
              dollarSign
            />
            <TokenLiquidity token={token} />
            <PriceChange token={token} />
          </div>
        ) : (
          <p>No price available</p>
        )}
      </div>
    );
}

export default TokenPrice