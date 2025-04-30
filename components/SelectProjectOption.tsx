import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Box } from "lucide-react";
import type { Project } from "@/lib/store/types";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import { useAppDispatch } from "@/lib/hooks";
import TableDropdown from "./Dropdowns/TableDropdown";

type Option = { value: string; label: string };

interface SelectOptionProps {
  placeholder?: string;
  options?: Option[];
  onValueChange?: (value: string) => void;
  defaultValue?: string | undefined;
  isCollapsed?: boolean;
}

export const SelectProjectOption = ({
  placeholder = "Select an option",
  options = [],
  onValueChange,
  defaultValue,
  isCollapsed,
}: SelectOptionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    } else if (filteredOptions.length > 0) {
      setSelectedValue(filteredOptions[0]?.value);
    }
  }, [options, defaultValue, filteredOptions]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="py-6 text-sm focus:ring-0 outline-gray-50 flex items-center gap-1">
        <div className="flex space-x-1 items-center">
          {isCollapsed ? (
            <span className="text-gray-500">W</span>
          ) : (
            <>
              <span className="">
                <Box size={16} strokeWidth={1} />
              </span>
              <SelectValue placeholder={placeholder || "No Space"} />
            </>
          )}
        </div>
      </SelectTrigger>
      <SelectContent onClick={(e) => e.stopPropagation()}>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2 h-8 border border-gray-300 rounded-xl text-xs"
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
