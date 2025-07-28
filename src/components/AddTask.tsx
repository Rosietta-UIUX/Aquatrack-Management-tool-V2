"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import AddTaskModal from "./AddTaskModal";
import {
  useEditTaskMutation,
  useGetAllTaskDataQuery,
} from "@/redux/services/taskApiSlice";
import { FiEdit } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";
import toast from "react-hot-toast";
import { formatDate } from "@/utils";
import { DatabaseZapIcon } from "lucide-react";

const AddTask = ({ farmID }: any) => {
  const [editTask] = useEditTaskMutation();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [status, setStatus] = useState(true);
  const [editdata, setEditdata] = useState("");
  // const { defaultFarmId } = useDefaultFarmId(data?.data?.farms);
  const { data } = useGetAllTaskDataQuery({ farmId: farmID });

  const handleEditTask = (taskData: any) => {
    if (taskData) {
      setEditdata(taskData);
      setOpenEdit(true);
    } else {
      console.log("No task data available");
    }
  };

  const handleUpdateTaskStatus = async (taskData: any) => {
    setStatus(!status);

    if (status === true) {
      // console.log(status);
      const formdata = {
        status: "complete",
      };

      try {
        await editTask({
          formdata,
          farmId: farmID,
          taskId: taskData?.id,
        }).unwrap();
      } catch (error) {
        // console.log(error);
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }

    if (status === false) {
      // console.log(status);
      const formdata = {
        status: "incomplete",
      };

      try {
        await editTask({
          formdata,
          farmId: farmID,
          taskId: taskData?.id,
        }).unwrap();
      } catch (error) {
        // console.log(error);
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  return (
    <div className="lg:w-[40%] w-full">
      <AddTaskModal farmId={farmID} open={open} setOpen={setOpen} />
      {editdata && (
        <EditTaskModal
          farmId={farmID}
          editdata={editdata}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      )}
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg lg:mb-6 mb-4">
        Task
      </h2>
      <Button
        onClick={() => setOpen(true)}
        className="border-none outline-none text-lg font-semibold text-white bg-[--primary] hover:bg-blue-500 w-full lg:h-[60px] h-[50px] ">
        + Add new task
      </Button>
      <div className="current-task mt-6 bg-white rounded-xl p-6 flex items-center justify-center">
        {data?.data?.data?.length > 0 ? (
          <div className="w-full">
            <h2 className="text-[--primary] font-bold lg:text-xl text-lg mb-6">
              Current tasks
            </h2>
            <div className="space-y-8">
              {data?.data?.data?.map((task: any) => (
                <div
                  key={task?.id}
                  className="tasks-list flex items-center justify-between space-x-4 w-full">
                  <div className="flex items-center space-x-6">
                    {task?.attributes?.status?.toLowerCase() == "due" && (
                      <div className="due-date w-14 h-12 bg-blue-400 text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          <p className="text-xs">DUE</p>
                        </div>
                      </div>
                    )}

                    {task?.attributes?.status?.toLowerCase() ==
                      "incomplete" && (
                      <div className="due-date w-14 h-12 bg-red-300 text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          {task?.attributes?.status?.toLowerCase() ==
                            "incomplete" && <p className="text-xs">IN</p>}
                        </div>
                      </div>
                    )}

                    {task?.attributes?.status?.toLowerCase() == "active" && (
                      <div className="due-date w-14 h-12 bg-[#0180EA] text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          {task?.attributes?.status?.toLowerCase() ==
                            "active" && <p className="text-xs">ACT</p>}
                        </div>
                      </div>
                    )}

                    {task?.attributes?.status?.toLowerCase() == "pending" && (
                      <div className="due-date w-14 h-12 bg-[#0180EA] text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          <p className="text-sm font-bold uppercase">
                            {task?.attributes?.time_left.slice(0, 3)}
                          </p>
                          <p className="text-xs">PND</p>
                        </div>
                      </div>
                    )}

                    {task?.attributes?.status == "complete" && (
                      <div className="due-date w-14 h-12 bg-green-500 text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          {task?.attributes?.status == "complete" && (
                            <p className="text-xs font-bold">DONE</p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className=" space-y-2">
                      <p className="text-sm">{task?.attributes?.title}</p>

                      {task?.attributes?.status?.toLowerCase() == "active" && (
                        <div>
                          <p className="text-xs">This task is Active</p>
                          {/* <p className="text-xs">
                            You have{" "}
                            <span className="text-[--primary] ">
                              {task?.attributes?.time_left} left
                            </span>
                          </p> */}
                        </div>
                      )}

                      {task?.attributes?.status?.toLowerCase() == "due" && (
                        <div>
                          <p className="text-xs">This task is due</p>
                          <p className="text-xs">
                            You have{" "}
                            <span className="text-[--primary] ">
                              {task?.attributes?.time_left} left
                            </span>
                          </p>
                        </div>
                      )}

                      {task?.attributes?.status == "complete" && (
                        <p className="text-xs">
                          <span className="text-[--primary] ">
                            Task completed on the{" "}
                            {formatDate(task?.attributes?.end_date)}
                          </span>
                        </p>
                      )}

                      {task?.attributes?.status == "incomplete" && (
                        <p className="text-xs">
                          <span className="text-red-400 ">
                            Incomplete task{" "}
                            {/* {formatDate(task?.attributes?.end_date)} */}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FiEdit
                      onClick={() => handleEditTask(task)}
                      className="h-6 w-6 text-gray-400"
                    />
                    <Checkbox
                      id="terms2"
                      checked={
                        task?.attributes?.status == "complete" ? true : false
                      }
                      onClick={() => handleUpdateTaskStatus(task)}
                      className="h-6 w-6 data-[state=checked]:bg-[--primary]"
                    />
                  </div>
                </div>
              ))}
            </div>{" "}
          </div>
        ) : (
          <div className="flex items-center justify-center lg:h-[40vh] h-[20vh]">
            <p className="lg:text-xl text-base text-gray-400 text-center">
              No Current Tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTask;
