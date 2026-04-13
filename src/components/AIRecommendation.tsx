'use client';

import { useState } from 'react';
import MovieCard from './MovieCard';
import ReviewModal from './ReviewModal';

interface AiMovieData {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  recommendationReason?: string; 
}

export default function AIRecommendation() {
  const [userInput, setUserInput] = useState('');
  const [aiMovies, setAiMovies] = useState<AiMovieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<AiMovieData | null>(null);

  const askGemini = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setAiMovies([]);

    try {
      const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();
      const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY?.trim();

      if (!GEMINI_KEY) throw new Error("Gemini API 키가 설정되지 않았습니다.");

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

      const geminiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              text: `사용자 요구사항: "${userInput}". 이 조건에 어울리는 한국 개봉 영화 4개의 제목과 각각의 추천 사유를 한 문장으로 설명하고, 반드시 JSON 배열 형태로만 답변해줘. 형식: [{"title": "영화 제목", "reason": "추천 사유"}]` 
            }]
          }]
        })
      });

      if (!geminiRes.ok) {
        const errorData = await geminiRes.json();
        throw new Error(errorData.error?.message || "모델 호출 실패");
      }

      const geminiData = await geminiRes.json();
      const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) throw new Error("AI 응답을 생성할 수 없습니다.");
      
      const cleanedText = rawText.replace(/```json\n?|```/g, '').trim();
      const aiRecommendations = JSON.parse(cleanedText);

      const movieDataPromises = aiRecommendations.map(async (rec: any) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(rec.title)}&language=ko-KR`
        );
        const data = await res.json();
        const movie = data.results?.[0];
        if (movie) {
          return { ...movie, recommendationReason: rec.reason };
        }
        return null;
      });

      const results = await Promise.all(movieDataPromises);
      setAiMovies(results.filter(movie => movie !== null));

    } catch (error: any) {
      console.error("Gemini 2.5 파이프라인 에러:", error);
      alert(`추천 오류: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden group">
      {/* Background Neural Glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-teal-500/10 blur-[160px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-teal-500/20"></div>
      
      <div className="relative z-10 bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-[0_32px_120px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 p-[1px] shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                <div className="w-full h-full bg-[#050505] rounded-2xl flex items-center justify-center overflow-hidden relative">
                   <div className="absolute inset-0 bg-teal-500/10 animate-pulse"></div>
                   <span className="text-xl relative z-10 animate-bounce">🤖</span>
                </div>
              </div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                Gemini_Pilot <span className="text-teal-400 font-light">v2.5</span>
              </h2>
            </div>
            <p className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.5em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              Neural_Processing_Engine_Active
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest leading-none">Status: Standby</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className={`w-full h-full bg-teal-500/40 ${loading ? 'animate-shimmer' : ''}`} style={{ animationDelay: `${i * 100}ms` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={askGemini} className="relative max-w-3xl mx-auto mb-24 group/input">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-focus-within/input:opacity-100 transition duration-1000"></div>
          <div className="relative flex flex-col md:flex-row gap-4 p-2 bg-black/40 border border-white/5 rounded-[2.5rem] focus-within:border-teal-500/30 transition-all duration-500 shadow-inner">
            <input 
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="What kind of movie are you craving today?"
              className="flex-1 bg-transparent p-6 text-lg md:text-xl text-white placeholder:text-gray-700 outline-none font-light tracking-tight"
            />
            <button 
              type="submit"
              disabled={loading}
              className={`px-12 h-16 md:h-auto rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 ${
                loading 
                  ? 'bg-white/5 text-gray-500' 
                  : 'bg-teal-500 text-black hover:bg-white hover:scale-[1.02] shadow-[0_8px_32px_rgba(20,184,166,0.2)]'
              }`}
            >
              {loading ? (
                 <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  Analyze_Vibe
                  <span className="text-lg">→</span>
                </>
              )}
            </button>
          </div>
        </form>

        {aiMovies.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {aiMovies.map((movie, idx) => (
              <div 
                key={movie.id} 
                onClick={() => setSelectedMovie(movie)} 
                className="group/card relative flex flex-col sm:flex-row gap-10 p-10 bg-white/[0.02] hover:bg-white/[0.05] rounded-[3.5rem] border border-white/5 hover:border-teal-500/20 transition-all duration-700 cursor-pointer shadow-2xl"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Image Section */}
                <div className="w-full sm:w-44 flex-shrink-0 relative">
                  <div className="absolute -inset-4 bg-teal-500/10 blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000"
                      alt={movie.title}
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col justify-center py-4">
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-1">
                       <span className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest">Match_Certainty: 98.4%</span>
                       <h3 className="text-3xl font-black text-white leading-none tracking-tighter group-hover/card:text-teal-400 transition-colors uppercase italic">
                        {movie.title}
                      </h3>
                    </div>
                  </div>

                  {/* Insight Reason */}
                  <div className="relative mb-8 p-6 bg-teal-500/[0.03] rounded-[2rem] border border-teal-500/10">
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
                    <p className="pl-6 text-sm md:text-base text-gray-300 font-medium leading-relaxed italic line-clamp-2">
                      "{movie.recommendationReason}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                          <span className="text-[10px] text-yellow-500">★</span>
                          <span className="text-[10px] font-mono text-gray-400">{movie.vote_average.toFixed(1)}</span>
                       </div>
                       <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{movie.release_date.split('-')[0]}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-500/40 group-hover/card:text-teal-500 transition-colors">Analyze_Insight →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMovie && (
          <ReviewModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    </section>
  );
}