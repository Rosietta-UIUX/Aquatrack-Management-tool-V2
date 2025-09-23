"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditPondModal from "./EditPondModal";
import DeletePondModal from "./DeletePondModal";
import LogHistory from "./LogHistory";
import AddMortalityLogModal from "./AddMortalityLogModal";
import AddFeedLogModal from "./AddFeedLogModal";

const PondDetails = ({ pond, farmId }: any) => {
  const [openDel, setOpenDel] = useState(false);
  const [openEd, setOpenEd] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [openAddLog, setOpenAddLog] = useState(false);
  const [openAddFeedLog, setOpenAddFeedLog] = useState(false);

  return (
    <div className="card bg-white rounded-xl p-6">
      <DeletePondModal
        farmId={farmId}
        openDelID={pond?.id}
        open={openDel}
        setOpen={setOpenDel}
      />
      {openEd && (
        <EditPondModal
          farmId={farmId}
          pondData={pond}
          open={openEd}
          setOpen={setOpenEd}
        />
      )}
      <AddMortalityLogModal
        farmId={farmId}
        pondId={pond?.id}
        open={openAddLog}
        setOpen={setOpenAddLog}
      />
      <AddFeedLogModal
        farmId={farmId}
        pondId={pond?.id}
        open={openAddFeedLog}
        setOpen={setOpenAddFeedLog}
      />
      <div className="head flex items-center justify-between mb-2">
        <h2 className="font-bold text-[--primary] text-base ">
          {pond?.attributes?.name}
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              className="text-xs text-[--secondary] font-normal"
            >
              view details
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setOpenEd(true)}
              className="space-x-4 text-blue-600 font-bold"
            >
              <MdEdit className="text-blue-600 text-xl" /> <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setOpenDel(true)}
              className="space-x-4 text-red-600 font-bold"
            >
              <MdDelete className="text-red-600 text-xl" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2">
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className="text-sm">
            Units: <span>{pond?.attributes?.unit} units</span>
          </p>
          <div className="w-full">
            <Progress
              value={pond?.percentage?.unit}
              className="bg-[--primary] "
            />
          </div>
        </div>
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className=" text-sm">
            <span className="font-semibold text-gray-500">Feed:</span>{" "}
            <span>{pond?.attributes?.feed_size} mm</span>
          </p>
          <div className="w-full">
            <Progress
              value={pond?.percentage?.feed_size}
              className="bg-gray-600 "
            />
          </div>
        </div>
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className="text-sm">
            <span className="font-semibold text-gray-500">Size:</span>{" "}
            <span>
              {pond?.attributes?.size} {pond?.attributes?.unit_size}
            </span>
          </p>
          <div className="w-full">
            <Progress
              value={pond?.percentage?.size}
              className="bg-[#7473BA] "
            />
          </div>
        </div>
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className=" text-sm">
            <span className="font-semibold text-gray-500">Mortality Rate:</span>{" "}
            <span>{pond?.attributes?.mortality_rate} units</span>
          </p>
          <div className="w-full">
            <Progress
              value={pond?.percentage?.mortality_rate}
              className="bg-red-400 "
            />
          </div>
        </div>
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className=" text-sm">
            <span className="font-semibold text-[--primary] ">
              {pond?.relationships?.batch?.data?.name}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => setShowLog(!showLog)} size="sm" variant="outline">
          {showLog ? "Hide Log" : "View Log"}
        </Button>
        <Button
          onClick={() => setOpenAddLog(true)}
          size="sm"
          className="btn-primary"
        >
          Add Mortality Log
        </Button>
        <Button
          onClick={() => setOpenAddFeedLog(true)}
          size="sm"
          className="btn-primary"
        >
          Add Feed Log
        </Button>
      </div>
      {showLog && <LogHistory farmId={farmId} pondId={pond?.id} />}
    </div>
  );
};

export default PondDetails;
