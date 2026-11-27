"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { TeamMember } from "@prisma/client";
import { Loader2, Lock, Trash2, UserPlus } from "lucide-react";
import { ROLES, isRole, roleDescriptions, roleLabels, type Role } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { AdminPanel } from "../AdminCard";
import { Dialog } from "../table/cells";

const input =
  "h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-hidden transition focus:border-royal focus:ring-4 focus:ring-royal/10 disabled:bg-sand/50 disabled:text-stone";

const roleTone: Record<Role, string> = {
  superadmin: "bg-ink text-white",
  admin: "bg-royal/10 text-royal",
  pastor: "bg-gold-soft text-ink",
  hod: "bg-emerald-50 text-emerald-800",
  workerDesk: "bg-sand text-ink",
  childrenDesk: "bg-sky-50 text-sky-800",
};

function RoleBadge({ role }: { role: string }) {
  if (!isRole(role)) return <span className="text-stone">{role}</span>;
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap", roleTone[role])}>
      {roleLabels[role]}
    </span>
  );
}

async function call(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
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

function AddMember() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("pastor");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setBusy(true);
    setError(null);
    try {
      await call("/api/admin/team", "POST", data);
      form.reset();
      setRole("pastor");
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't add");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminPanel>
      <h2 className="font-display text-xl font-medium text-ink">Add someone</h2>
      <p className="mt-1 text-sm text-stone">
        Use the email they sign in with. They get access the next time they open the dashboard. They don&apos;t
        need an account yet.
      </p>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_auto] xl:items-end">
        <label className="space-y-1 text-sm font-medium text-ink">
          Email
          <input name="email" type="email" required className={input} placeholder="name@example.com" />
        </label>
        <label className="space-y-1 text-sm font-medium text-ink">
          Name <span className="font-normal text-stone">(optional)</span>
          <input name="name" className={input} placeholder="Pastor Ade" />
        </label>
        <label className="space-y-1 text-sm font-medium text-ink">
          Role
          <select name="role" value={role} onChange={(e) => setRole(e.target.value as Role)} className={input}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {roleLabels[r]}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-medium text-ink">
          Department <span className="font-normal text-stone">(HODs)</span>
          <input
            name="dept"
            disabled={role !== "hod"}
            className={input}
            placeholder={role === "hod" ? "e.g. Choir" : "Only for HODs"}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink-soft disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <UserPlus className="size-4" aria-hidden />}
          Add
        </button>
      </form>
      <p className="mt-2 text-xs text-stone">{roleDescriptions[role]}</p>
      {error && (
        <p role="alert" className="mt-3 rounded-2xl bg-red-50 p-3 text-sm text-red-900">
          {error}
        </p>
      )}
    </AdminPanel>
  );
}

function MemberRow({ member, isSelf }: { member: TeamMember; isSelf: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [isRefreshing, startTransition] = useTransition();
  const working = busy || isRefreshing;

  async function run(method: string, body?: unknown) {
    setBusy(true);
    setError(null);
    try {
      await call(`/api/admin/team/${member.id}`, method, body);
      setConfirming(false);
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save");
    } finally {
      setBusy(false);
    }
  }

  return (
    <tr className="align-top">
      <td className="px-4 py-3.5">
        <p className="font-semibold text-ink">
          {member.name || member.email}
          {isSelf && <span className="ml-2 text-xs font-normal text-stone">(you)</span>}
        </p>
        {member.name && <p className="text-xs break-all text-stone">{member.email}</p>}
      </td>
      <td className="px-4 py-3.5">
        <select
          aria-label={`Role for ${member.email}`}
          value={member.role}
          disabled={isSelf || working}
          onChange={(e) => run("PATCH", { role: e.target.value })}
          className={cn(input, "w-44")}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {roleLabels[r]}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3.5">
        {member.role === "hod" ? (
          <input
            key={member.dept ?? ""}
            aria-label={`Department for ${member.email}`}
            defaultValue={member.dept ?? ""}
            disabled={isSelf || working}
            placeholder="All departments"
            onBlur={(e) => e.target.value.trim() !== (member.dept ?? "") && run("PATCH", { dept: e.target.value })}
            className={cn(input, "w-44")}
          />
        ) : (
          <span className="text-stone/60">-</span>
        )}
      </td>
      <td className="px-4 py-3.5 text-xs text-stone">{member.addedBy ? `Added by ${member.addedBy}` : ""}</td>
      <td className="px-4 py-3.5 text-right">
        {working && <Loader2 className="mr-2 inline size-4 animate-spin text-stone" aria-label="Saving" />}
        {!isSelf && (
          <button
            type="button"
            aria-label={`Remove ${member.email}`}
            onClick={() => setConfirming(true)}
            className="inline-flex size-9 items-center justify-center rounded-full text-stone hover:bg-red-50 hover:text-ember"
          >
            <Trash2 className="size-4" aria-hidden />
          </button>
        )}
        {error && (
          <p role="alert" className="mt-1 text-left text-xs text-ember">
            {error}
          </p>
        )}
        <Dialog
          open={confirming}
          onClose={() => !working && setConfirming(false)}
          title="Remove dashboard access?"
          footer={
            <>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="h-10 rounded-full px-5 text-sm font-semibold text-ink hover:bg-ink/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => run("DELETE")}
                disabled={working}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ember px-5 text-sm font-semibold text-white hover:bg-ember/90 disabled:opacity-60"
              >
                {working && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Remove
              </button>
            </>
          }
        >
          <p className="text-left text-stone">
            <span className="font-semibold text-ink">{member.name || member.email}</span> will no longer be able to open
            the dashboard. Records they marked as handled keep their name.
          </p>
        </Dialog>
      </td>
    </tr>
  );
}

export default function TeamManager({
  members,
  envMembers,
  currentEmail,
}: {
  members: TeamMember[];
  envMembers: { email: string; role: Role }[];
  currentEmail: string;
}) {
  const sorted = [...members].sort(
    (a, b) => ROLES.indexOf(a.role as Role) - ROLES.indexOf(b.role as Role) || a.email.localeCompare(b.email)
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ROLES.map((r) => (
          <div key={r} className="rounded-3xl border border-line bg-white p-5">
            <RoleBadge role={r} />
            <p className="mt-3 text-sm text-stone">{roleDescriptions[r]}</p>
          </div>
        ))}
      </div>

      <AddMember />

      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand/60 text-xs tracking-wider text-stone uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Person</th>
              <th scope="col" className="px-4 py-3 font-semibold">Role</th>
              <th scope="col" className="px-4 py-3 font-semibold">Department</th>
              <th scope="col" className="px-4 py-3 font-semibold" />
              <th scope="col" className="px-4 py-3 font-semibold"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {envMembers.map((m) => (
              <tr key={`env-${m.email}-${m.role}`} className="align-top">
                <td className="px-4 py-3.5">
                  <p className="font-semibold break-all text-ink">
                    {m.email}
                    {m.email === currentEmail && <span className="ml-2 text-xs font-normal text-stone">(you)</span>}
                  </p>
                </td>
                <td className="px-4 py-3.5">
                  <RoleBadge role={m.role} />
                </td>
                <td className="px-4 py-3.5 text-stone/60">-</td>
                <td className="px-4 py-3.5 text-xs text-stone" colSpan={2}>
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="size-3.5" aria-hidden /> Set on the server (
                    {m.role === "superadmin" ? "SUPER_ADMIN_EMAILS" : "ADMIN_EMAILS"}), can&apos;t be changed here
                  </span>
                </td>
              </tr>
            ))}
            {sorted.map((m) => (
              <MemberRow key={m.id} member={m} isSelf={m.email === currentEmail} />
            ))}
            {!envMembers.length && !sorted.length && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-stone">
                  No one added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
