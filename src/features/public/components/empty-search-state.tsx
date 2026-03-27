import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

type EmptySearchStateProps = {
  title?: string;
  description?: string;
  onReset?: () => void;
};

export function EmptySearchState({ title = "Ничего не найдено", description = "Попробуйте изменить фильтры и запрос.", onReset }: EmptySearchStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      action={
        onReset ? (
          <Button variant="secondary" onClick={onReset}>
            Сбросить фильтры
          </Button>
        ) : null
      }
    />
  );
}

