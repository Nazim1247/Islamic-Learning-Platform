import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ReviewFormModal = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    rating: '',
    comment: ''
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Review submitted!');
      setFormData({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        image: session?.user?.image || '',
        rating: '',
        comment: ''
      });
      setShowModal(false);
    } else {
      alert('Failed to submit review');
    }
  };

  return (
    <div>
      <div className='text-center'>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
        >
          Give a Review
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-opacity-30 flex justify-center items-center bg-black">
          <div className="bg-gray-100 p-6 rounded-md w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-red-500 text-xl">×</button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={formData.name} readOnly className="w-full border px-3 py-2 bg-gray-100" />
              <input name="email" value={formData.email} readOnly className="w-full border px-3 py-2 bg-gray-100" />
              <input name="image" value={formData.image} readOnly className="w-full border px-3 py-2 bg-gray-100" />
              <input name="rating" placeholder="Rating (1-5)" type="number" min="1" max="5" value={formData.rating} onChange={handleChange} className="w-full border px-3 py-2" required />
              <textarea name="comment" placeholder="Your review..." value={formData.comment} onChange={handleChange} className="w-full border px-3 py-2" required></textarea>
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full text-white px-4 py-2 rounded">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewFormModal;
