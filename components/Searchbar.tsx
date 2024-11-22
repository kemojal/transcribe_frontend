"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Searchbar({
  isExpanded,
  setIsExpanded,
  searchQuery,
  setSearchQuery,
}) {
  //   const [isExpanded, setIsExpanded] = React.useState(false);
  //   const [searchQuery, setSearchQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleCollapse();
  };
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            key="search-button"
          >
            <Button
              variant="outline"
              className="pl-3 pr-5 h-10 rounded-full bg-gray-100 border-transparent hover:bg-gray-200 hover:border-transparent"
              onClick={handleExpand}
            >
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-500">Search</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative"
            key="search-input"
          >
            <motion.div
              initial={{ width: "100px" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex items-center"
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search transcript"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-8 pr-20 h-10 w-full bg-gray-100 border-2 border-primary-500 focus:border-primary focus-visible:ring-purple-500/20 rounded-full"
              />

              {searchQuery ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setSearchQuery("");
                    handleCollapse();
                  }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCollapse}
                  className="absolute right-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
