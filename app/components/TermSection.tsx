"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const TermSection = ({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-gray-200 " id={id}>
      <Button
        variant={"ghost"}
        className="flex justify-between items-center w-full text-left text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </Button>
      {isOpen && (
        <div className="mt-4 text-gray-600 leading-relaxed text-sm mb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default TermSection;
