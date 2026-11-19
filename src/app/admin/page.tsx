import { Suspense } from "react";
import Link from "next/link";
import AdminComponent from "@/components/admin/Admin";
import { getAdminStatus } from "@/lib/auth";

export const metadata = { title: "Admin Dashboard", robots: { index: false } };

const AdminDashboard = async () => {
  const status = await getAdminStatus();

  if (status !== "admin") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="max-w-md text-slate-600">
          Your account doesn&apos;t have access to the admin dashboard. Ask a church
          administrator to grant you the admin role.
        </p>
        <Link href="/" className="rounded-md bg-blue-950 px-4 py-2 text-white">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <Suspense fallback={<p className="p-6">Loading…</p>}>
      <AdminComponent />
    </Suspense>
  );
};

export default AdminDashboard;
