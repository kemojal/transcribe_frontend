"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/components/sections/Footer";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "The start of your productivity journey",
      price: 0,
      features: [
        "Unlimited tasks, notes, and reminders",
        "Unlimited private lists",
        "5 shared lists with up to 5 people",
        "Gmail, Google Calendar, Microsoft To Do and email forwarding integrations",
        "Email task summarization",
        "Up to 10MB upload & 500MB file storage",
      ],
    },
    {
      name: "Pro",
      description: "Unlock a new level of personal productivity",
      price: 8,
      features: [
        "Everything in Free, plus:",
        "Unlimited shared lists",
        "Unlimited shared lists with up to 25 people",
        "Slack, GitHub, Linear and Figma integrations",
        "Up to 500MB upload & 25GB file storage",
        "AI list creation",
      ],
    },
    {
      name: "Free Team",
      description: "For smaller teams to organize their work",
      price: 0,
      features: [
        "Everything in Free, plus:",
        "Up to 5 team members",
        "15 shared lists between team members",
        "Unlimited shared lists with team members and guests",
      ],
    },
    {
      name: "Pro Team",
      description: "Maximize productivity across your entire team",
      price: 10,
      features: [
        "Everything in Pro, plus:",
        "Unlimited team members",
        "Everyone in the team will be upgraded to personal Pro too",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Pricing for <span className="text-blue-600">all your needs</span>
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="mt-12 sm:mt-16 sm:flex sm:justify-center">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
            </div>
            <div className="relative max-w-7xl mx-auto">
              <div className="flex justify-center py-4">
                <span className="mr-3">Monthly</span>
                <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                <span className="ml-3">
                  Yearly <span className="text-red-500">-20%</span>
                </span>
              </div>
              <div className="grid gap-6 lg:grid-cols-4">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {plan.name}
                      </h2>
                      <p className="mt-4 text-sm text-gray-500">
                        {plan.description}
                      </p>
                      <p className="mt-8">
                        <span className="text-4xl font-extrabold text-gray-900">
                          ${plan.price}
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /month
                        </span>
                      </p>
                      <Button className="mt-8 block w-full bg-blue-600 hover:bg-blue-700">
                        Get started
                      </Button>
                    </div>
                    <div className="px-6 pt-6 pb-8 bg-gray-50">
                      <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                        What's included
                      </h3>
                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex space-x-3">
                            <CheckCircle2
                              className="flex-shrink-0 h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                            <span className="text-sm text-gray-500">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white text-xl rounded-full">
            Sign up for free
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't worry - you won't be charged for anything without opting in, and
          you won't lose access to any of your data if you're over the usage
          limits for free users.
        </p>
      </div>
      <Footer />
    </div>
  );
}
