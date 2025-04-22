import { IToken } from "@/types/token.type";
import TokenHoldersAmountFilter from "./TokenHoldersAmountFilter";
import TokenHoldersCompare from "./TokenHoldersCompare";
import TokenHoldersHolderStats from "./TokenHoldersHolderStats";
import TokenHoldersMostActiveAddress from "./TokenHoldersMostActiveAddress";


interface Props {
  token: IToken
  tokenAddress: string
}

export default function TokenHolders({ token, tokenAddress }: Props) {

  return (
    <div className="flex flex-col gap-12 pt-8">
      <TokenHoldersHolderStats tokenAddress={tokenAddress} />
      <TokenHoldersAmountFilter tokenAddress={tokenAddress} />
      <TokenHoldersCompare tokenAddress={tokenAddress} />
      <TokenHoldersMostActiveAddress tokenAddress={tokenAddress} />
      {/* <TokenHoldersInterestScore tokenAddress={tokenAddress} /> */}
    </div>
  )
}
