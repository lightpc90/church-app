"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, Loader2, Mail, MessageCircle, Send, X } from "lucide-react";
import type { ProviderStatus, PublicSettings } from "@/lib/notify";
import { cn } from "@/lib/utils";
import { AdminPanel } from "../AdminCard";
import { formatDateTime } from "../table/cells";

type Kind = "prayer" | "convert";
type Channel = "whatsapp" | "email";

const input =
  "h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-hidden transition focus:border-royal focus:ring-4 focus:ring-royal/10";

function Switch({
  checked,
  onChange,
  label,
  description,
  icon,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: ReactNode;
  icon: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-3xl border border-line bg-white p-5 transition hover:border-ink/20">
      <span className="mt-0.5 text-stone">{icon}</span>
      <span className="flex-1">
        <span className="block font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-sm text-stone">{description}</span>
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-royal/20",
          checked ? "bg-emerald-600" : "bg-stone/30"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-5"
          )}
        />
      </span>
    </label>
  );
}

const splitEmails = (v: string) =>
  v
    .split(/[\s,;]+/)
    .map((e) => e.trim())
    .filter(Boolean);

function TestButton({ kind, channel, disabled }: { kind: Kind; channel: Channel; disabled?: boolean }) {
  const [state, setState] = useState<{ busy?: boolean; ok?: boolean; msg?: string }>({});
  async function run() {
    setState({ busy: true });
    const res = await fetch("/api/admin/notifications/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, channel }),
    });
    const json = await res.json().catch(() => null);
    setState(json?.success ? { ok: true, msg: "Sent. Check the phone or inbox." } : { ok: false, msg: json?.error ?? "Failed" });
  }
  return (
    <div className="text-xs">
      <button
        type="button"
        onClick={run}
        disabled={disabled || state.busy}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-white px-3 font-semibold text-ink transition hover:border-royal hover:text-royal disabled:opacity-50"
      >
        {state.busy ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <Send className="size-3.5" aria-hidden />}
        Send test {channel === "whatsapp" ? "WhatsApp" : "email"}
      </button>
      {state.msg && (
        <p role="status" className={cn("mt-1", state.ok ? "text-emerald-700" : "text-ember")}>
          {state.msg}
        </p>
      )}
    </div>
  );
}

type Recipients = { number: string; key: string; removeKey: boolean; emails: string };

function RecipientCard({
  kind,
  title,
  description,
  value,
  onChange,
  hasKey,
  savedNumber,
  dirty,
  defaultEmails,
  children,
}: {
  kind: Kind;
  title: string;
  description: string;
  value: Recipients;
  onChange: (v: Recipients) => void;
  hasKey: boolean;
  savedNumber: string | null;
  dirty: boolean;
  /** Server default recipients (env), used while no list is saved here */
  defaultEmails: string[];
  children?: ReactNode;
}) {
  const keySaved = hasKey && !value.removeKey;
  return (
    <AdminPanel className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-medium text-ink">{title}</h2>
        <p className="mt-1 text-sm text-stone">{description}</p>
      </div>

      <fieldset className="space-y-3">
        <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
          <MessageCircle className="size-4 text-stone" aria-hidden /> WhatsApp
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-sm text-ink">
            Number that receives the alert
            <input
              type="tel"
              inputMode="tel"
              value={value.number}
              onChange={(e) => onChange({ ...value, number: e.target.value })}
              placeholder="0812 345 6789"
              className={input}
            />
          </label>
          <label className="space-y-1 text-sm text-ink">
            CallMeBot API key for that number
            <input
              value={value.key}
              onChange={(e) => onChange({ ...value, key: e.target.value, removeKey: false })}
              placeholder={keySaved ? "Saved. Type a new one to replace it" : "e.g. 123456"}
              autoComplete="off"
              className={input}
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone">
          {keySaved ? (
            <>
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="size-3.5" aria-hidden /> Key saved
              </span>
              <button
                type="button"
                onClick={() => onChange({ ...value, key: "", removeKey: true })}
                className="font-semibold text-stone underline-offset-2 hover:text-ember hover:underline"
              >
                Remove key
              </button>
            </>
          ) : value.removeKey ? (
            <span>Key will be removed when you save.</span>
          ) : (
            <span>No key saved yet: see “Getting a free WhatsApp key” below.</span>
          )}
        </div>
        {children}
        <TestButton kind={kind} channel="whatsapp" disabled={dirty || !savedNumber} />
      </fieldset>

      <fieldset className="space-y-3 border-t border-line pt-5">
        <legend className="sr-only">Email</legend>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Mail className="size-4 text-stone" aria-hidden /> Email
        </p>
        <label className="block space-y-1 text-sm text-ink">
          Email addresses that receive the alert <span className="text-stone">(separate with commas)</span>
          <textarea
            rows={2}
            value={value.emails}
            onChange={(e) => onChange({ ...value, emails: e.target.value })}
            placeholder={defaultEmails.length ? defaultEmails.join(", ") : "pastor@example.com, prayer.team@example.com"}
            className={cn(input, "h-auto py-2")}
          />
        </label>
        {defaultEmails.length > 0 && !value.emails.trim() && (
          <p className="text-xs text-stone">
            Using the server&apos;s default list (shown above in grey). Type addresses to use your own list instead.
          </p>
        )}
        <TestButton kind={kind} channel="email" disabled={dirty} />
      </fieldset>
    </AdminPanel>
  );
}

export default function NotificationSettingsForm({
  settings: s,
  providers,
}: {
  settings: PublicSettings;
  providers: ProviderStatus;
}) {
  const router = useRouter();
  const initial = {
    whatsappEnabled: s.whatsappEnabled,
    emailEnabled: s.emailEnabled,
    prayerTextOnWhatsapp: s.prayerTextOnWhatsapp,
    prayer: { number: s.prayerWhatsapp ?? "", key: "", removeKey: false, emails: s.prayerEmails.join(", ") },
    convert: { number: s.convertWhatsapp ?? "", key: "", removeKey: false, emails: s.convertEmails.join(", ") },
  };
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isRefreshing, startTransition] = useTransition();
  const dirty = JSON.stringify(form) !== JSON.stringify(initial);
  const busy = saving || isRefreshing;

  async function save() {
    setSaving(true);
    setResult(null);
    const keyField = (r: Recipients) => (r.removeKey ? "" : r.key.trim() || undefined);
    const body = {
      whatsappEnabled: form.whatsappEnabled,
      emailEnabled: form.emailEnabled,
      prayerTextOnWhatsapp: form.prayerTextOnWhatsapp,
      prayerWhatsapp: form.prayer.number.trim(),
      convertWhatsapp: form.convert.number.trim(),
      prayerWhatsappKey: keyField(form.prayer),
      convertWhatsappKey: keyField(form.convert),
      prayerEmails: splitEmails(form.prayer.emails),
      convertEmails: splitEmails(form.convert.emails),
    };
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        const details = json?.details ? Object.values(json.details).flat().join(" ") : "";
        throw new Error(details || json?.error || "Couldn't save");
      }
      setResult({ ok: true, msg: "Saved." });
      startTransition(() => router.refresh());
    } catch (e) {
      setResult({ ok: false, msg: e instanceof Error ? e.message : "Couldn't save" });
    } finally {
      setSaving(false);
    }
  }

  async function dismissError() {
    await fetch("/api/admin/notifications", { method: "DELETE" });
    startTransition(() => router.refresh());
  }

  // Server re-renders after a save: reset the form to what's now stored.
  const [lastSaved, setLastSaved] = useState(s.updatedAt);
  if (s.updatedAt !== lastSaved) {
    setLastSaved(s.updatedAt);
    setForm(initial);
  }

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6 pb-24">
      {s.lastError && (
        <div role="alert" className="flex items-start gap-3 rounded-3xl bg-red-50 p-5 text-red-900">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div className="flex-1 text-sm">
            <p className="font-semibold">
              The last alert couldn&apos;t be sent{s.lastErrorAt && ` (${formatDateTime(s.lastErrorAt)})`}
            </p>
            <p className="mt-1 break-words">{s.lastError}</p>
          </div>
          <button type="button" aria-label="Dismiss" onClick={dismissError} className="rounded-full p-1 hover:bg-red-100">
            <X className="size-4" aria-hidden />
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Switch
          checked={form.whatsappEnabled}
          onChange={(v) => set("whatsappEnabled", v)}
          label="WhatsApp alerts"
          icon={<MessageCircle className="size-5" aria-hidden />}
          description={form.whatsappEnabled ? "On: alerts go to the WhatsApp numbers below." : "Off: no WhatsApp messages are sent."}
        />
        <Switch
          checked={form.emailEnabled}
          onChange={(v) => set("emailEnabled", v)}
          label="Email alerts"
          icon={<Mail className="size-5" aria-hidden />}
          description={
            providers.email
              ? form.emailEnabled
                ? "On: alerts go to the email addresses below."
                : "Off: no emails are sent."
              : "Email sending isn't set up on the server yet (RESEND_API_KEY and NOTIFY_EMAIL_FROM)."
          }
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecipientCard
          kind="prayer"
          title="New prayer requests"
          description="Who is alerted when someone submits the prayer request form."
          value={form.prayer}
          onChange={(v) => set("prayer", v)}
          hasKey={s.hasPrayerKey}
          savedNumber={s.prayerWhatsapp}
          dirty={dirty}
          defaultEmails={providers.emailDefaults.prayer}
        >
          <label className="flex items-start gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              checked={form.prayerTextOnWhatsapp}
              onChange={(e) => set("prayerTextOnWhatsapp", e.target.checked)}
              className="mt-1 size-4 accent-ink"
            />
            <span>
              Include the prayer request itself in the WhatsApp message
              <span className="block text-xs text-stone">
                Off by default: the message then has the name, phone and a dashboard link. The free WhatsApp service
                passes messages through a third party (CallMeBot), and prayer requests are confidential.
              </span>
            </span>
          </label>
        </RecipientCard>
        <RecipientCard
          kind="convert"
          title="New converts"
          description="Who is alerted when someone fills in “How can I be saved?”, so they can be followed up quickly."
          value={form.convert}
          onChange={(v) => set("convert", v)}
          hasKey={s.hasConvertKey}
          savedNumber={s.convertWhatsapp}
          dirty={dirty}
          defaultEmails={providers.emailDefaults.convert}
        />
      </div>

      <AdminPanel>
        <h2 className="font-display text-xl font-medium text-ink">Getting a free WhatsApp key</h2>
        <p className="mt-1 text-sm text-stone">
          WhatsApp alerts use CallMeBot, which is free. Each phone that receives alerts does this once:
        </p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-ink">
          <li>
            Open{" "}
            <a
              href="https://www.callmebot.com/blog/free-api-whatsapp-messages/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-royal hover:underline"
            >
              CallMeBot&apos;s WhatsApp page
            </a>{" "}
            and save the bot&apos;s phone number shown there to your contacts.
          </li>
          <li>
            On WhatsApp, send it: <code className="rounded bg-sand px-1.5 py-0.5">I allow callmebot to send me messages</code>
          </li>
          <li>It replies with your API key. Enter the number and key above, save, then press “Send test WhatsApp”.</li>
        </ol>
        <p className="mt-3 text-xs text-stone">
          CallMeBot is a free service for personal alerts, so it can be slow or occasionally full. Keep email alerts on
          as a backup.
          {providers.twilio && " Paid Twilio WhatsApp is also set up on the server and is used for any number without a key."}
        </p>
      </AdminPanel>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-end gap-3 rounded-full border border-line bg-white/95 p-2 pl-5 shadow-lift backdrop-blur">
        <p className="mr-auto text-sm text-stone" role="status">
          {result ? (
            <span className={result.ok ? "text-emerald-700" : "text-ember"}>{result.msg}</span>
          ) : dirty ? (
            "You have unsaved changes. Tests use the saved settings."
          ) : s.updatedBy ? (
            `Last changed by ${s.updatedBy}${s.updatedAt ? `, ${formatDateTime(s.updatedAt)}` : ""}`
          ) : (
            "Not set up yet."
          )}
        </p>
        {dirty && (
          <button
            type="button"
            onClick={() => setForm(initial)}
            disabled={busy}
            className="h-10 rounded-full px-4 text-sm font-semibold text-ink hover:bg-ink/5"
          >
            Discard
          </button>
        )}
        <button
          type="button"
          onClick={save}
          disabled={!dirty || busy}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink-soft disabled:opacity-50"
        >
          {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
          Save changes
        </button>
      </div>
    </div>
  );
}
