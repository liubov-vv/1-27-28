"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type Option = { label: string; value: string };

type FilterPanelProps = {
  query: string;
  onQueryChange: (v: string) => void;
  tag: string;
  onTagChange: (v: string) => void;
  tagOptions: Option[];
  status: string;
  onStatusChange: (v: string) => void;
  statusOptions: Option[];
  onReset?: () => void;
};

export function FilterPanel({ query, onQueryChange, tag, onTagChange, tagOptions, status, onStatusChange, statusOptions, onReset }: FilterPanelProps) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 shadow-[0_2px_24px_rgba(19,29,52,0.04)]">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Поиск</div>
          <Input value={query} placeholder="Имя клиента" onChange={(e) => onQueryChange(e.target.value)} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Тег</div>
          <Select options={tagOptions} value={tag} onChange={(e) => onTagChange(e.target.value)} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Статус</div>
          <Select options={statusOptions} value={status} onChange={(e) => onStatusChange(e.target.value)} />
        </div>
      </div>
      {onReset ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onReset} type="button">
            Сбросить
          </Button>
        </div>
      ) : null}
    </div>
  );
}

