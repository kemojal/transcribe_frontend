"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Home,
  FileText,
  Bell,
  Bookmark,
  Clock,
  Gift,
  Settings,
  HelpCircle,
  ChevronDown,
  Link,
  Users,
  Zap,
} from "lucide-react";

const RewardsPage = () => {
  const [inviteEmails, setInviteEmails] = useState("");

  return (
    <div className="flex-1  p-6">
      <h1 className="text-2xl font-bold mb-6">Earn free videos</h1>

      {/* Invite card */}
      <div className="bg-indigo-50 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Invite to this space,
              <br />
              earn free videos
            </h2>
            <p className="text-gray-600 mb-4">
              Get 25 free videos when someone you invite signs up, and
              <br />
              another 25 when they record a Loom video.
            </p>
            <Input
              type="text"
              placeholder="Separate emails with a space"
              className="mb-4 max-w-md"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
            />
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <Link className="w-4 h-4 mr-2" />
                Copy invite link
              </Button>
              <Button>Send invite</Button>
            </div>
          </div>
          <img
            src="/placeholder.svg?height=150&width=200"
            alt="Illustration"
            className="w-48 h-auto"
          />
        </div>
      </div>

      {/* Progress section */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            No videos earned, start inviting your team!
          </h3>
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </div>
        <Progress value={0} max={500} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>250</span>
          <span>300</span>
          <span>350</span>
          <span>400</span>
          <span>450</span>
          <span>500</span>
        </div>
      </div>

      {/* Ways to earn section */}
      <h2 className="text-xl font-bold mb-4">
        Ways to earn videos and use Loom
      </h2>
      <div className="space-y-4">
        {[
          "How to invite",
          "How your team can use Loom together",
          "Boost productivity with your team",
        ].map((title, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border p-4 flex justify-between items-center"
          >
            <span className="font-semibold">{title}</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
