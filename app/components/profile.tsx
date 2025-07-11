"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("user");
  const [editName, setEditName] = useState("user");
  const [profileImage, setProfileImage] = useState("/pfp.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session) {
      setName(session.user?.name || "user");
      setEditName(session.user?.name || "user");
      setProfileImage(session.user?.image || "/pfp.png");
    }
  }, [session]);
  useEffect(() => {
    async function fetchUserProfile() {
      const response = await fetch("/api/user/profile");
      const data = await response.json();
      if (response.ok) {
        setName(data.user.name);
        setEditName(data.user.name);
        setProfileImage(data.user.image || "/pfp.png");
      }
    }
    fetchUserProfile();
  }, []);

  if (!session) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleSave = async () => {
    setName(editName);
    setDropdownOpen(false);

    await fetch("/api/user/profile", {
      method: "PUT",
      body: JSON.stringify({
        image: profileImage,
        name: editName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <div className="relative md:fixed md:scale-100 scale-75 md:top-4 md:right-8 rounded-full z-50">
        <button
          className="text-black flex flex-col items-center justify-center rounded"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Image
            src={profileImage}
            alt="Profile"
            className="rounded-full outline-dotted outline-2 outline-gray-400 p-1"
            width={60}
            height={60}
          />
          <p className="text-xl text-black font-bold mt-4">{name}</p>
        </button>
      </div>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-white/20 backdrop-blur-sm"
            onClick={() => setDropdownOpen(false)}
          />

          <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[28rem] bg-white shadow-xl rounded-xl p-6 border space-y-4">
            <h1 className="text-xl md:text-3xl text-center text-black m-2 md:m-5 font-semibold">
              Profile Settings
            </h1>
            <label className="block text-md font-medium text-gray-700 mb-2">
              Change Username
            </label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border text-gray-600 rounded px-2 py-1 mb-3 text-md"
            />
            <p className="text-md text-gray-700">Choose Avatar</p>
            <div className="flex flex-wrap gap-4 m-2">
              {["/pfp.png", "/pfp1.png", "/pfp2.png", "/pfp3.png"].map(
                (src) => (
                  <Image
                    key={src}
                    src={src}
                    onClick={() => setProfileImage(src)}
                    width={50}
                    height={50}
                    className={`cursor-pointer rounded-full ${
                      profileImage === src
                        ? "outline outline-2 outline-gray-700 p-1"
                        : ""
                    }`}
                    alt="Avatar"
                  />
                )
              )}
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm mb-2"
            >
              Save
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
