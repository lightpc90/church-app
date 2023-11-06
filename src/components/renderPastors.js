"use client";

import React from "react";
import { PastorLayout } from "./PastorLayout";

const RenderPastors = () => {
  const pastors = [
    { dp: "", name: "Pastor Egra Akpofure", social: "@Egra_Akpofure" },
    {
      dp: "",
      name: "Ast. Pastor Oluseye Opasanya",
      social: "@Oluseye_Opansaya",
    },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-10">
      {pastors.map((eachPastor, index) => (
        <PastorLayout
          key={index}
          dp={eachPastor.dp}
          name={eachPastor.name}
          social={eachPastor.social}
        />
      ))}
    </div>
  );
};

export default RenderPastors;
