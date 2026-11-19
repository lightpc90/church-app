import { SignIn } from "@clerk/nextjs";
import WorkersShell from "@/components/workers/WorkersShell";

export const metadata = { title: "Workers' Sign In" };

export default function Page() {
  return (
    <WorkersShell>
      <h1 className="mb-6 font-display text-4xl font-medium text-ink">Welcome back</h1>
      <SignIn routing="hash" forceRedirectUrl="/workers" signUpUrl="/workers/create-account" />
    </WorkersShell>
  );
}
