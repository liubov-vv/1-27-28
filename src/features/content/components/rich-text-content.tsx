import type { ContentSection } from "@/lib/types/models";

type RichTextContentProps = {
  sections: ContentSection[];
};

function Paragraphs({ text }: { text: string }) {
  const parts = text.split("\n\n").map((p) => p.trim()).filter(Boolean);
  return (
    <div className="space-y-4">
      {parts.map((p, idx) => (
        <p key={idx} className="text-sm leading-7 text-[rgb(var(--text-muted))]">
          {p}
        </p>
      ))}
    </div>
  );
}

export function RichTextContent({ sections }: RichTextContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const HeadingTag = section.level === 3 ? "h3" : "h2";
        const headingClass =
          section.level === 3 ? "text-lg font-semibold tracking-tight" : "text-2xl font-semibold tracking-tight";

        return (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <HeadingTag className={headingClass}>{section.title}</HeadingTag>
            <div className="mt-4">
              <Paragraphs text={section.body} />
            </div>
          </section>
        );
      })}
    </div>
  );
}

