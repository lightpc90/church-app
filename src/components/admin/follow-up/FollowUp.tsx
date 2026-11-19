import { DataTable } from "@/components/ui/data-table";
import { FollowUpData } from "@/components/data/Data";
import { followUpColumns } from "@/components/ui/followUpColums";
import { AdminPanel, AdminSection } from "../AdminCard";

const FollowUp = () => (
  <AdminSection title="Follow up" description="New converts and first-timers to reach out to.">
    <AdminPanel>
      <DataTable columns={followUpColumns} data={FollowUpData} />
    </AdminPanel>
  </AdminSection>
);

export default FollowUp;
