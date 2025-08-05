'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function EnrollPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    phone: '',
    address: '',
    gender: '',
    occupation: '',
    education: '',
    course: '',
    timeSlot: '',
    socialLink: '',
    transactionId: '',
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success('Enrollment submitted successfully!');
      router.push('/dashboard/enrolled-courses');
    } else {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 bg-color p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-orange-500 text-center">Enroll in a Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name & Email - prefilled */}
        <input type="text" name="name" value={formData.name} readOnly className="input input-bordered w-full" />
        <input type="email" name="email" value={formData.email} readOnly className="input input-bordered w-full" />

        {/* Hidden image */}
        <input type="hidden" name="image" value={formData.image} />

        {/* User inputs */}
        <input name="phone" onChange={handleChange} value={formData.phone} type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
        <input name="address" onChange={handleChange} value={formData.address} type="text" placeholder="Your Address" className="input input-bordered w-full" required />

        <select name="gender" onChange={handleChange} value={formData.gender} className="input input-bordered w-full" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="occupation" onChange={handleChange} value={formData.occupation} type="text" placeholder="Current Occupation/Status" className="input input-bordered w-full" required />
        <input name="education" onChange={handleChange} value={formData.education} type="text" placeholder="Educational Qualification" className="input input-bordered w-full" required />
        <input name="course" onChange={handleChange} value={formData.course} type="text" placeholder="Which course do you want to enroll in?" className="input input-bordered w-full" required />

        <select name="timeSlot" onChange={handleChange} value={formData.timeSlot} className="input input-bordered w-full" required>
          <option value="">Select suitable time for class</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="9:00 PM">9:00 PM</option>
          <option value="10:00 PM">10:00 PM</option>
          <option value="Any Time">Any Time</option>
        </select>

        <input name="socialLink" onChange={handleChange} value={formData.socialLink} type="text" placeholder="Your Facebook Profile Link / WhatsApp" className="input input-bordered w-full" />

        <div className="bg-yellow-100 p-3 rounded text-sm text-gray-700">
          <strong>Send Money Please Course Fee</strong><br />
          <p>Your payment number: <span className="font-semibold">01924772057</span></p>
          <p>(Bkash/Nagad — Personal)</p>
          <p>Put your Transaction ID below:</p>
        </div>

        <input name="transactionId" onChange={handleChange} value={formData.transactionId} type="text" placeholder="Transaction ID" className="input input-bordered w-full" required />

        <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 text-white w-full rounded">Submit Enrollment</button>
      </form>
    </div>
  );
}
