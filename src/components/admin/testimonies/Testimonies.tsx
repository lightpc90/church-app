import { DataTable } from "@/components/ui/data-table";
import { TestimoniesData } from "@/components/data/Data";
import { testimoniesColumns } from "@/components/ui/testimoniesColumns";
import { AdminPanel, AdminSection } from "../AdminCard";

const Testimonies = () => (
  <AdminSection title="Testimonies" description="Testimonies shared through the website.">
    <AdminPanel>
      <DataTable columns={testimoniesColumns} data={TestimoniesData} />
    </AdminPanel>
  </AdminSection>
);

export default Testimonies;
