"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Phone } from "lucide-react";
import { DEPARTMENTS, OTHER_DEPARTMENT } from "@/lib/departments";
import { fieldClass, labelClass } from "../forms/fields";
import { ConsentCheckbox, FieldError, FormMessage } from "../forms/FormBits";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  phone: string;
  dept: string;
  gender: string;
  birthday: string; // MM-DD
  area: string;
  servingSince: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function WorkerProfileForm({
  isNew,
  account,
  initial,
}: {
  isNew: boolean;
  account: { email: string | null; phone: string | null };
  initial: Values;
}) {
  const router = useRouter();
  const known = (DEPARTMENTS as readonly string[]).includes(initial.dept) || !initial.dept;
  const [v, setV] = useState({
    ...initial,
    dept: known ? initial.dept : OTHER_DEPARTMENT,
    deptOther: known ? "" : initial.dept,
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [month, day] = v.birthday ? v.birthday.split("-") : ["", ""];

  const set = <K extends keyof typeof v>(k: K, value: (typeof v)[K]) => setV((s) => ({ ...s, [k]: value }));
  const setBirthday = (m: string, d: string) => set("birthday", m && d ? `${m}-${d}` : m || d ? `${m || "00"}-${d || "00"}` : "");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/workers/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, consent: v.consent }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) {
        if (body?.details) setFieldErrors(body.details);
        throw new Error(body?.error === "Validation failed" ? "Please check the highlighted fields." : body?.error ?? "Couldn't save");
      }
      router.push("/workers/dashboard");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't save");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div className="flex flex-wrap gap-x-5 gap-y-1 rounded-2xl bg-sand/60 px-4 py-3 text-sm text-stone">
        <span className="font-semibold text-ink">Signed in as</span>
        {account.email && (
          <span className="inline-flex items-center gap-1.5 break-all">
            <Mail className="size-4" aria-hidden /> {account.email}
          </span>
        )}
        {account.phone && (
          <span className="inline-flex items-center gap-1.5">
            <Phone className="size-4" aria-hidden /> {account.phone}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Full name
        </label>
        <input id="name" value={v.name} onChange={(e) => set("name", e.target.value)} required autoComplete="name" className={fieldClass} />
        <FieldError messages={fieldErrors.name} />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          value={v.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="0812 345 6789"
          required
          autoComplete="tel"
          className={fieldClass}
        />
        <FieldError messages={fieldErrors.phone} />
      </div>

      <div>
        <label htmlFor="dept" className={labelClass}>
          Department
        </label>
        <select id="dept" value={v.dept} onChange={(e) => set("dept", e.target.value)} required className={fieldClass}>
          <option value="" disabled>
            Choose your department
          </option>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
          <option value={OTHER_DEPARTMENT}>Other…</option>
        </select>
        <FieldError messages={fieldErrors.dept} />
        {v.dept === OTHER_DEPARTMENT && (
          <div className="mt-3">
            <label htmlFor="deptOther" className="sr-only">
              Department name
            </label>
            <input
              id="deptOther"
              value={v.deptOther}
              onChange={(e) => set("deptOther", e.target.value)}
              placeholder="Which department?"
              required
              className={fieldClass}
            />
            <FieldError messages={fieldErrors.deptOther} />
          </div>
        )}
      </div>

      <fieldset>
        <legend className={labelClass}>Gender</legend>
        <div className="flex gap-3">
          {(["male", "female"] as const).map((g) => (
            <label
              key={g}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-line bg-white px-4 py-3 font-medium text-ink capitalize transition has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-royal"
            >
              <input type="radio" name="gender" value={g} checked={v.gender === g} onChange={() => set("gender", g)} required className="sr-only" />
              {g}
            </label>
          ))}
        </div>
        <FieldError messages={fieldErrors.gender} />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className={labelClass}>
            Birthday <span className="font-normal text-stone">(optional)</span>
          </legend>
          <div className="flex gap-2">
            <select aria-label="Birth month" value={month} onChange={(e) => setBirthday(e.target.value, day)} className={fieldClass}>
              <option value="">Month</option>
              {MONTHS.map((m, i) => (
                <option key={m} value={String(i + 1).padStart(2, "0")}>
                  {m}
                </option>
              ))}
            </select>
            <select aria-label="Birth day" value={day} onChange={(e) => setBirthday(month, e.target.value)} className={fieldClass}>
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => (
                <option key={d} value={d}>
                  {Number(d)}
                </option>
              ))}
            </select>
          </div>
          <FieldError messages={fieldErrors.birthday} />
        </fieldset>
        <div>
          <label htmlFor="servingSince" className={labelClass}>
            Serving since <span className="font-normal text-stone">(year)</span>
          </label>
          <input
            id="servingSince"
            type="number"
            inputMode="numeric"
            min={1952}
            max={new Date().getFullYear()}
            value={v.servingSince}
            onChange={(e) => set("servingSince", e.target.value)}
            placeholder={String(new Date().getFullYear())}
            className={fieldClass}
          />
          <FieldError messages={fieldErrors.servingSince} />
        </div>
      </div>

      <div>
        <label htmlFor="area" className={labelClass}>
          Area you live in <span className="font-normal text-stone">(optional)</span>
        </label>
        <input id="area" value={v.area} onChange={(e) => set("area", e.target.value)} placeholder="e.g. Ajah, Abraham Adesanya" className={fieldClass} />
        <FieldError messages={fieldErrors.area} />
      </div>

      {isNew && (
        <ConsentCheckbox checked={v.consent} onChange={(c) => set("consent", c)} errors={fieldErrors.consent}>
          I agree that RCCG Beautiful Gate may keep these details and my Sunday attendance (the time and how far from
          the church I was, not my exact location) to organise the workforce.
        </ConsentCheckbox>
      )}

      <FormMessage status={status} error={error} successText="" />
      <button type="submit" disabled={status === "submitting"} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        {status === "submitting" && <Loader2 className="animate-spin" aria-hidden />}
        {isNew ? "Register" : "Save changes"}
      </button>
    </form>
  );
}
