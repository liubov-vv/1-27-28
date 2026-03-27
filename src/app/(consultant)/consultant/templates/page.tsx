import { Suspense } from "react";
import { TemplatesPage } from "@/features/consultant/operations/templates-page";

export default function ConsultantTemplatesRoutePage() {
  return (
    <Suspense fallback={null}>
      <TemplatesPage />
    </Suspense>
  );
}

