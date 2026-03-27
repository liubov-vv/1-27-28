import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";

export default function AuthIndexPage() {
  return (
    <PageContainer className="py-10">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-semibold tracking-tight">VIBO Strategy</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Войдите или создайте аккаунт.</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/auth/login">
            <span className="focus-ring inline-flex cursor-pointer items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3 text-sm font-semibold hover:bg-[rgb(var(--surface-muted))]">
              Войти
            </span>
          </Link>
          <Link href="/auth/register">
            <span className="focus-ring inline-flex cursor-pointer items-center justify-center rounded-lg bg-[rgb(var(--primary))] px-4 py-3 text-sm font-semibold text-white hover:opacity-95">
              Регистрация
            </span>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

