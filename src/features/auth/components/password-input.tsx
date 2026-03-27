"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type PasswordInputProps = {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
};

export function PasswordInput({ id, value, onChange, placeholder, error }: PasswordInputProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id={inputId}
          type={show ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={cn(error ? "border-[rgb(var(--danger))]" : "")}
        />
        <button
          type="button"
          className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--surface-muted))]"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Скрыть" : "Показать"}
        </button>
      </div>
    </div>
  );
}

