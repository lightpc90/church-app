import Button from "@/components/customeUI/Button";
import { DataTable } from "@/components/ui/data-table";
import { HouseFellowshipCentersData } from "@/components/data/Data";
import { houseFellowshipColumns } from "@/components/ui/houseFellowshipColumns";
import React from "react";

const HouseFellowshipCenters = () => {
  return (
    <div className="lg:m-5">
      <h1 className="text-xlg lg:text-2xl mb-5 font-bold text-blue-800">House Fellowship Centers </h1>
      <Button className="text-sm lg:text-md">Register a New House Fellowship Center</Button>
      <DataTable columns={houseFellowshipColumns} data={HouseFellowshipCentersData} />
    </div>
  );
};

export default HouseFellowshipCenters;
