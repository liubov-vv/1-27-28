export function InlineError({ message }: { message: string }) {
  return <div className="mt-2 text-sm text-[rgb(var(--danger))]">{message}</div>;
}

