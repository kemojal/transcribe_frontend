"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  items: TabItem[];
  defaultValue?: string;
}

export default function CustomTabs(
  { items, defaultValue }: CustomTabsProps = { items: [] }
) {
  const [activeTab, setActiveTab] = React.useState(
    defaultValue || items[0]?.label
  );

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="flex h-10 items-center justify-start p-0 bg-transparent">
        {items.map((item) => (
          <TabsTrigger
            key={item.label}
            value={item.label}
            className={`px-4 h-full data-[state=active]:text-primary data-[state=active]:font-semibold relative
              ${
                activeTab === item.label
                  ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  : ""
              }`}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.label} value={item.label} className="mt-1">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
