"use client";

import { Loader2, Send } from "lucide-react";
import { useFormSubmit } from "./useFormSubmit";
import { FieldError, FormMessage } from "./FormBits";
import { fieldClass, labelClass } from "./fields";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  /** span both columns on wide screens */
  full?: boolean;
};

/** Config-driven public form (prayer request, testimony, enquiry, new convert). */
export default function SiteForm({
  endpoint,
  fields,
  submitLabel,
  successText,
  className,
}: {
  endpoint: string;
  fields: FieldDef[];
  submitLabel: string;
  successText: string;
  className?: string;
}) {
  const initial = Object.fromEntries(fields.map((f) => [f.name, ""])) as Record<string, string>;
  const { bind, onSubmit, status, error, fieldErrors } = useFormSubmit(endpoint, initial);
  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-5 sm:grid-cols-2", className)}>
      {fields.map((f) => {
        const props = {
          ...bind(f.name),
          placeholder: f.placeholder,
          required: f.required,
          autoComplete: f.autoComplete,
          className: fieldClass,
        };
        return (
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={f.name} className={labelClass}>
              {f.label}
              {!f.required && <span className="ml-1 font-normal text-stone">(optional)</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea {...props} rows={6} className={cn(fieldClass, "resize-y")} />
            ) : (
              <input {...props} type={f.type ?? "text"} inputMode={f.type === "tel" ? "tel" : undefined} />
            )}
            <FieldError messages={fieldErrors[f.name]} />
          </div>
        );
      })}
      <div className="space-y-4 sm:col-span-2">
        <FormMessage status={status} error={error} successText={successText} />
        <button type="submit" disabled={submitting} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
          {submitting ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
          {submitting ? "Sending…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
