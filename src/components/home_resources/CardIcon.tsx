"use client";

import React, { useEffect, useRef, useState } from "react";
import { WhatNextCardLayoutType } from "./WhatNextCardsLayout";

import * as FaIcons from "react-icons/fa6";
import * as TfiIcons from "react-icons/tfi";
import * as LiaIcons from "react-icons/lia";
import * as GrIcons from "react-icons/gr";

// Function to get the correct icon based on name and family
const getIconByName = (iconName: string, iconFamily: string) => {
  switch (iconFamily) {
    case "Fa6":
      return FaIcons[iconName as keyof typeof FaIcons] || null;
    case "Tfi":
      return TfiIcons[iconName as keyof typeof TfiIcons] || null;
    case "Lia":
      return LiaIcons[iconName as keyof typeof LiaIcons] || null;
    case "Gr":
      return GrIcons[iconName as keyof typeof GrIcons] || null;
    default:
      return null;
  }
};

const CardIcon: React.FC<WhatNextCardLayoutType> = ({ cardData }) => {
  const IconComponent = getIconByName(cardData.iconName, cardData.iconFamily);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsInvisible] = useState(false);

  useEffect(() => {
    const currentRef = iconRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInvisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
  }, []);
  return (
    <div ref={iconRef}>
      {IconComponent ? (
        <IconComponent size={70} className={isVisible ? "glow" : ""} />
      ) : null}
    </div>
  );
};

export default CardIcon;
