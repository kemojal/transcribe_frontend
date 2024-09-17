import React from "react";
import Image from "next/image";

const PlanBillingPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Image
              src="/placeholder-avatar.jpg"
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
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item}
            </a>
          ))}
          <div className="px-4 py-2 mt-4 text-sm font-medium text-gray-600">
            Workspace
          </div>
          {[
            "General",
            "Members",
            "Groups",
            "Phone numbers",
            "Integrations",
            "Plan & billing",
            "Contacts",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className={`block px-4 py-2 text-sm ${
                item === "Plan & billing"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Plan & billing</h1>

        {/* End free trial section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">End your free trial</h2>
          <p className="text-gray-600 mb-4">
            Trial ends, stays active for 7 days. Numbers saved for 60 days, then
            removed
          </p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
            End Free Trial
          </button>
        </div>

        {/* Auto-charge section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Auto-charge</h2>
          <p className="text-gray-600 mb-4">
            By enabling this feature your account will be auto-charged and
            amount
          </p>
          <div className="flex space-x-4">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition">
              Buy Credits
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition">
              Enable Auto-Charge
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition">
              Use towards Subscription
            </button>
          </div>
        </div>

        {/* Payment method section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment method</h2>
          <p className="text-gray-600 mb-4">
            this is the payment method to use for the monthly invoices
          </p>
          <div className="flex space-x-4">
            {["Visa", "Mastercard"].map((card) => (
              <div
                key={card}
                className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 flex-1"
              >
                <div className="flex justify-between items-center mb-2">
                  <Image
                    src={`/${card.toLowerCase()}-logo.png`}
                    alt={`${card} logo`}
                    width={40}
                    height={25}
                  />
                  <span className="text-sm text-gray-600">
                    {card} ending in 1234
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Expiry {card === "Visa" ? "06/2024" : "08/2024"}
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-purple-600 hover:underline">
                    Set as default
                  </button>
                  <button className="text-purple-600 hover:underline">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-purple-600 hover:underline">
            + Update Credit Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanBillingPage;
