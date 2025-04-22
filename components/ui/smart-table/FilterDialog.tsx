import React, { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GrPowerReset } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import { DatePicker } from "../date-picker";
import { ScrollArea } from "../scroll-area";
import clsx from "clsx";
import { LockIcon } from "../lock-icon/LockIcon";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SliderIcon } from "@radix-ui/react-icons";

type FilterBase = {
  name: string;
  type: "range" | "dropdown" | "date" | "date-range";
  premium?: boolean;
};

type RangeFilter = FilterBase & {
  state: [number, number];
  setState: (value: [number, number]) => void;
  defaultRange: [number, number];
  type: "range";
  icon?: any;
};

type DropdownFilter = FilterBase & {
  state: string;
  setState: (value: string) => void;
  defaultRange: string[];
  type: "dropdown";
  icon?: any;
};

type DateFilter = FilterBase & {
  state: Date | undefined;
  setState: (value: Date | undefined) => void;
  type: "date";
  icon?: any;
};

type DateRangeFilter = FilterBase & {
  state: { from: Date | undefined; to: Date | undefined };
  setState: (value: { from: Date | undefined; to: Date | undefined }) => void;
  type: "date-range";
  icon?: any;
};

export type Filter =
  | RangeFilter
  | DropdownFilter
  | DateFilter
  | DateRangeFilter;

interface Props {
  filters: Filter[];
  grantAccess?: () => void;
  limitedToday?: boolean;
}

const FilterDialog = ({
  filters,
  grantAccess = () => {},
  limitedToday = false,
}: Props) => {
  const [tempFilters, setTempFilters] = useState(
    filters.map((filter) => ({
      ...filter,
      state: filter.state,
    }))
  );

  const handleRangeChange = (index: number, newValue: [number, number]) => {
    const updatedFilters = [...tempFilters];
    (updatedFilters[index] as RangeFilter).state = newValue;
    setTempFilters(updatedFilters);
  };

  const handleDropdownChange = (index: number, newValue: string) => {
    const updatedFilters = [...tempFilters];
    (updatedFilters[index] as DropdownFilter).state = newValue;
    setTempFilters(updatedFilters);
  };

  const handleDateChange = (index: number, newValue: Date | undefined) => {
    const updatedFilters = [...tempFilters];
    (updatedFilters[index] as DateFilter).state = newValue;
    setTempFilters(updatedFilters);
  };

  const handleDateRangeChange = (
    index: number,
    newValue: { from: Date | undefined; to: Date | undefined }
  ) => {
    const updatedFilters = [...tempFilters];
    (updatedFilters[index] as DateRangeFilter).state = newValue;
    setTempFilters(updatedFilters);
  };

  const applyFilters = () => {
    if (!limitedToday) {
      tempFilters.forEach((filter, index) => {
        filters[index].setState(filter.state as any);
      });
      grantAccess();
    } else {
      // Notify user that they've reached their limit of filters
    }
  };

  const resetFilters = () => {
    const resetTempFilters = tempFilters.map((filter) => {
      if (filter.type === "range" || filter.type === "dropdown") {
        return {
          ...filter,
          state: filter.defaultRange,
        };
      } else if (filter.type === "date") {
        return {
          ...filter,
          state: undefined,
        };
      } else if (filter.type === "date-range") {
        return {
          ...filter,
          state: { from: undefined, to: undefined },
        };
      }
      return filter;
    });
    setTempFilters(resetTempFilters as any);

    filters.forEach((filter) => {
      if (filter.type === "range" || filter.type === "dropdown") {
        filter.setState(filter.defaultRange as any);
      } else if (filter.type === "date") {
        filter.setState(undefined);
      } else if (filter.type === "date-range") {
        filter.setState({ from: undefined, to: undefined });
      }
    });
  };

  const router = useRouter();
  const handleNavigate = () => {
    router.push("/pricing");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-1"
        >
          <BiFilterAlt />
          <span>Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-h-75% w-[27vw] min-w-[320px] rounded-md">
        <DialogTitle className="flex items-center gap-2">
          <BiFilterAlt className="text-brand" />
          <p>Filters</p>
        </DialogTitle>
        <DialogDescription
          className={clsx({
            "text-red-500": limitedToday,
            "text-gray-500": !limitedToday,
          })}
        >
          {limitedToday
            ? "You have reached your limit of filters today! Please come back tomorrow."
            : "Adjust the filters to refine your results."}
        </DialogDescription>
        <ScrollArea className="h-full">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="max-h-72 mr-2 "
          >
            {tempFilters.map((filter, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="hover:bg-[hsl(var(--accent))]/40 hover:no-underline transition-all duration-300 px-2 border border-[hsl(var(--border))] border-solid rounded-lg my-2"
              >
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <div>
                      {filter.icon ?? <SliderIcon />}
                    </div>
                    <div>{filter.name}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {filter.premium ? (
                    <div className="text-red-500">
                      This filter is available for premium users only.{" "}
                      <Link
                        href="/pricing"
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        Check our pricing plans
                      </Link>
                    </div>
                  ) : filter.type === "range" ? (
                    <>
                      {/* Setup from and to to input with reset button */}
                      <div className="flex flex-row gap-4 items-center justify-between m-1 mb-4">
                        <Input
                          type="number"
                          placeholder="From"
                          className="filter-input focus-visible:ring-brand focus-visible:text-brand transition-all duration-75"
                          value={(filter.state as [number, number])[0]}
                          onChange={(e) =>
                            handleRangeChange(index, [
                              parseInt(e.target.value),
                              (filter.state as [number, number])[1],
                            ])
                          }
                          onBlur={(e) => {
                            //max is max number default range
                            if (
                              parseInt(e.currentTarget.value) >
                              (filter.defaultRange as [number, number])[1]
                            ) {
                              e.currentTarget.value = (
                                filter.defaultRange as [number, number]
                              )[1].toString();
                            }
                            // min is smaller than max
                            if (
                              parseInt(e.currentTarget.value) >
                              (filter.state as [number, number])[1]
                            ) {
                              e.currentTarget.value = (
                                filter.state as [number, number]
                              )[1].toString();
                            }
                          }}
                        />
                        <Input
                          type="number"
                          value={(filter.state as [number, number])[1]}
                          className="filter-input focus-visible:ring-brand focus-visible:text-brand transition-all duration-75 h-[30px] text-sm"
                          onChange={(e) =>
                            handleRangeChange(index, [
                              (filter.state as [number, number])[0],
                              parseInt(e.target.value),
                            ])
                          }
                          onBlur={(e) => {
                            //min is min number default range
                            if (
                              parseInt(e.currentTarget.value) <
                              (filter.defaultRange as [number, number])[0]
                            ) {
                              e.currentTarget.value = (
                                filter.defaultRange as [number, number]
                              )[0].toString();
                            }
                            //max is max number default range
                            if (
                              parseInt(e.currentTarget.value) >
                              (filter.defaultRange as [number, number])[1]
                            ) {
                              e.currentTarget.value = (
                                filter.defaultRange as [number, number]
                              )[1].toString();
                            }
                            //max number is greater than min number
                            if (
                              parseInt(e.currentTarget.value) <
                              (filter.state as [number, number])[0]
                            ) {
                              e.currentTarget.value = (
                                filter.state as [number, number]
                              )[0].toString();
                            }
                          }}
                        />
                        <Button
                          variant="ghost"
                          className="flex items-center justify-start gap-1"
                          style={{ padding: "4px 8px", height: 35, width: 35 }}
                          onClick={() =>
                            handleRangeChange(
                              index,
                              filter.defaultRange as [number, number]
                            )
                          }
                        >
                          <GrPowerReset className="text-brand" width={18} />
                        </Button>
                      </div>
                      <div className="flex items-center text-xs gap-4 mx-1 text-primary/70">
                        <div className="mt-2">
                          {(filter.state as [number, number])[0]}
                        </div>

                        <Slider
                          rangeSlider={true}
                          className="mt-2"
                          value={filter.state as [number, number]}
                          min={(filter.defaultRange as [number, number])[0]}
                          max={(filter.defaultRange as [number, number])[1]}
                          onValueChange={(newValue) =>
                            handleRangeChange(index, [newValue[0], newValue[1]])
                          }
                          step={1}
                          aria-label={`${filter.name} Slider`}
                        />
                        <div className="mt-2">
                          {(filter.state as [number, number])[1]}
                        </div>
                      </div>
                    </>
                  ) : filter.type === "dropdown" ? (
                    <div className="w-[calc(100%-32px)]">
                      <Select
                        value={filter.state as string}
                        onValueChange={(value) =>
                          handleDropdownChange(index, value)
                        }
                      >
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder={`Select ${filter.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {(filter.defaultRange as string[]).map(
                            (option, idx) => (
                              <SelectItem key={idx} value={option}>
                                {option}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : filter.type === "date" ? (
                    <DatePicker
                      label={filter.name}
                      selectedDate={filter.state as Date | undefined}
                      onSelect={(newValue) => handleDateChange(index, newValue)}
                    />
                  ) : (
                    <div className="flex justify-between gap-3">
                      <div className="w-auto">
                        <DatePicker
                          style={{ padding: "0 8px", fontSize: "0.605rem" }}
                          label={`${filter.name} From`}
                          selectedDate={
                            (
                              filter.state as {
                                from: Date | undefined;
                                to: Date | undefined;
                              }
                            ).from
                          }
                          onSelect={(date) =>
                            handleDateRangeChange(index, {
                              ...(filter.state as {
                                from: Date | undefined;
                                to: Date | undefined;
                              }),
                              from: date,
                            })
                          }
                        />
                      </div>
                      <div className="w-auto">
                        <DatePicker
                          label={`${filter.name} To`}
                          style={{ padding: "0 8px", fontSize: "0.605rem" }}
                          selectedDate={
                            (
                              filter.state as {
                                from: Date | undefined;
                                to: Date | undefined;
                              }
                            ).to
                          }
                          onSelect={(date) =>
                            handleDateRangeChange(index, {
                              ...(filter.state as {
                                from: Date | undefined;
                                to: Date | undefined;
                              }),
                              to: date,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            className="flex items-center justify-center gap-1 w-full text-brand"
            onClick={resetFilters}
          >
            <span>Reset</span>
          </Button>
          <DialogClose asChild>
            {limitedToday ? (
              <Button
                className="w-full"
                onClick={() => handleNavigate()}
                variant={"outline"}
              >
                <LockIcon />
              </Button>
            ) : (
              <Button
                className="w-full bg-brand"
                variant="default"
                onClick={applyFilters}
              >
                Ok
              </Button>
            )}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
