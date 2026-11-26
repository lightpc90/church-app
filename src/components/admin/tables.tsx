"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type {
  Child,
  Elder,
  Enquiry,
  FollowUp,
  HouseFellowship,
  Men,
  PrayerRequest,
  Teen,
  Testimony,
  Women,
  Worker,
  Youth,
} from "@prisma/client";
import type { AttendanceRow } from "@/lib/admin-data";
import { canonicalDept } from "@/lib/departments";
import { DataTable, type CsvColumn, type TableView } from "./table/DataTable";
import { DateCell, HandledCell, MessageCell, PersonCell, PhoneCell, RowActions, WorkerStatusCell, formatDateTime } from "./table/cells";

// Columns are typed per model; the shared DataTable takes ColumnDef<T, unknown>.
type Cols<T> = ColumnDef<T, unknown>[];

const createdAtColumn = <T extends { createdAt: Date }>(): ColumnDef<T, unknown> => ({
  accessorKey: "createdAt",
  header: "Received",
  cell: ({ row }) => <DateCell value={row.original.createdAt} />,
  sortingFn: "datetime",
});

const createdCsv = <T extends { createdAt: Date }>(): CsvColumn<T> => ({
  label: "Received",
  value: (r) => formatDateTime(r.createdAt),
});

/* ───────────── open / handled (prayer requests, follow-ups, messages) ───────────── */

type Trackable = { id: string; createdAt: Date; handledAt: Date | null; handledBy: string | null };

const statusColumn = <T extends Trackable>(endpoint: string): ColumnDef<T, unknown> => ({
  id: "status",
  header: "Status",
  accessorFn: (r) => (r.handledAt ? `handled ${r.handledBy ?? ""}` : "open"),
  sortingFn: (a, b) => Number(!!a.original.handledAt) - Number(!!b.original.handledAt),
  cell: ({ row }) => (
    <HandledCell
      id={row.original.id}
      endpoint={endpoint}
      handledAt={row.original.handledAt}
      handledBy={row.original.handledBy}
    />
  ),
});

const statusViews = <T extends Trackable>(): TableView<T>[] => [
  { key: "open", label: "Open", filter: (r) => !r.handledAt, emptyText: "All caught up. Everything here has been handled." },
  { key: "handled", label: "Handled", filter: (r) => !!r.handledAt, emptyText: "Nothing has been marked as handled yet." },
  { key: "all", label: "All" },
];

const statusCsv = <T extends Trackable>(): CsvColumn<T>[] => [
  { label: "Status", value: (r) => (r.handledAt ? "Handled" : "Open") },
  { label: "Handled by", value: (r) => r.handledBy },
  { label: "Handled at", value: (r) => (r.handledAt ? formatDateTime(r.handledAt) : "") },
];

/* ───────────── prayer requests ───────────── */

const prayerColumns: Cols<PrayerRequest> = [
  statusColumn("/api/prayer-request"),
  createdAtColumn(),
  {
    accessorKey: "fullname",
    header: "Name",
    cell: ({ row }) => <PersonCell name={row.original.fullname} email={row.original.email} />,
  },
  { accessorKey: "phone", header: "Phone", enableSorting: false, cell: ({ row }) => <PhoneCell phone={row.original.phone} /> },
  {
    accessorKey: "prayerRequest",
    header: "Request",
    enableSorting: false,
    cell: ({ row }) => (
      <MessageCell
        title={`Prayer request from ${row.original.fullname}`}
        text={row.original.prayerRequest}
        meta={formatDateTime(row.original.createdAt)}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint="/api/prayer-request"
        label={`${row.original.fullname}'s prayer request`}
        phone={row.original.phone}
        email={row.original.email}
      />
    ),
  },
];

export function PrayerRequestsTable({ data }: { data: PrayerRequest[] }) {
  return (
    <DataTable
      columns={prayerColumns}
      data={data}
      views={statusViews()}
      searchPlaceholder="Search prayer requests"
      emptyText="No prayer requests yet. They'll appear here as soon as someone submits the form."
      csv={{
        filename: "prayer-requests",
        columns: [
          createdCsv(),
          { label: "Name", value: (r) => r.fullname },
          { label: "Phone", value: (r) => r.phone },
          { label: "Email", value: (r) => r.email },
          { label: "Request", value: (r) => r.prayerRequest },
          ...statusCsv(),
        ],
      }}
    />
  );
}

/* ───────────── testimonies ───────────── */

const testimonyColumns: Cols<Testimony> = [
  createdAtColumn(),
  {
    accessorKey: "fullname",
    header: "Name",
    cell: ({ row }) => <PersonCell name={row.original.fullname} email={row.original.email} />,
  },
  { accessorKey: "phone", header: "Phone", enableSorting: false, cell: ({ row }) => <PhoneCell phone={row.original.phone} /> },
  {
    accessorKey: "testimony",
    header: "Testimony",
    enableSorting: false,
    cell: ({ row }) => (
      <MessageCell
        title={`Testimony from ${row.original.fullname}`}
        text={row.original.testimony}
        meta={formatDateTime(row.original.createdAt)}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint="/api/testimony"
        label={`${row.original.fullname}'s testimony`}
        phone={row.original.phone}
        email={row.original.email}
      />
    ),
  },
];

export function TestimoniesTable({ data }: { data: Testimony[] }) {
  return (
    <DataTable
      columns={testimonyColumns}
      data={data}
      searchPlaceholder="Search testimonies"
      emptyText="No testimonies yet."
      csv={{
        filename: "testimonies",
        columns: [
          createdCsv(),
          { label: "Name", value: (r) => r.fullname },
          { label: "Phone", value: (r) => r.phone },
          { label: "Email", value: (r) => r.email },
          { label: "Testimony", value: (r) => r.testimony },
        ],
      }}
    />
  );
}

/* ───────────── enquiries ───────────── */

const enquiryColumns: Cols<Enquiry> = [
  statusColumn("/api/enquiry"),
  createdAtColumn(),
  {
    accessorKey: "fullname",
    header: "Name",
    cell: ({ row }) => <PersonCell name={row.original.fullname} email={row.original.email} />,
  },
  { accessorKey: "phone", header: "Phone", enableSorting: false, cell: ({ row }) => <PhoneCell phone={row.original.phone} /> },
  {
    accessorKey: "enquiry",
    header: "Message",
    enableSorting: false,
    cell: ({ row }) => (
      <MessageCell
        title={`Message from ${row.original.fullname}`}
        text={row.original.enquiry}
        meta={formatDateTime(row.original.createdAt)}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint="/api/enquiry"
        label={`${row.original.fullname}'s message`}
        phone={row.original.phone}
        email={row.original.email}
      />
    ),
  },
];

export function EnquiriesTable({ data }: { data: Enquiry[] }) {
  return (
    <DataTable
      columns={enquiryColumns}
      data={data}
      views={statusViews()}
      searchPlaceholder="Search messages"
      emptyText="No messages from the contact form yet."
      csv={{
        filename: "enquiries",
        columns: [
          createdCsv(),
          { label: "Name", value: (r) => r.fullname },
          { label: "Phone", value: (r) => r.phone },
          { label: "Email", value: (r) => r.email },
          { label: "Message", value: (r) => r.enquiry },
          ...statusCsv(),
        ],
      }}
    />
  );
}

/* ───────────── follow up (new converts) ───────────── */

const followUpColumns: Cols<FollowUp> = [
  statusColumn("/api/followUps"),
  createdAtColumn(),
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <PersonCell name={row.original.name} email={row.original.email} />,
  },
  { accessorKey: "phone", header: "Phone", enableSorting: false, cell: ({ row }) => <PhoneCell phone={row.original.phone} /> },
  {
    accessorKey: "address",
    header: "Address",
    enableSorting: false,
    cell: ({ row }) => <p className="max-w-xs min-w-[12rem] text-stone">{row.original.address}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint="/api/followUps"
        label={`${row.original.name} from the follow-up list`}
        phone={row.original.phone}
        email={row.original.email}
      />
    ),
  },
];

export function FollowUpTable({ data }: { data: FollowUp[] }) {
  return (
    <DataTable
      columns={followUpColumns}
      data={data}
      views={statusViews()}
      searchPlaceholder="Search by name, phone or address"
      emptyText="No one on the follow-up list yet. New converts from “How can I be saved?” appear here."
      csv={{
        filename: "follow-up",
        columns: [
          createdCsv(),
          { label: "Name", value: (r) => r.name },
          { label: "Phone", value: (r) => r.phone },
          { label: "Email", value: (r) => r.email },
          { label: "Address", value: (r) => r.address },
          ...statusCsv(),
        ],
      }}
    />
  );
}

/* ───────────── workers ───────────── */

// Records created before approval existed have no status: they count as approved.
const statusOf = (w: Worker) => (w.status === "pending" || w.status === "inactive" ? w.status : "approved");

const workerColumns: Cols<Worker> = [
  {
    id: "status",
    header: "Status",
    accessorFn: (w) => statusOf(w),
    cell: ({ row }) => <WorkerStatusCell id={row.original.id} status={statusOf(row.original)} approvedBy={row.original.approvedBy} />,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <PersonCell name={row.original.name || row.original.username || "-"} email={row.original.email} />
        {row.original.area && <p className="mt-0.5 text-xs text-stone">Lives in {row.original.area}</p>}
      </div>
    ),
  },
  {
    id: "dept",
    accessorFn: (w) => canonicalDept(w.dept),
    header: "Department",
    cell: ({ row }) => (
      <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold whitespace-nowrap text-ink">
        {canonicalDept(row.original.dept)}
      </span>
    ),
  },
  { accessorKey: "phone", header: "Phone", enableSorting: false, cell: ({ row }) => <PhoneCell phone={row.original.phone} /> },
  { ...createdAtColumn<Worker>(), header: "Joined" },
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint="/api/workers"
        label={`worker ${row.original.name || row.original.email}`}
        phone={row.original.phone}
        email={row.original.email}
      />
    ),
  },
];

export function WorkersTable({ data }: { data: Worker[] }) {
  return (
    <DataTable
      columns={workerColumns}
      data={data}
      searchPlaceholder="Search by name, email or department"
      emptyText="No workers registered yet. Workers register themselves on the Workers' portal."
      views={[
        { key: "all", label: "All" },
        { key: "pending", label: "Pending", filter: (w) => statusOf(w) === "pending", emptyText: "No registrations waiting for approval." },
        { key: "approved", label: "Approved", filter: (w) => statusOf(w) === "approved" },
        { key: "inactive", label: "Inactive", filter: (w) => statusOf(w) === "inactive" },
      ]}
      csv={{
        filename: "workers",
        columns: [
          { label: "Name", value: (r) => r.name },
          { label: "Email", value: (r) => r.email },
          { label: "Phone", value: (r) => r.phone },
          { label: "Department", value: (r) => canonicalDept(r.dept) },
          { label: "Status", value: (r) => statusOf(r) },
          { label: "Gender", value: (r) => r.gender },
          { label: "Birthday (MM-DD)", value: (r) => r.birthday },
          { label: "Area", value: (r) => r.area },
          { label: "Serving since", value: (r) => r.servingSince },
          { label: "Joined", value: (r) => formatDateTime(r.createdAt) },
        ],
      }}
    />
  );
}

/* ───────────── house fellowships ───────────── */

const hfcColumns: Cols<HouseFellowship> = [
  {
    accessorKey: "center",
    header: "Center",
    cell: ({ row }) => (
      <div className="min-w-[10rem]">
        <p className="font-semibold text-ink">{row.original.center}</p>
        <p className="text-xs text-stone">{row.original.address}</p>
      </div>
    ),
  },
  { accessorKey: "zone", header: "Zone" },
  {
    accessorKey: "host",
    header: "Host",
    cell: ({ row }) => (
      <div>
        <p className="text-ink">{row.original.host}</p>
        <PhoneCell phone={row.original.host_phone} />
      </div>
    ),
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
    cell: ({ row }) => (
      <div>
        <p className="text-ink">{row.original.teacher}</p>
        <PhoneCell phone={row.original.teacher_phone} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint="/api/houseFellowshipCenters"
        label={`${row.original.center} Center`}
        phone={row.original.host_phone}
      />
    ),
  },
];

export function HouseFellowshipTable({ data, toolbar }: { data: HouseFellowship[]; toolbar?: React.ReactNode }) {
  return (
    <DataTable
      columns={hfcColumns}
      data={data}
      toolbar={toolbar}
      searchPlaceholder="Search centers, zones, hosts…"
      emptyText="No house fellowship centers yet. Add the first one."
      csv={{
        filename: "house-fellowships",
        columns: [
          { label: "Center", value: (r) => r.center },
          { label: "Address", value: (r) => r.address },
          { label: "Zone", value: (r) => r.zone },
          { label: "Host", value: (r) => r.host },
          { label: "Host phone", value: (r) => r.host_phone },
          { label: "Teacher", value: (r) => r.teacher },
          { label: "Teacher phone", value: (r) => r.teacher_phone },
        ],
      }}
    />
  );
}

/* ───────────── group & ministry registrations ───────────── */

type Member = Elder | Men | Women | Youth | Teen;

const memberColumns = (endpoint: string, withGender: boolean): Cols<Member> => [
  createdAtColumn(),
  {
    accessorKey: "fullname",
    header: "Name",
    cell: ({ row }) => <PersonCell name={row.original.fullname} email={row.original.email} />,
  },
  { accessorKey: "phone", header: "Phone", enableSorting: false, cell: ({ row }) => <PhoneCell phone={row.original.phone} /> },
  ...(withGender
    ? [
        {
          id: "gender",
          accessorFn: (r: Member) => ("gender" in r ? r.gender : ""),
          header: "Gender",
          cell: ({ getValue }) => <span className="capitalize">{String(getValue() ?? "")}</span>,
        } satisfies ColumnDef<Member, unknown>,
      ]
    : []),
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint={endpoint}
        label={`${row.original.fullname}'s registration`}
        phone={row.original.phone}
        email={row.original.email}
      />
    ),
  },
];

export function MembersTable({
  data,
  endpoint,
  withGender,
  filename,
}: {
  data: Member[];
  endpoint: string;
  withGender: boolean;
  filename: string;
}) {
  return (
    <DataTable
      columns={memberColumns(endpoint, withGender)}
      data={data}
      searchPlaceholder="Search registrations"
      emptyText="No registrations yet."
      csv={{
        filename,
        columns: [
          createdCsv(),
          { label: "Name", value: (r) => r.fullname },
          { label: "Phone", value: (r) => r.phone },
          { label: "Email", value: (r) => r.email },
          ...(withGender ? [{ label: "Gender", value: (r: Member) => ("gender" in r ? r.gender : "") }] : []),
        ],
      }}
    />
  );
}

const ageFrom = (dob: string) => {
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) age--;
  return age;
};

const childColumns: Cols<Child> = [
  createdAtColumn(),
  {
    accessorKey: "fullname",
    header: "Child",
    cell: ({ row }) => {
      const age = ageFrom(row.original.dob);
      return (
        <div className="min-w-[9rem]">
          <p className="font-semibold text-ink">{row.original.fullname}</p>
          <p className="text-xs text-stone">
            <span className="capitalize">{row.original.gender}</span>
            {age != null && ` · ${age} ${age === 1 ? "year" : "years"}`}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "guardian_fullname",
    header: "Parent / guardian",
    cell: ({ row }) => <PersonCell name={row.original.guardian_fullname} email={row.original.guardian_email} />,
  },
  {
    accessorKey: "guardian_phone",
    header: "Phone",
    enableSorting: false,
    cell: ({ row }) => <PhoneCell phone={row.original.guardian_phone} />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        id={row.original.id}
        endpoint="/api/ministries/children"
        label={`${row.original.fullname}'s registration`}
        phone={row.original.guardian_phone}
        email={row.original.guardian_email}
      />
    ),
  },
];

export function ChildrenTable({ data }: { data: Child[] }) {
  return (
    <DataTable
      columns={childColumns}
      data={data}
      searchPlaceholder="Search children or guardians"
      emptyText="No children registered yet."
      csv={{
        filename: "children-ministry",
        columns: [
          createdCsv(),
          { label: "Child", value: (r) => r.fullname },
          { label: "Gender", value: (r) => r.gender },
          { label: "Date of birth", value: (r) => r.dob },
          { label: "Guardian", value: (r) => r.guardian_fullname },
          { label: "Guardian gender", value: (r) => r.guardian_gender },
          { label: "Guardian phone", value: (r) => r.guardian_phone },
          { label: "Guardian email", value: (r) => r.guardian_email },
        ],
      }}
    />
  );
}

/* ───────────── workers' attendance ───────────── */


const timeOnly = new Intl.DateTimeFormat("en-NG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });

const attendanceColumns: Cols<AttendanceRow> = [
  {
    id: "present",
    header: "Status",
    accessorFn: (r) => (r.present ? "present" : "absent"),
    cell: ({ row }) =>
      row.original.present ? (
        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">Present</span>
      ) : (
        <span className="inline-flex rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-stone">No check-in</span>
      ),
  },
  { accessorKey: "name", header: "Worker", cell: ({ row }) => <PersonCell name={row.original.name} email={row.original.email} /> },
  {
    accessorKey: "dept",
    header: "Department",
    cell: ({ row }) => (
      <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold whitespace-nowrap text-ink">{row.original.dept}</span>
    ),
  },
  {
    id: "markedAt",
    header: "Checked in",
    accessorFn: (r) => r.markedAt?.getTime() ?? 0,
    cell: ({ row }) =>
      row.original.markedAt ? (
        <span className="whitespace-nowrap text-ink tabular-nums">
          {timeOnly.format(row.original.markedAt)}
          <span className="ml-2 text-xs text-stone">{row.original.distanceM} m away</span>
        </span>
      ) : (
        <span className="text-stone/60">-</span>
      ),
  },
  { accessorKey: "phone", header: "Phone", enableSorting: false, cell: ({ row }) => <PhoneCell phone={row.original.phone} /> },
];

export function AttendanceTable({ data, date }: { data: AttendanceRow[]; date: string }) {
  return (
    <DataTable
      columns={attendanceColumns}
      data={data}
      searchPlaceholder="Search workers or departments"
      emptyText="No approved workers yet."
      views={[
        { key: "present", label: "Present", filter: (r) => r.present, emptyText: "Nobody checked in on this Sunday." },
        { key: "absent", label: "No check-in", filter: (r) => !r.present, emptyText: "Everyone checked in!" },
        { key: "all", label: "All" },
      ]}
      csv={{
        filename: `attendance-${date}`,
        columns: [
          { label: "Date", value: () => date },
          { label: "Worker", value: (r) => r.name },
          { label: "Department", value: (r) => r.dept },
          { label: "Status", value: (r) => (r.present ? "Present" : "No check-in") },
          { label: "Checked in", value: (r) => (r.markedAt ? timeOnly.format(r.markedAt) : "") },
          { label: "Distance from church (m)", value: (r) => r.distanceM },
          { label: "Phone", value: (r) => r.phone },
          { label: "Email", value: (r) => r.email },
        ],
      }}
    />
  );
}
