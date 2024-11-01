"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import Loader from "../Loader";
import { Forward, Link, Mail, Plus, Share2, UserPlus } from "lucide-react";
import { DialogueBase } from "./DialogueBase";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";

export const ShareDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://example.com/share-link");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      id: 1,
      label: "Share on LinkedIn",
      description: "Embed file in a post",
      icon: <BsLinkedin className="w-4 h-4" />,
      delay: 0.1,
    },
    {
      id: 2,
      label: "Share on Twitter",
      description: "Embed file in a tweet",
      icon: <BsTwitter className="w-4 h-4" />,
      delay: 0.2,
    },
    {
      id: 3,
      label: "Share on Facebook",
      description: "Embed file in a post",
      icon: <BsFacebook className="w-4 h-4" />,
      delay: 0.3,
    },
    {
      id: 4,
      label: "Share via Email",
      description: "Embed file in a message",
      icon: <Mail className="w-4 h-4" />,
      delay: 0.4,
    },
  ];

  return (
    <DialogueBase
      title="Share transcription file"
      description="Share your transcription file with others"
      trigger={
        <>
          <Share2 className="w-4 h-4" />
          {/* <span className="ml-1 text-xs">Share</span> */}
        </>
      }
      triggerStyle="px-4 h-8 border-[0px] border-black bg-transparent text-black"
      open={open}
      setOpen={setOpen}
    >
      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="embed">Embed</TabsTrigger>
        </TabsList>
        <TabsContent value="social">
          <motion.div className="grid space-y-2">
            {shareOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: option.delay }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2  py-8 flex items-center justify-between border-[0.5px] border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div>{option.icon}</div>
                    <div className="flex flex-col  items-start">
                      <h3 className="font-semibold">{option.label}</h3>
                      <div className="text-muted-foreground text-xs">
                        {option.description}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Forward className="w-4 h-4" />
                  </div>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        <TabsContent value="embed">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Video thumbnail"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="secondary" size="icon">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Link className="w-6 h-6" />
                  </motion.div>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="responsive" />
              <Label htmlFor="responsive">Responsive size</Label>
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="embed-code">Embed Code</Label>
              <div className="relative">
                <Input
                  id="embed-code"
                  defaultValue="<iframe src='https://example.com/embed' />"
                  readOnly
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1 h-7"
                  onClick={handleCopy}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogueBase>
  );
};
