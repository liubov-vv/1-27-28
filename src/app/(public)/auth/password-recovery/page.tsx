"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthForm } from "@/features/auth/components/auth-form";
import { FormField } from "@/features/auth/components/form-field";
import { InlineError } from "@/features/auth/components/inline-error";
import { SuccessMessage } from "@/features/auth/components/success-message";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";

type ScreenState = "default" | "loading" | "validation" | "success" | "error";

function validateEmail(email: string) {
  if (!email.trim()) return "Введите email.";
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Формат email некорректный.";
  return null;
}

export default function PasswordRecoveryPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const [state, setState] = useState<ScreenState>("default");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string; form?: string }>({});

  const canSubmit = useMemo(() => Boolean(email.trim()), [email]);

  useEffect(() => {
    if (simulateMode === "success") {
      setState("success");
    }
  }, [simulateMode]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (simulateMode === "server-error") {
      setErrors({ form: "Не удалось отправить письмо. Попробуйте позже." });
      setState("error");
      return;
    }

    const emailErr = validateEmail(email);
    if (emailErr) {
      setErrors({ email: emailErr });
      setState("validation");
      return;
    }

    if (simulateMode === "success") {
      setState("success");
      return;
    }

    setErrors({});
    setState("loading");
    window.setTimeout(() => {
      setState("success");
    }, 700);
  };

  return (
    <AuthCard title="Восстановление пароля" description="Введите email, чтобы получить ссылку на восстановление.">
      {state === "success" ? (
        <SuccessMessage
          title="Письмо отправлено"
          description="Демо-режим: ссылка на восстановление отправлена."
        />
      ) : null}

      {state === "error" ? <EmptyState title="Не удалось отправить письмо" description="Попробуйте позже." /> : null}

      {state === "default" || state === "validation" || state === "loading" ? (
        <AuthForm
          title="Проверьте email"
          submitLabel={state === "loading" ? "Отправляем..." : "Отправить ссылку"}
          isLoading={state === "loading"}
          submitDisabled={!canSubmit}
          onSubmit={submit}
          footer={
            <div className="flex flex-wrap gap-3">
              <a href="/auth/login" className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">
                Вернуться к входу
              </a>
            </div>
          }
        >
          {errors.form ? <InlineError message={errors.form} /> : null}

          <FormField label="Email" htmlFor="recovery-email" error={errors.email}>
            <Input
              id="recovery-email"
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === "loading"}
            />
          </FormField>
          <div className="text-xs text-[rgb(var(--text-muted))]">{canSubmit ? "Мы отправим письмо" : "Введите email"}</div>
        </AuthForm>
      ) : null}
    </AuthCard>
  );
}

