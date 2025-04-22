import TokenSecurityCallActivity from "./TokenSecurityCallActivity";
import TokenSecurityBox from "./TokenSecurityBox";
import TokenSecurityMeasureLine from "./TokenSecurityMeasureLine";
import { IToken } from "@/types/token.type";
import { Progress } from "@/components/ui/progress";
import Renounce from "../Renounce";
import React from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundry";

interface Props {
  token: IToken;
  tokenAddress: string;
}

export default function TokenSecurityOldShit({ token, tokenAddress }: Props) {
  return (
    <ErrorBoundary>
      <div className="flex flex-col items-start justify-center gap-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-2 items-center justify-between w-full">
          <Renounce
            active={
              token.FunctionCallsData?.renounceOwnership?.status === "renounced"
            }
            text={
              token.FunctionCallsData?.renounceOwnership?.Date
                ? `Contract was Renounced at ${token.FunctionCallsData?.renounceOwnership?.Date}`
                : `Contract is not Renounced`
            }
            status={token?.ScoreData?.status || ""}
          />
          {token.ScoreData?.totalScore != undefined && (
            <div className="w-full max-w-[500px] flex flex-col items-center justify-center gap-2">
              <span>
                Security Score : {token.ScoreData.totalScore + "/" + 1600}
              </span>
              <Progress value={60} className="w-full max-w-[500px] h-3" />
            </div>
          )}
        </div>
        {token.FunctionCallsData?.malFunc?.count != undefined &&
          token.FunctionCallsData?.malFunc?.uniqueNames != undefined &&
          token.FunctionCallsData?.malFunc?.similarNames != undefined && (
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full gap-5 ">
              <h3 className="text-red-400 text-xl whitespace-nowrap">
                {token.FunctionCallsData.malFunc.count} Malicious Functions
              </h3>
              <ul className="text-red-400 w-full">
                {[
                  ...token.FunctionCallsData.malFunc.uniqueNames,
                  ...token.FunctionCallsData.malFunc.similarNames,
                ]?.map((un: string, idx: number) => (
                  <React.Fragment key={idx}>
                    {un && (
                      <li
                        key={idx}
                        className="inline-block m-2 px-4 py-1 rounded-sm border border-red-400"
                      >
                        {un}
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        <div className=" overflow-x-scroll w-full">
          <TokenSecurityBox tokenAddress={tokenAddress} />
        </div>
        <TokenSecurityCallActivity tokenAddress={tokenAddress} />
      </div>
    </ErrorBoundary>
  );
}
