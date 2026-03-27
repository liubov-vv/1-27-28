import { cn } from "@/lib/utils/cn";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
  centered?: boolean;
};

export function SectionContainer({ children, className, fullScreen = true, centered = true }: SectionContainerProps) {
  return (
    <section
      className={cn(
        "w-full py-8 sm:py-10 lg:py-12",
        fullScreen && "h-[100svh]",
        centered && "flex items-center",
        className
      )}
    >
      <div className="w-full">{children}</div>
    </section>
  );
}
