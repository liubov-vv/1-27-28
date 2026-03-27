"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type QuickAction = {
  label: string;
  href: string;
};

type QuickActionCardProps = {
  actions: QuickAction[];
};

export function QuickActionCard({ actions }: QuickActionCardProps) {
  return (
    <div className="space-y-3">
      {actions.map((a) => (
        <div key={a.href} className="flex items-center justify-between gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3">
          <div className="text-sm font-semibold">{a.label}</div>
          <Link href={a.href}>
            <Button size="sm">Открыть</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

