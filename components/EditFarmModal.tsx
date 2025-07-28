"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useEditFarmMutation } from "@/redux/services/farmApiSlice";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { IoClose } from "react-icons/io5";

const EditFarmModal = ({ open, setOpen, data }: any) => {
  const cancelButtonRef = useRef(null);
  const { refetch } = useGetCurrentUserQuery(null);
  const [editFarm] = useEditFarmMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    farmname: data?.name || "",
  });
  const [errors, setErrors] = useState({
    farmname: "",
  });

  useEffect(() => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      farmname: data?.name || "",
    }));
  }, [data?.name]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, farmname: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      farmname: "",
    };

    if (!formData.farmname) {
      newErrors.farmname = "Name is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.farmname,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await editFarm({ formdata, farmId: data?.id }).unwrap();
        toast.success("Farm edited ✔️");
        setOpen(false);
        setLoading(false);
        refetch();
      } catch (error: any) {
        setLoading(false);
        toast.error(
          error?.data?.message ||
            "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 lg:max-w-lg">
                <IoClose
                  onClick={() => setOpen(false)}
                  className="absolute top-4 cursor-pointer right-4 h-6 w-6 text-gray-500 "
                />
                <div className="bg-white lg:py-10 lg:px-14 p-10">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <h3 className="text-xl font-semibold text-[--primary] ">
                        Edit Farm
                      </h3>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="form-control mt-8">
                      <Label
                        htmlFor="name"
                        className=" text-gray-500 font-normal mb-3">
                        Farm name
                      </Label>
                      <Input
                        type="text"
                        name="farmname"
                        value={formData?.farmname}
                        onChange={handleInputChange}
                        placeholder="Farm name"
                        className="border-gray-400 focus-visible:outline-none py-6 "
                      />
                      {errors.farmname && (
                        <p className="text-red-500 text-xs">
                          {errors.farmname}
                        </p>
                      )}
                    </div>
                    <div className="pt-2">
                      <Button className="  outline-none border-none text-base font-semibold bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Saving farm..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditFarmModal;
