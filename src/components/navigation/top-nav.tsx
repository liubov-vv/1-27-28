import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link href="/" className="text-sm font-semibold tracking-wide text-[rgb(var(--primary))]">
          VIBO Strategy
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[rgb(var(--text-muted))] md:flex">
          <Link href="/about" className="transition hover:text-[rgb(var(--text))]">
            О платформе
          </Link>
          <Link href="/consultations" className="transition hover:text-[rgb(var(--text))]">
            Консультации
          </Link>
          <Link href="/consultants" className="transition hover:text-[rgb(var(--text))]">
            Консультанты
          </Link>
          <Link href="/faq" className="transition hover:text-[rgb(var(--text))]">
            Вопросы и ответы
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Войти
          </Button>
          <Button size="sm">Записаться на консультацию</Button>
        </div>
      </div>
    </header>
  );
}
