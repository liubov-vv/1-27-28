import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import type { Campaign } from "@/lib/types/models";

type Row = Campaign;

function statusBadge(status: Campaign["status"]) {
  if (status === "sent") return <Badge variant="success">sent</Badge>;
  if (status === "scheduled") return <Badge variant="accent">scheduled</Badge>;
  return <Badge>draft</Badge>;
}

export function CampaignTable({ rows }: { rows: Row[] }) {
  return (
    <DataTable<Row>
      columns={[
        { key: "title", header: "Название", render: (r) => <span className="font-semibold">{r.title}</span> },
        { key: "audience", header: "Аудитория", render: (r) => r.audience },
        { key: "status", header: "Статус", render: (r) => statusBadge(r.status) }
      ]}
      rows={rows}
      rowKey={(r) => r.id}
      mobileCard={(r) => (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
          <div className="text-sm font-semibold">{r.title}</div>
          <div className="mt-2 text-xs text-[rgb(var(--text-muted))]">{r.audience}</div>
          <div className="mt-3">{statusBadge(r.status)}</div>
        </div>
      )}
    />
  );
}

