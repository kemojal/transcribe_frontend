"use client";
import React, { useState } from "react";
import Image from "next/image";

interface InvitedPerson {
  name: string;
  email: string;
  avatarUrl: string;
}

const Sidebar: React.FC = () => (
  <div className="w-64 bg-white shadow-md">
    <div className="p-4 border-b">
      <div className="flex items-center">
        <Image
          src="/avatars/dianne.jpg"
          alt="Dianne Russell"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="ml-2 font-semibold">Dianne Russell</span>
      </div>
    </div>
    <nav className="mt-4">
      <div className="px-4 py-2 text-sm font-medium text-gray-600">
        Your account
      </div>
      {[
        "Profile",
        "Preferences",
        "Notifications",
        "Referrals",
        "Blocklist",
      ].map((item) => (
        <a
          key={item}
          href="#"
          className={`block px-4 py-2 text-sm ${
            item === "Referrals"
              ? "bg-purple-100 text-purple-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item}
        </a>
      ))}
      <div className="px-4 py-2 mt-4 text-sm font-medium text-gray-600">
        Workspace
      </div>
      {["General", "Members", "Groups", "Phone numbers"].map((item) => (
        <a
          key={item}
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {item}
        </a>
      ))}
    </nav>
  </div>
);

const ReferralLink: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://dialin/referral/SOFB34H";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Share the referral link</h2>
      <div className="flex items-center">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-grow p-2 border rounded-l-md bg-gray-50"
        />
        <button
          onClick={copyToClipboard}
          className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition duration-150 ease-in-out"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};

const InvitedList: React.FC = () => {
  const invitedPeople: InvitedPerson[] = [
    {
      name: "Annette Black",
      email: "annette@cognitox.com",
      avatarUrl: "/avatars/annette.jpg",
    },
    {
      name: "Jane Cooper",
      email: "jane@bitflow.com",
      avatarUrl: "/avatars/jane.jpg",
    },
    {
      name: "Robert Fox",
      email: "robert@hyperloopx.com",
      avatarUrl: "/avatars/robert.jpg",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Previous invited</h2>
      {invitedPeople.map((person) => (
        <div
          key={person.email}
          className="flex items-center justify-between py-3 border-b"
        >
          <div className="flex items-center">
            <Image
              src={person.avatarUrl}
              alt={person.name}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <div className="font-semibold">{person.name}</div>
              <div className="text-sm text-gray-500">{person.email}</div>
            </div>
          </div>
          <span className="text-gray-500">Invited</span>
        </div>
      ))}
    </div>
  );
};

const ReferralsPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Referrals</h1>
          <button className="text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Gift $40, Earn $25</h2>
          <p className="text-gray-700">
            Refer friends to Dialin, get $25 credit each
          </p>
        </div>

        <ReferralLink />
        <InvitedList />
      </div>
    </div>
  );
};

export default ReferralsPage;
