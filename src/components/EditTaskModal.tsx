"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "@/components/ui/switch";
import { MdAccessTime } from "react-icons/md";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { taskDate } from "@/utils";
import toast from "react-hot-toast";
import {
  useEditTaskMutation,
  useDeleteTaskMutation,
} from "@/redux/services/taskApiSlice";
import { MdDelete } from "react-icons/md";
import { Modal } from "./Modal";

const EditTaskModal = ({ open, setOpen, editdata, farmId }: any) => {
  const cancelButtonRef = useRef(null);
  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [loading, setLoading] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [startDate, setStartDate] = useState<any>(
    editdata?.attributes?.start_date || ""
  );
  const [endDate, setEndDate] = useState<any>(
    editdata?.attributes?.end_date || ""
  );
  const [des, setDes] = useState(editdata?.attributes?.description || "");
  const [title, setTitle] = useState(editdata?.attributes?.title || "");
  const [repeat, setRepeat] = useState(editdata?.attributes?.repeat || "");
  const [errors, setErrors] = useState({
    title: "",
  });

  // Save edit task
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const strDate = taskDate(startDate);
    const edDate = taskDate(endDate);
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      title: "",
      startDate: "",
      endDate: "",
    };

    if (!title) {
      newErrors.title = "Title is required";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }

    setErrors(newErrors);

    const formdata = {
      title: title,
      description: des,
      start_date: strDate,
      due_date: edDate,
      repeat: repeat,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await editTask({ formdata, farmId, taskId: editdata?.id }).unwrap();
        toast.success("Task Edited ✔️");
        setOpen(false);
        setLoading(false);
      } catch (error) {
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
        setLoading(false);
      }
    }
  };

  // Delete task
  const handleDelete = async () => {
    setIsDel(true);
    try {
      await deleteTask({ farmId, taskId: editdata?.id }).unwrap();
      toast.success("Task Deleted ✔️");
      setOpen(false);
      setOpenDel(false);
      setIsDel(false);
    } catch (error) {
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
      setIsDel(false);
    }
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <MdDelete
          onClick={() => setOpenDel(true)}
          className="absolute top-6 left-6 h-6 w-6 text-red-500 cursor-pointer "
        />
        {openDel && (
          <div className="bg-gray-100 w-full absolute bottom-0 left-0 right-0 shadow-lg p-8 rounded-t-4xl z-10 h-[40vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-semibold text-black-600 text-base">
                Are you sure you want to delete this task?
              </h1>
              <div className="flex items-center justify-between mt-20">
                <button
                  onClick={() => setOpenDel(false)}
                  className="bg-gray-100 px-4 py-2 rounded-full">
                  Continue
                </button>
                <button
                  onClick={handleDelete}
                  className="font-semibold text-sm text-red-600 bg-red-200 px-6 py-3 rounded-full">
                  {isDel ? "Deleting..." : "Yes delete"}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white lg:py-10 lg:px-14 p-10">
          <div className="text-center">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0">
              <h3 className="text-2xl font-semibold leading-6 text-[--primary] ">
                Edit Task
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-[--primary] font-normal mb-2">
                Title
              </Label>
              <Input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className=" focus-visible:outline-none py-6 "
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className="text-[--primary] font-normal mb-2">
                  Start date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full py-6 justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className="text-[--primary] font-normal mb-2">
                  End date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full py-6 justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-[--primary] font-normal mb-2">
                Describe
              </Label>
              <Textarea
                placeholder="Type your task Description here."
                rows={4}
                name="description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
                className="resize-none"
                id="message-2"
              />
            </div>
            <div className="form-control">
              <p className="text-[--primary] mb-2">Repeat</p>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex space-x-2">
                  <MdAccessTime className="text-[--primary]" />
                  <Label
                    htmlFor="airplane-mode"
                    className="text-[--primary] font-normal">
                    Everyday
                  </Label>
                </div>
                <Switch
                  id="airplane-mode"
                  checked={repeat}
                  onCheckedChange={(value) => setRepeat(value)}
                  className="text-[--primary]"
                />
              </div>
            </div>
            <Button className=" mt-10 outline-none border-none font-semibold bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditTaskModal;
