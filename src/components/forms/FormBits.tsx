import { CheckCircle2, AlertCircle } from "lucide-react";
import type { SubmitStatus } from "./useFormSubmit";

export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1.5 text-sm text-ember">{messages[0]}</p>;
}

export function FormMessage({
  status,
  error,
  successText,
}: {
  status: SubmitStatus;
  error: string | null;
  successText: string;
}) {
  if (status === "success") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden />
        {successText}
      </p>
    );
  }
  if (status === "error" && error) {
    return (
      <p role="alert" className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-red-900">
        <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
        {error}
      </p>
    );
  }
  return null;
}
