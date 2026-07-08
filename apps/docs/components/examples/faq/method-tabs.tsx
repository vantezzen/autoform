"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MethodTabsItem {
  value: string;
  label: string;
}

interface MethodTabsProps {
  items: MethodTabsItem[];
  defaultValue?: string;
  children: React.ReactNode;
}

interface MethodTabProps {
  value: string;
  children: React.ReactNode;
}

export function MethodTab({ children }: MethodTabProps) {
  return <>{children}</>;
}

export function MethodTabs({ items, defaultValue, children }: MethodTabsProps) {
  const [activeValue, setActiveValue] = React.useState(
    defaultValue ?? items[0]?.value ?? "",
  );

  const tabs = React.Children.toArray(
    children,
  ) as React.ReactElement<MethodTabProps>[];
  const activeTab =
    tabs.find((tab) => tab.props.value === activeValue) ?? tabs[0];

  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap gap-2 border-b"
        role="tablist"
        aria-label="Dialog submit methods"
      >
        {items.map((item) => {
          const isActive = item.value === activeValue;

          return (
            <Button
              key={item.value}
              type="button"
              variant="ghost"
              role="tab"
              aria-selected={isActive}
              aria-controls={`method-tab-panel-${item.value}`}
              id={`method-tab-${item.value}`}
              className={cn(
                "rounded-none border-b-2 border-transparent px-2 pb-2 pt-1 text-sm",
                "hover:bg-transparent",
                isActive
                  ? "border-foreground text-foreground"
                  : "text-muted-foreground",
              )}
              onClick={() => setActiveValue(item.value)}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`method-tab-panel-${activeValue}`}
        aria-labelledby={`method-tab-${activeValue}`}
      >
        {activeTab}
      </div>
    </div>
  );
}
