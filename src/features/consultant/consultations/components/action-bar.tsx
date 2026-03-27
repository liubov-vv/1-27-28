import Link from "next/link";
import { Button } from "@/components/ui/button";

type ActionBarProps = {
  consultationId: string;
};

export function ActionBar({ consultationId }: ActionBarProps) {
  return (
    <div className="sticky bottom-3 z-10 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-3 shadow-[0_10px_30px_rgba(19,29,52,0.12)]">
      <div className="flex flex-wrap gap-3">
        <Button>Сохранить изменения</Button>
        <Button variant="secondary">Отправить клиенту</Button>
        <Link href={`/consultant/consultations/${consultationId}/edit`}>
          <Button variant="ghost">Редактировать</Button>
        </Link>
      </div>
    </div>
  );
}

