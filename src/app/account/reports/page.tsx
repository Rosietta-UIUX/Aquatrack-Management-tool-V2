"use client";
import { useState } from "react";
import NavHeader from "@/components/NavHeader";
import { Button } from "@/components/ui/button";
import {
  useGetAllMortalityLogsQuery,
  useDeleteMortalityLogMutation,
  useGetDailyReportQuery,
} from "@/redux/services/pondsApiSlice";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import AddMortalityLogModal from "@/components/AddMortalityLogModal";
import Papa from "papaparse";

interface LogData {
  id: string;
  pond_id: string;
  log: string;
}

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("history");
  const { defaultFarmId } = useDefaultFarmId();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { data: historyData, isLoading: historyLoading } =
    useGetAllMortalityLogsQuery({
      farmId: defaultFarmId,
      startDate,
      endDate,
    });
  const { data: reportData, isLoading: reportLoading } = useGetDailyReportQuery(
    {
      farmId: defaultFarmId,
      date: reportDate,
    }
  );

  const [deleteMortalityLog] = useDeleteMortalityLogMutation();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editLogData, setEditLogData] = useState<LogData | null>(null);

  const handleDelete = async (log: any) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      await deleteMortalityLog({
        farmId: defaultFarmId,
        pondId: log.pond_id,
        logId: log.id,
      });
    }
  };

  const handleEdit = (log: any) => {
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
            <button onClick={() => handleEdit(log)} className="text-blue-500">
              Edit
            </button>
            <button
              onClick={() => handleDelete(log)}
              className="text-red-500">
              Delete
            </button>
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
  ];

  return (
    <>
      <NavHeader />
      {editLogData && (
        <AddMortalityLogModal
          farmId={defaultFarmId}
          pondId={editLogData.pond_id}
          open={openEditModal}
          setOpen={setOpenEditModal}
          logData={editLogData}
        />
      )}
      <main className="w-full mt-10">
        <div className="lg:w-11/12 w-11/12 mx-auto">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="mt-4">
            <div className="flex space-x-4">
              <Button
                onClick={() => setActiveTab("history")}
                variant={activeTab === "history" ? "default" : "outline"}>
                History
              </Button>
              <Button
                onClick={() => setActiveTab("report")}
                variant={activeTab === "report" ? "default" : "outline"}>
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
                    <Input
                      type="date"
                      value={reportDate}
                      onChange={(e) => setReportDate(e.target.value)}
                      className="w-1/4"
                    />
                    <Button onClick={handleExport}>Export to CSV</Button>
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
