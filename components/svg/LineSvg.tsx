import React from "react";

const LineSvg = () => {
  return (
    <svg
      width="100%"
      viewBox="0 0 251 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" filter="url(#filter0_f_48_58)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.0642 18.2571H3.6484L3.13354 17.2274H18.0642V18.2571Z"
          fill="#3086F3"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5801 18.7717H4.16427L3.64941 17.2272H18.5801V18.7717Z"
        fill="#07DBFA"
      />
      <path d="M20.126 18.2567V17.7418H123.096V18.2567H20.126Z" fill={"hsl(var(--muted-foreground))"} />
      <g clipPath="url(#clip0_48_58)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M120.372 17.7416V18.2565H122.538L127.171 15.6822H129.639H532.253V15.1674H129.639H126.958L122.324 17.7416H120.372Z"
          fill={"hsl(var(--muted-foreground))"}
        />
      </g>
      <defs>
        <filter
          id="filter0_f_48_58"
          x="0.559288"
          y="14.6532"
          width="20.0792"
          height="6.17818"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.28713"
            result="effect1_foregroundBlur_48_58"
          />
        </filter>
        <clipPath id="clip0_48_58">
          <rect
            width="129.891"
            height="20.5941"
            fill={"hsl(var(--muted-foreground))"}
            transform="translate(120.372 0.237671)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LineSvg;
