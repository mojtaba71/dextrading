import Copy from "@/components/ui/copy";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { minifyContract } from "@/utils/truncate";
import { useEffect, useState } from "react";

interface Props {
  tokenAddress: string;
}

export default function MostActiveAddress({ tokenAddress }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    fetch(
      `https://onchain.dextrading.com/TopTokenActiveTraders?limit=10&network=${'eth'}&address=${tokenAddress}&from=${from.toISOString()}&till=${to.toISOString()}`
    )
      .then((data) => data.json())
      .then((json) => setData(json.data.ethereum.smartContractCalls))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );

  return (
      <Table className="table table-pin-rows table-pin-cols bg-base-100 rounded-lg overflow-hidden">
        <TableCaption>
          Most Active Addresses
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Address</TableHead>
            <TableHead>Trades</TableHead>
            <TableHead>Gas Value</TableHead>
            <TableHead>Gas Value(USD)</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d: any, idx: number) => (
            <Record key={`${d.id}${idx}`} idx={idx + 1} data={d} />
          ))}
        </TableBody>
      </Table>
  );
}


const Record = ({ data, idx }: { data: any; idx: number }) => {
  return (
    <TableRow>
      <TableCell className="w-[100px]">
        <div className="flex space-x-2 items-center">
          <Copy text={minifyContract(data.address.address)} value={data.address.address} />
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap" >
        {data.count} Trades
      </TableCell>
      <TableCell className="whitespace-nowrap" >
        {data.gasValue.toFixed(4)}
      </TableCell>
      <TableCell className="whitespace-nowrap" >
        ${data.gas_value_usd.toFixed(2)}
      </TableCell>
      <TableCell >
        {data.max_date}
      </TableCell>
    </TableRow>
  );
};
