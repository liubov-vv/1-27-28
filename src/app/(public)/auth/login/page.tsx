"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthForm } from "@/features/auth/components/auth-form";
import { FormField } from "@/features/auth/components/form-field";
import { InlineError } from "@/features/auth/components/inline-error";
import { PasswordInput } from "@/features/auth/components/password-input";
import { SuccessMessage } from "@/features/auth/components/success-message";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";

type ScreenState = "default" | "loading" | "validation" | "success" | "error";

function validateEmail(email: string) {
  if (!email.trim()) return "Введите email.";
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Формат email некорректный.";
  return null;
}

function validatePassword(password: string) {
  if (!password) return "Введите пароль.";
  if (password.length < 6) return "Пароль должен быть минимум 6 символов.";
  return null;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const [state, setState] = useState<ScreenState>("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const canSubmit = useMemo(() => email.trim() && password.length >= 6, [email, password]);

  useEffect(() => {
    if (simulateMode === "success") {
      setState("success");
    }
  }, [simulateMode]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (simulateMode === "server-error") {
      setErrors({ form: "Сервис недоступен. Попробуйте позже." });
      setState("error");
      return;
    }

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    const nextErrors: typeof errors = {};
    if (emailErr) nextErrors.email = emailErr;
    if (passErr) nextErrors.password = passErr;

    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
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
    }, 750);
  };

  return (
    <AuthCard title="Вход" description="Доступ к истории консультаций и управлению клиентами.">
      {state === "success" ? (
        <SuccessMessage title="Вы вошли" description="В демонстрационном режиме аккаунт считается активным." />
      ) : null}

      {state === "error" ? (
        <EmptyState title="Не удалось выполнить вход" description="Попробуйте ещё раз или смените способ входа." />
      ) : null}

      {state === "default" || state === "validation" || state === "loading" ? (
        <AuthForm
          title="Авторизация"
          submitLabel={state === "loading" ? "Выполняем вход..." : "Войти"}
          isLoading={state === "loading"}
          submitDisabled={!canSubmit}
          onSubmit={submit}
          footer={
            <div className="flex flex-wrap gap-3">
              <a href="/auth/password-recovery" className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">
                Забыли пароль?
              </a>
              <a href="/auth/register" className="text-sm font-semibold text-[rgb(var(--text-muted))] hover:opacity-90">
                Создать аккаунт
              </a>
            </div>
          }
        >
          {errors.form ? <InlineError message={errors.form} /> : null}

          <FormField label="Email" htmlFor="login-email" error={errors.email}>
            <Input
              id="login-email"
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === "loading"}
            />
          </FormField>

          <FormField label="Пароль" htmlFor="login-password" error={errors.password}>
            <PasswordInput
              id="login-password"
              value={password}
              placeholder="Введите пароль"
              onChange={(v) => setPassword(v)}
              error={errors.password}
            />
          </FormField>
          <div className="text-xs text-[rgb(var(--text-muted))]">{canSubmit ? "Готово к отправке" : "Заполните данные"}</div>
        </AuthForm>
      ) : null}
    </AuthCard>
  );
}

