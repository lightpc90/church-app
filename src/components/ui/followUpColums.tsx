"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { FollowUpType } from "../types/types";

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

export const followUpColumns: ColumnDef<FollowUpType>[] = [
  // ...
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Name" />
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  // ...
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Group" />
      </div>
    ),
  },
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
            <DropdownMenuItem>Send SMS</DropdownMenuItem>
            <DropdownMenuItem>Send Email</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
