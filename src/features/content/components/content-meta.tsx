type ContentMetaProps = {
  category: string;
  publishedAt?: string;
  readingTimeLabel?: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "2-digit" });
}

export function ContentMeta({ category, publishedAt, readingTimeLabel = "7–9 мин" }: ContentMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[rgb(var(--text-muted))]">
      <span className="font-semibold text-[rgb(var(--text))]">{category}</span>
      {publishedAt ? <span>{formatDate(publishedAt)}</span> : null}
      <span>{readingTimeLabel}</span>
    </div>
  );
}

