"use client";
import { useState } from "react";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import { Button } from "@/components/ui/button";
import {
  useGetAllLogsQuery,
  useDeleteMortalityLogMutation,
  useDeleteFeedLogMutation,
  useGetDailyReportQuery,
} from "@/redux/services/pondsApiSlice";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import AddMortalityLogModal from "@/components/AddMortalityLogModal";
import AddFeedLogModal from "@/components/AddFeedLogModal";
import Papa from "papaparse";
import { ArrowLeft } from "lucide-react";
import { LogData } from "@/types";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("history");
  const { defaultFarmId } = useDefaultFarmId();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportStartDate, setReportStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reportEndDate, setReportEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { data: historyData, isLoading: historyLoading } = useGetAllLogsQuery({
    farmId: defaultFarmId,
    startDate,
    endDate,
  });
  const { data: reportData, isLoading: reportLoading } = useGetDailyReportQuery(
    {
      farmId: defaultFarmId,
      startDate: reportStartDate,
      endDate: reportEndDate,
    }
  );

  const [deleteMortalityLog] = useDeleteMortalityLogMutation();
  const [deleteFeedLog] = useDeleteFeedLogMutation();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editLogData, setEditLogData] = useState<LogData | null>(null);

  const handleDelete = async (log: LogData) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      if (log.type === "mortality") {
        await deleteMortalityLog({
          farmId: defaultFarmId,
          pondId: log.pond_id,
          logId: log.id,
        });
      } else {
        await deleteFeedLog({
          farmId: defaultFarmId,
          pondId: log.pond_id,
          logId: log.id,
        });
      }
    }
  };

  const handleEdit = (log: LogData) => {
    setEditLogData(log);
    setOpenEditModal(true);
  };

  const handleExport = () => {
    const csv = Papa.unparse(reportData?.data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "daily_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const historyColumns = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "pond_name",
      header: "Pond",
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

  const reportColumns = [
    {
      accessorKey: "pond_name",
      header: "Pond",
    },
    {
      accessorKey: "mortality",
      header: "Mortality",
    },
    {
      accessorKey: "feed_bags",
      header: "Feed Bags",
    },
    {
      accessorKey: "feed_size",
      header: "Feed Size (mm)",
    },
  ];

  return (
    <>
      <NavHeader />
      {editLogData && editLogData.type === "mortality" && (
        <AddMortalityLogModal
          farmId={defaultFarmId}
          pondId={editLogData.pond_id}
          open={openEditModal}
          setOpen={setOpenEditModal}
          logData={editLogData}
        />
      )}
      {editLogData && editLogData.type === "feed" && (
        <AddFeedLogModal
          farmId={defaultFarmId}
          pondId={editLogData.pond_id}
          open={openEditModal}
          setOpen={setOpenEditModal}
          logData={editLogData}
        />
      )}
      <main className="w-full mt-10">
        <div className="lg:w-11/12 w-11/12 mx-auto">
            <div className="flex items-center space-x-4 mb-4">
                <Link href="/account/ponds">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">Reports</h1>
            </div>
          <div className="mt-4">
            <div className="flex space-x-4">
              <Button
                onClick={() => setActiveTab("history")}
                className={activeTab === "history" ? "btn-primary" : ""}
                variant={activeTab === "history" ? "default" : "outline"}
              >
                History
              </Button>
              <Button
                onClick={() => setActiveTab("report")}
                className={activeTab === "report" ? "btn-primary" : ""}
                variant={activeTab === "report" ? "default" : "outline"}
              >
                Report
              </Button>
            </div>
            <div className="mt-4">
              {activeTab === "history" && (
                <div>
                  <div className="flex space-x-4 mb-4">
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <DataTable
                    columns={historyColumns}
                    data={historyData?.data || []}
                  />
                </div>
              )}
              {activeTab === "report" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                        <Input
                        type="date"
                        value={reportStartDate}
                        onChange={(e) => setReportStartDate(e.target.value)}
                        />
                        <Input
                        type="date"
                        value={reportEndDate}
                        onChange={(e) => setReportEndDate(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleExport} className="btn-primary">Export to CSV</Button>
                  </div>
                  <DataTable
                    columns={reportColumns}
                    data={reportData?.data || []}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReportsPage;
