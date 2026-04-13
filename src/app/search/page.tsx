'use client';
import { useMovieData } from '@/hooks/useMovieData';
import SectionHeader from '@/components/SectionHeader';
import SearchBar from '@/components/SearchBar';
import MovieSearchGrid from '@/components/MovieSearchGrid';
import ReviewModal from '@/components/ReviewModal';

export default function SearchPage() {
  const { query, setQuery, movies, sortType, setSortType, selectedMovie, setSelectedMovie, fetchMyReviews } = useMovieData();

  return (
    <div className="space-y-12">
      <SectionHeader title="Find New Movies" type="main" />
      <SearchBar query={query} setQuery={setQuery} />
      
      <section className="pt-10">
        <SectionHeader title="Search Results" type="sub" />
        <MovieSearchGrid 
          movies={movies} 
          sortType={sortType} 
          setSortType={setSortType} 
          onSelect={setSelectedMovie} 
        />
      </section>

      {selectedMovie && (
        <ReviewModal movie={selectedMovie} onClose={() => { setSelectedMovie(null); fetchMyReviews(); }} />
      )}
    </div>
  );
}