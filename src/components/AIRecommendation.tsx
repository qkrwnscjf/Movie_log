'use client';

import { useState } from 'react';
import MovieCard from './MovieCard';
import ReviewModal from './ReviewModal';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

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

      if (!geminiRes.ok) throw new Error("모델 호출 실패");

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
        if (movie) return { ...movie, recommendationReason: rec.reason };
        return null;
      });

      const results = await Promise.all(movieDataPromises);
      setAiMovies(results.filter(movie => movie !== null));
    } catch (error: any) {
      alert(`추천 오류: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="google-card p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
            <Sparkles size={26} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">AI 영화 추천</h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-medium">당신만을 위한 맞춤형 영화 큐레이션</p>
          </div>
        </div>

        <form onSubmit={askGemini} className="relative mb-12">
          <input 
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="오늘 어떤 분위기의 영화를 즐기고 싶으신가요?"
            className="w-full h-16 pl-8 pr-20 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl text-base md:text-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-medium"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-md"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <ArrowRight size={24} />}
          </button>
        </form>

        {aiMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fade-in">
            {aiMovies.map((movie) => (
              <div 
                key={movie.id} 
                onClick={() => setSelectedMovie(movie)} 
                className="flex gap-5 p-5 bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl transition-all cursor-pointer group shadow-sm hover:shadow-lg"
              >
                <div className="w-24 h-36 md:w-28 md:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-[var(--border)]">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="text-base md:text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors truncate">{movie.title}</h3>
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 italic font-light">
                    "{movie.recommendationReason}"
                  </p>
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