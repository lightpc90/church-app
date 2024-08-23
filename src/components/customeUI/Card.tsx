// components/Card.tsx
import React from "react";
import classNames from "classnames";

type CardProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className,
  rounded = "lg",
  shadow = "md",
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "p-4 bg-white dark:bg-gray-800",
        `rounded-${rounded}`,
        shadow !== "none" && `shadow-${shadow}`,
        "transition-transform transform hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      {title && <h2 className="text-xl font-semibold text-blue-800 ">{title}</h2>}
      {subtitle && <h2 className="text-slate-500 mb-4 text-sm">{subtitle}</h2>}
      {children}
    </div>
  );
};

export default Card;
