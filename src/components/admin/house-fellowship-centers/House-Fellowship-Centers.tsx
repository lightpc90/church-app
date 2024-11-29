"use client";

import Button from "@/components/customeUI/Button";
import { DataTable } from "@/components/ui/data-table";
import { houseFellowshipColumns } from "@/components/ui/houseFellowshipColumns";
import { useState, useEffect } from "react";
import HouseFellowshipForm from "@/components/UILayouts/HouseFellowshipForm";
import { AnimatePresence } from "framer-motion";

const HouseFellowshipCenters = async () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("api/houseFellowshipCenters");
      if(!response.ok){
        throw new Error("Failed to fetch data: server error")
      }
      const _res = await response.json()
      if(!_res.success){
        throw new Error(_res.error)}
      const data = _res.data
      setData(data) 
      setLoading(false)
    }
    fetchData()
  }, [])
  return (
    <div className="lg:m-5 relative">
      <h1 className="text-xlg lg:text-2xl mb-5 font-bold text-blue-800">
        House Fellowship Centers{" "}
      </h1>
      <Button onClick={() => setOpen(true)} className="text-sm lg:text-md">
        Register a New House Fellowship Center
      </Button>
      <DataTable
        columns={houseFellowshipColumns}
        data={data}
      />
      {/* house fellowship form component */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-[100%] ml-[15%] w-[80%] lg:w-full flex justify-center py-[20px] text-white">
            <HouseFellowshipForm setOpen={setOpen} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HouseFellowshipCenters;
