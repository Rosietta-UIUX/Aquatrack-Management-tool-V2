"use client";
import { useGetMortalityLogsQuery } from "@/redux/services/pondsApiSlice";
import { DataTable } from "@/components/ui/data-table";

const MortalityLog = ({ farmId, pondId }: { farmId: string; pondId: string }) => {
  const { data, isLoading } = useGetMortalityLogsQuery({ farmId, pondId });

  const columns = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "log",
      header: "Log",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const log = row.original;
        return (
          <div className="flex space-x-2">
            <button className="text-blue-500">Edit</button>
            <button className="text-red-500">Delete</button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mortality Log</h2>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};

export default MortalityLog;
