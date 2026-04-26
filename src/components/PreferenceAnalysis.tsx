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
        const promises = reviews.map(review =>
          fetch(`https://api.themoviedb.org/3/movie/${review.movie_id}/credits?api_key=${API_KEY}&language=ko-KR`)
            .then(res => res.json())
        );

        const results = await Promise.all(promises);

        results.forEach(data => {
          if (data.cast) {
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
  if (!reviews || reviews.length === 0) return <div className="text-sm text-gray-500">데이터가 없습니다.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {topActors.map((actor, idx) => (
          <div key={actor.name} className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 flex-shrink-0">
              <img 
                src={actor.image || 'https://via.placeholder.com/150'} 
                className="w-full h-full rounded-full object-cover border border-white/10"
                alt={actor.name}
              />
              <span className="absolute -top-1 -left-1 bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#1c1c1e]">
                {idx + 1}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{actor.name}</p>
              <p className="text-xs text-[#8e8e93]">{actor.count}회 관람</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}