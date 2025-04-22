import React from "react";

function Divider({
  height = 1,
  className = "",
}: {
  height: number;
  className?: string;
}) {
  return (
    <div className="w-full flex items-center justify-center my-6">
      <div
        className={`w-[calc(100%-32px)] bg-border ${className}`}
        style={{ height }}
      ></div>
    </div>
  );
}

export default Divider;
