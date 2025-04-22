import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { minifyContract } from "@/utils/truncate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";

const latestSearches = [
  {
    name: "PEPE",
    address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
  },
  {
    name: "Shiba",
    address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
  },
  {
    name: "GALA",
    address: "0xd1d2eb1b1e90b638588728b4130137d262c87cae",
  },
];

interface Props {
  tokenAddress: string;
}

export default function HolderCompare({ tokenAddress }: Props) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleSearch = () => {
    if (form.length !== 42) return;
    setLoading(true);
    fetch(
      `https://onchain.dextrading.com/compare-holders?contract1=${tokenAddress}&contract2=${form}&limit=10`
    )
      .then((data) => data.json())
      .then((json) => setData(json.data.EVM.BalanceUpdates))
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative xl:max-w-[1200px] xl:mx-auto xl:min-w-[1200px] border border-base-content/50 rounded-lg p-4 overflow-hidden">
      <h2 className="text-2xl font-bold text-center sm:text-left">
        Holder Compare
      </h2>
      <div className="relative w-full mb-5 mt-2">
        <Button
          size="icon"
          className="absolute top-[4px] right-[4px] rounded-md flex justify-center items-center bg-gradient-to-r from-base-content/70 to-base-content/40 w-[40px] h-[40px] z-10"
          onClick={handleSearch}
        >
          <IoSearchSharp className="text-xl" />
        </Button>
        <Input
          className="border border-muted-foreground"
          placeholder="Enter Token Contract"
          value={form}
          onChange={(e) => setForm(e.target.value)}
        />
      </div>
      {data && (
        <>
          <div className={data.length ? "mb-5" : ""}>
            <div className="font-medium text-lg text-base-content/50 mb-2">
              Top Searches
            </div>
            <div className="flex items-center gap-2">
              {latestSearches.map((ls, idx) => (
                <button
                  key={idx}
                  className="rounded-md border border-base-content/50 text-base-content/50 text-sm p-2"
                  onClick={() => {
                    setForm(ls.address);
                    handleSearch();
                  }}
                >
                  {ls.name}
                </button>
              ))}
            </div>
          </div>
          {data.length ? (
            <div>
              <div className="font-medium text-lg">Same Holders</div>
              <div className="divider my-1" />
            </div>
          ) : null}
          {!loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              {(showMore ? data : data.slice(0, 10)).map(
                (d: any, idx: number, arr: any[]) => (
                  <Addresses
                    key={idx}
                    address={d.BalanceUpdate.Address}
                    idx={idx + 1}
                  />
                )
              )}
            </div>
          ) : null}
          {!showMore && data.length > 10 && (
            <div
              className="absolute flex justify-center items-center w-full bg-gradient-to-t from-base-300 to-base-300/50 py-4"
              style={{
                bottom: "-10px",
                left: 0,
                right: 0,
              }}
            >
              <button
                onClick={() => setShowMore(true)}
                className="btn btn-neutral btn-block lg:btn-wide btn-sm self-center"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
      {loading ? (
        <div className="w-full flex justify-center items-center h-[150px]">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : null}
    </div>
  );
}

export const Addresses = ({
  idx,
  address,
}: {
  address: string;
  idx: number;
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
    <div className="flex items-center gap-2">
      <span>{idx}.</span>
      <span className="text-base-content/80 hidden sm:block">{address}</span>
      <span className="text-base-content/80 text-lg block sm:hidden">
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
  );
};
