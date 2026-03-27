"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";

type FAQItemProps = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItemProps[];
  defaultOpenIndex?: number;
};

export function FAQAccordion({ items, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const initial = useMemo(() => (items.length > 0 ? defaultOpenIndex : -1), [items.length, defaultOpenIndex]);
  const [openIndex, setOpenIndex] = useState(initial);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = idx === openIndex;
        return (
          <div key={item.question} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold">{item.question}</span>
              <span className={cn("text-sm font-semibold text-[rgb(var(--text-muted))]", isOpen ? "rotate-45" : "")}>+</span>
            </button>
            {isOpen ? <div className="px-4 pb-3 text-sm text-[rgb(var(--text-muted))]">{item.answer}</div> : null}
          </div>
        );
      })}
    </div>
  );
}

