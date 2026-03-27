import { DataTable, type DataTableColumn } from "@/components/tables/data-table";

type AdminTableProps<Row> = {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
};

export function AdminTable<Row>({ columns, rows, rowKey }: AdminTableProps<Row>) {
  return <DataTable columns={columns} rows={rows} rowKey={rowKey} />;
}

