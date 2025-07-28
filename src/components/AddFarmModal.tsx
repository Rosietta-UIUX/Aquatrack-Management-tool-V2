"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { CiCircleAlert } from "react-icons/ci";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils";
import { useCreateFarmMutation } from "@/redux/services/farmApiSlice";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { Modal } from "./Modal";
import SubscriptionModal from "./SubscriptionModal";
import useCheckSubscriptionStatus from "@/hooks/useSubscriptionStatus";

const AddFarmModal = ({ open, setOpen }: any) => {
  const [openSub, setOpenSub] = useState(false);
  const { active_subscription } = useCheckSubscriptionStatus();
  const { refetch } = useGetCurrentUserQuery(null);
  const [createFarm] = useCreateFarmMutation();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    no_of_ponds: "",
    date_established: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    location: "",
    no_of_ponds: "",
    date_established: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // const parsedValue = name === "no_of_ponds" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const newDate = formatDate(date);
    e.preventDefault();
    let newErrors = {
      name: "",
      location: "",
      no_of_ponds: "",
      date_established: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.no_of_ponds) {
      newErrors.no_of_ponds = "Number of ponds is required";
    }
    if (!date) {
      newErrors.date_established = "Date established is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      location: formData?.location,
      no_of_ponds: formData?.no_of_ponds,
      date_established: newDate,
    };

    // if (!active_subscription) {
    //   setOpenSub(true);
    //   setOpen(false);
    // } else {
    //   if (Object.values(newErrors).every((error) => !error)) {
    //     setLoading(true);
    //     try {
    //       await createFarm({ formdata }).unwrap();
    //       toast.success("Farm created ✔️");
    //       setOpen(false);
    //       setLoading(false);
    //       refetch();
    //     } catch (error) {
    //       setLoading(false);
    //       toast.error("Something went wrong ");
    //     }
    //   }
    // }

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createFarm({ formdata }).unwrap();
        toast.success("Farm created ✔️");
        setOpen(false);
        setLoading(false);
        refetch();
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong ");
      }
    }
  };

  return (
    <>
      <SubscriptionModal open={openSub} setOpen={setOpenSub} />
      <Modal open={open} setOpen={setOpen} className="lg:w-[500px] rounded-xl">
        <div className="bg-white lg:py-10 lg:px-14 p-10">
          <div className="text-center">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0">
              <h3 className="text-xl font-semibold text-[--primary] ">
                Create New Farm
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <div className="form-control mt-8">
              <Label htmlFor="name" className=" text-gray-500 font-normal mb-3">
                Farm name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Enter your farm name"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div className="form-control mt-4">
              <div className="flex justify-between items-center mb-2">
                <Label
                  htmlFor="location"
                  className=" text-gray-500 font-normal">
                  Farm location
                </Label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-xs font-normal">
                    Optional
                  </span>{" "}
                  <CiCircleAlert className="text-gray-400" />
                </div>
              </div>
              <Input
                type="text"
                name="location"
                value={formData?.location}
                onChange={handleInputChange}
                placeholder="Enter your farm location"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
              {errors.location && (
                <p className="text-red-500 text-xs">{errors.location}</p>
              )}
            </div>
            <div className="form-control mt-4">
              <Label
                htmlFor="no_of_ponds"
                className=" text-gray-500 font-normal mb-3">
                Number of ponds
              </Label>
              <Input
                type="text"
                name="no_of_ponds"
                value={formData?.no_of_ponds}
                onChange={handleInputChange}
                placeholder="Enter number of farm"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
              {errors.no_of_ponds && (
                <p className="text-red-500 text-xs">{errors.no_of_ponds}</p>
              )}
            </div>
            <div className="form-control flex flex-col mt-4">
              <div className="flex justify-between items-center mb-2">
                <Label
                  htmlFor="date_established"
                  className=" text-gray-500 font-normal ">
                  Date established
                </Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full py-6 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date_established && (
                <p className="text-red-500 text-xs">
                  {errors.date_established}
                </p>
              )}
            </div>
            <div className="pt-2">
              <Button className="  outline-none border-none text-base font-semibold bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                {loading ? "Creating farm..." : "Create Farm"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddFarmModal;
