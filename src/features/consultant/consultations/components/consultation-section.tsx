import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ConsultationSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function ConsultationSection({ title, children }: ConsultationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

