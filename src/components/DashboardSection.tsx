'use client';
import TimelineChart from './TimelineChart';
import GenreChart from './GenreChart';
import PreferenceAnalysis from './PreferenceAnalysis';
import { BarChart3, PieChart, User } from 'lucide-react';

export default function DashboardSection({ reviews = [], genreData = [] }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Genre Stats */}
      <div className="lg:col-span-2 google-card p-6 md:p-8 flex flex-col min-h-[400px]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
            <PieChart size={22} />
          </div>
          <h3 className="font-bold text-lg text-[var(--text-primary)]">장르별 선호도</h3>
        </div>
        <div className="flex-1 w-full h-full">
          <GenreChart data={genreData} />
        </div>
      </div>

      {/* Actor Analysis */}
      <div className="google-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
            <User size={22} />
          </div>
          <h3 className="font-bold text-lg text-[var(--text-primary)]">자주 등장하는 인물</h3>
        </div>
        <PreferenceAnalysis reviews={reviews} />
      </div>

      {/* Timeline Chart */}
      <div className="lg:col-span-3 google-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
            <BarChart3 size={22} />
          </div>
          <h3 className="font-bold text-lg text-[var(--text-primary)]">월별 기록 추이</h3>
        </div>
        <TimelineChart reviews={reviews} />
      </div>
    </div>
  );
}