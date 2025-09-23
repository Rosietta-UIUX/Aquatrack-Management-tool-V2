"use client";
import { useState } from "react";
import {
  useGetAllLogsQuery,
  useDeleteMortalityLogMutation,
  useDeleteFeedLogMutation,
} from "@/redux/services/pondsApiSlice";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import AddMortalityLogModal from "./AddMortalityLogModal";
import AddFeedLogModal from "./AddFeedLogModal";
import { LogData } from "@/types";

const LogHistory = ({ farmId, pondId }: { farmId: string; pondId: string }) => {
  const { data, isLoading } = useGetAllLogsQuery({ farmId, pondId });
  const [deleteMortalityLog] = useDeleteMortalityLogMutation();
  const [deleteFeedLog] = useDeleteFeedLogMutation();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editLogData, setEditLogData] = useState<LogData | null>(null);

  const handleDelete = async (log: LogData) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      if (log.type === "mortality") {
        await deleteMortalityLog({
          farmId,
          pondId,
          logId: log.id,
        });
      } else {
        await deleteFeedLog({
          farmId,
          pondId,
          logId: log.id,
        });
      }
    }
  };

  const handleEdit = (log: LogData) => {
    setEditLogData(log);
    setOpenEditModal(true);
  };

  const columns = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
      accessorKey: "log",
      header: "Log",
    },
    {
        accessorKey: "feed_size",
        header: "Feed Size (mm)",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: LogData } }) => {
        const log = row.original;
        return (
          <div className="flex space-x-2">
            <Button onClick={() => handleEdit(log)} className="btn-primary">
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(log)}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Log History</h2>
        {editLogData && editLogData.type === "mortality" && (
            <AddMortalityLogModal
                farmId={farmId}
                pondId={pondId}
                open={openEditModal}
                setOpen={setOpenEditModal}
                logData={editLogData}
            />
        )}
        {editLogData && editLogData.type === "feed" && (
            <AddFeedLogModal
                farmId={farmId}
                pondId={pondId}
                open={openEditModal}
                setOpen={setOpenEditModal}
                logData={editLogData}
            />
        )}
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};

export default LogHistory;
