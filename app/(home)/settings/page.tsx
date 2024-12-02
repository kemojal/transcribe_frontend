"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  User,
  Lock,
  Globe,
  Keyboard,
  HelpCircle,
  Shield,
  CreditCard,
  Trash2,
  ChevronRight,
} from "lucide-react";

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

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    updates: false,
    newsletter: true,
  });

  const menuItems = [
    { icon: User, label: "Profile", tab: "profile" },
    { icon: Bell, label: "Notifications", tab: "notifications" },
    { icon: Lock, label: "Security", tab: "security" },
    { icon: Globe, label: "Language", tab: "language" },
    { icon: Keyboard, label: "Shortcuts", tab: "shortcuts" },
    { icon: Shield, label: "Privacy", tab: "privacy" },
    { icon: CreditCard, label: "Billing", tab: "billing" },
    { icon: HelpCircle, label: "Help", tab: "help" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto p-8"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account preferences and settings
        </p>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <motion.div variants={item}>
          <TabsList className="bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
            {menuItems.map((item, index) => (
              <TabsTrigger
                key={index}
                value={item.tab}
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-gray-100 rounded-md transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        <TabsContent value="profile">
          <motion.div variants={item} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information and email settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-x-4">
                    <Button variant="outline">Change Photo</Button>
                    <Button variant="outline" className="text-red-600">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Input defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Input defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input defaultValue="john.doe@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <Input defaultValue="+1 (555) 000-0000" type="tel" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <Textarea
                    placeholder="Write a few sentences about yourself..."
                    className="h-32"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    title: "Email Notifications",
                    description: "Receive notifications via email",
                    key: "email",
                  },
                  {
                    title: "Desktop Notifications",
                    description: "Show desktop notifications",
                    key: "desktop",
                  },
                  {
                    title: "Product Updates",
                    description: "Get notified about new features and updates",
                    key: "updates",
                  },
                  {
                    title: "Newsletter",
                    description: "Receive our newsletter with latest news",
                    key: "newsletter",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          [item.key]: checked,
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Other tab contents would go here */}
      </Tabs>
    </motion.div>
  );
};

export default Settings;
