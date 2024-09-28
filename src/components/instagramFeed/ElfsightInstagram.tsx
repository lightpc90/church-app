'use client'

import { useEffect } from "react";

const ElfsightInstagram = () => {
  useEffect(() => {
    // Create a script element and load the Elfsight script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []); // Ensures script runs only once after component mounts

  return (
    <div className="relative">
      {/* Elfsight widget container */}
      <div
        className="elfsight-app-ed95e60a-d99f-4ae9-996b-ff0b33d86b3e"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default ElfsightInstagram;
