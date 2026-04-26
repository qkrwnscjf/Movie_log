'use client';

import { useEffect, useState } from 'react';
import { Star, TrendingUp } from 'lucide-react';

export default function PopularMovies() {
  const [popular, setPopular] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
      const data = await res.json();
      setPopular(data.results?.slice(0, 5) || []);
    };
    fetchPopular();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
      {popular.map((movie, index) => (
        <div 
          key={movie.id} 
          className="google-card p-3 flex flex-col group cursor-pointer"
        >
          <div className="relative mb-3 aspect-[2/3] rounded-xl overflow-hidden shadow-sm">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 w-7 h-7 bg-[var(--bg-secondary)]/90 backdrop-blur-md rounded-lg flex items-center justify-center text-xs font-black text-[var(--accent)] shadow-sm">
              {index + 1}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xs md:text-sm font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors mb-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2">
              <Star size={10} className="text-[var(--accent)] fill-[var(--accent)]" />
              <span className="text-[10px] md:text-xs font-bold text-[var(--accent)]">{movie.vote_average.toFixed(1)}</span>
              <span className="text-[10px] text-[var(--text-secondary)] ml-auto">{movie.release_date.split('-')[0]}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}