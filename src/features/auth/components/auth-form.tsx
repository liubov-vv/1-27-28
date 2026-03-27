"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  title: string;
  submitLabel: string;
  isLoading: boolean;
  submitDisabled?: boolean;
  onSubmit: (e: FormEvent) => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthForm({
  title,
  submitLabel,
  isLoading,
  submitDisabled = false,
  onSubmit,
  children,
  footer
}: AuthFormProps) {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      aria-label={title}
      className="space-y-5"
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={submitDisabled || isLoading} isLoading={isLoading}>
          {submitLabel}
        </Button>
      </div>
      {footer ? <div className="pt-2">{footer}</div> : null}
    </form>
  );
}

