import Button from "@/components/customeUI/Button";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { FollowUpData } from "@/components/data/Data";
import { followUpColumns } from "@/components/ui/followUpColums";
import { workersData } from "@/components/data/Data";


const FollowUp = () => {
  return (
    <div className="m-10">
      <Button>Add a New Convert</Button>
      <DataTable columns={followUpColumns} data={FollowUpData} />
    </div>
  );
};

export default FollowUp;
