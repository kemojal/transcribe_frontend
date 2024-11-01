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
import { ProjectProps } from "@/types/interfaces";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import { addProject } from "@/lib/reducers/ProjectSlice";
import { useAppDispatch } from "@/lib/hooks";
import TableDropdown from "./Dropdowns/TableDropdown";

type Option = { value: number; label: string };

interface SelectOptionProps {
  placeholder?: string;
  options?: Option[];
  onValueChange?: (project: ProjectProps) => void;
  defaultValue?: number | undefined;
}

export const SelectProjectOption = ({
  placeholder = "Select an option",
  options = [],
  onValueChange,
  defaultValue,
}: SelectOptionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    defaultValue
  );

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    } else if (filteredOptions.length > 0) {
      setSelectedValue(filteredOptions[0]?.value); // Set the first filtered option if defaultValue is not set
    }
  }, [options, defaultValue, filteredOptions]);

  const handleAddProject = (newProject: ProjectProps) => {
    dispatch(addProject(newProject));
  };

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value); // Trigger the parent function when the value changes
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="h-8 text-sm focus:ring-0 outline-gray-50 flex items-center gap-1">
        <span className="">
          <Box size={16} strokeWidth={1} />
        </span>
        <SelectValue placeholder={placeholder || "No space found"} />
      </SelectTrigger>
      <SelectContent onClick={(e) => e.stopPropagation()}>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2 h-8  border border-gray-300 rounded-xl text-xs"
          />
        </div>
        {filteredOptions.map((option, index) => 
        {
          let item = {
            id: option.value,
            name: option.label,
          }
          return (
            <div key={index} className="flex items-center gap-2">
              <SelectItem
                key={index}
                value={option.value}
                className="text-left flex"
              >
                {option.label}
              </SelectItem>
              <TableDropdown item={item} />
            </div>
          )
        }
        )}
        <div className="py-3 w-full">
          <ProjectDialogue onAddProject={handleAddProject} />
        </div>
      </SelectContent>
    </Select>
  );
};
