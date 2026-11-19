import { DataTable } from "@/components/ui/data-table";
import { PrayerRequestData } from "@/components/data/Data";
import { prayerRequestColumns } from "@/components/ui/prayerRequestColumns";
import { AdminPanel, AdminSection } from "../AdminCard";

const PrayerRequest = () => (
  <AdminSection title="Prayer requests" description="Requests submitted for the prayer team.">
    <AdminPanel>
      <DataTable columns={prayerRequestColumns} data={PrayerRequestData} />
    </AdminPanel>
  </AdminSection>
);

export default PrayerRequest;
