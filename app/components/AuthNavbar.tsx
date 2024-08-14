// components/AuthNavbar.tsx
import React from "react";
import ProfileMenu from "./ProfileMenu";

const AuthNavbar: React.FC = () => {
  return (
    <nav className="bg-white text-black shadow-xs py-2 px-5">
      <div className="container mx-auto px-1 py-2 flex justify-between items-center">
        <a href="#" className="text-xl font-semibold">
          Transcriber
        </a>
        <div className="hidden md:flex space-x-4">
          <ProfileMenu />
        </div>
        <div className="md:hidden">
          <button className="text-gray-400 hover:text-white focus:outline-none focus:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
