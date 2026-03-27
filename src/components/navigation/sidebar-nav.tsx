"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type SidebarItem = {
  label: string;
  href: string;
};

type SidebarNavProps = {
  title: string;
  items: SidebarItem[];
};

export function SidebarNav({ title, items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 lg:w-64">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "focus-ring block rounded-md px-3 py-2 text-sm text-[rgb(var(--text-muted))] transition",
                "hover:bg-[rgb(var(--surface-muted))] hover:text-[rgb(var(--text))]",
                pathname === item.href ? "bg-[rgb(var(--surface-muted))] text-[rgb(var(--text))] font-semibold" : ""
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
