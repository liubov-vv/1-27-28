import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { ContactsPage } from "@/features/public/contacts/contacts-page";

export default function ContactsRoutePage() {
  return (
    <PageContainer>
      <SectionContainer>
        <ContactsPage />
      </SectionContainer>
    </PageContainer>
  );
}

