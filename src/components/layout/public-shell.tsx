import { TopNav } from "@/components/navigation/top-nav";
import { SiteFooter } from "@/components/layout/site-footer";

type PublicShellProps = {
  children: React.ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      <TopNav />
      {children}
      <SiteFooter />
    </div>
  );
}
