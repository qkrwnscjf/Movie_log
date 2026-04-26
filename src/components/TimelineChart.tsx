'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TimelineChart({ reviews }: { reviews: any[] }) {
  const getTimelineData = () => {
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const stats = months.map((m) => ({ name: m, count: 0 }));
    
    reviews.forEach((review) => {
      const date = new Date(review.created_at);
      if (!isNaN(date.getTime())) stats[date.getMonth()].count += 1;
    });
    return stats;
  };

  const data = getTimelineData();

  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0a84ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0a84ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#38383a" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            stroke="#8e8e93" 
            fontSize={11} 
            tick={{ dy: 10 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            stroke="#8e8e93" 
            fontSize={11} 
            allowDecimals={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1c1c1e', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '12px',
              color: '#fff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#0a84ff" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCount)" 
            activeDot={{ r: 6, fill: '#0a84ff', stroke: '#000', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}