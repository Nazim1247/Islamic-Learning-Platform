'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function UpdateProfileForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
        password: '',
      });
    }
  }, [session]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage(result.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-6 bg-color shadow rounded mt-20 mb-4"
    >
      <h2 className="text-xl font-bold text-center text-orange-500">Update Profile</h2>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        className="input input-bordered w-full"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="image"
        type="text"
        placeholder="Image URL"
        className="input input-bordered w-full"
        value={formData.image}
        onChange={handleChange}
      />

      {/* Password Field with Toggle Icon */}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="New Password (optional)"
          className="input input-bordered w-full pr-10"
          value={formData.password}
          onChange={handleChange}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-gray-600 text-lg"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      <button
        type="submit"
        className="btn bg-orange-500 hover:bg-orange-600 text-white rounded w-full"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>

      {message && <p className="text-center text-sm text-green-600 mt-2">{message}</p>}
    </form>
  );
}
