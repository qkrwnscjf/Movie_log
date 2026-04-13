'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// 테일 계열의 농도별 색상 배열
const TEAL_GRADATION = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1'];

export default function GenreChart({ data }: { data: any[] }) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={65}
            outerRadius={85}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={TEAL_GRADATION[index % TEAL_GRADATION.length]} 
                className="hover:opacity-80 outline-none transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px' }}
            itemStyle={{ color: '#2dd4bf' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}