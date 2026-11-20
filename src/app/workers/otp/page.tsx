import { redirect } from "next/navigation";

// Verification codes are handled by Clerk's sign-in flow.
export default function Page() {
  redirect("/workers/login");
}
