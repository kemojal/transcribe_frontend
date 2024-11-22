"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Pencil, Copy, Play,ScrollText, Search, RefreshCw, ArrowLeft } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton"


export default function SearchNotFound() {
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full max-w-4xl mx-auto space-y-2 absolute">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="group flex items-center justify-between p-3 rounded-lg hover:bg-accent/50"
          >
            <div className="flex-1">
              <Skeleton className="h-6 w-[80%] bg-muted" />
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 opacity-30" />
                <Skeleton className="h-4 w-12 bg-muted" />
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="h-4 w-4 opacity-30" />
                <Copy className="h-4 w-4 opacity-30" />
                <Play className="h-4 w-4 opacity-30" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Card className="w-full max-w-lg mx-auto shadow-none border-none py-8 relative z-10 bg-white/50">
        <CardContent className="pt-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 rounded-full"
            >
              <ScrollText className="h-12 w-12 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">
                No matching transcripts
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                We couldn't find any transcripts matching your search. Try
                adjusting your keywords or explore our suggestions below.
              </p>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pb-6">
          {/* <div className="flex w-full max-w-sm items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Try a new search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div> */}
          {/* <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Broaden search
          </Button>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to results
          </Button>
        </div> */}
        </CardFooter>
      </Card>
    </div>
  );
}
