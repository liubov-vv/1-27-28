import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          VIBO Strategy
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[rgb(var(--text-muted))] md:flex">
          <Link href="/about">О платформе</Link>
          <Link href="/consultations">Консультации</Link>
          <Link href="/consultants">Консультанты</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Войти
          </Button>
          <Button size="sm">Регистрация</Button>
        </div>
      </div>
    </header>
  );
}
