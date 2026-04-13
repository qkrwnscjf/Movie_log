'use client';
import { useMovieData } from '@/hooks/useMovieData';
import SectionHeader from '@/components/SectionHeader';
import DashboardSection from '@/components/DashboardSection';
import AIRecommendation from '@/components/AIRecommendation';

export default function Home() {
  const { genreData, myReviews } = useMovieData();

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 p-6 md:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 tracking-tighter uppercase mb-3">
              Movie Insights
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.4em]">System_Analysis_Active</p>
              <span className="w-12 h-[1px] bg-white/10"></span>
              <p className="text-teal-500/50 text-[10px] font-mono uppercase tracking-[0.2em]">v0.1.0_Stable</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
          </div>
        </header>
        
        <DashboardSection genreData={genreData} myReviews={myReviews} />
        
        <section className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-teal-500/50 rounded-full"></div>
          <AIRecommendation />
        </section>
      </div>
    </main>
  );
}