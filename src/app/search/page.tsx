'use client';

import { useMovieData } from '@/hooks/useMovieData';
import SearchBar from '@/components/SearchBar';
import MovieSearchGrid from '@/components/MovieSearchGrid';
import AIRecommendation from '@/components/AIRecommendation';
import SectionHeader from '@/components/SectionHeader';

export default function SearchPage() {
  const { query, setQuery, movies, setSelectedMovie } = useMovieData();

  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto px-4">
      <section className="pt-12 pb-12 border-b border-[var(--border)]">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-10">
          찾기
        </h1>
        <SearchBar query={query} setQuery={setQuery} />
      </section>

      {query ? (
        <section className="py-8">
          <div className="flex items-center justify-between mb-8 px-1">
            <SectionHeader title="검색 결과" type="main" />
            <div className="hidden md:block h-[1px] flex-1 mx-8 bg-[var(--border)]"></div>
          </div>
          <MovieSearchGrid movies={movies} onSelect={setSelectedMovie} />
        </section>
      ) : (
        <section className="py-8">
          <div className="flex items-center justify-between mb-10 px-1">
            <SectionHeader title="AI 영화 추천" type="main" />
            <div className="hidden md:block h-[1px] flex-1 mx-8 bg-[var(--border)]"></div>
          </div>
          <AIRecommendation />
        </section>
      )}
    </div>
  );
}