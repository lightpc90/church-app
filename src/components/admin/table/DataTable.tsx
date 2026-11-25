"use client";

import { useMemo, useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/** A preset filter shown as a segmented control above the table, e.g. Open / Handled / All. */
export type TableView<T> = {
  key: string;
  label: string;
  filter?: (row: T) => boolean;
  /** Shown when this view is empty but the table has other records. */
  emptyText?: string;
};

export type CsvColumn<T> = { label: string; value: (row: T) => string | number | null | undefined | Date };

function toCsv<T>(rows: T[], columns: CsvColumn<T>[]) {
  const escape = (v: unknown) => {
    const s = v instanceof Date ? v.toISOString() : v == null ? "" : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [columns.map((c) => escape(c.label)).join(",")];
  for (const row of rows) lines.push(columns.map((c) => escape(c.value(row))).join(","));
  // BOM so Excel opens UTF-8 (names with accents, emoji in testimonies) correctly
  return "﻿" + lines.join("\r\n");
}

function download(filename: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

export function DataTable<TData>({
  columns,
  data,
  searchPlaceholder = "Search…",
  emptyText = "Nothing here yet.",
  csv,
  toolbar,
  views,
}: {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  searchPlaceholder?: string;
  emptyText?: string;
  csv?: { filename: string; columns: CsvColumn<TData>[] };
  toolbar?: React.ReactNode;
  /** First view is the default. */
  views?: TableView<TData>[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [viewKey, setViewKey] = useState(views?.[0]?.key);
  const view = views?.find((v) => v.key === viewKey);
  const viewData = useMemo(() => (view?.filter ? data.filter(view.filter) : data), [data, view]);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is not compiler-memoizable
  const table = useReactTable({
    data: viewData,
    columns,
    autoResetPageIndex: true,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <div className="space-y-4">
      {views && views.length > 1 && (
        <div role="group" aria-label="Show" className="inline-flex rounded-full border border-line bg-white p-1">
          {views.map((v) => {
            const count = v.filter ? data.filter(v.filter).length : data.length;
            const active = v.key === viewKey;
            return (
              <button
                key={v.key}
                type="button"
                aria-pressed={active}
                onClick={() => setViewKey(v.key)}
                className={cn(
                  "inline-flex h-8 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                  active ? "bg-ink text-white" : "text-stone hover:text-ink"
                )}
              >
                {v.label}
                <span className={cn("tabular-nums", active ? "text-white/70" : "text-stone/70")}>{count}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[14rem] flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone" aria-hidden />
          <input
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-10 w-full rounded-full border border-line bg-white pr-4 pl-10 text-sm text-ink outline-hidden transition focus:border-royal focus:ring-4 focus:ring-royal/10"
          />
        </div>
        <p className="text-sm text-stone" aria-live="polite">
          {filteredRows.length} {filteredRows.length === 1 ? "record" : "records"}
          {globalFilter && ` matching “${globalFilter}”`}
        </p>
        <div className="ml-auto flex items-center gap-2">
          {toolbar}
          {csv && (
            <button
              type="button"
              disabled={!filteredRows.length}
              onClick={() =>
                download(
                  `${csv.filename}-${new Date().toLocaleDateString("en-CA")}.csv`,
                  toCsv(filteredRows.map((r) => r.original), csv.columns)
                )
              }
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink/30 disabled:opacity-50"
            >
              <Download className="size-4" aria-hidden /> Export CSV
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand/60 text-xs tracking-wider text-stone uppercase">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th key={header.id} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1.5 uppercase hover:text-ink"
                          aria-label={`Sort by ${String(header.column.columnDef.header)}`}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === "asc" ? (
                            <ArrowUp className="size-3.5" aria-hidden />
                          ) : sorted === "desc" ? (
                            <ArrowDown className="size-3.5" aria-hidden />
                          ) : (
                            <ArrowUpDown className="size-3.5 opacity-40" aria-hidden />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="align-top transition-colors hover:bg-ivory">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center text-stone">
                  {globalFilter
                    ? `No records match “${globalFilter}”.`
                    : data.length && view?.emptyText
                      ? view.emptyText
                      : emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="mr-2 text-stone">
            Page {pageIndex + 1} of {pageCount}
          </span>
          {[
            { label: "Previous page", Icon: ChevronLeft, onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage() },
            { label: "Next page", Icon: ChevronRight, onClick: () => table.nextPage(), disabled: !table.getCanNextPage() },
          ].map(({ label, Icon, onClick, disabled }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              disabled={disabled}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/30",
                "disabled:opacity-40"
              )}
            >
              <Icon className="size-4" aria-hidden />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
