'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import ReviewModal from '@/components/ReviewModal';
import PopularMovies from '@/components/PopularMovies';
import GenreChart from '@/components/GenreChart';
import TimelineChart from '@/components/TimelineChart';
import SearchBar from '@/components/SearchBar';
import ReviewList from '@/components/ReviewList';
import MovieSearchGrid from '@/components/MovieSearchGrid';
import PreferenceAnalysis from '@/components/PreferenceAnalysis';
import Recommendation from '@/components/Recommendation'; // [추가] 추천 컴포넌트

const GENRE_MAP: { [key: string]: string } = {
  "28": "액션", "12": "모험", "16": "애니메이션", "35": "코미디",
  "80": "범죄", "99": "다큐멘터리", "18": "드라마", "10751": "가족",
  "14": "판타지", "36": "역사", "27": "공포", "10402": "음악",
  "9648": "미스터리", "10749": "로맨스", "878": "SF", "10770": "TV 영화",
  "53": "스릴러", "10752": "전쟁", "37": "서부"
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [myReviews, setMyReviews] = useState<any[]>([]);
  const [sortType, setSortType] = useState('popularity');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) fetchMovies(query);
      else setMovies([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovies = async (q: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}&language=ko-KR`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("영화 검색 실패:", error);
    }
  };

  const fetchMyReviews = async () => {
    try {
      const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMyReviews(data || []);
    } catch (error) {
      console.error('리뷰 불러오기 실패:', error);
    }
  };

  const genreData = useMemo(() => {
    if (!myReviews || myReviews.length === 0) return [];
    const acc: { [key: string]: number } = {};
    myReviews.forEach((review) => {
      if (review.genres && Array.isArray(review.genres)) {
        review.genres.forEach((id: any) => {
          const genreName = GENRE_MAP[String(id)] || "기타";
          acc[genreName] = (acc[genreName] || 0) + 1;
        });
      }
    });
    return Object.entries(acc).map(([name, value]) => ({ name, value }));
  }, [myReviews]);

  const toggleFavorite = async (id: string, status: boolean) => {
    await supabase.from('reviews').update({ is_favorite: !status }).eq('id', id);
    fetchMyReviews();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`'${title}' 삭제하시겠습니까?`)) {
      await supabase.from('reviews').delete().eq('id', id);
      fetchMyReviews();
    }
  };

  useEffect(() => { fetchMyReviews(); }, []);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-900 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          나의 영화 리뷰 기록지 🎬
        </h1>
        
        <SearchBar query={query} setQuery={setQuery} />

        {/* 📊 분석 대시보드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 text-blue-400">장르별 취향 📊</h2>
              <GenreChart data={genreData} />
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700">
              <PreferenceAnalysis reviews={myReviews} />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">관람 타임라인 📅</h2>
            <TimelineChart reviews={myReviews} />
          </div>

          <PopularMovies />
        </div>

        {/* ✨ [핵심 추가] 인생작 기반 추천 섹션 */}
        {/* 분석 데이터와 목록 사이에 배치하여 시각적 흐름을 매끄럽게 합니다. */}
        <Recommendation reviews={myReviews} />

        <ReviewList 
          reviews={myReviews} 
          onToggleFavorite={toggleFavorite} 
          onDelete={handleDelete} 
        />
        
        <hr className="border-gray-800 my-16" />

        <MovieSearchGrid 
          movies={movies} 
          sortType={sortType} 
          setSortType={setSortType} 
          onSelect={setSelectedMovie} 
        />

        {selectedMovie && (
          <ReviewModal 
            movie={selectedMovie} 
            onClose={() => { setSelectedMovie(null); fetchMyReviews(); }} 
          />
        )}
      </div>
    </main>
  );
}