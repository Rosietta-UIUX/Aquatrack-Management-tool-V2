"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { useDeletePondMutation } from "@/redux/services/pondsApiSlice";
import toast from "react-hot-toast";

const DeletePondModal = ({ open, setOpen, openDelID, farmId }: any) => {
  const cancelButtonRef = useRef(null);
  const [deletePond] = useDeletePondMutation();
  const [loading, setLoading] = useState(false);

  const handleDeletePond = async () => {
    try {
      setLoading(true);
      await deletePond({ farmId, pondId: openDelID }).unwrap();
      toast.success("Pond Deleted ✔️");
      setOpen(false);
    } catch (error) {
      setLoading(false);
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
                <div className="bg-white lg:py-10 lg:px-14 p-10">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-[--primary] ">
                        Delete Pond
                      </Dialog.Title>
                    </div>
                  </div>
                  <p className="text-center text-gray-500 mt-6">
                    You are about to delete this pondforever. Are you really
                    sure about this?
                  </p>
                  <div className="flex items-center justify-between space-x-6">
                    <Button
                      onClick={() => setOpen(false)}
                      className=" mt-10 border border-red-500 bg-white hover:bg-white w-full h-[53px] text-red-500 text-xs font-normal ">
                      Cancle
                    </Button>
                    <Button
                      onClick={handleDeletePond}
                      className=" mt-10 outline-none border-none font-bold text-xs bg-red-500 hover:bg-red-500 w-full h-[53px] text-white">
                      {loading ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeletePondModal;
