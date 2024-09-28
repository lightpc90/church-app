'use client'

import { useEffect } from "react";

const LightWidget = () => {
  useEffect(() => {
    // Dynamically create the script tag for LightWidget
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up by removing the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Embed the LightWidget iframe */}
      <iframe
        src="//lightwidget.com/widgets/ebe1f42fb44051e7bea098ba1456e8b2.html"
        scrolling="no"
        allowTransparency={true}
        className="lightwidget-widget"
        style={{
          width: "100%",
          border: "none",
          overflow: "hidden",
          height: "500px",
        }} // Customize height as needed
      ></iframe>
    </div>
  );
};

export default LightWidget;
