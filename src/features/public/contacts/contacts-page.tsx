"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

type FormValues = { fullName: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

type LoadState = "default" | "loading" | "success" | "error" | "validation";

export function ContactsPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const [state, setState] = useState<LoadState>("default");
  const [values, setValues] = useState<FormValues>({ fullName: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const canSubmit = useMemo(() => values.fullName.trim() && values.email.trim() && values.message.trim(), [values]);

  useEffect(() => {
    setState("default");
    setErrors({});
  }, [simulateMode]);

  const validate = () => {
    const next: FormErrors = {};
    if (!values.fullName.trim()) next.fullName = "Введите имя.";
    if (!values.email.trim()) next.email = "Введите email.";
    if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = "Формат email некорректный.";
    if (!values.message.trim()) next.message = "Опишите ваш запрос.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setState("validation");
      return;
    }
    if (simulateMode === "error") {
      setState("error");
      return;
    }
    setState("loading");
    window.setTimeout(() => {
      setState("success");
    }, 700);
  };

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Контакты</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Оставьте сообщение — мы ответим в ближайшее время.</p>
      </div>

      {state === "success" ? (
        <EmptyState title="Сообщение отправлено" description="Спасибо! Мы свяжемся с вами и уточним детали." />
      ) : null}

      {state === "error" ? (
        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="text-sm font-semibold text-[rgb(var(--primary))]">Не удалось отправить</div>
            <div className="text-sm text-[rgb(var(--text-muted))]">Попробуйте снова или измените данные.</div>
            <Button variant="secondary" onClick={() => setState("default")}>
              Вернуться к форме
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {(state === "default" || state === "loading" || state === "validation") && state !== "success" && state !== "error" ? (
        <Card>
          <CardContent className="p-6">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Имя</div>
                <Input
                  value={values.fullName}
                  placeholder="[CLIENT_NAME]"
                  onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName ? <div className="mt-2 text-sm text-[rgb(var(--danger))]">{errors.fullName}</div> : null}
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Email</div>
                <Input
                  value={values.email}
                  placeholder="name@example.com"
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <div className="mt-2 text-sm text-[rgb(var(--danger))]">{errors.email}</div> : null}
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Сообщение</div>
                <Textarea
                  value={values.message}
                  placeholder="[RECOMMENDATION_TEXT]"
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message ? <div className="mt-2 text-sm text-[rgb(var(--danger))]">{errors.message}</div> : null}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={!canSubmit || state === "loading"} isLoading={state === "loading"}>
                  Отправить
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setValues({ fullName: "", email: "", message: "" });
                    setErrors({});
                    setState("default");
                  }}
                >
                  Очистить
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

