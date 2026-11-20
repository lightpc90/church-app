import { SignUp } from "@clerk/nextjs";
import WorkersShell from "@/components/workers/WorkersShell";

export const metadata = { title: "Create a Workers' Account" };

export default function Page() {
  return (
    <WorkersShell>
      <h1 className="mb-6 font-display text-4xl font-medium text-ink">Glad to have you</h1>
      <SignUp routing="hash" forceRedirectUrl="/workers" signInUrl="/workers/login" />
    </WorkersShell>
  );
}
