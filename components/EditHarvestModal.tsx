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
import { useEditHarvestCusMutation } from "@/redux/services/harvestApiSlice";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { Modal } from "./Modal";

const EditHarvestModal = ({ open, setOpen, farmId, editdata }: any) => {
  const [editHarvestCus] = useEditHarvestCusMutation();
  const [loading, setLoading] = useState(false);
  const [batchID, setBatchID] = useState<string>(editdata?.batch?.id || "");
  const [formData, setFormData] = useState<any>({
    name: editdata?.name || "",
    consultant: editdata?.consultant || "",
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

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await editHarvestCus({
          formdata,
          farmId,
          harvestId: editdata?.id,
        }).unwrap();
        toast.success("Created harvest ✔️");
        setOpen(false);
        setFormData("");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} className="lg:w-[450px]">
      <div className="bg-white lg:py-10 lg:px-14 py-10 px-6">
        <div className="text-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
              Edit Harvest
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
                <SelectValue placeholder={editdata?.batch?.name || "Batch"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {data?.data.length === 0 &&
                      "Create Batch before creating ponds"}
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
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditHarvestModal;
