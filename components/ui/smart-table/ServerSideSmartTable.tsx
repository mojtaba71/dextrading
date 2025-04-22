"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Updater,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./pagination";
import { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TableLoading from "@/components/layout/Table-loading";
import { ServerDataTableToolbar } from "./server-side-data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children?: ReactNode;
  pageCount?: number;
  page?: number;
  setPage?: (page: number) => void;
  setPageSize?: (pageSize: number) => void;
  setSearchValue?: (value: string) => void;
  loading: boolean;
  columnVisibilityState?: VisibilityState;
  searchValue?: string;
}

export function ServerSideSmartTable<TData, TValue>({
  columns,
  columnVisibilityState,
  data,
  children,
  pageCount,
  page,
  setPage,
  setPageSize,
  setSearchValue,
  searchValue,
  loading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // Check if columnVisibility is passed as a prop
    if (columnVisibilityState) {
      setColumnVisibility(columnVisibilityState);
    }
  }, [columnVisibilityState]);

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    if (page && setPageSize && setPage) {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: 10 })
          : updater;
      setPage(newState.pageIndex + 1);
      
      setPageSize(newState.pageSize);
    }
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: page ? page - 1 : 1,
        pageSize: 10,
      },
    },
    enableSorting: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: handlePaginationChange,
  });

  return (
    <div className="space-y-4 w-full">
      {setSearchValue && <ServerDataTableToolbar
        table={table}
        searchValue={searchValue ?? ""}
        setSearchValue={setSearchValue}
      >
        {children}
      </ServerDataTableToolbar>}
      <div className="rounded-md">
        <ScrollArea className="w-full rounded-md pb-4">
          <ScrollBar orientation="horizontal" />
          <div className="block h-[500px] relative">
            <Table className="bg-card">
              <TableHeader className="sticky top-0 z-20 bg-[hsl(var(--card))]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="pt-4">
                      <div className="w-full">
                        <TableLoading />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows &&
                  table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
      {page && setPageSize && setPage && <DataTablePagination pageCount={pageCount} table={table} />}
    </div>
  );
}
