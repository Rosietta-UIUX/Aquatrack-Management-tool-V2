"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useEditCustomerMutation } from "@/redux/services/customerApiSlice";
import { Modal } from "./Modal";

const EditCustomerModal = ({
  open,
  setOpen,
  farmId,
  harvestId,
  editdata,
}: any) => {
  const [editCustomer] = useEditCustomerMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: editdata?.attributes?.name || "",
    phone: editdata?.attributes?.phone_number || "",
    email: editdata?.attributes?.email || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      name: "",
      phone: "",
    };

    if (!formData?.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      phone: formData?.phone,
      email: formData?.email,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await editCustomer({
          formdata,
          farmId,
          harvestId,
          customerId: editdata?.id,
        }).unwrap();
        toast.success("Customer added ✔️");
        setOpen(false);
        setFormData("");
        setLoading(false);
      } catch (error) {
        console.log(error);
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
              Edit customer
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Customer Name
            </Label>
            <Input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              placeholder="Customer Name"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Phone Number
            </Label>
            <Input
              type="text"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              placeholder="Customer phone number"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Email address
            </Label>
            <Input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="Customer email address"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>

          <div className="flex items-center justify-between space-x-6">
            {/* <Button
              disabled={loading}
              className=" mt-2 outline-none border border-red-600 font-normal text-base bg-white w-full h-[53px] text-red-600">
              {loading ? "Saving..." : "Delete"}
            </Button> */}
            <Button
              disabled={loading}
              className=" mt-2 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCustomerModal;
