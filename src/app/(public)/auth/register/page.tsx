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

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const [state, setState] = useState<ScreenState>("default");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});

  const canSubmit = useMemo(() => Boolean(fullName.trim()) && Boolean(email.trim()) && password.length >= 6, [fullName, email, password]);

  useEffect(() => {
    if (simulateMode === "success") {
      setState("success");
    }
  }, [simulateMode]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (simulateMode === "server-error") {
      setErrors({ form: "Ошибка создания аккаунта. Попробуйте позже." });
      setState("error");
      return;
    }

    const next: typeof errors = {};
    if (!fullName.trim()) next.fullName = "Введите имя.";

    const emailErr = validateEmail(email);
    if (emailErr) next.email = emailErr;

    const passErr = validatePassword(password);
    if (passErr) next.password = passErr;

    if (!confirmPassword) next.confirmPassword = "Подтвердите пароль.";
    else if (confirmPassword !== password) next.confirmPassword = "Пароли не совпадают.";

    const hasErrors = Boolean(next.fullName || next.email || next.password || next.confirmPassword);
    if (hasErrors) {
      setErrors(next);
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
    }, 850);
  };

  return (
    <AuthCard title="Регистрация" description="Создайте аккаунт, чтобы сохранять историю консультаций и заметки.">
      {state === "success" ? (
        <SuccessMessage title="Аккаунт создан" description="Демо-режим: вход выполнен автоматически." />
      ) : null}

      {state === "error" ? <EmptyState title="Не удалось зарегистрироваться" description="Попробуйте позже или смените данные." /> : null}

      {(state === "default" || state === "validation" || state === "loading") && state !== "success" && state !== "error" ? (
        <AuthForm
          title="Данные аккаунта"
          submitLabel={state === "loading" ? "Создаём аккаунт..." : "Зарегистрироваться"}
          isLoading={state === "loading"}
          submitDisabled={!canSubmit}
          onSubmit={submit}
          footer={
            <div className="flex flex-wrap gap-3">
              <a href="/auth/login" className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">
                Уже есть аккаунт?
              </a>
            </div>
          }
        >
          {errors.form ? <InlineError message={errors.form} /> : null}

          <FormField label="Имя" htmlFor="reg-name" error={errors.fullName}>
            <Input
              id="reg-name"
              value={fullName}
              placeholder="[CLIENT_NAME]"
              onChange={(e) => setFullName(e.target.value)}
              disabled={state === "loading"}
            />
          </FormField>

          <FormField label="Email" htmlFor="reg-email" error={errors.email}>
            <Input
              id="reg-email"
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === "loading"}
            />
          </FormField>

          <FormField label="Пароль" htmlFor="reg-password" error={errors.password}>
            <PasswordInput
              id="reg-password"
              value={password}
              placeholder="Минимум 6 символов"
              onChange={(v) => setPassword(v)}
              error={errors.password}
            />
          </FormField>

          <FormField label="Подтверждение пароля" htmlFor="reg-confirm" error={errors.confirmPassword}>
            <PasswordInput
              id="reg-confirm"
              value={confirmPassword}
              placeholder="Повторите пароль"
              onChange={(v) => setConfirmPassword(v)}
              error={errors.confirmPassword}
            />
          </FormField>
          <div className="text-xs text-[rgb(var(--text-muted))]">{canSubmit ? "Готово к отправке" : "Заполните поля корректно"}</div>
        </AuthForm>
      ) : null}
    </AuthCard>
  );
}

