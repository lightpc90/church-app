

import Button from "@/components/customeUI/Button";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { workersData } from "@/components/data/Data";
import { columns } from "@/components/ui/columns";




const Workers = () => {
  return (
    <div className="m-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-blue-800">Workers List</h1>
      <Button className="w-fit">Register a Worker</Button>
      <DataTable columns={columns} data={workersData} />
    </div>
  );
};

export default Workers;
