import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth/session";
import { api } from "@/lib/api";

type AdminLayoutProps = Readonly<{ children: React.ReactNode }>;

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Consultants", href: "/admin/consultants" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Services", href: "/admin/services" },
  { label: "Content", href: "/admin/content" },
  { label: "Knowledge", href: "/admin/knowledge" },
  { label: "Blog", href: "/admin/blog" },
  { label: "FAQ", href: "/admin/faq" },
  { label: "Campaigns", href: "/admin/campaigns" },
  { label: "Roles", href: "/admin/roles" },
  { label: "Settings", href: "/admin/settings" }
];

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await requireRole("admin");
  const allUsers = await api.listUsers();

  return (
    <DashboardShell
      sidebarTitle="Admin Panel"
      sidebarItems={adminNav}
      topbar={{ greetingName: session.fullName, activeClientsCount: allUsers.length, unreadCount: 2 }}
    >
      {children}
    </DashboardShell>
  );
}

