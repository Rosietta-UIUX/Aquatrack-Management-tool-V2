"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useCreateBatchMutation } from "@/redux/services/batchApiSlice";
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
import { Modal } from "./Modal";
import useCheckSubscriptionStatus from "@/hooks/useSubscriptionStatus";
import SubscriptionModal from "./SubscriptionModal";

const AddBatchModal = ({ open, setOpen, farmId }: any) => {
  const [openSub, setOpenSub] = useState(false);
  const { active_subscription } = useCheckSubscriptionStatus();
  const [createBatch] = useCreateBatchMutation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState<String>("");
  const [date, setDate] = useState<Date>();
  const [specie, setSpecie] = useState<String>("");
  const [formData, setFormData] = useState<any>({
    name: "",
    unit_purchase: "",
    price_per_unit: "",
    amount_spent: "",
    vendor: "",
    status: "",
    date_purchased: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    unit_purchase: "",
    price_per_unit: "",
    amount_spent: "",
    fish_specie: "",
    fish_type: "",
    vendor: "",
    status: "",
    date_purchased: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let parsedValue = value;

    // Check if the input is numeric for unit_purchase and price_per_unit fields
    if (["unit_purchase", "price_per_unit"].includes(name)) {
      parsedValue = /^\d*\.?\d*$/.test(value) ? value : formData[name];
    }

    let newFormData = { ...formData, [name]: parsedValue };

    if (["unit_purchase", "price_per_unit"].includes(name)) {
      const unitPurchase = parseFloat(newFormData.unit_purchase);
      const pricePerUnit = parseFloat(newFormData.price_per_unit);

      if (!isNaN(unitPurchase) && !isNaN(pricePerUnit)) {
        // Calculate the amount spent and update the formData
        newFormData = {
          ...newFormData,
          amount_spent: (unitPurchase * pricePerUnit)
            .toFixed()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
      }
    }

    setFormData(newFormData);
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const date_purchased = formatDate(date);
    e.preventDefault();
    let newErrors = {
      name: "",
      unit_purchase: "",
      price_per_unit: "",
      amount_spent: "",
      fish_specie: "",
      fish_type: "",
      vendor: "",
      status: "",
      date_purchased: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!status) {
      newErrors.status = "Status is required";
    }
    if (!formData.unit_purchase) {
      newErrors.unit_purchase = "Unit purchase is required";
    }
    if (!date) {
      newErrors.date_purchased = "Date is required";
    }
    if (!formData?.amount_spent) {
      newErrors.amount_spent = "Amount is required";
    }
    if (!formData?.vendor) {
      newErrors.vendor = "Vendor is required";
    }
    if (!type) {
      newErrors.fish_type = "Type is required";
    }
    if (!specie) {
      newErrors.fish_specie = "Specie is required";
    }
    if (!formData.price_per_unit) {
      newErrors.price_per_unit = "Price per unit is required";
    }

    setErrors(newErrors);

    // Convert unit_purchase, price_per_unit, and amount_spent to numbers
    const unit_purchase = parseFloat(
      formData?.unit_purchase?.replace(/,/g, "")
    );
    const price_per_unit = parseFloat(
      formData?.price_per_unit?.replace(/,/g, "")
    );
    const amount_spent = parseFloat(formData?.amount_spent?.replace(/,/g, ""));

    const formdata = {
      name: formData?.name,
      unit_purchase: isNaN(unit_purchase) ? null : unit_purchase,
      price_per_unit: isNaN(price_per_unit) ? null : price_per_unit,
      amount_spent: isNaN(amount_spent) ? null : amount_spent,
      fish_specie: specie,
      fish_type: type,
      vendor: formData?.vendor,
      status: status,
      date_purchased: date_purchased,
    };

    if (!active_subscription) {
      setOpenSub(true);
      setOpen(false);
    } else {
      if (Object.values(newErrors).every((error) => !error)) {
        setLoading(true);
        try {
          await createBatch({ formdata, farmId }).unwrap();
          toast.success("Batch created ✔️");
          setOpen(false);
          setFormData("");
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          toast.error(
            error?.data?.message ||
              "Something went wrong please try again or check your network connection"
          );
        }
      }
    }
  };

  console.log(active_subscription);

  return (
    <>
      <SubscriptionModal open={openSub} setOpen={setOpenSub} />
      <Modal open={open} setOpen={setOpen}>
        <div className="bg-white lg:px-10 py-6 px-6 rounded-xl">
          <div className="text-center">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0">
              <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
                Create New Batch
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className=" text-gray-500 font-normal mb-3">
                  Batch Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  placeholder="Batch Name"
                  className="border-gray-400 focus-visible:outline-none py-6 "
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className=" text-gray-500 font-normal mb-3">
                  Units Purchased
                </Label>
                <Input
                  type="text"
                  name="unit_purchase"
                  value={formData?.unit_purchase}
                  onChange={handleInputChange}
                  placeholder="Units Purchased"
                  className="border-gray-400 focus-visible:outline-none py-6 "
                />
                {errors.unit_purchase && (
                  <p className="text-red-500 text-xs">{errors.unit_purchase}</p>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className=" text-gray-500 font-normal mb-3">
                  Price per Unit
                </Label>
                <Input
                  type="text"
                  name="price_per_unit"
                  value={formData?.price_per_unit}
                  onChange={handleInputChange}
                  placeholder="500"
                  className="border-gray-400 focus-visible:outline-none py-6 "
                />
                {errors.price_per_unit && (
                  <p className="text-red-500 text-xs">
                    {errors.price_per_unit}
                  </p>
                )}
              </div>
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className=" text-gray-500 font-normal mb-3">
                  Amount Spent
                </Label>
                <Input
                  type="text"
                  name="amount_spent"
                  value={formData?.amount_spent}
                  onChange={handleInputChange}
                  placeholder="300"
                  className="border-gray-400 focus-visible:outline-none py-6 "
                />
                {errors.amount_spent && (
                  <p className="text-red-500 text-xs">{errors.amount_spent}</p>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className=" text-gray-500 font-normal mb-3">
                  Fish Specie
                </Label>
                <Select
                  name="fish_specie"
                  onValueChange={(value) => setSpecie(value)}>
                  <SelectTrigger className="w-full h-12 border-gray-400">
                    <SelectValue placeholder="Fish specie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Catfish">Catfish</SelectItem>
                      <SelectItem value="Tilapias">Tilapias</SelectItem>
                      <SelectItem value="Mackerel">Mackerel</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.fish_specie && (
                  <p className="text-red-500 text-xs">{errors.fish_specie}</p>
                )}
              </div>
              <div className="form-control">
                <Label
                  htmlFor="message-2"
                  className=" text-gray-500 font-normal mb-3">
                  Fish Type
                </Label>
                <Select
                  name="fish_type"
                  onValueChange={(value) => setType(value)}>
                  <SelectTrigger className="w-full h-12 border-gray-400">
                    <SelectValue placeholder="Fish Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Fingerlings">Fingerlings</SelectItem>
                      <SelectItem value="Fry">Fry</SelectItem>
                      <SelectItem value="Post-fingerling">
                        Post-fingerling
                      </SelectItem>
                      <SelectItem value="Juvenile">Juvenile</SelectItem>
                      <SelectItem value="Jumbo">Jumbo</SelectItem>
                      <SelectItem value="Table size">Table size</SelectItem>
                      <SelectItem value="Broodstock">Broodstock</SelectItem>
                      <SelectItem value="Adult">Adult</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.fish_type && (
                  <p className="text-red-500 text-xs">{errors.fish_type}</p>
                )}
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
                  placeholder="Vendor name"
                  className="border-gray-400 focus-visible:outline-none py-6 "
                />
                {errors.vendor && (
                  <p className="text-red-500 text-xs">{errors.vendor}</p>
                )}
              </div>
              <div>
                <div className="form-control flex items-center space-x-2 mt-3">
                  <Label
                    htmlFor="message-2"
                    className=" text-gray-500 font-normal">
                    Status
                  </Label>
                  <Select
                    name="status"
                    onValueChange={(value) => setStatus(value)}>
                    <SelectTrigger
                      className={`w-full h-10 ${
                        status === `sold out`
                          ? ` bg-red-100 text-red-400`
                          : `bg-[#A3EED8] `
                      } border-none rounded-full`}>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="in stock">In Stock</SelectItem>
                        <SelectItem
                          value="sold out"
                          className="bg-red-100 text-red-500">
                          Sold out
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {errors.status && (
                  <p className="text-red-500 text-xs">{errors.status}</p>
                )}
              </div>
            </div>
            <div>
              <div className="form-control flex flex-col mt-4">
                <Label
                  htmlFor="date_purchased"
                  className=" text-gray-500 font-normal mb-2">
                  Date established
                </Label>
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
              </div>
              {errors.date_purchased && (
                <p className="text-red-500 text-xs">{errors.date_purchased}</p>
              )}
            </div>
            <div className="flex items-center justify-between space-x-6">
              <Button
                disabled={loading}
                className=" mt-6 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                {loading ? "Creating batch..." : "Create Batch"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddBatchModal;
