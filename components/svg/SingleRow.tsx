import React from "react";

function SingleRow() {
  return (
    <svg
      width="24"
      height="13"
      viewBox="0 0 40 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.5"
        width="12"
        height="12"
        rx="2"
        fill="hsl(var(--foreground))"
      />
      <rect
        x="14"
        y="0.5"
        width="12"
        height="12"
        rx="2"
        fill="hsl(var(--foreground))"
      />
      <rect
        x="28"
        y="0.5"
        width="12"
        height="12"
        rx="2"
        fill="hsl(var(--foreground))"
      />
    </svg>
  );
}

export default SingleRow;
