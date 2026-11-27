"use client";

import { useState, type FormEvent } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { DEPARTMENTS, OTHER_DEPARTMENT } from "@/lib/departments";
import { fieldClass, labelClass } from "../forms/fields";
import { FieldError } from "../forms/FormBits";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";

export type NewWorker = { id: string; name: string | null; phone: string | null; dept: string };

/**
 * Register a worker by phone number (no email or account needed). Used on the Workers tab and at the
 * workers' desk. HODs get their own department preselected.
 */
export default function WorkerQuickForm({ defaultDept, onCreated }: { defaultDept?: string | null; onCreated: (w: NewWorker) => void }) {
  const [v, setV] = useState({ name: "", phone: "", email: "", dept: defaultDept ?? "", deptOther: "", gender: "", area: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const set = (k: keyof typeof v, value: string) => setV((s) => ({ ...s, [k]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setErrors({});
    try {
      const res = await fetch("/api/desk/workers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) {
        if (body?.details && !body.details.existingId) setErrors(body.details);
        throw new Error(body?.error === "Validation failed" ? "Please check the highlighted fields." : (body?.error ?? "Couldn't register"));
      }
      onCreated(body.data);
      setV({ name: "", phone: "", email: "", dept: defaultDept ?? "", deptOther: "", gender: "", area: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't register");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="qw-name" className={labelClass}>Full name</label>
        <input id="qw-name" value={v.name} onChange={(e) => set("name", e.target.value)} required className={fieldClass} />
        <FieldError messages={errors.name} />
      </div>
      <div>
        <label htmlFor="qw-phone" className={labelClass}>Phone number</label>
        <input id="qw-phone" type="tel" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} required placeholder="0812 345 6789" className={fieldClass} />
        <FieldError messages={errors.phone} />
      </div>
      <div>
        <label htmlFor="qw-email" className={labelClass}>
          Email <span className="font-normal text-stone">(optional)</span>
        </label>
        <input id="qw-email" type="email" value={v.email} onChange={(e) => set("email", e.target.value)} className={fieldClass} />
        <FieldError messages={errors.email} />
      </div>
      <div>
        <label htmlFor="qw-dept" className={labelClass}>Department</label>
        <select id="qw-dept" value={v.dept} onChange={(e) => set("dept", e.target.value)} required className={fieldClass}>
          <option value="" disabled>Choose…</option>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          <option value={OTHER_DEPARTMENT}>Other…</option>
        </select>
        {v.dept === OTHER_DEPARTMENT && (
          <input aria-label="Department name" value={v.deptOther} onChange={(e) => set("deptOther", e.target.value)} required placeholder="Which department?" className={cn(fieldClass, "mt-2")} />
        )}
        <FieldError messages={errors.dept ?? errors.deptOther} />
      </div>
      <fieldset>
        <legend className={labelClass}>Gender</legend>
        <div className="flex gap-2">
          {(["male", "female"] as const).map((g) => (
            <label key={g} className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-line bg-white px-3 py-3 text-sm font-medium capitalize has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white">
              <input type="radio" name="qw-gender" value={g} checked={v.gender === g} onChange={() => set("gender", g)} required className="sr-only" />
              {g}
            </label>
          ))}
        </div>
        <FieldError messages={errors.gender} />
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="qw-area" className={labelClass}>
          Area they live in <span className="font-normal text-stone">(optional)</span>
        </label>
        <input id="qw-area" value={v.area} onChange={(e) => set("area", e.target.value)} className={fieldClass} />
      </div>
      {error && (
        <p role="alert" className="rounded-2xl bg-red-50 p-3 text-sm text-red-900 sm:col-span-2">{error}</p>
      )}
      <button type="submit" disabled={busy} className={cn(buttonVariants({ size: "lg" }), "sm:col-span-2")}>
        {busy ? <Loader2 className="animate-spin" aria-hidden /> : <UserPlus aria-hidden />} Register worker
      </button>
    </form>
  );
}
