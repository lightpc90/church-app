import { DataTable } from "@/components/ui/data-table";
import { workersData } from "@/components/data/Data";
import { columns } from "@/components/ui/columns";
import { AdminPanel, AdminSection } from "../AdminCard";

const Workers = () => (
  <AdminSection title="Workers" description="Members serving across departments.">
    <AdminPanel>
      <DataTable columns={columns} data={workersData} />
    </AdminPanel>
  </AdminSection>
);

export default Workers;
