"use client";

import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Copy, Loader2, Mail, MessageCircle, MoreHorizontal, Phone, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ───────────── formatting ───────────── */

const dateTimeFmt = new Intl.DateTimeFormat("en-NG", {
  timeZone: "Africa/Lagos",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export const formatDateTime = (d: Date | string) => dateTimeFmt.format(new Date(d));

/** wa.me needs the international number without "+": 0812… → 234812… */
export function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0") && digits.length === 11) return `234${digits.slice(1)}`;
  return digits;
}

/* ───────────── cells ───────────── */

export function DateCell({ value }: { value: Date | string }) {
  const d = new Date(value);
  return (
    <time dateTime={d.toISOString()} className="whitespace-nowrap text-stone">
      {formatDateTime(d)}
    </time>
  );
}

export function PersonCell({ name, email }: { name: string; email?: string | null }) {
  return (
    <div className="min-w-[10rem]">
      <p className="font-semibold text-ink">{name}</p>
      {email && (
        <a href={`mailto:${email}`} className="text-xs break-all text-stone hover:text-royal">
          {email}
        </a>
      )}
    </div>
  );
}

export function PhoneCell({ phone }: { phone?: string | null }) {
  if (!phone) return <span className="text-stone/60">-</span>;
  return (
    <a href={`tel:${phone.replace(/\s/g, "")}`} className="whitespace-nowrap text-ink tabular-nums hover:text-royal">
      {phone}
    </a>
  );
}

/** Two-line preview of long text with a dialog to read it in full. */
export function MessageCell({ title, text, meta }: { title: string; text: string; meta?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="max-w-md min-w-[14rem]">
        <p className="line-clamp-2 text-ink">{text}</p>
        {text.length > 120 && (
          <button type="button" onClick={() => setOpen(true)} className="mt-1 text-xs font-semibold text-royal hover:underline">
            Read full
          </button>
        )}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title={title}>
        {meta && <div className="mb-4 text-sm text-stone">{meta}</div>}
        <p className="leading-relaxed whitespace-pre-wrap text-ink">{text}</p>
      </Dialog>
    </>
  );
}

/* ───────────── dialog (native <dialog>: focus trap + Esc for free) ───────────── */

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(36rem,calc(100vw-2rem))] rounded-3xl bg-ivory p-0 text-ink shadow-lift backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
        <h2 className="font-display text-xl font-medium">{title}</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="inline-flex size-9 items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto px-6 py-5">{children}</div>
      {footer && <div className="flex justify-end gap-2 border-t border-line px-6 py-4">{footer}</div>}
    </dialog>
  );
}

/* ───────────── row actions ───────────── */

const itemClass =
  "flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink outline-hidden select-none data-[highlighted]:bg-sand";

/**
 * Per-row menu: contact shortcuts + delete (with confirmation).
 * `endpoint` is the collection API, e.g. "/api/prayer-request"; delete calls `${endpoint}/${id}`.
 */
export function RowActions({
  id,
  endpoint,
  label,
  phone,
  email,
}: {
  id: string;
  endpoint: string;
  /** what's being deleted, for the confirmation text, e.g. "Ada Obi's prayer request" */
  label: string;
  phone?: string | null;
  email?: string | null;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, startTransition] = useTransition();
  const busy = deleting || isRefreshing;

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) throw new Error(body?.error ?? "Delete failed");
      setConfirming(false);
      startTransition(() => router.refresh());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Dropdown.Root modal={false}>
        <Dropdown.Trigger
          aria-label={`Actions for ${label}`}
          className="inline-flex size-9 items-center justify-center rounded-full text-stone outline-hidden hover:bg-sand hover:text-ink focus-visible:ring-2 focus-visible:ring-royal data-[state=open]:bg-sand"
        >
          <MoreHorizontal className="size-4" aria-hidden />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Content
            align="end"
            sideOffset={6}
            className="z-50 min-w-[12rem] rounded-2xl border border-line bg-white p-1.5 shadow-lift data-[state=open]:animate-in data-[state=open]:fade-in"
          >
            {phone && (
              <>
                <Dropdown.Item asChild className={itemClass}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>
                    <Phone className="size-4 text-stone" aria-hidden /> Call
                  </a>
                </Dropdown.Item>
                <Dropdown.Item asChild className={itemClass}>
                  <a href={`https://wa.me/${whatsappNumber(phone)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4 text-stone" aria-hidden /> WhatsApp
                  </a>
                </Dropdown.Item>
                <Dropdown.Item className={itemClass} onSelect={() => navigator.clipboard?.writeText(phone)}>
                  <Copy className="size-4 text-stone" aria-hidden /> Copy number
                </Dropdown.Item>
              </>
            )}
            {email && (
              <Dropdown.Item asChild className={itemClass}>
                <a href={`mailto:${email}`}>
                  <Mail className="size-4 text-stone" aria-hidden /> Email
                </a>
              </Dropdown.Item>
            )}
            {(phone || email) && <Dropdown.Separator className="my-1 h-px bg-line" />}
            <Dropdown.Item className={cn(itemClass, "text-ember data-[highlighted]:bg-red-50")} onSelect={() => setConfirming(true)}>
              <Trash2 className="size-4" aria-hidden /> Delete
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>

      <Dialog
        open={confirming}
        onClose={() => !busy && setConfirming(false)}
        title="Delete this record?"
        footer={
          <>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={busy}
              className="h-10 rounded-full px-5 text-sm font-semibold text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ember px-5 text-sm font-semibold text-white hover:bg-ember/90 disabled:opacity-60"
            >
              {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
              Delete
            </button>
          </>
        }
      >
        <p className="text-stone">
          This permanently removes <span className="font-semibold text-ink">{label}</span>. This can&apos;t be undone.
        </p>
        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-900">
            {error}
          </p>
        )}
      </Dialog>
    </>
  );
}
