'use client';

import { useEffect, useState } from 'react';

export default function PreferenceAnalysis({ reviews }: { reviews: any[] }) {
  const [topActors, setTopActors] = useState<{ name: string; count: number; image: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCastData = async () => {
      if (reviews.length === 0) return;
      setLoading(true);
      
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const actorCounts: { [key: string]: { count: number; image: string } } = {};

      try {
        // 1. 모든 리뷰 영화의 출연진 정보를 병렬로 호출 (Data Ingestion)
        const promises = reviews.map(review =>
          fetch(`https://api.themoviedb.org/3/movie/${review.movie_id}/credits?api_key=${API_KEY}&language=ko-KR`)
            .then(res => res.json())
        );

        const results = await Promise.all(promises);

        // 2. 배우 데이터 집계 (Transformation)
        results.forEach(data => {
          if (data.cast) {
            // 상위 5명의 배우만 집계에 포함
            data.cast.slice(0, 5).forEach((actor: any) => {
              if (actorCounts[actor.name]) {
                actorCounts[actor.name].count += 1;
              } else {
                actorCounts[actor.name] = { 
                  count: 1, 
                  image: actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '' 
                };
              }
            });
          }
        });

        // 3. 정렬 후 상위 3명 추출
        const sortedActors = Object.entries(actorCounts)
          .map(([name, info]) => ({ name, ...info }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        setTopActors(sortedActors);
      } catch (error) {
        console.error("배우 데이터 분석 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCastData();
  }, [reviews]);

  if (loading) return <div className="text-sm text-gray-500 animate-pulse">취향 분석 중...</div>;
  if (reviews.length === 0) return null;

  return (
    <div className="mt-6 bg-gray-900/50 p-4 rounded-xl border border-gray-700">
      <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
        <span>👤</span> 내가 가장 많이 본 배우 TOP 3
      </h3>
      <div className="flex gap-4">
        {topActors.map((actor, idx) => (
          <div key={actor.name} className="flex flex-col items-center text-center flex-1">
            <div className="relative">
              <img 
                src={actor.image || 'https://via.placeholder.com/150'} 
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                alt={actor.name}
              />
              <span className="absolute -top-1 -left-1 bg-emerald-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </span>
            </div>
            <p className="text-[11px] font-bold mt-2 line-clamp-1">{actor.name}</p>
            <p className="text-[10px] text-gray-400">{actor.count}회 관람</p>
          </div>
        ))}
      </div>
    </div>
  );
}