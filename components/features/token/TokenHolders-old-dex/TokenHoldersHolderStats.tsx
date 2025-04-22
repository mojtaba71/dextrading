"use client";
import useNetworkSelector from "@/store/tokenChains/networks";
import { minifyContract } from "@/utils/truncate";
import { useParams } from "next/navigation";
import randomColor from "randomcolor";
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

interface Props {
  // token: IToken
  tokenAddress: string;
}

export default function HolderStats({ tokenAddress }: Props) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [sum, setSum] = useState(0);
  const { selectedChain } = useNetworkSelector();

  /*
    useEffect(() => {
      fetch(
        `https://onchain.dextrading.com/token-holders?network=${
          params.params[0] === "ethereum" ? "eth" : params.params[0]
        }&token=${params.params[1]}`
      )
        .then((data) => data.json())
        .then((json) => {
          const rawData = Object.entries(json.date3[0]);
          const d = rawData
            .map((dd: any) => {
              if (
                dd[0] === "BalanceUpdate" ||
                dd[0] === "count" ||
                dd[0] === "supply" ||
                dd[0] === "theil_index" ||
                dd[0] === "standard_deviation" ||
                dd[0] === "dispersion"
              )
                return;
              return dd;
            })
            .filter((dd: any) => Boolean(dd));
          const s = d.reduce((acc, curr) => {
            return acc + parseFloat(curr[1] as string);
          }, 0);
  
          setSum(s);
          setData(d as any);
        })
        .finally(() => setLoading(false));
    }, []);
  */

  useEffect(() => {
    fetch(
      `https://onchain.dextrading.com/token-holders?network=${selectedChain.id.toLowerCase()}&token=${tokenAddress}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          const rawData = Object.entries(json.date3?.[0] ?? []);

          // Mapping of original names to desired names
          const nameMapping: { [key: string]: string } = {
            entropy_label: "HolderDiversity",
            gini_label: "EquityConcentration",
            kurtosis_label: "OwnershipDistribution",
            nakamoto_label: "FounderHolding",
            quantile_label: "HolderPercentile",
            skew_label: "OwnershipSkewness",
          };

          // Include only specific entries and apply name mapping
          const d = rawData
            .filter((dd: any) => {
              const key = dd[0];
              return Object.keys(nameMapping).includes(key);
            })
            .map((dd: any) => {
              const key = dd[0];
              return [nameMapping[key as keyof typeof nameMapping], dd[1]];
            });

          const s = d.reduce((acc, curr) => {
            return acc + parseFloat(curr[1] as string);
          }, 0);

          setSum(s);
          setData(d as any);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    fetch(
      `https://onchain.dextrading.com/topHolders?network=${selectedChain.id.toLowerCase()}&till=${
        to.toISOString().split("T")[0]
      }&token=${tokenAddress}&limit=10`
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.data) {
          // value={d.Balance.Percentage}
          // address={d.Balance.Address}

          setPieChartData(
            json.data.EVM.TokenHolders.map((item: any) => {
              return {
                name: minifyContract(item.Balance.Address),
                value: +item.Balance.Percentage,
              };
            })
          );
          setData2(json.data.EVM.TokenHolders);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  

  if (loading)
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );

  return (
    <div className="xL:max-w-[1200px] xl:mx-auto xl:min-w-[1200px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-bold text-center sm:text-left">
            Holder Stats
          </h2>
          {/* {data.map((d: any, idx: number, arr: any[]) => (
            <RateLeft key={idx} title={d[0]} value={d[1]} />
          ))} */}

          <PieChart width={300} height={300}>
            <Pie
              
              data={pieChartData}
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={randomColor()} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="flex flex-col items-start justify-center xl:justify-start gap-3 xl:pl-16">
          <h2 className="w-full text-2xl font-bold sm:pl-[160px] xl:pl-[160px] text-center sm:text-left">
            Holders
          </h2>
          {data2.map((d: any, idx: number, arr: any[]) => (
            <RateRight
              key={idx}
              value={d.Balance.Percentage}
              address={d.Balance.Address}
              haveLine={idx !== arr.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const RateLeft = ({
  value,
  title,
}: {
  value: number;
  title: string;
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleCopyAddress = (text: string) => () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [copied]);

  // Map numeric value to state label
  const getStateLabel = (value: number) => {
    if (value < 20) {
      return "Very Low";
    } else if (value < 40) {
      return "Low";
    } else if (value < 60) {
      return "Normal";
    } else if (value < 80) {
      return "High";
    } else {
      return "Very High";
    }
  };

  const stateLabel = getStateLabel(value);

  return (
    <div className="relative">
      <div
        className={`flex gap-4 items-center flex-nowrap hover:bg-gray-100 p-2 rounded-md rate-left-container `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`w-[100px] sm:text-right font-medium sm:font-normal`}>
          {title.replaceAll("_", " ")}
        </div>
        <div className="flex gap-2 md:gap-5 flex-col items-end justify-end md:flex-row-reverse md:items-center md:justify-center">
          <div className="text-sm">{stateLabel}</div>
          <input
            type="range"
            min="0"
            max="100"
            title={` ${stateLabel}`}
            value={value}
            className="range ml-16"
            step="25"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export const RateRight = ({
  value,
  address,
  haveLine,
}: {
  value: number;
  address: string;
  haveLine: boolean;
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyAddress = (text: string) => () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [copied]);
  return (
    <div className="flex gap-4 items-center flex-nowrap">
      <div className="relative flex items-center gap-2 ml-auto">
        {haveLine && (
          <div className="absolute w-[1px] h-[22px] /70 left-[66px] top-[20px] hidden sm:block"></div>
        )}
        <div className="w-[50px] text-right">{value === 0 ? "<1" : value}%</div>
        <div className="rounded-full /70 p-[8px] z-10"></div>
        <div className="flex items-center gap-2">
          <span className=" hidden sm:block">{address}</span>
          <span className=" text-lg block sm:hidden">
            {minifyContract(address)}
          </span>
          <div
            className="tooltip tooltip-right"
            data-tip={copied ? "Copied" : "Copy Address"}
          >
            <FiCopy
              onClick={handleCopyAddress(address)}
              className="cursor-pointer text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
