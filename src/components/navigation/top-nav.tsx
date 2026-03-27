"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = [
    { href: "/about", label: "О платформе" },
    { href: "/consultations", label: "Консультации" },
    { href: "/consultants", label: "Консультанты" },
    { href: "/faq", label: "Вопросы и ответы" }
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link href="/" className="text-sm font-semibold tracking-wide text-[rgb(var(--primary))]">
          VIBO Strategy
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[rgb(var(--text-muted))] md:flex">
          {menuLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[rgb(var(--text))]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Войти
          </Button>
          <Button size="sm">Записаться на консультацию</Button>
        </div>
        <button
          type="button"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))] md:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>
      {isMenuOpen ? (
        <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-[rgb(var(--text-muted))]">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-1 transition hover:bg-[rgb(var(--surface-muted))] hover:text-[rgb(var(--text))]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="secondary" size="sm">
              Войти
            </Button>
            <Button size="sm">Записаться на консультацию</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
