"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type SearchInputProps = {
  value: string;
  placeholder?: string;
  onChange: (next: string) => void;
  className?: string;
};

export function SearchInput({ value, placeholder = "Поиск...", onChange, className }: SearchInputProps) {
  return (
    <div className={cn("w-full", className)}>
      <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

