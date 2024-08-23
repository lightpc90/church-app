import Button from "@/components/customeUI/Button";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { FollowUpData } from "@/components/data/Data";
import { followUpColumns } from "@/components/ui/followUpColums";
import { workersData } from "@/components/data/Data";


const FollowUp = () => {
  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-blue-800 mb-5" >Follow Up List</h1>
      <Button>Add New</Button>
      <DataTable columns={followUpColumns} data={FollowUpData} />
    </div>
  );
};

export default FollowUp;
