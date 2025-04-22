"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import Image from "next/image";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-xl",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarPlaceholder = React.forwardRef<HTMLDivElement, PlaceholderProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "relative flex items-center justify-center h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-accent",
        className
      )}
      {...props}
    >
      {/* <Image
                height={28}
                width={28}
                alt="placeholder image"
                src='/placeholder-new-year.png'
                className="h-9 w-9"
            /> */}
      <Image
        height={26}
        width={26}
        alt="placeholder image"
        src="/dextrading-logo.png"
        className="grayscale opacity-30 h-3/5 w-3/5"
      />
    </div>
  )
);

AvatarPlaceholder.displayName = "AvatarPlaceholder";

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-xl bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback, AvatarPlaceholder };
