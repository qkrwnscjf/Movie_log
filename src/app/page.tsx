'use client';

import { useMovieData } from '@/hooks/useMovieData';
import DashboardSection from '@/components/DashboardSection';
import PopularMovies from '@/components/PopularMovies';
import SectionHeader from '@/components/SectionHeader';

export default function HomePage() {
  const { myReviews, genreData } = useMovieData();

  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto px-4">
      {/* Welcome Header */}
      <section className="pt-12 pb-8 border-b border-[var(--border)]">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-3">
          영화 기록
        </h1>
        <p className="text-base text-[var(--text-secondary)] font-medium">
          나만의 영화 아카이브를 관리하고 취향을 분석합니다.
        </p>
      </section>

      {/* 실시간 인기 영화 (Top 5) */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-8 px-1">
          <SectionHeader title="실시간 인기 영화" type="main" />
          <div className="hidden md:block h-[1px] flex-1 mx-8 bg-[var(--border)]"></div>
        </div>
        <PopularMovies />
      </section>

      {/* 구분선 */}
      <div className="h-[1px] w-full bg-[var(--border)]"></div>

      {/* 나의 기록 통계 */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-10 px-1">
          <SectionHeader title="나의 기록 분석" type="main" />
          <div className="hidden md:block h-[1px] flex-1 mx-8 bg-[var(--border)]"></div>
        </div>
        <DashboardSection reviews={myReviews} genreData={genreData} />
      </section>
    </div>
  );
}