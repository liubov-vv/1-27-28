import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold tracking-wide">[PLATFORM_NAME]</div>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">[TAGLINE]</p>
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
                <Link href="/faq">FAQ</Link>
              </div>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold">Контакты</div>
            <div className="mt-3 space-y-2 text-[rgb(var(--text-muted))]">
              <div>[CONTACT_EMAIL]</div>
              <div>[CONTACT_PHONE]</div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-xs text-[rgb(var(--text-muted))]">© {new Date().getFullYear()} [PLATFORM_NAME]. Все права защищены.</div>
      </div>
    </footer>
  );
}

