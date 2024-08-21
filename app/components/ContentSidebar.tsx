// components/ContentSidebar.tsx
import { Button } from "@/components/ui/button";
import React from "react";

interface ContentSidebarProps {
  sections: string[];
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const ContentSidebar: React.FC<ContentSidebarProps> = ({
  sections,
  activeSection,
  onSectionClick,
}) => {
  return (
    <div className="bg-white p-4 border-r border-gray-50">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <nav>
        <ul className="space-y-2 text-sm">
          {sections.map((section, index) => (
            <li key={index} className="flex items-start">
              <button
                onClick={() => onSectionClick(section)}
                className={`flex w-full items-start text-left px-2 py-1 rounded ${
                  activeSection === section
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {index + 1}. {section}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ContentSidebar;
