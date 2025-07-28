"use client";
import { useRef, useState, useEffect } from "react";
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
import {
  useEditPondMutation,
  useGetAllPondsDataQuery,
} from "@/redux/services/pondsApiSlice";
import toast from "react-hot-toast";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { Modal } from "./Modal";

const EditPondModal = ({ open, setOpen, farmId, pondData }: any) => {
  const { refetch } = useGetAllPondsDataQuery({
    farmId: farmId,
  });
  const [editPond] = useEditPondMutation();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<String>(pondData?.attributes?.name || "");
  const [batchID, setBatchID] = useState<String>(
    pondData?.relationships?.batch?.data?.id || ""
  );
  const [sizeType, setSizeType] = useState<String>(pondData?.unit_size || "");
  const [formData, setFormData] = useState({
    name: pondData?.attributes?.name,
    type: "",
    holding_capacity: pondData?.attributes?.holding_capacity || "",
    unit: pondData?.attributes?.unit || "",
    size: pondData?.attributes?.size || "",
    feed_size: pondData?.attributes?.feed_size || "",
    mortality_rate: pondData?.attributes?.mortality_rate || "",
    batch_id: "",
    farm_id: "",
    unit_size: pondData?.unit_size || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    holding_capacity: "",
    unit: "",
    size: "",
    feed_size: "",
    mortality_rate: "",
    batch_id: "",
    farm_id: "",
    unit_size: "",
  });

  useEffect(() => {
    setFormData({
      name: pondData?.attributes?.name,
      type: "",
      holding_capacity: pondData?.attributes?.holding_capacity || "",
      unit: pondData?.attributes?.unit || "",
      size: pondData?.attributes?.size || "",
      feed_size: pondData?.attributes?.feed_size || "",
      mortality_rate: pondData?.attributes?.mortality_rate || "",
      batch_id: "",
      farm_id: "",
      unit_size: "",
    });
  }, [pondData?.attributes?.unit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      [
        "holding_capacity",
        "unit",
        "size",
        "feed_size",
        "mortality_rate",
      ].includes(name) && !isNaN(parseFloat(value))
        ? parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      type: "",
      holding_capacity: "",
      unit: "",
      size: "",
      feed_size: "",
      mortality_rate: "",
      batch_id: "",
      farm_id: "",
      unit_size: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!type) {
      newErrors.type = "Type of ponds is required";
    }

    setErrors(newErrors);

    // Ensure formData.mortality_rate and formData.unit are numbers
    const mortalityRate = parseFloat(formData?.mortality_rate) || 0;
    const unit = parseFloat(formData?.unit) || 0;

    // Subtract mortality_rate from unit to get newUnit
    const newUnit = unit - mortalityRate;

    const formdata = {
      name: formData?.name,
      type: type,
      holding_capacity: formData?.holding_capacity,
      unit: newUnit,
      size: formData?.size,
      feed_size: formData?.feed_size,
      mortality_rate: formData?.mortality_rate,
      batch_id: batchID,
      farm_id: farmId,
      unit_size: sizeType,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        setLoading(true);
        await editPond({ formdata, farmId, pondId: pondData?.id }).unwrap();
        toast.success("Edit Pond successful ✔️");
        setOpen(false);
        refetch();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  const { data } = useGetAllBatchsDataQuery({ farmId });

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white lg:py-10 lg:px-10 rounded-full px-5 pb-10">
        <div className="text-center">
          <div className="mt-6 text-center sm:ml-4">
            <h3 className="lg:text-xl text-base font-semibold leading-6 text-[--primary] ">
              Edit {pondData?.attributes?.name}
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="lg:space-y-4 space-y-2 mt-4">
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal mb-3 lg:text-sm text-xs">
                Pond name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Pond name"
                className="border-gray-400 focus-visible:outline-none lg:py-6 py-5 lg:text-sm text-xs "
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal lg:text-sm text-xs mb-3">
                Pond type
              </Label>
              <Select name="type" onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-full lg:h-12 h-10 border-gray-400 lg:text-sm text-xs ">
                  <SelectValue placeholder={pondData?.type || "Batch"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Tank pond"
                      className="lg:text-sm text-xs">
                      Tank (Plastic/Rubber) pond
                    </SelectItem>
                    <SelectItem
                      value="Earthen pond"
                      className="lg:text-sm text-xs">
                      Earthen pond
                    </SelectItem>
                    <SelectItem
                      value="Concrete pond"
                      className="lg:text-sm text-xs">
                      Concrete pond
                    </SelectItem>
                    <SelectItem
                      value="Tarpaulin pond"
                      className="lg:text-sm text-xs">
                      Tarpaulin pond
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:gap-x-4 gap-x-3">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal mb-3 lg:text-sm text-xs">
                Fish holding capacity
              </Label>
              <Input
                type="text"
                name="holding_capacity"
                value={formData?.holding_capacity}
                onChange={handleInputChange}
                placeholder="500"
                className="border-gray-400 focus-visible:outline-none lg:text-sm text-xs lg:py-6 py-5 "
              />
              {errors.holding_capacity && (
                <p className="text-red-500 text-xs">
                  {errors.holding_capacity}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal mb-3 lg:text-sm text-xs">
                Unit
              </Label>
              <Input
                type="text"
                name="unit"
                value={formData?.unit}
                onChange={handleInputChange}
                placeholder="300"
                className="border-gray-400 focus-visible:outline-none lg:text-sm text-xs lg:py-6 py-5 "
              />
              {errors.unit && (
                <p className="text-red-500 text-xs">{errors.unit}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:gap-x-4 gap-x-3">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal lg:text-sm text-xs mb-3">
                Size
              </Label>
              <div className="flex gap-x-4 relative w-full">
                <Input
                  type="number"
                  name="size"
                  value={formData?.size}
                  onChange={handleInputChange}
                  placeholder="5kg"
                  className="border-gray-400 focus-visible:outline-none lg:py-6 py-5 lg:text-sm text-xs w-full "
                />
                <Select
                  name="unit_size"
                  onValueChange={(value) => setSizeType(value)}>
                  <SelectTrigger className="lg:w-20 w-13 lg:h-10 h-9 border-none bg-white focus:ring-white absolute right-1 bottom-1 top-1 lg:text-sm text-xs">
                    <SelectValue
                      placeholder={pondData?.attributes?.unit_size || "Size"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="kg" className="lg:text-sm text-xs">
                        kg
                      </SelectItem>
                      <SelectItem value="g" className="lg:text-sm text-xs">
                        gram
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {errors.size && (
                <p className="text-red-500 text-xs">{errors.size}</p>
              )}
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal mb-3 lg:text-sm text-xs">
                Feed size (mm)
              </Label>
              <Input
                type="number"
                name="feed_size"
                value={formData?.feed_size}
                onChange={handleInputChange}
                placeholder="6mm"
                className="border-gray-400 focus-visible:outline-none lg:py-6 py-5 lg:text-sm text-xs "
              />
              {errors.feed_size && (
                <p className="text-red-500 text-xs">{errors.feed_size}</p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal mb-3 lg:text-sm text-xs">
                Mortality rate
              </Label>
              <Input
                type="text"
                name="mortality_rate"
                value={formData?.mortality_rate}
                onChange={handleInputChange}
                placeholder="30 units"
                className="border-gray-400 focus-visible:outline-none lg:py-6 py-5 lg:text-sm text-xs "
              />
              {errors.mortality_rate && (
                <p className="text-red-500 text-xs">{errors.mortality_rate}</p>
              )}
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className="text-gray-500 font-normal mb-3 lg:text-sm text-xs ">
                Batch
              </Label>
              <Select
                name="batch_id"
                onValueChange={(value) => setBatchID(value)}>
                <SelectTrigger className="w-full lg:h-12 h-10 lg:text-sm text-xs border-gray-400">
                  <SelectValue
                    placeholder={
                      pondData?.relationships?.batch?.data?.name || "Batch"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {data?.data?.map((task: any) => (
                      <SelectItem
                        value={task?.id}
                        key={task?.id}
                        className="lg:text-sm text-xs">
                        {task?.attributes?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.batch_id && (
                <p className="text-red-500 text-xs">{errors.batch_id}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between space-x-6">
            <Button
              type="submit"
              className="mt-4 outline-none border-none font-normal text-sm bg-[--primary] hover:bg-[--secondary] w-full lg:h-[53px] h-[43px]  text-white">
              {loading ? "Loading..." : " Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPondModal;
