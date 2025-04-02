"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
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
  Link as LinkIcon,
  Users,
  Zap,
  Share2,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const RewardsPage = () => {
  const [inviteEmails, setInviteEmails] = useState("");
  const [copied, setCopied] = useState(false);
  const referralLink = "https://transcribai.com/invite/user123";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto p-8 h-screen overflow-y-auto pb-20"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rewards Program</h1>
        <p className="text-gray-500 mt-2">
          Invite friends and earn rewards for every successful referral
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {[
          {
            title: "Total Rewards",
            value: "2,500",
            subtitle: "minutes earned",
            icon: Gift,
            color: "bg-purple-50 text-purple-600",
          },
          {
            title: "Successful Referrals",
            value: "12",
            subtitle: "friends joined",
            icon: Users,
            color: "bg-blue-50 text-blue-600",
          },
          {
            title: "Available Minutes",
            value: "1,250",
            subtitle: "minutes remaining",
            icon: Clock,
            color: "bg-green-50 text-green-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{stat.subtitle}</p>
              </div>
              <div className={cn("p-3 rounded-lg", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Invite Section */}
      <motion.div
        variants={item}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-8 border border-indigo-100/50"
      >
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Share Transcribai & Earn Rewards
          </h2>
          <p className="text-gray-600 mb-6">
            Get 25 minutes of free transcription when someone you invite signs up,
            and another 25 minutes when they make their first transcription.
          </p>

          <div className="space-y-6">
            {/* Referral Link */}
            <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm border border-gray-100">
              <div className="flex-1 truncate font-mono text-sm text-gray-600">
                {referralLink}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className={cn(
                  "transition-all duration-200",
                  copied && "bg-green-50 border-green-200 text-green-600"
                )}
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>

            {/* Email Invite */}
            <div>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter email addresses (separated by spaces)"
                  className="flex-1"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                />
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Send Invites
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We'll send them a personal invitation from you
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={item}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            {[
              {
                name: "Sarah Chen",
                action: "joined through your invitation",
                time: "2 hours ago",
                reward: "+25 minutes",
              },
              {
                name: "Michael Park",
                action: "made their first transcription",
                time: "1 day ago",
                reward: "+25 minutes",
              },
              {
                name: "Emma Wilson",
                action: "joined through your invitation",
                time: "2 days ago",
                reward: "+25 minutes",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://avatar.vercel.sh/${activity.name}`} />
                    <AvatarFallback>
                      {activity.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.action} • {activity.time}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {activity.reward}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RewardsPage;
