import React from "react";

function GetAlertSvg({color = "hsl(var(--brand))"}) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.37984 4.74012L12.7473 2.61762C15.6048 1.66512 17.1573 3.22512 16.2123 6.08262L14.0898 12.4501C12.6648 16.7326 10.3248 16.7326 8.89984 12.4501L8.26984 10.5601L6.37984 9.93012C2.09734 8.50512 2.09734 6.17262 6.37984 4.74012Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.41016 10.2374L11.0952 7.54492"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default GetAlertSvg;
