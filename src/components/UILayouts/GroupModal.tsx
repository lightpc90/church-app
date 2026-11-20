"use client";

import { motion, AnimatePresence, easeOut } from "framer-motion";
import { useEffect, useState, FC } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { fieldClass, labelClass } from "../forms/fields";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";
import { useFormSubmit } from "../forms/useFormSubmit";
import { FieldError, FormMessage } from "../forms/FormBits";

type GroupLayoutPropsType = {
  group: {
    name: string;
    desc?: string;
    link: string;
    action?: string;
    image?: string;
  };
};

type GroupConfig = { endpoint: string; askGender: boolean; isChildren?: boolean };

// Maps each group/ministry (by display name in Data.ts) to its registration API.
const GROUP_CONFIG: Record<string, GroupConfig> = {
  Elders: { endpoint: "/api/naturalGroups/elders", askGender: true },
  "Excellent Men": { endpoint: "/api/naturalGroups/men", askGender: false },
  "Good Women": { endpoint: "/api/naturalGroups/women", askGender: false },
  "Ablaze Youth": { endpoint: "/api/naturalGroups/youths", askGender: true },
  "Teens Ministry": { endpoint: "/api/ministries/teens", askGender: true },
  "Children Ministry": { endpoint: "/api/ministries/children", askGender: true, isChildren: true },
};

const inputClass = fieldClass;
const SUCCESS = "Registration received. Thank you!";

function GenderRadios({
  name,
  value,
  onChange,
  errors,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  errors?: string[];
}) {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className={labelClass}>Gender</legend>
      <div className="flex gap-3">
        {(["male", "female"] as const).map((g) => (
          <label
            key={g}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-3 font-medium capitalize text-ink transition has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-royal"
          >
            <input
              className="sr-only"
              type="radio"
              name={name}
              value={g}
              checked={value === g}
              onChange={() => onChange(g)}
              required
            />
            {g}
          </label>
        ))}
      </div>
      <FieldError messages={errors} />
    </fieldset>
  );
}

function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <button type="submit" disabled={submitting} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
      {submitting && <Loader2 className="animate-spin" aria-hidden />}
      {submitting ? "Submitting…" : "Submit registration"}
    </button>
  );
}

function MemberForm({ config }: { config: GroupConfig }) {
  const initial = config.askGender
    ? { fullname: "", phone: "", email: "", gender: "" }
    : { fullname: "", phone: "", email: "" };
  const { values, setValues, bind, onSubmit, status, error, fieldErrors } = useFormSubmit(
    config.endpoint,
    initial as Record<string, string>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5">
            <div>
        <label className={labelClass} htmlFor="fullname">Full Name</label>
        <input {...bind("fullname")} type="text" placeholder="John David" autoComplete="name" required className={inputClass} />
        <FieldError messages={fieldErrors.fullname} />
      </div>
      <div>
        <label className={labelClass} htmlFor="phone">Phone Number</label>
        <input {...bind("phone")} type="tel" inputMode="tel" placeholder="08123456789" autoComplete="tel" required className={inputClass} />
        <FieldError messages={fieldErrors.phone} />
      </div>
      <div>
        <label className={labelClass} htmlFor="email">Email (optional)</label>
        <input {...bind("email")} type="email" placeholder="example@gmail.com" autoComplete="email" className={inputClass} />
        <FieldError messages={fieldErrors.email} />
      </div>
      {config.askGender && (
        <GenderRadios
          name="gender"
          value={values.gender ?? ""}
          onChange={(gender) => setValues((v) => ({ ...v, gender }))}
          errors={fieldErrors.gender}
        />
      )}
      <FormMessage status={status} error={error} successText={SUCCESS} />
      <SubmitButton submitting={status === "submitting"} />
    </form>
  );
}

function ChildForm({ config }: { config: GroupConfig }) {
  const { values, setValues, bind, onSubmit, status, error, fieldErrors } = useFormSubmit(
    config.endpoint,
    {
      guardian_fullname: "",
      guardian_phone: "",
      guardian_email: "",
      guardian_gender: "",
      fullname: "",
      gender: "",
      dob: "",
    }
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="eyebrow">Parent / guardian</p>
      <div>
        <label className={labelClass} htmlFor="guardian_fullname">Full Name</label>
        <input {...bind("guardian_fullname")} type="text" placeholder="John David" autoComplete="name" required className={inputClass} />
        <FieldError messages={fieldErrors.guardian_fullname} />
      </div>
      <div>
        <label className={labelClass} htmlFor="guardian_phone">Phone Number</label>
        <input {...bind("guardian_phone")} type="tel" inputMode="tel" placeholder="08123456789" autoComplete="tel" required className={inputClass} />
        <FieldError messages={fieldErrors.guardian_phone} />
      </div>
      <div>
        <label className={labelClass} htmlFor="guardian_email">Email (optional)</label>
        <input {...bind("guardian_email")} type="email" placeholder="example@gmail.com" autoComplete="email" className={inputClass} />
        <FieldError messages={fieldErrors.guardian_email} />
      </div>
      <GenderRadios
        name="guardian_gender"
        value={values.guardian_gender}
        onChange={(guardian_gender) => setValues((v) => ({ ...v, guardian_gender }))}
        errors={fieldErrors.guardian_gender}
      />

      <hr className="my-2 border-line" />
      <p className="eyebrow">Child&apos;s details</p>
      <div>
        <label className={labelClass} htmlFor="fullname">Child&apos;s Full Name</label>
        <input {...bind("fullname")} type="text" placeholder="Jane David" required className={inputClass} />
        <FieldError messages={fieldErrors.fullname} />
      </div>
      <GenderRadios
        name="gender"
        value={values.gender}
        onChange={(gender) => setValues((v) => ({ ...v, gender }))}
        errors={fieldErrors.gender}
      />
      <div>
        <label className={labelClass} htmlFor="dob">Date of birth</label>
        <input
          {...bind("dob")}
          type="date"
          max={new Date().toISOString().slice(0, 10)}
          required
          className={inputClass}
        />
        <FieldError messages={fieldErrors.dob} />
      </div>
      <FormMessage status={status} error={error} successText={SUCCESS} />
      <SubmitButton submitting={status === "submitting"} />
    </form>
  );
}

const GroupModal: FC<GroupLayoutPropsType> = ({ group }) => {
  const [showModal, setShowModal] = useState(false);
  const config = GROUP_CONFIG[group.name];

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowModal(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  if (!config) return null;

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="groupmodal"
            className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="group-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="relative flex max-h-[92svh] w-full max-w-xl flex-col overflow-hidden rounded-t-[2rem] bg-ivory shadow-lift sm:rounded-[2rem]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
                <div>
                  <p className="eyebrow">Registration</p>
                  <h2 id="group-modal-title" className="mt-2 font-display text-2xl font-medium text-ink">
                    Join {group.name}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink/10"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-6 sm:px-8">
                {config.isChildren ? <ChildForm config={config} /> : <MemberForm config={config} />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1.5 font-semibold text-royal hover:underline"
      >
        {group.action} <ArrowRight className="size-4" aria-hidden />
      </button>
    </>
  );
};

export default GroupModal;
