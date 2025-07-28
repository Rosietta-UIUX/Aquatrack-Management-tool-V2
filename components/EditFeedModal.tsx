"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import toast from "react-hot-toast";
import { useEditFeedMutation } from "@/redux/services/feedRecordApiSlice";
import { Modal } from "./Modal";

const EditFeedModal = ({ editdata, open, setOpen, farmId }: any) => {
  const { data } = useGetAllBatchsDataQuery({ farmId });
  // const cancelButtonRef = useRef(null);
  const [editFeed] = useEditFeedMutation();
  const [loading, setLoading] = useState(false);
  const [batchID, setBatchID] = useState<string>(
    editdata?.relationships?.batch?.data?.id || ""
  );
  const [formData, setFormData] = useState<any>({
    name: editdata?.attributes?.name || "",
    quantity: editdata?.attributes?.quantity || "",
    price: editdata?.attributes?.price || "",
    amount: editdata?.attributes?.amount || "",
    vendor: editdata?.attributes?.vendor || "",
    size: editdata?.attributes?.size || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    price: "",
    amount: "",
    vendor: "",
    size: "",
  });

  useEffect(() => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      name: editdata?.attributes?.name,
      quantity: editdata?.attributes?.quantity,
      price: editdata?.attributes?.price,
      amount: editdata?.attributes?.amount,
      vendor: editdata?.attributes?.vendor,
      size: editdata?.attributes?.size,
    }));
  }, [editdata?.attributes, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let parsedValue = value;

    // Check if the input is numeric for unit_purchase and price_per_unit fields
    if (["quantity", "price", "amount", "size"].includes(name)) {
      parsedValue = /^\d*\.?\d*$/.test(value) ? value : formData[name];
    }

    let newFormData = { ...formData, [name]: parsedValue };

    if (["quantity", "price"].includes(name)) {
      const quantity = parseFloat(newFormData.quantity);
      const pricePerBag = parseFloat(newFormData.price);

      if (!isNaN(quantity) && !isNaN(pricePerBag)) {
        // Calculate the amount spent and update the formData
        newFormData = {
          ...newFormData,
          amount: (quantity * pricePerBag)
            .toFixed()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
      }
    }

    setFormData(newFormData);
    setErrors({ ...errors, [name]: "" });
  };


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      quantity: "",
      price: "",
      amount: "",
      vendor: "",
      size: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    // Convert unit_purchase, price_per_unit, and amount_spent to numbers
    const quantity =
      typeof formData.quantity === "string"
        ? parseInt(formData.quantity.replace(/[^0-9.]/g, "")) || 0
        : 0;
    const price =
      typeof formData.price === "string"
        ? parseInt(formData.price.replace(/[^0-9.]/g, "")) || 0
        : 0;
    const amount =
      typeof formData.amount === "string"
        ? parseInt(formData.amount.replace(/[^0-9.]/g, "")) || 0
        : 0;
    const size =
      typeof formData?.size === "string"
        ? parseInt(formData.size.replace(/[^0-9.]/g, "")) || 0
        : 0;

    const formdata = {
      name: formData?.name,
      quantity: quantity,
      price: price,
      amount: amount,
      size: size,
      vendor: formData?.vendor,
      batch_id: editdata?.relationships?.batch?.data?.id || batchID,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await editFeed({ formdata, farmId, feedId: editdata?.id }).unwrap();
        toast.success("Purchase created ✔️");
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
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white lg:py-10 lg:px-14 py-6 px-6">
        <div className="text-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
              Edit Feeds
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className=" space-y-3 lg:mt-8">
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Brand name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Aler Aqua"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Quantity
              </Label>
              <Input
                type="text"
                name="quantity"
                value={formData?.quantity}
                onChange={handleInputChange}
                placeholder="20 bags"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Price per bag
              </Label>
              <Input
                type="text"
                name="price"
                value={formData?.price}
                onChange={handleInputChange}
                placeholder="500"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Amount spent
              </Label>
              <Input
                type="text"
                name="amount"
                value={formData?.amount}
                onChange={handleInputChange}
                placeholder="300"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Size
              </Label>
              <Input
                type="text"
                name="size"
                value={formData?.size}
                onChange={handleInputChange}
                placeholder="9mm"
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
                  <SelectValue
                    placeholder={
                      editdata?.relationships?.batch?.data?.attributes?.name ||
                      "Batch"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="font-bold text-gray-800">
                      {editdata?.relationships?.batch?.data?.attributes?.name ||
                        "Batch"}
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
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Vendor
              </Label>
              <Input
                type="text"
                name="vendor"
                value={formData?.vendor}
                onChange={handleInputChange}
                placeholder="FishFeeds.inc"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-6 mt-10">
            <Button className="outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
              {loading ? "Loading..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditFeedModal;
