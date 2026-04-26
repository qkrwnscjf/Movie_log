'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Star, Send, Loader2 } from 'lucide-react';

interface ReviewModalProps {
  movie: any;
  onClose: () => void;
}

export default function ReviewModal({ movie, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('reviews').insert([
        {
          movie_id: movie.id,
          title: movie.title,
          rating: rating,
          content: content,
          poster_path: movie.poster_path,
          watched_at: new Date().toISOString().split('T')[0],
          genres: movie.genre_ids?.map(String) || [],
        },
      ]);

      if (error) throw error;
      onClose();
    } catch (error: any) {
      alert(`저장 실패: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[var(--bg-secondary)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--border)] animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 z-10 p-2 rounded-full hover:bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
          <X size={24} />
        </button>

        {/* Header Preview */}
        <div className="p-8 flex gap-6 items-end bg-[var(--bg-primary)]/50 border-b border-[var(--border)]">
           <div className="w-20 h-30 rounded-xl overflow-hidden shadow-md border border-[var(--border)] flex-shrink-0">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-full object-cover" />
           </div>
           <div className="pb-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] leading-tight mb-2 truncate">{movie.title}</h3>
              <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">{movie.release_date?.split('-')[0]}</p>
           </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-[var(--text-primary)]">별점</label>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 rounded-full">
                <Star size={16} className="text-[var(--accent)] fill-[var(--accent)]" />
                <span className="text-base font-black text-[var(--accent)]">{rating.toFixed(1)}</span>
              </div>
            </div>
            <input 
              type="range" min="0" max="5" step="0.5" 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-2 bg-[var(--bg-primary)] rounded-full appearance-none cursor-pointer accent-[var(--accent)]"
            />
          </div>

          <div className="space-y-3">
             <label className="text-sm font-bold text-[var(--text-primary)] px-1">나의 리뷰</label>
             <textarea
              className="w-full h-40 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl p-5 text-base text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all resize-none placeholder:text-[var(--text-secondary)]"
              placeholder="영화에 대한 솔직한 생각을 기록해보세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-[var(--accent)] text-white font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : (
              <>
                기록하기
                <Send size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}