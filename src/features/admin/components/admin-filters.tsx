"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Option = { label: string; value: string };

type AdminFiltersProps = {
  query: string;
  onQueryChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  statusOptions: Option[];
  onReset?: () => void;
};

export function AdminFilters({ query, onQueryChange, status, onStatusChange, statusOptions, onReset }: AdminFiltersProps) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
      <div className="grid gap-3 md:grid-cols-[2fr_1fr_auto] md:items-end">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Search</div>
          <Input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Поиск..." />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Status</div>
          <Select value={status} onChange={(e) => onStatusChange(e.target.value)} options={statusOptions} />
        </div>
        {onReset ? <Button variant="secondary" onClick={onReset}>Reset</Button> : null}
      </div>
    </div>
  );
}

