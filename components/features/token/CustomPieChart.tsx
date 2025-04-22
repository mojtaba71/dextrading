import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
    title: string;
    totalScore: number;
    maxScore: number;
}

const CustomPieChart = ({ title, totalScore, maxScore }: Props) => {
    const data = [
        { name: 'Score', value: totalScore },
        { name: 'Remaining', value: maxScore - totalScore },
    ];

    const COLORS = ['#0088FE', '#00C49F'];

    return (
        <div className='relative h-48'>
            <div className='absolute inset-0 m-auto h-full flex flex-col items-center justify-center gap-1'>
                <span>{title}</span>
                <span>{`${totalScore}/${maxScore}`}</span>
            </div>
            <PieChart width={200} height={190}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={5}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />

            </PieChart>
        </div>
    );
};

export default CustomPieChart;
