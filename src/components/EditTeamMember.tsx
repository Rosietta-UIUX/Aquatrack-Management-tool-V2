"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useEditTeamMemberMutation } from "@/redux/services/TeamsApiSlice";

const EditTeamMemberModal = ({ open, setOpen, data }: any) => {
  const cancelButtonRef = useRef(null);
  const [editTeamMember] = useEditTeamMemberMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    email: data?.email || "",
    phone_number: data?.phone_number || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();

    try {
      await editTeamMember({
        formdata: formData,
        userID: data?.id,
      }).unwrap();
      toast.success("Changes Saved ✔️");
      setOpen(false);
      setFormData("");
      setLoading(false);
    } catch (error) {
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
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
                  className="absolute top-4 right-4 h-6 w-6 text-gray-500 "
                />
                <div className="bg-white lg:py-10 lg:px-14 py-10 px-6">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-[--primary] ">
                        Edit
                      </Dialog.Title>
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
                          name="first_name"
                          value={formData?.first_name}
                          onChange={handleInputChange}
                          placeholder="First name"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Last name
                        </Label>
                        <Input
                          type="text"
                          name="last_name"
                          value={formData?.last_name}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          value={formData?.email}
                          onChange={handleInputChange}
                          placeholder="email address"
                          className="border-gray-400 focus-visible:outline-none py-6 "
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
                          value={formData?.phone_number}
                          onChange={handleInputChange}
                          placeholder="(234) 80 XXX XXX X"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                      <Button
                        type="button"
                        onClick={() => setOpen(false)}
                        className=" mt-10 border border-[--secondary] bg-white hover:bg-white w-full h-[53px] text-[--secondary] text-xs font-normal ">
                        Cancle
                      </Button>
                      <Button
                        disabled={loading}
                        className=" mt-10 outline-none border-none font-normal bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
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

export default EditTeamMemberModal;
