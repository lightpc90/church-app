"use client";

import {
  ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal, } from "lucide-react";
import { WorkerType } from "../types/types";

import  {Button}  from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./dataTableColumnHeader";





export const columns: ColumnDef<WorkerType>[] = [
  // ...
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "dept",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Dept" />
      </div>
    ),
  },
  // ...
  {
    id: "actions",
    cell: ({ row }) => {

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
            <DropdownMenuItem>View Worker</DropdownMenuItem>
            <DropdownMenuItem>Mark Attendance</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
