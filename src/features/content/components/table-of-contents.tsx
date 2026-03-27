type TOCItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

type TableOfContentsProps = {
  items: TOCItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 lg:sticky lg:top-24">
      <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Оглавление</div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block rounded-lg px-2 py-1 text-sm text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--surface-muted))] hover:text-[rgb(var(--text))]"
            style={{ paddingLeft: item.level === 3 ? 14 : 8 }}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

