import { Card } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card className="p-6 shadow-[0_6px_24px_rgba(19,29,52,0.06)]">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{description}</p> : null}
      </div>
      <div className="mt-6">{children}</div>
    </Card>
  );
}

