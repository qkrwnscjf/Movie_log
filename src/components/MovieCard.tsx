'use client';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: any;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative aspect-[2/3] w-full google-card overflow-hidden">
      <img 
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'} 
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Subtle Bottom Info Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{movie.title}</h3>
        <div className="flex items-center gap-2">
          <Star size={12} className="text-[var(--accent)] fill-[var(--accent)]" />
          <span className="text-xs text-white font-bold">{movie.vote_average.toFixed(1)}</span>
          <span className="text-[10px] text-gray-300 ml-auto">{movie.release_date?.split('-')[0]}</span>
        </div>
      </div>
    </div>
  );
}