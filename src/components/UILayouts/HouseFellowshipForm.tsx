"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import Loading from "../loading/RequestLoading";

export const initHfcForm = {
  center: "",
  address: "",
  host: "",
  host_phone: "",
  teacher: "",
  teacher_phone: "",
  zone: "",
};
// create enum for zones
export enum ZonesEnum {
  lakowe = "Lakowe",
  schoolGate = "School Gate",
  adeba = "Adeba",
  oribanwa = "Oribanwa",
  awoyaya = "Awoyaya",
  ologunfe = "Ologunfe",
  bogije = "Bogije",
  kajola = "Kajola",
  malete = "Malete",
  eputu = "Eputu",
  ogunfayo = "Ogunfayo",
  newRoad = "New Road",
  abijo = "Abijo GRA",
  faraPark = "Fara Park",
  sangotedo = "Sangotedo",
  lekki = "Lekki",
}

type PropsType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const HouseFellowshipForm: FC<PropsType> = ({ setOpen }) => {
  const [formData, setFormData] = useState(initHfcForm);
  const [loading, setLoading] = useState(false);
  //
  const handleSubmit = async () => {
    setLoading(true);
    const data = formData;
    const res = await fetch("/api/houseFellowshipCenters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const _res = await res.json();
    console.log(_res);
    setLoading(false);
    setFormData(initHfcForm);
    setOpen(false);
  };
  return (
    <div className="flex flex-col items-center gap-3 w-full bg-slate-950 rounded-md shadow-lg p-5 lg:p-10 md:w-[40%] lg:w-[40%]  relative">
      <button
        onClick={() => setOpen(false)}
        className="mb-10 bg-rose-800 text-white p-2 rounded-md self-end"
      >
        close
      </button>
      <h1 className="font-bold text-lg text-white">
        Add House Fellowship Center
      </h1>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="centername">Center Name</label>
          <input
            required
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
          <label htmlFor="centerAddress">Center Address</label>
          <input
            required
            name="centerAddress"
            type="text"
            placeholder="Beautiful Gate, Church Premises"
            className="bg-[#FFFFFF] p-2 rounded-md text-blue-950"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="hostname">Host Name</label>

          <input
          required
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
          required
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
        required
          onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
          className="text-blue-950 mb-5 p-2 rounded-md"
        >
          <option value="">Choose Zone</option>
          <option value={ZonesEnum.lakowe}>Lakowe Zone</option>
          <option value={ZonesEnum.schoolGate}>School Gate Zone</option>
          <option value={ZonesEnum.adeba}>Adeba Zone</option>
          <option value={ZonesEnum.oribanwa}>Oribanwa Zone</option>
          <option value={ZonesEnum.awoyaya}>Awoyaya Zone</option>
          <option value={ZonesEnum.ologunfe}>Ologunfe Zone</option>
          <option value={ZonesEnum.bogije}>Bogije Zone</option>
          <option value={ZonesEnum.kajola}>Kajola Zone</option>
          <option value={ZonesEnum.malete}>Malete Zone</option>
          <option value={ZonesEnum.eputu}>Eputu Zone</option>
          <option value={ZonesEnum.ogunfayo}>Ogunfayo Zone</option>
          <option value={ZonesEnum.newRoad}>New Road Zone</option>
          <option value={ZonesEnum.abijo}>Abijo GRA Zone</option>
          <option value={ZonesEnum.faraPark}>Fara Park Zone</option>
          <option value={ZonesEnum.sangotedo}>Sangotedo Zone</option>
          <option value={ZonesEnum.lekki}>Lekki Zone</option>
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
