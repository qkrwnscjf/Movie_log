'use client';
import { useState } from 'react';

export default function ReviewList({ reviews, onToggleFavorite, onDelete, onSelect }: any) {
  const [reviewSearch, setReviewSearch] = useState('');
  
  const filtered = reviews.filter((r: any) => 
    (r.movie_title || r.title || '').toLowerCase().includes(reviewSearch.toLowerCase())
  );

  return (
    <section className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.1)]">
            <span className="text-xl">📁</span>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
              Archive_Logs
            </h2>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Total_Entries: {reviews.length}</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <input 
            type="text" 
            placeholder="FILTER_BY_TITLE..." 
            value={reviewSearch}
            onChange={(e) => setReviewSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-mono text-gray-300 outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/20 transition-all uppercase tracking-widest"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((review: any, idx: number) => (
          <div 
            key={review.id} 
            onClick={() => onSelect(review)}
            className="group relative bg-white/[0.02] backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 hover:border-teal-500/30 transition-all duration-500 shadow-2xl cursor-pointer overflow-hidden"
          >
            {/* Background Texture Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/[0.02] blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-teal-500/5 transition-colors duration-700"></div>

            <div className="flex gap-6 relative z-10">
              {/* Poster with Glow */}
              <div className="w-24 h-36 flex-shrink-0 relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-700">
                <img 
                  src={`https://image.tmdb.org/t/p/w200${review.poster_path}`} 
                  alt={review.movie_title || review.title} 
                  className="w-full h-full object-cover group-hover:opacity-100 opacity-80 transition-opacity" 
                />
              </div>

              <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-teal-500/60 tracking-widest uppercase">ID: {review.id.toString().slice(0,8)}</span>
                    <div className="flex gap-2">
                       <button 
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(review.id, review.is_favorite); }} 
                        className={`p-1.5 rounded-lg transition-all ${review.is_favorite ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-gray-600 hover:text-white'}`}
                      >
                        <svg className="h-3.5 w-3.5" fill={review.is_favorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(review.id, review.movie_title || review.title); }} 
                        className="p-1.5 rounded-lg bg-white/5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="font-black text-lg text-white leading-tight truncate group-hover:text-teal-400 transition-colors">
                    {review.movie_title || review.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i < review.rating ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'bg-white/10'}`}></div>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-teal-400 font-bold">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-[11px] line-clamp-2 leading-relaxed bg-white/[0.03] p-2.5 rounded-xl border border-white/5 italic">
                  "{review.review_text || review.content}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}