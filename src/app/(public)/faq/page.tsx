import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { FAQPage } from "@/features/public/faq/faq-page";

export default function FAQRoutePage() {
  return (
    <PageContainer>
      <SectionContainer fullScreen={false} centered={false}>
        <FAQPage />
      </SectionContainer>
    </PageContainer>
  );
}

