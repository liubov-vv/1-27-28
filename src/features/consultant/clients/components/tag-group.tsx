export function TagGroup({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, 6).map((t) => (
        <span
          key={t}
          className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-2 py-1 text-xs font-medium text-[rgb(var(--text-muted))]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

