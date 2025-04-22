import { GiDeathSkull } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IToken } from "@/types/token.type";

interface Props {
  token: IToken
  tokenAddress: string
}

export default function TokenSecurityMeasureLine({ token, tokenAddress }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [safe, setSafe] = useState("");


  useEffect(() => {
    fetch(
      `https://onchain.dextrading.com/token/${tokenAddress}?network=eth`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSafe(
      !data.maliciousLibraries?.count && !data.malFunc?.count ? "safe" : "error"
    );
  }, [data]);

  if (loading || safe === "")
    return (
      <div className="w-full h-[350px] flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  return (
    <div className="my-8 mb-14 sm:mb-8 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-around gap-5">
        {
          token?.ScoreData?.status &&
          <div className="flex gap-2 items-center">
            {token.ScoreData.status === "Safe" ? (
              <Success />
            ) : token.ScoreData.status === "Currently Safe" ? (
              <Warning />
            ) : (
              <Error />
            )}
          </div>
        }

        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-2xl font-bold text-base-content/80 text-center mb-2 hidden sm:block">
            Security Measure Line
          </h2>
          {
            token?.FunctionCallsData?.renounceOwnership?.status &&
            <Renounce
              active={
                token.FunctionCallsData.renounceOwnership?.status === "renounced"
              }
              text={
                token.FunctionCallsData.renounceOwnership?.status === "renounced"
                  ? `Contract was Renounced at ${token.FunctionCallsData.renounceOwnership?.Date}`
                  : `Contract is not Renounced`
              }
            />
          }
        </div>
      </div>
      {
        token?.FunctionCallsData?.malFunc?.uniqueNames &&
        token.FunctionCallsData.malFunc?.similarNames &&
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8 ">
          {token.FunctionCallsData.malFunc?.count ? (
            <div className="bg-base-200/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-error text-center mb-3">
                {token.FunctionCallsData.malFunc?.count} Malicious Functions
              </h3>
              <ul className="text-error font-medium list-disc pl-4 text-red-400">
                {[
                  ...token.FunctionCallsData.malFunc?.uniqueNames,
                  ...token.FunctionCallsData.malFunc?.similarNames,
                ]?.map((un: string, idx: number) => (
                  <li key={idx} className="mb-1 capitalize">
                    {un}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {token.FunctionCallsData.maliciousLibraries?.count ? (
            <div className="bg-base-200/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-error text-center mb-3">
                {token.FunctionCallsData.maliciousLibraries?.count} Interface
                Control
              </h3>
              <ul className="text-error font-medium list-disc pl-4">
                {token.FunctionCallsData.maliciousLibraries?.libraries?.map(
                  (un: string, idx: number) => (
                    <li key={idx} className="mb-1 capitalize">
                      {un}
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : null}
        </div>
      }
    </div>
  );
}

const Success = () => (
  <div className={`relative bg-success/40 rounded-full w-[80px] h-[80px]`}>
    <span className="absolute top-[90px] text-center whitespace-nowrap text-xl right-1/2 translate-x-1/2 text-success font-medium text-green-300">
      Contract is Safe
    </span>
    <AiOutlineSafety className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-success" />
  </div>
);
const Warning = () => (
  <div className={`relative bg-warning/40 rounded-full w-[80px] h-[80px]`}>
    <span className="absolute top-[90px] text-center whitespace-nowrap text-xl right-1/2 translate-x-1/2 text-warning font-medium text-yellow-300">
      Contract Safe but Can Change
    </span>
    <IoWarningOutline className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-warning" />
  </div>
);
const Error = () => (
  <div className={`relative bg-error/40 rounded-full w-[80px] h-[80px]`}>
    <span className="absolute top-[90px] text-center whitespace-nowrap text-xl right-1/2 translate-x-1/2 text-error font-medium text-red-400">
      Contract is not Safe
    </span>
    <GiDeathSkull className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-error" />
  </div>
);

const Renounce = ({ active = false, text = "" }) => (
  <div className="sm:flex items-center gap-2 ml-1 mt-8 sm:mt-0">
    <div
      className={`animate-ping w-[8px] h-[8px] ${active ? "bg-success" : "bg-error"
        } rounded-full mr-1`}
    ></div>
    <span className="text-center font-medium sm:mb-8 md:mb-0">{text}</span>
  </div>
);
