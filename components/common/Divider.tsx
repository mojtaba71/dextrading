import React from "react";

type DividerProps = {
  height?: number;
  className?: string;
};

function Divider({ height = 1, className = "" }: DividerProps) {
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
