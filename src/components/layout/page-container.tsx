import { cn } from "@/lib/utils/cn";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return <main className={cn("mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12", className)}>{children}</main>;
}
