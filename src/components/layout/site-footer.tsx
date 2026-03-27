import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold tracking-wide text-[rgb(var(--primary))]">VIBO Strategy</div>
            <p className="mt-3 text-sm leading-6 text-[rgb(var(--text-muted))]">
              Платформа стратегических консультаций для жизненных и бизнес-решений с фиксируемым результатом и историей сопровождения.
            </p>
          </div>
          <div className="text-sm">
            <div className="font-semibold">Разделы</div>
            <div className="mt-3 space-y-2 text-[rgb(var(--text-muted))]">
              <div>
                <Link href="/about">О платформе</Link>
              </div>
              <div>
                <Link href="/consultations">Консультации</Link>
              </div>
              <div>
                <Link href="/consultants">Консультанты</Link>
              </div>
              <div>
                <Link href="/faq">Вопросы и ответы</Link>
              </div>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold">Связаться с командой</div>
            <div className="mt-3 space-y-2 text-[rgb(var(--text-muted))]">
              <div>hello@vibostrategy.com</div>
              <div>+7 (900) 000-00-00</div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-xs text-[rgb(var(--text-muted))]">© {new Date().getFullYear()} VIBO Strategy. Конфиденциально и профессионально.</div>
      </div>
    </footer>
  );
}

