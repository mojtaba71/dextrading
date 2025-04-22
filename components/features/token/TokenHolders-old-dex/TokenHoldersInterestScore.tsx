import { minifyContract } from "@/utils/truncate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  tokenAddress: string
}


export default function InterestScore({ tokenAddress }: Props) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(
      `https://onchain.dextrading.com/getBalances?tokenSmartContract=${tokenAddress}`
      , { signal: controller.signal })
      .then((data) => data.json())
      .then((json) => setData(json.results))
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );

  return (
    <div className="xL:max-w-[1200px] xl:mx-auto xl:min-w-[1200px]">
      <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">
        Interest Score
      </h2>
      <p className="mb-5">{data.length} Most Profitable Addresses interested in this Token</p>
      <div className="relative flex justify-center items-center py-8 mt-8 bg-base-100">
        <div className="absolute z-20 w-[100vw] h-[400px] bg-transparent backdrop-blur-xl bg-base-100 md:hidden flex justify-center items-center">
          Only Available in Desktop
        </div>
        <div className="relative radial-progress bg-gradient-to-r from-base-content/70 to-base-content/20 border-[#fff] text-base-300"
          // style={{ "--value": "100", "--size": "300px", "--thickness": "30px" }}
          role="progressbar">
          <span className="text-5xl font-bold text-base-100">{data.length}</span>
          {
            (data[0] as any)?.address ? (
              <Item
                address={(data[0] as any)?.address}
                t1={-10}
                l1={140}
                t2={-30}
                l2={-50}
              />
            ) : null
          }
          {
            (data[1] as any)?.address ? (
              <Item
                address={(data[1] as any)?.address}
                t1={45}
                l1={250}
                t2={-30}
                l2={10}
              />
            ) : null
          }
          {
            (data[2] as any)?.address ? (
              <Item
                address={(data[2] as any)?.address}
                t1={175}
                l1={280}
                t2={-20}
                l2={30}
              />
            ) : null
          }
          {
            (data[3] as any)?.address ? (
              <Item
                address={(data[3] as any)?.address}
                t1={280}
                l1={140}
                t2={40}
                l2={-50}
              />
            ) : null
          }
          {
            (data[4] as any)?.address ? (
              <Item
                address={(data[4] as any)?.address}
                t1={45}
                l1={15}
                t2={-30}
                l2={-120}
              />
            ) : null
          }
          {
            (data[5] as any)?.address ? (
              <Item
                address={(data[5] as any)?.address}
                t1={175}
                l1={0}
                t2={-30}
                l2={-140}
              />
            ) : null
          }
        </div>
      </div>
    </div>
  );
}

const Item = ({ address, t1, l1, t2, l2 }: any) => (
  <div className="z-10 absolute w-[30px] h-[30px] rounded-full bg-gradient-to-r from-base-content/100 to-base-content/60"
    style={{
      top: t1,
      left: l1
    }}
  >
    <span className="absolute text-base-content/80 font-medium text-lg"
      style={{
        top: t2,
        left: l2
      }}>
      {minifyContract(address)}
    </span>
  </div>
)