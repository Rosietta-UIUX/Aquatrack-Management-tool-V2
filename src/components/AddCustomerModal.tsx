"use client";
import { Fragment, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useCreateCustomerMutation } from "@/redux/services/customerApiSlice";
import { Modal } from "./Modal";

const AddCustomerModal = ({ open, setOpen, farmId, harvestId }: any) => {
  const [createCustomer] = useCreateCustomerMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    email: "",
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
      phone_number: formData?.phone,
      email: formData?.email,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createCustomer({ formdata, farmId, harvestId }).unwrap();
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

  //  const { data } = useGetAllBatchsDataQuery({ farmId });

  return (
    <Modal open={open} setOpen={setOpen} className="lg:w-[450px]">
      <div className="bg-white lg:py-10 lg:px-14 py-10 px-6">
        <div className="text-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
              Create new customer
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
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
            <Button
              disabled={loading}
              className=" mt-2 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
              {loading ? "Adding..." : "Add customer"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
