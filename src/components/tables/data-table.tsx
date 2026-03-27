"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export type DataTableColumn<Row> = {
  key: string;
  header: string;
  className?: string;
  render: (row: Row) => ReactNode;
};

type DataTableProps<Row> = {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  className?: string;
  mobileCard?: (row: Row) => React.ReactNode;
  rowHref?: (row: Row) => string;
};

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  className,
  mobileCard,
  rowHref
}: DataTableProps<Row>) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-muted))]">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className={cn("px-4 py-3 font-semibold", c.className)}>
                      {c.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const href = rowHref?.(row);
                  return (
                    <tr key={rowKey(row)} className="border-t border-[rgb(var(--border))]">
                      {columns.map((c) => (
                        <td key={c.key} className="px-4 py-3">
                          {href ? (
                            <Link href={href} className="text-[rgb(var(--text))] hover:opacity-90">
                              {c.render(row)}
                            </Link>
                          ) : (
                            c.render(row)
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {mobileCard ? <div className="md:hidden space-y-4">{rows.map((r) => <div key={rowKey(r)}>{mobileCard(r)}</div>)}</div> : null}
    </div>
  );
}

