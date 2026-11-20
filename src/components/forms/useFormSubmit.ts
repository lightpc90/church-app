"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

/**
 * Shared state + submit logic for the public JSON forms.
 * - always clears the submitting state (the old forms got stuck on failure)
 * - surfaces server validation errors per field
 * - catches network errors
 */
export function useFormSubmit<T extends Record<string, string>>(
  url: string,
  initialValues: T,
  options: { onSuccess?: () => void } = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<T>>({});
  const { onSuccess } = options;

  const bind = useCallback(
    (name: keyof T) => ({
      name: name as string,
      id: name as string,
      value: values[name],
      onChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => setValues((v) => ({ ...v, [name]: e.target.value })),
      "aria-invalid": fieldErrors[name] ? true : undefined,
    }),
    [values, fieldErrors]
  );

  const onSubmit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      setStatus("submitting");
      setError(null);
      setFieldErrors({});
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const body = await res.json().catch(() => null);
        if (!res.ok || !body?.success) {
          if (body?.details) setFieldErrors(body.details);
          throw new Error(body?.error ?? "Something went wrong. Please try again.");
        }
        setValues(initialValues);
        setStatus("success");
        onSuccess?.();
      } catch (err) {
        setError(
          err instanceof TypeError
            ? "Network error. Check your connection and try again."
            : err instanceof Error
              ? err.message
              : "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    },
    [url, values, initialValues, onSuccess]
  );

  return { values, setValues, bind, onSubmit, status, error, fieldErrors };
}
