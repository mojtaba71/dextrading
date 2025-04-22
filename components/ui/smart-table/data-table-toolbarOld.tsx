import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "./data-table-view-options"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icon"
import { LuSearch } from "react-icons/lu"
import { ReactNode } from "react"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchColumnAccessorKey: string
  children: ReactNode
}

export function DataTableToolbarOld<TData>({
  table,
  searchColumnAccessorKey,
  children
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between gap-2 w-full">


      <div className="flex items-center justify-start gap-2 ">

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <LuSearch />
          </div>
          <Input
            placeholder="Find addresses ..."
            value={(table.getColumn(searchColumnAccessorKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchColumnAccessorKey)?.setFilterValue(event.target.value)
              // console.log(table.getColumn(searchColumnAccessorKey))
            }
            className="h-8 !pl-9 w-[150px] lg:w-[250px]"
          />
        </div>
        <div>
          {children}
        </div>
        {/* {table.getColumn("status") && (
        <DataTableFacetedFilter
        column={table.getColumn("status")}
            title="Status"
            options={statuses}
            />
          )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
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
