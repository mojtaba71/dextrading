import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "./data-table-view-options"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icon"
import { LuSearch } from "react-icons/lu"
import React, { ReactNode, useState } from "react"
import { useDebounce } from "use-debounce"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchColumnAccessorKey: string
  setSearchValue: (value: string) => void
  children: ReactNode
}

export function ServerDataTableToolbar<TData>({
  table,
  searchColumnAccessorKey,
  setSearchValue,
  children
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedValue] = useDebounce(inputValue, 2000);

  React.useEffect(() => {
    table.getColumn(searchColumnAccessorKey)?.setFilterValue(debouncedValue);
    setSearchValue(debouncedValue);
  }, [debouncedValue, searchColumnAccessorKey, table, setSearchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(inputValue);
    }
  };

  const handleResetFilters = () => {
    table.resetColumnFilters();
    setInputValue("");
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <LuSearch />
          </div>
          <Input
            placeholder="Find addresses ..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="h-8 !pl-9 w-[150px] lg:w-[250px]"
          />
        </div>
        <div>
          {children}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.cancel className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
