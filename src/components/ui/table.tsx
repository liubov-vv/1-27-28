import { cn } from "@/lib/utils/cn";

type Props<T> = {
  columns: Array<{ key: keyof T; header: string }>;
  rows: T[];
  rowKey: (row: T) => string;
  className?: string;
};

export function TableBase<T extends Record<string, unknown>>({ columns, rows, rowKey, className }: Props<T>) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-muted))]">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3 font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-t border-[rgb(var(--border))]">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3 text-[rgb(var(--text))]">
                    {String(row[column.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
