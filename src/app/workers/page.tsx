import { redirect } from "next/navigation";
import { CalendarCheck, ShieldCheck, Users } from "lucide-react";
import WorkersShell from "@/components/workers/WorkersShell";
import { ButtonLink, IconBadge } from "@/components/site/primitives";
import { getCurrentWorker } from "@/lib/workers";
import { windowLabel } from "@/lib/attendance-rules";

export const metadata = { title: "Workers' Portal" };
export const dynamic = "force-dynamic";

const steps = [
  { icon: <Users />, title: "Create your account", body: "Sign up with your email address or Google account." },
  { icon: <ShieldCheck />, title: "Register your department", body: "A short form. Your HOD or an admin approves it." },
  { icon: <CalendarCheck />, title: "Mark attendance", body: `Check in on your phone at church, ${windowLabel}.` },
];

/** Signed in? Go straight to the dashboard, or to registration if you haven't registered yet. */
export default async function Page() {
  const me = await getCurrentWorker();
  if (me.signedIn) redirect(me.worker ? "/workers/dashboard" : "/workers/register");

  return (
    <WorkersShell>
      <IconBadge>
        <Users />
      </IconBadge>
      <h1 className="mt-6 font-display text-4xl font-medium text-ink">Workers&apos; portal</h1>
      <p className="mt-3 text-lg text-stone">
        For members serving in our departments: choir, media, ushering, protocol, sanitation, teachers and more.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/workers/login" size="lg">
          Sign in
        </ButtonLink>
        <ButtonLink href="/workers/create-account" variant="outline" size="lg">
          Create an account
        </ButtonLink>
      </div>

      <ol className="mt-10 space-y-3">
        {steps.map((s, i) => (
          <li key={s.title} className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
            <IconBadge className="size-10 rounded-xl [&_svg]:size-5">{s.icon}</IconBadge>
            <span>
              <span className="block font-semibold text-ink">
                {i + 1}. {s.title}
              </span>
              <span className="mt-0.5 block text-sm text-stone">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </WorkersShell>
  );
}
