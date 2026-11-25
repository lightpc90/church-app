import type { ReactNode } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getStaff, envRoles, type StaffMember } from "@/lib/auth";
import { adminQueries, getOpenCounts, getOverview } from "@/lib/admin-data";
import { getNotificationSettings, providerStatus, publicSettings } from "@/lib/notify";
import { can } from "@/lib/roles";
import prisma from "@/lib/prisma";
import TabLinks, { type TabBadges } from "@/components/admin/TabLinks";
import { AdminTabs } from "@/components/admin/tabs-config";
import { AdminPanel, AdminSection } from "@/components/admin/AdminCard";
import { StaffProvider } from "@/components/admin/StaffContext";
import { TabParamsEnum } from "@/components/enums/Enums";
import Overview from "@/components/admin/tabs/Overview";
import Registrations, { loadRegistrations } from "@/components/admin/tabs/Registrations";
import HouseFellowshipManager from "@/components/admin/tabs/HouseFellowshipManager";
import TeamManager from "@/components/admin/tabs/TeamManager";
import NotificationSettingsForm from "@/components/admin/tabs/NotificationSettingsForm";
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
  [TabParamsEnum.TEAM]: "Who can sign in to this dashboard, and what each person can see and do.",
  [TabParamsEnum.NOTIFICATIONS]: "Alert the team on WhatsApp or email when a prayer request or new convert comes in.",
};

async function renderTab(menu: TabParamsEnum, staff: StaffMember, group?: string): Promise<ReactNode> {
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
      return <WorkersTable data={await adminQueries.workers(staff)} />;
    case TabParamsEnum.TEAM:
      return (
        <TeamManager
          members={await prisma.teamMember.findMany({ orderBy: [{ role: "asc" }, { email: "asc" }] })}
          envMembers={envRoles()}
          currentEmail={staff.email}
        />
      );
    case TabParamsEnum.NOTIFICATIONS:
      return <NotificationSettingsForm settings={publicSettings(await getNotificationSettings())} providers={providerStatus()} />;
    default:
      return <Overview data={await getOverview()} role={staff.role} />;
  }
}

function Gate({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ivory p-6 text-center">
      <h1 className="font-display text-3xl text-ink">{title}</h1>
      <p className="max-w-md text-stone">{children}</p>
      <div className="flex items-center gap-3">
        <Link href="/" className="rounded-full bg-ink px-5 py-2.5 font-semibold text-white">
          Back to home
        </Link>
        <UserButton />
      </div>
    </main>
  );
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ menu?: string; group?: string }>;
}) {
  const staff = await getStaff();
  if (staff.status !== "ok") {
    return (
      <Gate title="Dashboard access required">
        Your account hasn&apos;t been given access to the dashboard yet. Ask a super admin to add your email on the Team
        &amp; Roles page, then sign in with that email.
      </Gate>
    );
  }

  const { menu: requested, group } = await searchParams;
  const visibleTabs = AdminTabs.filter((t) => can(staff.role, "view", t.resource));
  const requestedTab = AdminTabs.find((t) => t.param === requested);
  const allowed = requestedTab && can(staff.role, "view", requestedTab.resource);
  const tab = allowed ? requestedTab : visibleTabs[0];

  // Sidebar badges are a nicety: if they fail, the tab content's own error handling still shows.
  const badgesPromise: Promise<TabBadges> = getOpenCounts()
    .then((c) => {
      const b: TabBadges = {};
      if (can(staff.role, "view", "prayerRequests")) b[TabParamsEnum.PRAYER_REQUESTS] = c.prayers;
      if (can(staff.role, "view", "followUps")) b[TabParamsEnum.FOLLOW_UP] = c.followUps;
      if (can(staff.role, "view", "enquiries")) b[TabParamsEnum.ENQUIRIES] = c.enquiries;
      return b;
    })
    .catch(() => ({}));

  let content: ReactNode;
  if (requestedTab && !allowed) {
    content = (
      <AdminPanel>
        <p className="text-stone">You don&apos;t have access to this section. Ask a super admin if you need it.</p>
      </AdminPanel>
    );
  } else {
    try {
      content = await renderTab(tab.param, staff, group);
    } catch (e) {
      console.error(`[admin] failed to load "${tab.param}":`, e);
      content = (
        <AdminPanel>
          <p role="alert" className="text-red-900">
            Couldn&apos;t load this data from the database. Please refresh, and check the database connection if it
            keeps happening.
          </p>
        </AdminPanel>
      );
    }
  }

  const badges = await badgesPromise;
  const shown = requestedTab && !allowed ? requestedTab : tab;

  return (
    <StaffProvider role={staff.role}>
      <div className="min-h-dvh bg-ivory">
        <TabLinks menu={shown.param} role={staff.role} badges={badges} />
        <div className="pl-20 lg:pl-72">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-ivory/85 px-5 backdrop-blur-xl sm:px-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Admin dashboard</p>
            <UserButton />
          </header>
          <main className="p-5 sm:p-8">
            <AdminSection title={shown.name} description={allowed || !requestedTab ? descriptions[shown.param] : undefined}>
              {content}
            </AdminSection>
          </main>
        </div>
      </div>
    </StaffProvider>
  );
}
