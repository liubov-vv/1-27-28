"use client";

import { useMemo } from "react";
import { SearchInput } from "@/features/public/components/search-input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Option = { label: string; value: string };

type FilterBarProps = {
  query: string;
  onQueryChange: (v: string) => void;
  queryPlaceholder?: string;
  system: string;
  onSystemChange: (v: string) => void;
  systemOptions: Option[];
  topic?: string;
  onTopicChange?: (v: string) => void;
  topicOptions?: Option[];
  experience?: string;
  onExperienceChange?: (v: string) => void;
  experienceOptions?: Option[];
  language?: string;
  onLanguageChange?: (v: string) => void;
  languageOptions?: Option[];
  format?: string;
  onFormatChange?: (v: string) => void;
  formatOptions?: Option[];
  sort: string;
  onSortChange: (v: string) => void;
  sortOptions: Option[];
  onReset?: () => void;
};

export function FilterBar({
  query,
  onQueryChange,
  queryPlaceholder,
  system,
  onSystemChange,
  systemOptions,
  topic,
  onTopicChange,
  topicOptions,
  experience,
  onExperienceChange,
  experienceOptions,
  language,
  onLanguageChange,
  languageOptions,
  format,
  onFormatChange,
  formatOptions,
  sort,
  onSortChange,
  sortOptions,
  onReset
}: FilterBarProps) {
  const showTopic = useMemo(() => Boolean(topicOptions?.length && onTopicChange), [topicOptions?.length, onTopicChange]);
  const showExperience = useMemo(() => Boolean(experienceOptions?.length && onExperienceChange), [experienceOptions?.length, onExperienceChange]);
  const showLanguage = useMemo(() => Boolean(languageOptions?.length && onLanguageChange), [languageOptions?.length, onLanguageChange]);
  const showFormat = useMemo(() => Boolean(formatOptions?.length && onFormatChange), [formatOptions?.length, onFormatChange]);

  return (
    <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 shadow-[0_10px_24px_rgba(24,31,45,0.05)] sm:p-5">
      <div className="grid gap-3 md:grid-cols-6">
        <div className="md:col-span-2 lg:col-span-3">
          <SearchInput value={query} placeholder={queryPlaceholder ?? "Поиск по каталогу"} onChange={onQueryChange} />
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
        {showExperience ? (
          <div>
            <Select options={experienceOptions ?? []} value={experience ?? ""} onChange={(e) => onExperienceChange?.(e.target.value)} />
          </div>
        ) : null}
        {showLanguage ? (
          <div>
            <Select options={languageOptions ?? []} value={language ?? ""} onChange={(e) => onLanguageChange?.(e.target.value)} />
          </div>
        ) : null}
        {showFormat ? (
          <div>
            <Select options={formatOptions ?? []} value={format ?? ""} onChange={(e) => onFormatChange?.(e.target.value)} />
          </div>
        ) : null}
        <div className={showTopic || showExperience || showLanguage || showFormat ? "" : "md:col-span-2"}>
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

