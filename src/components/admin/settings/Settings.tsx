import { AdminPanel, AdminSection } from "../AdminCard";

const Settings = () => (
  <AdminSection title="Settings">
    <AdminPanel>
      <p className="text-stone">
        Admin access is managed in Clerk: set a user&apos;s <code className="rounded bg-sand px-1.5 py-0.5 text-ink">publicMetadata.role</code> to{" "}
        <code className="rounded bg-sand px-1.5 py-0.5 text-ink">&quot;admin&quot;</code>, or add their email to the{" "}
        <code className="rounded bg-sand px-1.5 py-0.5 text-ink">ADMIN_EMAILS</code> environment variable.
      </p>
    </AdminPanel>
  </AdminSection>
);

export default Settings;
