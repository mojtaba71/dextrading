import clsx from "clsx";
import React, { forwardRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const KeyValueVariants = cva("flex items-center justify-start gap-1", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      good: "text-green-400",
      bad: "text-red-500",
      dark: "dark:text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface KeyValueProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof KeyValueVariants> {
  title: string;
  description?: string | number;
  titleIcon?: React.ReactNode;
  valueIcon?: React.ReactNode;
  value?: string | number;
  stretch?: boolean;
  symbol?: "dollar" | "percentage";
  itemIconUrl?: string;
  iconWidth?: number;
  valueClassName?: string
}

const KeyValue = forwardRef<HTMLDivElement, KeyValueProps>(
  (
    {
      className,
      variant,
      title,
      description,
      titleIcon,
      valueIcon,
      value,
      stretch,
      symbol,
      children,
      itemIconUrl,
      iconWidth,
      valueClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          "flex items-center gap-1 w-full",
          stretch ? "justify-between gap-0" : "justify-start",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-1">
          {titleIcon}
          <div className="flex flex-col">
            <h2 className="whitespace-nowrap">
              {title}
              {stretch && " : "}
            </h2>
            {description && (
              <h3 className="font-normal text-xs text-foreground">
                {description}
              </h3>
            )}
          </div>
        </div>
        {!stretch && <span>:</span>}
        <div className={cn("whitespace-nowrap", KeyValueVariants({ variant }))}>
          {children || (
            <>
              {itemIconUrl && (
                <Avatar
                  style={{ width: iconWidth ?? 32, height: iconWidth ?? 32 }}
                  className="ml-3 mr-1"
                >
                  <AvatarImage src={itemIconUrl} alt="token logo" />
                  <AvatarFallback>
                    {value?.toString()?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`flex items-center ${valueClassName}`}>
                {symbol === "dollar" && "$ "}
                {value}
                {valueIcon}
                {symbol === "percentage" && " %"}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

KeyValue.displayName = "KeyValue";

export { KeyValue, KeyValueVariants };
