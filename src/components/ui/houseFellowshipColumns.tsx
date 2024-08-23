"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import { HouseFellowshipType } from "../types/types";

export const houseFellowshipColumns: ColumnDef<HouseFellowshipType>[] = [
  // ...
  {
    accessorKey: "center",
    header: "Center",
  },
  {
    accessorKey: "host",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Host" />
      </div>
    ),
  },
  {
    accessorKey: "host_phone",
    header: "Host's Phone",
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
  },
  {
    accessorKey: "teacher_phone",
    header: "Teacher's Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  // ...
  {
    id: "actions",
    cell: ({ row }) => {
      const worker = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Address</DropdownMenuItem>
            <DropdownMenuItem>SMS to Host</DropdownMenuItem>
            <DropdownMenuItem>SMS to Teacher</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
