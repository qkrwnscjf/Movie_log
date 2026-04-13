'use client';
import GenreChart from './GenreChart';
import TimelineChart from './TimelineChart';
import PopularMovies from './PopularMovies';
import PreferenceAnalysis from './PreferenceAnalysis';

export default function DashboardSection({ genreData, myReviews }: any) {
  const avgRating = (myReviews.reduce((acc: any, curr: any) => acc + (curr.rating || 0), 0) / (myReviews.length || 1)).toFixed(1);

  return (
    <div className="flex flex-col gap-8 mb-24 mt-8">
      {/* Row 1: Intelligence & Metrics */}
      <div className="grid grid-cols-12 gap-8">
        {/* Genre Intelligence - 8 columns */}
        <section className="col-span-12 lg:col-span-8 bg-white/[0.03] backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl transition-all hover:border-teal-500/30 group">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                <span className="text-xl">🧬</span>
              </div>
              <h2 className="text-xs font-black text-teal-400 tracking-[0.4em] uppercase">
                Genre_Intelligence
              </h2>
            </div>
            <div className="px-4 py-1.5 bg-teal-500/5 rounded-full text-[10px] text-teal-500/60 font-mono border border-teal-500/10 uppercase tracking-widest">
              Scan_Status: Complete
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center">
              <GenreChart data={genreData} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Top_Insight</span>
                <span className="text-xl font-black text-white italic tracking-tighter">
                  {genreData[0]?.name || 'DATA_NULL'}
                </span>
              </div>
            </div>
            <div className="space-y-8">
              {/* PreferenceAnalysis만 남기고 하단 텍스트 박스 삭제 */}
              <PreferenceAnalysis reviews={myReviews} />
            </div>
          </div>
        </section>

        {/* Metric Vertical Stack - 4 columns */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="flex-1 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 p-10 rounded-[3rem] border border-white/10 flex flex-col justify-between group hover:scale-[1.02] transition-transform shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 blur-[60px] rounded-full -mr-16 -mt-16"></div>
            <span className="text-[10px] text-teal-400/60 uppercase tracking-[0.3em] font-mono font-bold">Total_Logs</span>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black text-white group-hover:text-teal-400 transition-colors tracking-tighter">{myReviews.length}</span>
              <span className="text-xs text-teal-500/40 mb-3 font-mono">FILES</span>
            </div>
          </div>
          
          <div className="flex-1 bg-white/[0.03] p-10 rounded-[3rem] border border-white/10 flex flex-col justify-between group hover:scale-[1.02] transition-transform shadow-2xl relative">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono font-bold">Avg_Rating</span>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tighter">{avgRating}</span>
              <span className="text-xs text-emerald-500/40 mb-3 font-mono">SCORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Full Width Timeline */}
      <section className="bg-white/[0.02] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl transition-all hover:border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <span className="text-xs">📈</span>
            </div>
            <h2 className="text-[10px] font-black text-gray-400 tracking-[0.5em] uppercase">
              Activity_Timeline_Sequence
            </h2>
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-teal-500/30"></div>
            ))}
          </div>
        </div>
        <div className="h-[280px] w-full group-hover:opacity-100 opacity-90 transition-opacity">
          <TimelineChart reviews={myReviews} />
        </div>
      </section>

      {/* Row 3: Trending Database */}
      <section className="bg-white/[0.01] backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 animate-pulse">
                <span className="text-xs">🔥</span>
              </div>
            <h2 className="text-xs font-black text-emerald-400 tracking-[0.4em] uppercase italic">
              Trending_Database_Records
            </h2>
          </div>
          <div className="h-[1px] flex-1 mx-12 bg-gradient-to-r from-emerald-500/10 via-white/5 to-transparent"></div>
          <button className="text-[10px] font-mono text-gray-600 hover:text-emerald-400 transition-colors tracking-widest uppercase">Sync_Records →</button>
        </div>
        <PopularMovies />
      </section>
    </div>
  );
}