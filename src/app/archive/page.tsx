'use client';

import { useMovieData } from '@/hooks/useMovieData';
import ReviewList from '@/components/ReviewList';
import MyReviewDetailModal from '@/components/MyReviewDetailModal';
import { supabase } from '@/lib/supabase';

export default function ArchivePage() {
  const { 
    myReviews, fetchMyReviews, 
    selectedReview, setSelectedReview 
  } = useMovieData();

  const handleToggleFavorite = async (id: number, current: boolean) => {
    const { error } = await supabase.from('reviews').update({ is_favorite: !current }).eq('id', id);
    if (!error) fetchMyReviews();
  };

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`'${title}' 리뷰를 삭제할까요?`)) {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (!error) fetchMyReviews();
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <section className="pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-2">
          보관함
        </h1>
        <p className="text-lg text-[#86868b] font-medium">
          지금까지 기록한 소중한 리뷰들입니다.
        </p>
      </section>

      <ReviewList 
        reviews={myReviews} 
        onToggleFavorite={handleToggleFavorite} 
        onDelete={handleDelete}
        onSelect={setSelectedReview}
      />

      {selectedReview && (
        <MyReviewDetailModal 
          review={selectedReview} 
          onClose={() => setSelectedReview(null)} 
        />
      )}
    </div>
  );
}