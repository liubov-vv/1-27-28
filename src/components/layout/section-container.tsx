import { cn } from "@/lib/utils/cn";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionContainer({ children, className }: SectionContainerProps) {
  return <section className={cn("py-8 sm:py-10 lg:py-12", className)}>{children}</section>;
}
