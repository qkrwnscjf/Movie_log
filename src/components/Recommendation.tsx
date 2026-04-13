'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import ReviewModal from './ReviewModal';

export default function Recommendation({ reviews }: { reviews: any[] }) {
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // 1. 인생작(is_favorite)만 필터링
      const favorites = reviews.filter(r => r.is_favorite);
      if (favorites.length === 0) return;

      setLoading(true);
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      // 2. 가장 선호하는 장르 ID 추출 (데이터 분석)
      const genreCounts: { [key: string]: number } = {};
      favorites.forEach(f => {
        f.genres?.forEach((id: any) => {
          genreCounts[id] = (genreCounts[id] || 0) + 1;
        });
      });

      // 가장 많이 나타난 장르 ID 상위 2개 추출
      const topGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(entry => entry[0])
        .join(',');

      try {
        // 3. TMDB Discover API를 사용하여 유사 장르의 인기 영화 호출 (Data Enrichment)
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${topGenres}&language=ko-KR&sort_by=popularity.desc&include_adult=false`
        );
        const data = await response.json();
        
        // 이미 리뷰를 쓴 영화는 추천에서 제외 (Filtering)
        const reviewedIds = new Set(reviews.map(r => String(r.movie_id)));
        const filtered = data.results
          .filter((m: any) => !reviewedIds.has(String(m.id)))
          .slice(0, 4);

        setRecommendedMovies(filtered);
      } catch (error) {
        console.error("추천 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [reviews]);

  if (reviews.filter(r => r.is_favorite).length === 0) return null;

  return (
    <section className="mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
        <span></span> Recommendation
      </h2>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-gray-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedMovies.map((movie) => (
            <div 
              key={movie.id} 
              onClick={() => setSelectedMovie(movie)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <ReviewModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </section>
  );
}