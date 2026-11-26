import { redirect } from "next/navigation";
import WorkersShell from "@/components/workers/WorkersShell";
import WorkerProfileForm from "@/components/workers/WorkerProfileForm";
import { getCurrentWorker } from "@/lib/workers";
import { canonicalDept } from "@/lib/departments";

export const metadata = { title: "Workers' Registration" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const me = await getCurrentWorker();
  if (!me.signedIn) redirect("/workers/login");
  const w = me.worker;

  return (
    <WorkersShell>
      <p className="eyebrow">{w ? "Your profile" : "Registration"}</p>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink">
        {w ? "Update your details" : "Join the workforce"}
      </h1>
      <p className="mt-3 text-stone">
        {w
          ? "Changing department sends your profile to the new HOD for approval."
          : "Tell us where you serve. Your HOD or a church admin will approve your registration."}
      </p>
      <WorkerProfileForm
        isNew={!w}
        account={{ email: me.email, phone: me.phone }}
        initial={{
          name: w?.name ?? me.name,
          phone: w?.phone ?? me.phone ?? "",
          dept: w?.dept ? canonicalDept(w.dept) : "",
          gender: w?.gender ?? "",
          birthday: w?.birthday ?? "",
          area: w?.area ?? "",
          servingSince: w?.servingSince ? String(w.servingSince) : "",
        }}
      />
    </WorkersShell>
  );
}
