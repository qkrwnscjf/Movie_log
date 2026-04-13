'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/80">
      {/* Background Poster Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="w-full h-full object-cover scale-150 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-2xl bg-white/[0.02] border border-white/10 rounded-[3rem] shadow-[0_32px_120px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
        {/* Left: Poster Preview */}
        <div className="w-full md:w-[240px] h-full bg-black/40 border-r border-white/5 relative">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
             <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block mb-2">Analyzing_Subject</span>
             <h3 className="text-xl font-black text-white leading-tight uppercase italic tracking-tighter">{movie.title}</h3>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-10 space-y-8 bg-black/20 backdrop-blur-md">
          <div className="flex justify-between items-start">
             <div>
                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-1">Create_Review_Log</h2>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System_Status: Awaiting_Input</p>
             </div>
             <button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400">✕</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">Rating_Indicator: {rating.toFixed(1)}</label>
              <div className="flex gap-1">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className={`w-3 h-1.5 rounded-full ${i < Math.floor(rating) ? 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-white/10'}`}></div>
                 ))}
              </div>
            </div>
            <input 
              type="range" min="0" max="5" step="0.5" 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic px-1">Review_Context_Buffer</label>
             <textarea
              className="w-full h-40 bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 text-sm text-gray-200 outline-none focus:border-teal-500/30 transition-all resize-none placeholder:text-gray-700 font-light leading-relaxed shadow-inner"
              placeholder="Input movie analysis results here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full h-14 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden group relative ${
              loading ? 'bg-white/5 text-gray-600' : 'bg-teal-500 text-black shadow-[0_8px_32px_rgba(20,184,166,0.3)] hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(20,184,166,0.5)]'
            }`}
          >
            {loading ? 'Processing...' : (
              <>
                <span className="relative z-10">Commit_To_Archive</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse relative z-10"></span>
              </>
            )}
            {/* Animated Glow on hover */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 skew-x-12"></div>
          </button>
        </form>
      </div>
    </div>
  );
}