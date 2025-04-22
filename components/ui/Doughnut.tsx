'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type CaseScoreProps = {
  title: string;
  data: { name: string; value: number; color: string }[];
  score: number;
  tooltipText: string;
  // caseLabel: string;
};

export default function WalletCaseScore({
  title,
  data,
  score,
//   loading,
  tooltipText,
  // caseLabel,
}: CaseScoreProps) {
  // Ensure the component only renders on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server-side
  }

  return (
    <div className="flex flex-col max-w-xs items-center">
      <div className="font-medium text-lg text-center flex items-center space-x-1">
        <span>
          {title}
        </span>
        <div className="tooltip tooltip-bottom" data-tip={tooltipText}>
          <AiOutlineInfoCircle className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className="w-[200px] h-[200px] overflow-hidden flex justify-center items-center relative">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={58}
                outerRadius={65}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <p className="absolute text-lg opacity-70 font-bold">{score}</p>
      </div>
     
    </div>
  );
}
