"use client";

import { Select } from "@/components/ui/select";

type AudienceSelectorProps = {
  value: string;
  onChange: (v: string) => void;
};

export function AudienceSelector({ value, onChange }: AudienceSelectorProps) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Аудитория</div>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={[
          { value: "Active clients", label: "Active clients" },
          { value: "Paused clients", label: "Paused clients" },
          { value: "All clients", label: "All clients" }
        ]}
      />
    </div>
  );
}

