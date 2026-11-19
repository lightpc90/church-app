"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useFormSubmit } from "../forms/useFormSubmit";
import { FieldError, FormMessage } from "../forms/FormBits";
import { motion, easeOut } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { fieldClass, labelClass } from "../forms/fields";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";

export const initHfcForm = {
  center: "",
  address: "",
  host: "",
  host_phone: "",
  teacher: "",
  teacher_phone: "",
  zone: "",
};
// create enum for zones
export enum ZonesEnum {
  lakowe = "Lakowe",
  schoolGate = "School Gate",
  adeba = "Adeba",
  oribanwa = "Oribanwa",
  awoyaya = "Awoyaya",
  ologunfe = "Ologunfe",
  bogije = "Bogije",
  kajola = "Kajola",
  malete = "Malete",
  eputu = "Eputu",
  ogunfayo = "Ogunfayo",
  newRoad = "New Road",
  abijo = "Abijo GRA",
  faraPark = "Fara Park",
  sangotedo = "Sangotedo",
  lekki = "Lekki",
}

type PropsType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCreated?: () => void;
};

const HouseFellowshipForm: FC<PropsType> = ({ setOpen, onCreated }) => {
  const { bind, onSubmit, status, error, fieldErrors } = useFormSubmit(
    "/api/houseFellowshipCenters",
    initHfcForm,
    { onSuccess: onCreated }
  );
  const submitting = status === "submitting";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hfc-form-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" aria-label="Close" className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <motion.form
        onSubmit={onSubmit}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-ivory shadow-lift sm:rounded-[2rem]"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
          <h2 id="hfc-form-title" className="font-display text-2xl font-medium text-ink">Add house fellowship center</h2>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="inline-flex size-10 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink/10">
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="grid gap-5 overflow-y-auto px-6 py-6 sm:grid-cols-2 sm:px-8">
          <div className="sm:col-span-2">
            <label htmlFor="center" className={labelClass}>Center Name</label>
            <input {...bind("center")} type="text" placeholder="Beautiful Gate Center" className={fieldClass} required />
            <FieldError messages={fieldErrors.center} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address" className={labelClass}>Center Address</label>
            <input {...bind("address")} type="text" placeholder="Beautiful Gate, Church Premises" className={fieldClass} required />
            <FieldError messages={fieldErrors.address} />
          </div>
          <div>
            <label htmlFor="host" className={labelClass}>Host Name</label>
            <input {...bind("host")} type="text" placeholder="John Doe" className={fieldClass} required />
            <FieldError messages={fieldErrors.host} />
          </div>
          <div>
            <label htmlFor="host_phone" className={labelClass}>Host Number</label>
            <input {...bind("host_phone")} type="tel" inputMode="tel" placeholder="08012345678" className={fieldClass} />
            <FieldError messages={fieldErrors.host_phone} />
          </div>
          <div>
            <label htmlFor="teacher" className={labelClass}>Teacher Name</label>
            <input {...bind("teacher")} type="text" placeholder="John Doe" className={fieldClass} required />
            <FieldError messages={fieldErrors.teacher} />
          </div>
          <div>
            <label htmlFor="teacher_phone" className={labelClass}>Teacher Number</label>
            <input {...bind("teacher_phone")} type="tel" inputMode="tel" placeholder="08012345678" className={fieldClass} />
            <FieldError messages={fieldErrors.teacher_phone} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="zone" className={labelClass}>Zone</label>
            <select {...bind("zone")} required className={fieldClass}>
              <option value="">Choose zone</option>
              {Object.values(ZonesEnum).map((zone) => (
                <option key={zone} value={zone}>
                  {zone} Zone
                </option>
              ))}
            </select>
            <FieldError messages={fieldErrors.zone} />
          </div>
          <div className="space-y-4 sm:col-span-2">
            <FormMessage status={status} error={error} successText="Center added." />
            <button type="submit" disabled={submitting} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
              {submitting && <Loader2 className="animate-spin" aria-hidden />}
              {submitting ? "Saving…" : "Add center"}
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default HouseFellowshipForm;
