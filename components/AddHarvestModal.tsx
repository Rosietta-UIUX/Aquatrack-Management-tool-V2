"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useCreateHarvestMutation } from "@/redux/services/harvestApiSlice";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { Modal } from "./Modal";
import SubscriptionModal from "./SubscriptionModal";
import useCheckSubscriptionStatus from "@/hooks/useSubscriptionStatus";

const AddHarvestModal = ({ open, setOpen, farmId }: any) => {
  const [openSub, setOpenSub] = useState(false);
  const { active_subscription } = useCheckSubscriptionStatus();
  const [createHarvest] = useCreateHarvestMutation();
  const [loading, setLoading] = useState(false);
  const [batchID, setBatchID] = useState<String>("");
  const [formData, setFormData] = useState<any>({
    name: "",
    consultant: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    consultant: "",
  });
  const { data } = useGetAllBatchsDataQuery({ farmId });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      consultant: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.consultant) {
      newErrors.consultant = "Consultant is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      consultant: formData?.consultant,
      batch_id: batchID,
    };

    // if (!active_subscription) {
    //   setOpenSub(true);
    //   setOpen(false);
    // } else {
    //   if (Object.values(newErrors).every((error) => !error)) {
    //     setLoading(true);
    //     try {
    //       await createHarvest({ formdata, farmId }).unwrap();
    //       toast.success("Created harvest ✔️");
    //       setOpen(false);
    //       setFormData("");
    //       setLoading(false);
    //     } catch (error) {
    //       toast.error(
    //         "Something went wrong please try again or check your network connection"
    //       );
    //     }
    //   }
    // }

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createHarvest({ formdata, farmId }).unwrap();
        toast.success("Created harvest ✔️");
        setOpen(false);
        setFormData("");
        setLoading(false);
      } catch (error) {
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  return (
    <>
      <SubscriptionModal open={openSub} setOpen={setOpenSub} />
      <Modal open={open} setOpen={setOpen} className="lg:w-[450px]">
        <div className="bg-white lg:py-10 lg:px-14 py-10 px-6">
          <div className="text-center">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0">
              <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
                Create New Harvest
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Harvest Name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Harvest Name"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Batch
              </Label>
              <Select
                name="batch_id"
                onValueChange={(value) => setBatchID(value)}>
                <SelectTrigger className="w-full h-12 border-gray-400">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {data?.data.length === 0
                        ? "Create Batch before creating harvest"
                        : "Batch"}
                    </SelectLabel>
                    {data?.data?.map((task: any) => (
                      <SelectItem value={task?.id} key={task?.id}>
                        {task?.attributes?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Consultant
              </Label>
              <Input
                type="text"
                name="consultant"
                value={formData?.consultant}
                onChange={handleInputChange}
                placeholder="Consultant"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
            <div className="flex items-center justify-between space-x-6">
              <Button
                disabled={loading}
                className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                {loading ? "Creating harvest..." : "Create Harvest"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddHarvestModal;
