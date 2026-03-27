"use client";

import { useEffect, useMemo, useState } from "react";
import { users, consultants, clients, services, knowledgeArticles, blogArticles, faqItems, campaigns } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ManagementHeader } from "@/features/admin/components/management-header";
import { AdminFilters } from "@/features/admin/components/admin-filters";
import { AdminTable } from "@/features/admin/components/admin-table";
import { StatusPill } from "@/features/admin/components/status-pill";
import { RoleBadge } from "@/features/admin/components/role-badge";
import { BulkActionBar } from "@/features/admin/components/bulk-action-bar";

export type SectionKey =
  | "dashboard"
  | "users"
  | "consultants"
  | "clients"
  | "services"
  | "content"
  | "knowledge"
  | "blog"
  | "faq"
  | "campaigns"
  | "roles"
  | "settings";

type Row = Record<string, string>;
type State = "loading" | "error" | "empty" | "no-results" | "success";

const sectionMeta: Record<SectionKey, { title: string; description: string }> = {
  dashboard: { title: "Admin Dashboard", description: "Обзор платформы и ключевые статусы." },
  users: { title: "Users", description: "Управление пользовательскими аккаунтами." },
  consultants: { title: "Consultants", description: "Профили консультантов и статусы." },
  clients: { title: "Clients", description: "Клиентская база платформы." },
  services: { title: "Services", description: "Каталог услуг и их параметры." },
  content: { title: "Content", description: "Сводка контентных сущностей платформы." },
  knowledge: { title: "Knowledge Management", description: "Управление knowledge-материалами." },
  blog: { title: "Blog Management", description: "Редакционное управление блогом." },
  faq: { title: "FAQ Management", description: "Вопросы и ответы для публичной части." },
  campaigns: { title: "Campaigns", description: "Кампании и их статусы отправки." },
  roles: { title: "Roles / Permissions", description: "Роли доступа и распределение прав." },
  settings: { title: "Settings", description: "Глобальные настройки платформы." }
};

function buildRows(section: SectionKey): Row[] {
  switch (section) {
    case "users":
      return users.map((u) => ({ name: u.fullName, email: u.email, role: u.role, status: u.status }));
    case "consultants":
      return consultants.map((c) => ({
        name: users.find((u) => u.id === c.userId)?.fullName ?? c.id,
        system: c.systems.join(", "),
        rating: c.rating.toFixed(1),
        status: "active"
      }));
    case "clients":
      return clients.map((c) => ({
        name: users.find((u) => u.id === c.userId)?.fullName ?? c.id,
        request: c.mainRequest,
        tags: c.tags.join(", "),
        status: c.status ?? "active"
      }));
    case "services":
      return services.map((s) => ({
        title: s.title,
        system: s.system,
        price: `${s.priceFrom.toLocaleString("ru-RU")} ₽`,
        status: "active"
      }));
    case "knowledge":
      return knowledgeArticles.map((k) => ({ title: k.title, category: k.category, status: "published" }));
    case "blog":
      return blogArticles.map((b) => ({ title: b.title, category: b.category ?? "General", status: "published" }));
    case "faq":
      return faqItems.map((f) => ({ question: f.question, category: f.category, status: "active" }));
    case "campaigns":
      return campaigns.map((c) => ({ title: c.title, audience: c.audience, status: c.status }));
    case "roles":
      return [
        { role: "admin", members: String(users.filter((u) => u.role === "admin").length), status: "active" },
        { role: "consultant", members: String(users.filter((u) => u.role === "consultant").length), status: "active" },
        { role: "client", members: String(users.filter((u) => u.role === "client").length), status: "active" }
      ];
    case "content":
      return [
        { entity: "Knowledge Articles", count: String(knowledgeArticles.length), status: "active" },
        { entity: "Blog Articles", count: String(blogArticles.length), status: "active" },
        { entity: "FAQ Items", count: String(faqItems.length), status: "active" }
      ];
    case "settings":
      return [
        { key: "Public Website", value: "enabled", status: "active" },
        { key: "Campaign Sending", value: "draft mode", status: "scheduled" },
        { key: "Registration", value: "open", status: "active" }
      ];
    case "dashboard":
    default:
      return [
        { metric: "Users", value: String(users.length), status: "active" },
        { metric: "Consultations", value: "4", status: "active" },
        { metric: "Campaigns", value: String(campaigns.length), status: "draft" }
      ];
  }
}

function buildColumns(rows: Row[]) {
  const first = rows[0];
  if (!first) return [];
  return Object.keys(first).map((k) => ({
    key: k,
    header: k.charAt(0).toUpperCase() + k.slice(1),
    render: (row: Row) => {
      if (k === "status") return <StatusPill status={row[k]} />;
      if (k === "role") return <RoleBadge role={row[k]} />;
      return row[k];
    }
  }));
}

export function AdminSectionPage({ section }: { section: SectionKey }) {
  const meta = sectionMeta[section];
  const allRows = useMemo(() => buildRows(section), [section]);
  const columns = useMemo(() => buildColumns(allRows), [allRows]);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedCount, setSelectedCount] = useState(0);
  const [state, setState] = useState<State>("loading");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allRows.filter((row) => {
      const matchQ = !q || Object.values(row).join(" ").toLowerCase().includes(q);
      const matchS = status === "all" || (row.status ?? "").toLowerCase() === status;
      return matchQ && matchS;
    });
  }, [allRows, query, status]);

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (allRows.length === 0) return setState("empty");
      if (filtered.length === 0) return setState("no-results");
      setState("success");
    }, 220);
    return () => window.clearTimeout(t);
  }, [allRows.length, filtered.length]);

  return (
    <div className="space-y-6 py-8">
      <ManagementHeader title={meta.title} description={meta.description} />
      <AdminFilters
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
        statusOptions={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Draft", value: "draft" },
          { label: "Scheduled", value: "scheduled" },
          { label: "Published", value: "published" }
        ]}
        onReset={() => {
          setQuery("");
          setStatus("all");
          setSelectedCount(0);
        }}
      />
      <BulkActionBar selectedCount={selectedCount} />

      {state === "loading" ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-5/6" />
        </div>
      ) : null}
      {state === "error" ? <EmptyState title="Ошибка загрузки" description="Попробуйте позже." /> : null}
      {state === "empty" ? <EmptyState title="Нет данных" description="Секция пока не содержит элементов." /> : null}
      {state === "no-results" ? <EmptyState title="Ничего не найдено" description="Измените фильтры поиска." /> : null}
      {state === "success" ? (
        <AdminTable
          columns={columns}
          rows={filtered}
          rowKey={(row) => JSON.stringify(row)}
        />
      ) : null}
    </div>
  );
}

