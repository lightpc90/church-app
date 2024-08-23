import { ColumnDef } from "@tanstack/react-table";
import { WorkerType } from "../types/types";

export const CustomeColumns: ColumnDef<WorkerType>[] = [
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
    header: "Dept",
  },
];
