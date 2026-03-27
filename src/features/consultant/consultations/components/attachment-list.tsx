import { EmptyState } from "@/components/ui/empty-state";

export type AttachmentItem = { id: string; name: string; size: string };

export function AttachmentList({ items }: { items: AttachmentItem[] }) {
  if (!items.length) {
    return <EmptyState title="Нет вложений" description="Прикрепите файл к консультации, чтобы он появился здесь." />;
  }

  return (
    <div className="space-y-3">
      {items.map((f) => (
        <div key={f.id} className="flex items-center justify-between gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3">
          <div className="text-sm font-semibold">{f.name}</div>
          <div className="text-xs text-[rgb(var(--text-muted))]">{f.size}</div>
        </div>
      ))}
    </div>
  );
}

