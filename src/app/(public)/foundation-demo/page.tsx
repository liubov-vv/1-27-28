import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBase } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const rows = [
  { name: "Анна Смирнова", service: "Стратегическая консультация", status: "completed" },
  { name: "Дмитрий Волков", service: "Стратегическая консультация", status: "scheduled" }
];

export default function FoundationDemoPage() {
  return (
    <PageContainer className="space-y-8 py-8">
      <SectionContainer className="py-0">
        <h1 className="text-3xl font-semibold tracking-tight">Phase 1 Foundation Demo</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Design tokens, reusable primitives, and realistic UI states.</p>
      </SectionContainer>

      <SectionContainer className="grid gap-6 py-0 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Buttons and badges</CardTitle>
              <CardDescription>Default and loading states</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button isLoading>Loading</Button>
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Error</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Form fields</CardTitle>
              <CardDescription>Input, select, textarea, success/error messages</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Имя клиента" />
            <Select options={[{ label: "BaZi", value: "bazi" }, { label: "Qi Men", value: "qimen" }]} />
            <Textarea placeholder="Текст рекомендации" />
            <p className="text-sm text-[rgb(var(--success))]">Success: profile updated.</p>
            <p className="text-sm text-[rgb(var(--danger))]">Error: failed to load data.</p>
          </CardContent>
        </Card>
      </SectionContainer>

      <SectionContainer className="py-0">
        <Tabs
          items={[
            { label: "Default", value: "default", content: <p className="text-sm">Default tab content</p> },
            { label: "No Results", value: "no-results", content: <EmptyState title="No results" description="Try changing filters." /> },
            { label: "Empty", value: "empty", content: <EmptyState title="No data yet" description="Create your first record." /> }
          ]}
        />
      </SectionContainer>

      <SectionContainer className="grid gap-6 py-0 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Loading skeletons</CardTitle>
              <CardDescription>Used for async page and block loading</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Table base</CardTitle>
              <CardDescription>Desktop table, mobile overflow</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <TableBase
              columns={[
                { key: "name", header: "Client" },
                { key: "service", header: "Consultation" },
                { key: "status", header: "Status" }
              ]}
              rows={rows}
              rowKey={(row) => `${row.name}-${row.status}`}
            />
          </CardContent>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
}
