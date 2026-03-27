import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardWidgetProps = {
  title: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export function DashboardWidget({ title, children, rightSlot }: DashboardWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
        </div>
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

