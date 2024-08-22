import Button from "@/components/customeUI/Button";
import { DataTable } from "@/components/ui/data-table";
import { TestimoniesData } from "@/components/data/Data";
import { testimoniesColumns } from "@/components/ui/testimoniesColumns";
import React from "react";

const Testimonies = () => {
  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-blue-800 mb-5">Testimonies</h1>
      <DataTable columns={testimoniesColumns} data={TestimoniesData} />
    </div>
  );
};

export default Testimonies;
