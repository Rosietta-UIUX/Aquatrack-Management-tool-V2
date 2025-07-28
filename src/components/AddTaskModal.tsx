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
import { useCreateTaskMutation } from "@/redux/services/taskApiSlice";
import { Modal } from "./Modal";
import { useGetNotificationsQuery } from "@/redux/services/notificationApiSlice";

const AddTaskModal = ({ open, setOpen, farmId }: any) => {
  const { refetch } = useGetNotificationsQuery(null);
  // const cancelButtonRef = useRef(null);
  const [createTask] = useCreateTaskMutation();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [des, setDes] = useState("");
  const [repeat, setRepeat] = useState(false);
  const [title, setTitle] = useState("");
  const [resError, setResError] = useState("");
  const [errors, setErrors] = useState({
    title: "",
  });

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
      newErrors.title = "Name is required";
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
        await createTask({ formdata, farmId }).unwrap();
        toast.success("Task created ✔️");
        setOpen(false);
        setLoading(false);
        refetch();
      } catch (error: any) {
        setResError(error?.data?.message);
        toast.error(
          error?.data?.message ||
            "Something went wrong please try again or check your network connection"
        );
        setLoading(false);
      }
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white lg:py-10 lg:px-14 p-10">
        <div className="text-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <h3
              className="text-2xl font-semibold leading-6 text-[--primary] ">
              Add Task
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
          <div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
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
            <span className="text-xs text-red-400">{resError}</span>
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
                onClick={() => setRepeat(!repeat)}
                className="text-[--primary]"
              />
            </div>
          </div>
          <Button
            disabled={loading}
            className=" mt-10 outline-none border-none font-semibold bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
            {loading ? "Creating..." : "Add Task"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
