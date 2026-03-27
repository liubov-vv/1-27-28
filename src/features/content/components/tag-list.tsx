type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  if (!tags.length) {
    return <div className="text-sm text-[rgb(var(--text-muted))]">Теги отсутствуют</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
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

