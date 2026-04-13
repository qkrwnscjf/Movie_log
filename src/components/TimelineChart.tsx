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
          {/* 그라데이션 정의: 테일 색상이 위에서 아래로 흐려지게 */}
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" opacity={0.5} />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            stroke="#4b5563" 
            fontSize={9} 
            interval={0} // 모든 라벨(1월~12월)을 강제로 표시
            tick={{ dy: 10 }} // 라벨과 그래프 사이 간격 확보
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            stroke="#4b5563" 
            fontSize={10} 
            allowDecimals={false} 
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #115e59', 
              borderRadius: '12px', 
              fontSize: '11px',
              color: '#fff' 
            }}
            itemStyle={{ color: '#2dd4bf' }}
          />

          {/* 곡선 영역 차트 설정 */}
          <Area 
            type="monotone" // 부드러운 곡선
            dataKey="count" 
            stroke="#2dd4bf" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCount)" // 위에서 정의한 그라데이션 적용
            activeDot={{ r: 6, fill: '#2dd4bf', stroke: '#050505', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}