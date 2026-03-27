"use client";

import { Textarea } from "@/components/ui/textarea";

type EditorSectionProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export function EditorSection({ label, value, onChange, placeholder }: EditorSectionProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">{label}</div>
      <Textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

