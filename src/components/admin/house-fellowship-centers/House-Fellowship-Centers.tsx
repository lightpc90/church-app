import Button from "@/components/customeUI/Button";
import { DataTable } from "@/components/ui/data-table";
import { HouseFellowshipCentersData } from "@/components/data/Data";
import { houseFellowshipColumns } from "@/components/ui/houseFellowshipColumns";
import React from "react";
import HouseFellowshipForm from "@/components/UILayouts/HouseFellowshipForm";

const HouseFellowshipCenters = () => {
  return (
    <div className="lg:m-5 relative">
      <h1 className="text-xlg lg:text-2xl mb-5 font-bold text-blue-800">House Fellowship Centers </h1>
      <Button className="text-sm lg:text-md">Register a New House Fellowship Center</Button>
      <DataTable columns={houseFellowshipColumns} data={HouseFellowshipCentersData} />
      {/* house fellowship form component */}
      <div className="fixed inset-0 z-50 bg-black ml-20 w-[80vw] flex justify-center py-[20px] text-white">
        <HouseFellowshipForm />
      </div>
    </div>
  );
};

export default HouseFellowshipCenters;
