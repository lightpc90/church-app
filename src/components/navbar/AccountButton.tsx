"use client";

import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Users } from "lucide-react";

/**
 * The signed-in avatar menu. People with a dashboard role (admins, pastors, HODs, desks) get an
 * "Admin dashboard" link; everyone gets the Workers' portal. The dashboard itself re-checks access.
 */
export default function AccountButton() {
  const { userId } = useAuth();
  const [staff, setStaff] = useState<{ userId: string; isStaff: boolean } | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    fetch("/api/me/staff")
      .then((r) => r.json())
      .then((d) => !cancelled && setStaff({ userId, isStaff: !!d?.staff }))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const isStaff = !!staff && staff.userId === userId && staff.isStaff;

  return (
    <UserButton>
      <UserButton.MenuItems>
        {isStaff && <UserButton.Link label="Admin dashboard" labelIcon={<LayoutDashboard className="size-4" />} href="/admin" />}
        <UserButton.Link label="Workers' portal" labelIcon={<Users className="size-4" />} href="/workers" />
      </UserButton.MenuItems>
    </UserButton>
  );
}
