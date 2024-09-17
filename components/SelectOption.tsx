"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

type Option = {
  value: string;
  label: string;
};

interface SelectOptionProps {
  placeholder?: string;
  options?: Option[];
}

export const SelectOption = ({
  placeholder = "Select an option",
  options = [],
}: SelectOptionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  //   const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus the input when the dropdown opens
  //   useEffect(() => {
  //     if (isOpen && inputRef.current) {
  //       inputRef?.current?.focus();
  //     }
  //   }, [isOpen]);

  return (
    <Select defaultValue={options[0]?.value}>
      <SelectTrigger className="h-8 text-sm focus:ring-0 outline-gray-100">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2 h-8  border border-gray-300 rounded-xl text-xs"
            // ref={inputRef}
          />
        </div>
        {filteredOptions.map((option, index) => (
          <SelectItem
            key={index}
            value={option.value}
            className="text-left flex"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
