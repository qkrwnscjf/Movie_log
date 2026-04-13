'use client';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="group relative aspect-[2/3] rounded-3xl overflow-hidden bg-white/5 border border-white/5 hover:border-teal-500/30 transition-all duration-700 shadow-2xl">
      {/* Dynamic Border Glow */}
      <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-teal-500/10 rounded-3xl transition-all duration-700 z-20 pointer-events-none"></div>
      
      {/* Image with Zoom */}
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        loading="lazy"
      />
      
      {/* Sophisticated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 z-10" />
      
      {/* Info Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-30 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
           <span className="px-2 py-0.5 bg-teal-500/20 rounded text-[9px] font-mono text-teal-400 border border-teal-500/30 uppercase tracking-widest">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </span>
          <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-mono text-gray-400 border border-white/10 uppercase tracking-widest">
            TMDB_CORE
          </span>
        </div>
        
        <h3 className="text-base font-black text-white leading-tight tracking-tight mb-2 group-hover:text-teal-400 transition-colors line-clamp-2">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
            <span className="text-[11px] font-mono font-bold text-teal-400">
              {movie.vote_average?.toFixed(1) || '0.0'}
            </span>
          </div>
          <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
            Analyze_Detail →
          </button>
        </div>
      </div>
    </div>
  );
}