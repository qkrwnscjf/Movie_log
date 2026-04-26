'use client';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchBar({ query, setQuery }: { query: string, setQuery: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 검색"
          className="w-full h-14 pl-14 pr-12 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all shadow-sm hover:shadow-md"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <SearchIcon size={20} className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
        </div>
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <span className="text-xs">✕</span>
          </button>
        )}
      </div>
    </div>
  );
}