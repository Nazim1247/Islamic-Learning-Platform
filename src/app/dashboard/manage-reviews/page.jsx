'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ManageReviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load reviews');
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this review?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.status === 200) {
        setReviews((prev) => prev.filter(review => review._id !== id));
        router.refresh();
        toast.success('Review deleted successfully');
      } else {
        toast.error(data.message || 'Failed to delete review');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Manage Reviews</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white shadow-md p-4 rounded relative">
                <div className='flex items-center gap-2'>
                    <Image src={review.image} width={20} height={20} alt='image' className='w-8 h-8 rounded-full'/>
              <h3 className="text-lg font-semibold text-orange-500">{review.name}</h3>
                </div>
              <p className="text-sm text-gray-600">{review.email}</p>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-2">Rating: {review.rating}/5</p>

              <button
                onClick={() => handleDelete(review._id)}
                className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
