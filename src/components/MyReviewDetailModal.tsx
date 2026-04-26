'use client';

import { X, Calendar, Star, Quote } from 'lucide-react';

interface DetailModalProps {
  review: any;
  onClose: () => void;
}

export default function MyReviewDetailModal({ review, onClose }: DetailModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[var(--bg-secondary)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--border)] animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <div className="flex gap-6 md:gap-8 mb-8 items-center">
            <div className="w-24 h-36 md:w-28 md:h-40 rounded-2xl overflow-hidden shadow-xl border border-[var(--border)] flex-shrink-0">
              <img src={`https://image.tmdb.org/t/p/w500${review.poster_path}`} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-4 leading-tight truncate">
                {review.movie_title || review.title}
              </h2>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <Star size={18} className="text-[var(--accent)] fill-[var(--accent)]" />
                  <span className="text-lg font-black text-[var(--accent)]">{review.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Calendar size={18} />
                  <span className="text-sm font-bold">{review.watched_at}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-primary)] rounded-3xl p-8 border border-[var(--border)] relative shadow-inner">
            <Quote size={32} className="text-[var(--accent)]/10 absolute top-6 left-6" />
            <p className="text-[var(--text-primary)] leading-relaxed text-lg font-medium italic relative z-10 pt-4">
              "{review.review_text || review.content}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}