import React from "react";
import clsx from "clsx"; // Import clsx for handling dynamic classNames

type PriceFormatterProps = {
  value: number | string;
  dollarSign?: boolean;
  className?: string; // Optional className prop for custom styling
};

export default function PriceFormatter({
  value,
  dollarSign,
  className,
}: PriceFormatterProps) {
  // Parse the value to ensure it's a number
  const parsedValue = Number(value);

  // Define a function to format the value
  const formatValue = (num: number) => {
    if (num === 0) return "0";

    if (num > 0.0001) {
      // For values greater than 0.0001, format as a fixed decimal string
      return num.toFixed(4).replace(/\.?0+$/, "");
    }

    // For very small numbers, use exponential notation and format it
    const [leading, exponential] = num.toExponential(2).split("e");
    const formattedExponential = `${leading}e${parseInt(exponential)}`;
    return `0.0${formattedExponential}`;
  };

  // Extract parts for very small numbers
  const getFormattedParts = (num: number) => {
    const [leading, exponential] = num.toExponential(2).split("e");
    const formattedExponential = `${leading}e${parseInt(exponential)}`;
    return {
      leadingPart: `0.0`,
      subPart: parseInt(exponential).toString().substring(1),
      trailingPart: formattedExponential.replace(".", "").split("e")[0],
    };
  };

  const formattedValue = formatValue(parsedValue);
  const isSmallNumber = parsedValue !== 0 && parsedValue <= 0.0001;
  const { leadingPart, subPart, trailingPart } = isSmallNumber
    ? getFormattedParts(parsedValue)
    : { leadingPart: "", subPart: "", trailingPart: "" };

  return (
    <div className={clsx("flex items-center gap-[2.75rem]", className)}>
      {dollarSign && <span>$</span>}
      {!isSmallNumber && formattedValue}
      {isSmallNumber && (
        <>
          <span>{leadingPart}</span>
          <sub>{+subPart - 1}</sub>
          <span>{trailingPart}</span>
        </>
      )}
    </div>
  );
}

export function formatNumberToSubscript(num: number) {
  // Convert the number to a string
  const numStr = num.toString();

  // Handle numbers less than 1
  if (num < 1 && numStr.startsWith("0.")) {
    const decimalPart = numStr.split(".")[1] || ""; // Get the part after the decimal
    let zeroCount = 0;

    // Count the number of leading zeros after the decimal point
    for (const char of decimalPart) {
      if (char === "0") {
        zeroCount++;
      } else {
        break;
      }
    }

    // Ensure at least 3 significant digits after the leading zeros
    const significantPart = decimalPart.slice(zeroCount, zeroCount + 3).padEnd(3, "0");

    // Convert the zeroCount to a subscript using Unicode
    const subscriptMap: { [key: string]: string } = {
      "0": "₀",
      "1": "₁",
      "2": "₂",
      "3": "₃",
      "4": "₄",
      "5": "₅",
      "6": "₆",
      "7": "₇",
      "8": "₈",
      "9": "₉",
    };

    const zeroCountSubscript = zeroCount
      .toString()
      .split("")
      .map((digit) => subscriptMap[digit])
      .join("");

    // If zeroCount is 3 or less, return normal format
    if (zeroCount <= 3) {
      return `0.${"0".repeat(zeroCount)}${significantPart}`;
    }

    // If zeroCount is more than 3, use subscript notation
    return `0.0${zeroCountSubscript}${significantPart}`;
  }

  // Handle numbers greater than or equal to 1
  else if (num >= 0.0001) {
    return `$${num.toFixed(6).replace(/\.?0+$/, "")}`; // Keep up to 6 decimal places, remove trailing zeros
  }

  return `$${num}`; // Default fallback
}
