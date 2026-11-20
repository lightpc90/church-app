import { CalendarCheck, UserRound, Users } from "lucide-react";
import { Show, SignInButton } from "@clerk/nextjs";
import WorkersShell from "@/components/workers/WorkersShell";
import { Button, ButtonLink, IconBadge } from "@/components/site/primitives";

export const metadata = { title: "Workers' Portal" };

const tools = [
  { icon: <CalendarCheck />, title: "Mark attendance", body: "Check in for services and departmental meetings.", href: "/workers/mark-attendance" },
  { icon: <UserRound />, title: "Your profile", body: "Keep your department and contact details up to date.", href: "/workers/profile-creation" },
];

export default function Page() {
  return (
    <WorkersShell>
      <IconBadge>
        <Users />
      </IconBadge>
      <h1 className="mt-6 font-display text-4xl font-medium text-ink">Workers&apos; portal</h1>
      <p className="mt-3 text-lg text-stone">
        For members serving in our departments: media, choir, ushering, protocol, sanitation, teachers and more.
      </p>

      <Show when="signed-out">
        <div className="mt-8 flex flex-wrap gap-3">
          <SignInButton mode="modal" forceRedirectUrl="/workers">
            <Button size="lg">Sign in</Button>
          </SignInButton>
          <ButtonLink href="/workers/create-account" variant="outline" size="lg">
            Create an account
          </ButtonLink>
        </div>
      </Show>

      <ul className="mt-10 space-y-3">
        {tools.map((tool) => (
          <li key={tool.href}>
            <a href={tool.href} className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:shadow-lift">
              <IconBadge className="size-10 rounded-xl [&_svg]:size-5">{tool.icon}</IconBadge>
              <span>
                <span className="block font-semibold text-ink">{tool.title}</span>
                <span className="mt-0.5 block text-sm text-stone">{tool.body}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </WorkersShell>
  );
}
