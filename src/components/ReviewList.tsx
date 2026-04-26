'use client';
import { useState } from 'react';
import { Search, Heart, Trash2, ChevronRight, Star } from 'lucide-react';

export default function ReviewList({ reviews, onToggleFavorite, onDelete, onSelect }: any) {
  const [reviewSearch, setReviewSearch] = useState('');
  
  const filtered = reviews.filter((r: any) => 
    (r.movie_title || r.title || '').toLowerCase().includes(reviewSearch.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 px-1">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">나의 기록 ({reviews.length})</h2>
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="제목으로 필터링..." 
            value={reviewSearch}
            onChange={(e) => setReviewSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((review: any) => (
          <div 
            key={review.id} 
            onClick={() => onSelect(review)}
            className="google-card group flex items-center gap-4 md:gap-6 p-4 md:p-5 cursor-pointer"
          >
            <div className="w-16 h-24 md:w-20 md:h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-[var(--border)]">
              <img 
                src={`https://image.tmdb.org/t/p/w200${review.poster_path}`} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-base md:text-xl font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                  {review.movie_title || review.title}
                </h3>
                {review.is_favorite && <Heart size={16} className="fill-[var(--accent)] text-[var(--accent)]" />}
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-[var(--accent)] fill-[var(--accent)]" />
                  <span className="text-sm font-black text-[var(--accent)]">{review.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] font-medium">{review.watched_at}</span>
              </div>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] line-clamp-1 italic font-light leading-relaxed">
                "{review.review_text || review.content}"
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(review.id, review.is_favorite); }} 
                className={`p-2.5 rounded-xl transition-all ${review.is_favorite ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5'}`}
              >
                <Heart size={20} fill={review.is_favorite ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(review.id, review.movie_title || review.title); }} 
                className="p-2.5 rounded-xl text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/5 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
              <ChevronRight size={24} className="text-[var(--border)] ml-1 hidden md:block" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}