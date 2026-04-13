'use client';
import MovieCard from './MovieCard';

export default function MovieSearchGrid({ movies, sortType, setSortType, onSelect }: any) {
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortType === 'rating') return b.vote_average - a.vote_average;
    if (sortType === 'release') return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    return b.popularity - a.popularity;
  });

  return (
    <section className="space-y-12 pb-32">
      {/* 📊 Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-8 w-[2px] bg-teal-500/30"></div>
          <div>
            <h2 className="text-lg font-black tracking-tighter uppercase text-white/90">Search Discovery</h2>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-teal-500 rounded-full animate-pulse"></span>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">Scanning_TMDB_Records</p>
            </div>
          </div>
        </div>

        {movies.length > 0 && (
          <div className="flex bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl">
            {[
              { id: 'popularity', label: 'Popularity' },
              { id: 'rating', label: 'Rating' },
              { id: 'release', label: 'Latest' }
            ].map((t) => (
              <button 
                key={t.id} 
                onClick={() => setSortType(t.id)} 
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${
                  sortType === t.id 
                  ? 'bg-teal-500 text-black shadow-[0_4px_20px_rgba(20,184,166,0.4)] scale-105' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🎬 Cinema Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {sortedMovies.map((movie, idx) => (
          <div 
            key={movie.id} 
            onClick={() => onSelect(movie)} 
            className="cursor-pointer group relative"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
             {/* Simple entering animation via CSS classes would go here if needed */}
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      {movies.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
          <div className="w-20 h-20 mb-8 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/5 animate-pulse-slow">
            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-mono text-[11px] tracking-[0.3em] uppercase">
            Awaiting_Search_Input_Signal...
          </p>
          <div className="mt-6 flex gap-2">
             <div className="w-1 h-1 rounded-full bg-white/10"></div>
             <div className="w-1 h-1 rounded-full bg-white/10 animate-pulse"></div>
             <div className="w-1 h-1 rounded-full bg-white/10"></div>
          </div>
        </div>
      )}
    </section>
  );
}