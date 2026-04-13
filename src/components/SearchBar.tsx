'use client';

export default function SearchBar({ query, setQuery }: { query: string, setQuery: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH_MOVIE_DATABASE..."
          className="w-full h-16 pl-14 pr-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-500 font-mono tracking-widest text-sm uppercase"
        />
        
        {/* Search Icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Clear Button */}
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all"
          >
            <span className="text-xs">✕</span>
          </button>
        )}
      </div>
      
      {/* Status Indicator */}
      <div className="absolute -bottom-6 right-2 flex items-center gap-2">
        <span className="text-[9px] font-mono text-gray-600 tracking-tighter uppercase">Query_Optimization_Enabled</span>
        <div className="w-1 h-1 rounded-full bg-teal-500/40"></div>
      </div>
    </div>
  );
}