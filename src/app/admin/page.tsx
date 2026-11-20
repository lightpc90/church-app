import type { ReactNode } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getAdminStatus } from "@/lib/auth";
import { adminQueries, getOverview } from "@/lib/admin-data";
import TabLinks from "@/components/admin/TabLinks";
import { AdminTabs } from "@/components/admin/tabs-config";
import { AdminPanel, AdminSection } from "@/components/admin/AdminCard";
import { TabParamsEnum } from "@/components/enums/Enums";
import Overview from "@/components/admin/tabs/Overview";
import Registrations, { loadRegistrations } from "@/components/admin/tabs/Registrations";
import HouseFellowshipManager from "@/components/admin/tabs/HouseFellowshipManager";
import Settings from "@/components/admin/settings/Settings";
import {
  EnquiriesTable,
  FollowUpTable,
  PrayerRequestsTable,
  TestimoniesTable,
  WorkersTable,
} from "@/components/admin/tables";

export const metadata = { title: "Admin Dashboard", robots: { index: false } };
// Always show the latest submissions.
export const dynamic = "force-dynamic";

const descriptions: Partial<Record<TabParamsEnum, string>> = {
  [TabParamsEnum.OVERVIEW]: "What's come in through the website.",
  [TabParamsEnum.PRAYER_REQUESTS]: "Requests for the pastoral and prayer team. Treat these as confidential.",
  [TabParamsEnum.TESTIMONIES]: "Testimonies shared through the website.",
  [TabParamsEnum.FOLLOW_UP]: "New converts from “How can I be saved?”. Reach out to each person.",
  [TabParamsEnum.ENQUIRIES]: "Messages from the contact form.",
  [TabParamsEnum.REGISTRATIONS]: "Sign-ups for natural groups and ministries.",
  [TabParamsEnum.HOUSE_FELLOWSHIP]: "Centers listed on the public House Fellowships page.",
  [TabParamsEnum.WORKERS]: "Members serving across departments.",
};

async function renderTab(menu: string, group?: string): Promise<ReactNode> {
  switch (menu) {
    case TabParamsEnum.PRAYER_REQUESTS:
      return <PrayerRequestsTable data={await adminQueries.prayerRequests()} />;
    case TabParamsEnum.TESTIMONIES:
      return <TestimoniesTable data={await adminQueries.testimonies()} />;
    case TabParamsEnum.FOLLOW_UP:
      return <FollowUpTable data={await adminQueries.followUps()} />;
    case TabParamsEnum.ENQUIRIES:
      return <EnquiriesTable data={await adminQueries.enquiries()} />;
    case TabParamsEnum.REGISTRATIONS:
      return <Registrations data={await loadRegistrations(group)} />;
    case TabParamsEnum.HOUSE_FELLOWSHIP:
      return <HouseFellowshipManager data={await adminQueries.houseFellowships()} />;
    case TabParamsEnum.WORKERS:
      return <WorkersTable data={await adminQueries.workers()} />;
    case TabParamsEnum.SETTINGS:
      return <Settings />;
    default:
      return <Overview data={await getOverview()} />;
  }
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ menu?: string; group?: string }>;
}) {
  const status = await getAdminStatus();
  if (status !== "admin") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ivory p-6 text-center">
        <h1 className="font-display text-3xl text-ink">Admin access required</h1>
        <p className="max-w-md text-stone">
          Your account doesn&apos;t have access to the admin dashboard. Ask a church administrator to grant you the
          admin role.
        </p>
        <Link href="/" className="rounded-full bg-ink px-5 py-2.5 font-semibold text-white">
          Back to home
        </Link>
      </main>
    );
  }

  const { menu = TabParamsEnum.OVERVIEW, group } = await searchParams;
  const tab = AdminTabs.find((t) => t.param === menu);
  const title = tab?.name ?? (menu === TabParamsEnum.SETTINGS ? "Settings" : "Overview");

  let content: ReactNode;
  try {
    content = await renderTab(menu, group);
  } catch (e) {
    console.error(`[admin] failed to load "${menu}":`, e);
    content = (
      <AdminPanel>
        <p role="alert" className="text-red-900">
          Couldn&apos;t load this data from the database. Please refresh, and check the database connection if it
          keeps happening.
        </p>
      </AdminPanel>
    );
  }

  return (
    <div className="min-h-dvh bg-ivory">
      <TabLinks menu={tab || menu === TabParamsEnum.SETTINGS ? menu : TabParamsEnum.OVERVIEW} />
      <div className="pl-20 lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-ivory/85 px-5 backdrop-blur-xl sm:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Admin dashboard</p>
          <UserButton />
        </header>
        <main className="p-5 sm:p-8">
          <AdminSection title={title} description={descriptions[menu as TabParamsEnum]}>
            {content}
          </AdminSection>
        </main>
      </div>
    </div>
  );
}
