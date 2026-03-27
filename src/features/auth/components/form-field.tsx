import { InlineError } from "@/features/auth/components/inline-error";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  // Simple form semantics; we keep markup accessible without introducing dependencies.
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <InlineError message={error} /> : null}
    </div>
  );
}

