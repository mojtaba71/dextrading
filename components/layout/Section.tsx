import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const sectionVariants = cva(
  "relative w-full flex gap-5",
  {
    variants: {
      variant: {
        default: "flex-col lg:flex-row items-start md:items-start justify-between ",
        vertical: "flex-col items-start justify-center",
        horizontal:
          "md:flex-row md:items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLTableElement>,
  VariantProps<typeof sectionVariants> { }

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sectionVariants({ variant, className }))}
      {...props}
    >
      {props.children}
    </div>
  )
);
Section.displayName = "Section";


const headerVariants = cva(
  "flex flex-col items-start justify-center gap-2",
  {
    variants: {
      variant: {
        default: "w-full lg:w-1/4 md:max-w-80",
        vertical: "w-full",
        horizontal:
          "w-full lg:w-1/4 lg:max-w-96"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export interface SectionProps
  extends React.HTMLAttributes<HTMLTableElement>,
  VariantProps<typeof headerVariants> { }

const SectionHeader = forwardRef<
  HTMLDivElement,
  SectionProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(headerVariants({ variant, className }))}
    {...props}
  >
    {props.children}
  </div>
));
SectionHeader.displayName = "SectionHeader";

const SectionTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-secondary-foreground font-medium text-lg", className)}
    {...props}
  >
    {props.children}
  </h1>
));
SectionTitle.displayName = "SectionTitle";

const SectionDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm p-2 leading-7 ", className)}
    {...props}
  >
    {props.children}
  </p>
));
SectionDescription.displayName = "SectionDescription";


const contentVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "w-full lg:w-3/4",
        vertical: "w-full",
        horizontal:
          "lg:w-3/4"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ContentProps
  extends React.HTMLAttributes<HTMLTableElement>,
  VariantProps<typeof contentVariants> { }

const SectionContent = forwardRef<
  HTMLDivElement,
  ContentProps
>(({ className, variant, ...props }, ref) => (
  <div ref={ref}
    className={cn(contentVariants({ variant, className }))}
    {...props}>
    {props.children}
  </div>
));
SectionContent.displayName = "SectionContent";

export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
};
