"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Profile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("user");
  const [editName, setEditName] = useState(name);
  const [profileImage, setProfileImage] = useState("/pfp.png");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };
  const handleSave = () => {
    setName(editName);
    setDropdownOpen(false);
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
          <p className="text-xl text-black  font-bold mt-4">{name}</p>
        </button>
      </div>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-white/20 backdrop-blur-sm"
            onClick={() => setDropdownOpen(false)}
          />

          <div
            className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
  w-[20rem] md:w-[28rem] bg-white shadow-xl rounded-xl p-6 border space-y-4"
          >
            <h1 className="text-xl md:text-3xl text-center text-black m-2 md:m-5  font-semibold">
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
              <Image
                src="/pfp.png"
                onClick={() => setProfileImage("/pfp.png")}
                width={50}
                height={50}
                className="cursor-pointer rounded-full"
                alt="Avatar1"
              />
              <Image
                src="/pfp1.png"
                onClick={() => setProfileImage("/pfp1.png")}
                width={50}
                height={50}
                className="cursor-pointer rounded-full"
                alt="Avatar2"
              />
              <Image
                src="/pfp2.png"
                onClick={() => setProfileImage("/pfp2.png")}
                width={50}
                height={50}
                className="cursor-pointer rounded-full"
                alt="Avatar3"
              />
              <Image
                src="/pfp3.png"
                onClick={() => setProfileImage("/pfp3.png")}
                width={50}
                height={50}
                className="cursor-pointer rounded-full"
                alt="Avatar4"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-[50px] h-[50px] rounded-full bg-gray-700  flex items-center justify-center cursor-pointer"
              >
                🗂 +
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm mb-2"
            >
              Save
            </button>
            <button
              onClick={() => signOut()}
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
