"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
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
import toast from "react-hot-toast";
import { useEditEmployeeMutation } from "@/redux/services/employeeApiSlice";

const EditEmployeeModal = ({ open, setOpen, farmId, editData }: any) => {
  const cancelButtonRef = useRef(null);
  const [editEmployee] = useEditEmployeeMutation();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    setFormData({
      first_name: editData?.attributes?.first_name,
      last_name: editData?.attributes?.last_name,
      email: editData?.attributes?.email,
      phone_number: editData?.attributes?.phone_number,
    });
  }, [open, editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formdata = {
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        email: formData?.email,
        phone_number: formData?.phone_number,
        role: role,
      };
      const employeeId = editData?.id;
      await editEmployee({ formdata, farmId, employeeId }).unwrap();
      toast.success("Saved ✔️");
      setOpen(false);
      setFormData("");
      setRole("");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.data?.message);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 lg:max-w-xl">
                <IoClose
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 h-6 w-6 text-gray-500 "
                />
                <div className="bg-white lg:py-10 lg:px-8 py-10 px-6">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-[--primary] ">
                        Edit Employee
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="firstname"
                          className=" text-gray-500 font-normal mb-3">
                          First name
                        </Label>
                        <Input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="John deo"
                          className="bg-gray-100 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="lastname"
                          className=" text-gray-500 font-normal mb-3">
                          Last name
                        </Label>
                        <Input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Deo"
                          className="bg-gray-100 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="email"
                          className=" text-gray-500 font-normal mb-3">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="500"
                          className="bg-gray-100 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Phone number
                        </Label>
                        <Input
                          type="text"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          placeholder="090 9898 0978"
                          className="border-none bg-gray-100 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Role
                        </Label>
                        <Select
                          value={role}
                          onValueChange={(value) => setRole(value)}>
                          <SelectTrigger className="w-full h-12 bg-gray-100">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Farm Employee">
                                Farm Employee
                              </SelectItem>
                              <SelectItem value="Farm Admin">
                                Farm Admin
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-6">
                      <Button className="px-8 mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-auto h-[53px] text-white">
                        {loading ? "Saving..." : "Save Changes"}
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

export default EditEmployeeModal;
