"use client";

import { cn } from "@/lib/utils/cn";
import { useMemo, useState } from "react";

type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
};

export function Tabs({ items, defaultValue, className }: TabsProps) {
  const initial = useMemo(() => defaultValue ?? items[0]?.value ?? "", [defaultValue, items]);
  const [active, setActive] = useState(initial);
  const current = items.find((item) => item.value === active) ?? items[0];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex gap-2 overflow-auto rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-1">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setActive(item.value)}
            className={cn(
              "focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition",
              active === item.value ? "bg-[rgb(var(--primary))] text-white" : "text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--surface-muted))]"
            )}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">{current?.content}</div>
    </div>
  );
}
