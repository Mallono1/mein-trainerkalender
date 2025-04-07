import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', seeds: 302 },
  { name: 'Feb', seeds: 450 },
  { name: 'Mar', seeds: 200 },
  { name: 'Apr', seeds: 500 },
  { name: 'May', seeds: 392 },
  { name: 'Jun', seeds: 140 },
];

const SeedDistributionGraph: React.FC = () => {
  return (
    <div className='h-[30rem] mt-5'>
      <ResponsiveContainer width='95%' height='95%'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='4 4' stroke='#e2e8f0' />
          <XAxis
            dataKey='name'
            tick={{ fill: '#4B5563', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#4B5563', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              color: '#fff',
              borderRadius: '8px',
            }}
          />
          <defs>
            <linearGradient id='colorSeed' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#6366F1' stopOpacity={0.8} />
              <stop offset='100%' stopColor='#6366F1' stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <Line
            type='natural'
            dataKey='seeds'
            stroke='url(#colorSeed)'
            strokeWidth={3}
            dot={{ stroke: '#6366F1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeedDistributionGraph;
