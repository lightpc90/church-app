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

/**
 * Required "I agree" box for forms that collect sensitive data (faith, children). The API rejects
 * the submission without it. The value travels as "true" in the JSON body.
 */
export function ConsentCheckbox({
  checked,
  onChange,
  errors,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-white/70 p-4 text-sm leading-relaxed text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-royal">
        <input
          type="checkbox"
          name="consent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          aria-invalid={errors?.length ? true : undefined}
          className="mt-0.5 size-5 shrink-0 accent-ink"
        />
        <span>
          {children}{" "}
          <a href="/privacy" target="_blank" className="font-semibold text-royal underline-offset-2 hover:underline">
            Privacy policy
          </a>
        </span>
      </label>
      <FieldError messages={errors} />
    </div>
  );
}

/** One-line notice for forms without a consent box. */
export function PrivacyNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs leading-relaxed text-stone">
      {children}{" "}
      <a href="/privacy" target="_blank" className="font-semibold text-royal underline-offset-2 hover:underline">
        Privacy policy
      </a>
    </p>
  );
}
