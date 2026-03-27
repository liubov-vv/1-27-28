type InfoGridProps = {
  items: Array<{ label: string; value: string }>;
};

export function InfoGrid({ items }: InfoGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.label}>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">{it.label}</div>
          <div className="mt-2 text-sm font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

