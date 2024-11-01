"use client";


import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReactNode, useState } from "react";

interface TabItem {
  label: string;
  content: ReactNode;
}

interface CustomTabsProps {
  items: TabItem[];
  defaultValue?: string;
  endTabItem?: ReactNode;


}

export default function CustomTabs(
  { items, defaultValue, endTabItem }: CustomTabsProps = { items: [] }
) {
  const [activeTab, setActiveTab] = useState(
    defaultValue || items[0]?.label
  );

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="flex h-10 items-center justify-start p-0 bg-transparent space-x-2">
        {items.map((item) => (
          <TabsTrigger
            key={item.label}
            value={item.label}
            className={`px-1 h-full text-sm data-[state=active]:text-primary data-[state=active]:font-semibold relative
              ${
                activeTab === item.label
                  ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  : ""
              }`}
          >
            {item.label}
          </TabsTrigger>
        ))}
        {endTabItem}
      </TabsList>
      {items.map((item) => (
        <TabsContent
          key={item.label}
          value={item.label}
          className="mt-1"
        >
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
