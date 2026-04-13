'use client';
import { useMovieData } from '@/hooks/useMovieData';
import { supabase } from '@/lib/supabase';
import SectionHeader from '@/components/SectionHeader';
import ReviewList from '@/components/ReviewList';
import MyReviewDetailModal from '@/components/MyReviewDetailModal';

export default function ArchivePage() {
  const { myReviews, fetchMyReviews, selectedReview, setSelectedReview } = useMovieData();

  const toggleFavorite = async (id: string, status: boolean) => {
    await supabase.from('reviews').update({ is_favorite: !status }).eq('id', id);
    fetchMyReviews();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`'${title}' 삭제하시겠습니까?`)) {
      await supabase.from('reviews').delete().eq('id', id);
      fetchMyReviews();
    }
  };

  return (
    <div className="space-y-10">
      <SectionHeader title="My Review History" type="main" />
      <ReviewList 
        reviews={myReviews} 
        onToggleFavorite={toggleFavorite} 
        onDelete={handleDelete} 
        onSelect={setSelectedReview} 
      />
      {selectedReview && <MyReviewDetailModal review={selectedReview} onClose={() => setSelectedReview(null)} />}
    </div>
  );
}