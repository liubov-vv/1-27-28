import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-10 pt-10 sm:px-6 lg:max-w-lg">
      {children}
    </div>
  );
}

