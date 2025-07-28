'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch("/api/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session?.user?.email }),
        });

        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  if (status === "loading" || !userInfo) {
    return <div className="text-center py-10">Loading Profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 mb-4 p-6 bg-white rounded shadow">
      <div className="text-center">
        <Image
          src={userInfo.image || "/default-avatar.png"}
          width={200}
          height={200}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border"
        />
        <h2 className="text-xl font-semibold">{userInfo.name || "No Name"}</h2>
        <p className="text-gray-600">{userInfo.email}</p>
        <p className="text-sm mt-1 text-orange-600 font-medium">
          Role: {userInfo.role || "student"}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
