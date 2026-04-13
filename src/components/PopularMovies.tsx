'use client';
import { useEffect, useState } from 'react';

export default function PopularMovies() {
  const [popular, setPopular] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      // 1위부터 5위까지 가져오기
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
      const data = await res.json();
      setPopular(data.results?.slice(0, 5) || []);
    };
    fetchPopular();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* 섹션 헤더 스타일 통일 */}
      <h2 className="text-sm font-black mb-6 text-teal-400 tracking-[0.2em] uppercase flex items-center gap-2">
        <span className="w-1 h-1 bg-teal-500 rounded-full animate-pulse"></span>
        Box Office Top 5
      </h2>
      
      <div className="space-y-4 flex-1">
        {popular.map((movie, index) => (
          <div 
            key={movie.id} 
            className="flex items-center gap-4 p-3 rounded-2xl bg-gray-900/30 border border-transparent hover:border-teal-500/20 hover:bg-gray-900/50 transition-all group cursor-default"
          >
            {/* 순위 숫자 강조 */}
            <div className="text-2xl font-black italic text-gray-800 group-hover:text-teal-900 transition-colors italic w-8 text-center">
              {index + 1}
            </div>

            {/* 미니 포스터 */}
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title}
              className="w-10 h-14 rounded-lg object-cover shadow-lg border border-gray-800"
            />

            {/* 영화 정보 */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-200 truncate group-hover:text-white transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-teal-500/80 font-mono">★ {movie.vote_average.toFixed(1)}</span>
                <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                <span className="text-[10px] text-gray-600 truncate">{movie.release_date.split('-')[0]}</span>
              </div>
            </div>

            {/* 점수 게이지 (데이터 시각화 느낌) */}
            <div className="hidden md:block w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-600 rounded-full" 
                style={{ width: `${movie.vote_average * 10}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}