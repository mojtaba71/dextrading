"use client"

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function Slippage({ onChange }: { onChange: (value: number) => void }) {
  const [slippage, setSlippage] = useState(2);

  const handleClick = (value: number) => {
    setSlippage(value);
    onChange(value * 0.01);
  };

  const values = [1, 2, 3, 5, 10];

  const PercentItem = ({
    value,
    onClick,
  }: {
    value: number;
    onClick: () => void;
  }) => {
    return (
      <Button
        onClick={onClick}
        variant={"outline"}
        style={{ padding: 4, width: 32, height: 32 }}
        className={`border border-border p-2 text-xs text-muted-foreground rounded-md ${
          value === slippage ? "bg-accent" : "bg-transparent"
        }`}
      >
        {value}%
      </Button>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
        <div className="mr-auto">Slippage</div>
        {values.map((item) => (
          <PercentItem
            value={item}
            key={item}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slippage;
