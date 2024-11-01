"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import Loading from "../loading/RequestLoading";

export const initHfcForm = { center: "", host: "", host_phone: "", teacher: "", teacher_phone: '', zone: "" };
type PropsType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const HouseFellowshipForm: FC<PropsType> = ({setOpen}) => {
  const [formData, setFormData] = useState(initHfcForm);
  const [loading, setLoading] = useState(false);
  //
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
    
    };
    const res = await fetch("/api/houseFellowshipCenters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create preayer request");
    const _res = await res.json();
    console.log(_res);
    setLoading(false);
    setFormData(initHfcForm);
    setOpen(false)
  };
  return (
    <div className="flex flex-col items-center gap-3 w-[80%] h-[100%] lg:w-[40%] relative">
      <button onClick={()=>setOpen(false)} className="mb-10 bg-rose-800 text-white p-2 rounded-md self-end" >close</button>
      <h1 className="font-bold text-lg text-white">
        Add House Fellowship Center
      </h1>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="centername">Center Name</label>
          <input
            name="centername"
            type="text"
            placeholder="Beautiful Gate Center"
            className="bg-[#FFFFFF] p-2 rounded-md text-blue-950"
            value={formData.center}
            onChange={(e) =>
              setFormData({ ...formData, center: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="hostname">Host Name</label>
          <input
            name="hostname"
            type="text"
            placeholder="John Doe"
            className="bg-[#FFFFFF] p-2 rounded-md text-blue-950"
            value={formData.host}
            onChange={(e) =>
              setFormData({ ...formData, host: e.target.value.toString() })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="hostnumber">Host Number</label>
          <input
            name="hostnumber"
            type="number"
            placeholder="08012345678"
            className="bg-[#FFFFFF] p-2 rounded-md text-blue-950"
            value={formData.host_phone}
            onChange={(e) =>
              setFormData({ ...formData, host_phone: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="teachername">Teacher Name</label>
          <input
            type="text"
            name="teachername"
            placeholder="John Doe"
            className="bg-[#FFFFFF] p-2 rounded-md text-blue-950"
            value={formData.teacher}
            onChange={(e) =>
              setFormData({ ...formData, teacher: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="teachernumber">Teacher Number</label>
          <input
            type="number"
            name="teachernumber"
            placeholder="08012345678"
            className="bg-[#FFFFFF] p-2 rounded-md text-blue-950"
            value={formData.teacher_phone}
            onChange={(e) =>
              setFormData({ ...formData, teacher_phone: e.target.value })
            }
          />
        </div>
        <select
          onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
          className="text-blue-950 mb-5 p-2 rounded-md"
        >
          <option value="">Choose Zone</option>
          <option value="lakowe">Lakowe Zone</option>
          <option value="eputu">Eputu Zone</option>
          <option value="bogije">Bogije Zone</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-blue-950 hover:bg-blue-800 p-2 text-white rounded-md w-full my-2"
        >
          Add House Fellowship
        </button>
      </div>
      {/* loading component */}
      {loading && (
        <div className="absolute inset-0 opacity-90 h-full w-full overflow-hidden">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default HouseFellowshipForm;
