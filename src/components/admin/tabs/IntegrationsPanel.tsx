"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import type { InstagramStatus } from "@/lib/instagram";
import { AdminPanel } from "../AdminCard";
import { formatDateTime } from "../table/cells";
import { buttonVariants } from "../../site/primitives";
import { cn } from "@/lib/utils";

const input =
  "h-11 w-full rounded-xl border border-line bg-white px-3 font-mono text-sm text-ink outline-hidden transition focus:border-royal focus:ring-4 focus:ring-royal/10";

export default function IntegrationsPanel({ instagram: ig }: { instagram: InstagramStatus }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState<"save" | "renew" | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [, startTransition] = useTransition();

  async function call(method: "PUT" | "POST", body?: unknown) {
    const res = await fetch("/api/admin/integrations/instagram", {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.success) {
      const details = json?.details ? Object.values(json.details).flat().join(" ") : "";
      throw new Error(details || json?.error || "Something went wrong");
    }
    return json;
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy("save");
    setMessage(null);
    try {
      const r = await call("PUT", { token });
      setToken("");
      setMessage({ ok: true, text: `Connected to @${r.username}. The home page feed will show the latest posts.` });
      startTransition(() => router.refresh());
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Couldn't save" });
    } finally {
      setBusy(null);
    }
  }

  async function renew() {
    setBusy("renew");
    setMessage(null);
    try {
      const r = await call("POST");
      setMessage({ ok: true, text: `Renewed. Valid until ${formatDateTime(r.expiresAt)}.` });
      startTransition(() => router.refresh());
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Renewal failed" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <AdminPanel className="max-w-3xl space-y-6">
      <div className="flex items-start gap-4">
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4] text-white">
          <FaInstagram className="size-6" aria-hidden />
        </span>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-medium text-ink">Instagram feed</h2>
          <p className="mt-1 text-sm text-stone">Shows the church&apos;s latest Instagram posts on the home page.</p>
        </div>
      </div>

      {ig.connected ? (
        <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">Connected to @{ig.username}</p>
            <p className="mt-0.5">
              {ig.source === "dashboard"
                ? `Token saved here${ig.updatedAt ? ` (last updated ${formatDateTime(ig.updatedAt)})` : ""}${ig.expiresAt ? `, valid until ${formatDateTime(ig.expiresAt)}` : ""}.`
                : "Using the token from the server settings (INSTAGRAM_ACCESS_TOKEN)."}{" "}
              {ig.autoRenew ? "It renews automatically every week." : "Automatic renewal is off: CRON_SECRET isn't set on the server."}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-900">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">The Instagram feed isn&apos;t working</p>
            <p className="mt-0.5 break-words">{(ig.error ?? "No token yet").replace(/\.?$/, ".")} Generate a new token and paste it below.</p>
          </div>
        </div>
      )}

      <form onSubmit={save} className="space-y-3">
        <label htmlFor="ig-token" className="block text-sm font-semibold text-ink">
          {ig.connected ? "Replace the access token" : "Paste a new access token"}
        </label>
        <input
          id="ig-token"
          type="password"
          autoComplete="off"
          spellCheck={false}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="IGAA…"
          className={input}
        />
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={!token.trim() || !!busy} className={cn(buttonVariants(), "h-11")}>
            {busy === "save" && <Loader2 className="animate-spin" aria-hidden />}
            Check and save
          </button>
          {ig.connected && ig.source === "dashboard" && (
            <button
              type="button"
              onClick={renew}
              disabled={!!busy}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/30 disabled:opacity-60"
            >
              {busy === "renew" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <RefreshCw className="size-4" aria-hidden />}
              Renew now
            </button>
          )}
        </div>
        {message && (
          <p role="status" className={cn("text-sm", message.ok ? "text-emerald-700" : "text-ember")}>
            {message.text}
          </p>
        )}
        <p className="text-xs text-stone">
          The token is checked with Instagram, stored on the server and never shown again.
        </p>
      </form>

      <details className="rounded-2xl border border-line bg-white p-4 text-sm text-ink">
        <summary className="cursor-pointer font-semibold">How to get a token</summary>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-stone">
          <li>
            Open{" "}
            <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="font-semibold text-royal hover:underline">
              Meta for Developers → My Apps <ExternalLink className="inline size-3" aria-hidden />
            </a>{" "}
            and choose the church&apos;s app (or create one of type <strong>Business</strong>).
          </li>
          <li>
            Add the <strong>Instagram</strong> product, then open <strong>API setup with Instagram login</strong>.
          </li>
          <li>
            Under <strong>Generate access tokens</strong>, click <strong>Add account</strong> and sign in as the church&apos;s
            Instagram account.
          </li>
          <li>
            Click <strong>Generate token</strong> next to the account, copy it, and paste it above.
          </li>
        </ol>
      </details>
    </AdminPanel>
  );
}
