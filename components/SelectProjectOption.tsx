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
import { Box } from "lucide-react";
import { ProjectProps } from "@/types/interfaces";

type Option = {
  value: string;
  label: string;
};

interface SelectOptionProps {
  placeholder?: string;
  options?: Option[];
  onvalueChange?: (project: ProjectProps) => void;
}

export const SelectProjectOption = ({
  placeholder = "Select an option",
  options,
  onvalueChange,
}: SelectOptionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<string>(options[0]?.value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setDefaultValue(filteredOptions[0]?.value);
  }, [options]);

  return (
    <Select defaultValue={defaultValue} onValueChange={onvalueChange}>
      <SelectTrigger className="h-8 text-sm focus:ring-0 outline-gray-50 flex items-center gap-1">
        <span className="">
          <Box size={16} strokeWidth={1} />
        </span>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent onClick={(e) => e.stopPropagation()}>
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
            className="text-left flex "
            onClick={(e) => e.stopPropagation()}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
