"use client";

import { useMemo } from "react";
import { SearchInput } from "@/features/public/components/search-input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Option = { label: string; value: string };

type FilterBarProps = {
  query: string;
  onQueryChange: (v: string) => void;
  system: string;
  onSystemChange: (v: string) => void;
  systemOptions: Option[];
  topic?: string;
  onTopicChange?: (v: string) => void;
  topicOptions?: Option[];
  sort: string;
  onSortChange: (v: string) => void;
  sortOptions: Option[];
  onReset?: () => void;
};

export function FilterBar({
  query,
  onQueryChange,
  system,
  onSystemChange,
  systemOptions,
  topic,
  onTopicChange,
  topicOptions,
  sort,
  onSortChange,
  sortOptions,
  onReset
}: FilterBarProps) {
  const showTopic = useMemo(() => Boolean(topicOptions?.length && onTopicChange), [topicOptions?.length, onTopicChange]);

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 shadow-[0_2px_24px_rgba(19,29,52,0.04)]">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <SearchInput value={query} placeholder="Поиск по консультациям..." onChange={onQueryChange} />
        </div>
        <div>
          <Select options={systemOptions} value={system} onChange={(e) => onSystemChange(e.target.value)} />
        </div>
        {showTopic ? (
          <div>
            <Select
              options={topicOptions ?? []}
              value={topic ?? ""}
              onChange={(e) => onTopicChange?.(e.target.value)}
            />
          </div>
        ) : null}
        <div className={showTopic ? "" : "md:col-span-2"}>
          <Select options={sortOptions} value={sort} onChange={(e) => onSortChange(e.target.value)} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {onReset ? (
          <Button variant="secondary" onClick={onReset}>
            Сбросить
          </Button>
        ) : null}
      </div>
    </div>
  );
}

