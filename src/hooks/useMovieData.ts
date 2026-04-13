'use client';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

const GENRE_MAP: { [key: string]: string } = {
  "28": "액션", "12": "모험", "16": "애니메이션", "35": "코미디", "80": "범죄", "99": "다큐멘터리", "18": "드라마", "10751": "가족", "14": "판타지", "36": "역사", "27": "공포", "10402": "음악", "9648": "미스터리", "10749": "로맨스", "878": "SF", "10770": "TV 영화", "53": "스릴러", "10752": "전쟁", "37": "서부"
};

export function useMovieData() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [myReviews, setMyReviews] = useState<any[]>([]);
  const [sortType, setSortType] = useState('popularity');

  const fetchMyReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    setMyReviews(data || []);
  };

  const fetchMovies = async (q: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}&language=ko-KR`);
    const data = await res.json();
    setMovies(data.results || []);
  };

  useEffect(() => {
    fetchMyReviews();
    const timer = setTimeout(() => { if (query.trim()) fetchMovies(query); else setMovies([]); }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const genreData = useMemo(() => {
    if (!myReviews.length) return [];
    const acc: { [key: string]: number } = {};
    myReviews.forEach((review) => {
      review.genres?.forEach((id: any) => {
        const name = GENRE_MAP[String(id)] || "기타";
        acc[name] = (acc[name] || 0) + 1;
      });
    });
    return Object.entries(acc).map(([name, value]) => ({ name, value }));
  }, [myReviews]);

  return {
    query, setQuery, movies, setMovies, selectedMovie, setSelectedMovie,
    selectedReview, setSelectedReview, myReviews, fetchMyReviews,
    sortType, setSortType, genreData
  };
}