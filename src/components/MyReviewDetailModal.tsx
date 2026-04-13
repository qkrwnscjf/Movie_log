'use client';

export default function MyReviewDetailModal({ review, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0f1115] w-full max-w-xl rounded-[2.5rem] border border-teal-500/30 shadow-[0_0_50px_rgba(20,184,166,0.15)] overflow-hidden animate-in zoom-in duration-300">
        
        {/* 상단 장식 바 */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50"></div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
              <h2 className="text-sm font-black text-teal-400 tracking-[0.3em] uppercase">Review_Log_Details</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl">✕</button>
          </div>

          <div className="flex gap-8 mb-10">
            {/* 포스터 */}
            <div className="w-32 h-48 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <img src={`https://image.tmdb.org/t/p/w500${review.poster_path}`} className="w-full h-full object-cover" alt="" />
            </div>

            {/* 기본 정보 */}
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{review.movie_title || review.title}</h3>
              <div className="flex items-center gap-4">
                <span className="text-teal-400 font-black text-xl">★ {review.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-600 font-mono uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              {review.is_favorite && (
                <span className="mt-4 px-3 py-1 bg-teal-500/10 text-teal-500 text-[10px] font-bold rounded-full border border-teal-500/20 w-fit uppercase">Favorite Record</span>
              )}
            </div>
          </div>

          {/* 리뷰 본문 (데이터 아카이브 느낌) */}
          <div className="bg-black/40 border border-gray-800 p-6 rounded-2xl relative">
            <span className="absolute -top-3 left-6 px-3 bg-[#0f1115] text-[10px] text-gray-500 font-mono uppercase tracking-widest">Thought_Analysis</span>
            <p className="text-gray-300 text-lg leading-relaxed italic font-medium">
              "{review.review_text || review.content}"
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-10 py-4 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-teal-900/20 uppercase tracking-widest text-xs"
          >
            Close_Archive
          </button>
        </div>
      </div>
    </div>
  );
}