"use client";
import { Fragment, useRef, useState } from "react";
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

const AddCustomerModal = ({ open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);

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
                        Add New Customer
                      </Dialog.Title>
                    </div>
                  </div>
                  <form className="space-y-4 mt-8">
                    <div className="grid lg:grid-cols-1 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="firstname"
                          className=" text-gray-500 font-normal mb-3">
                          Customer name
                        </Label>
                        <Input
                          type="text"
                          placeholder="John deo"
                          className="bg-gray-100 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-6">
                      {/* <Button
                        onClick={() => setOpen(false)}
                        className=" mt-10 border border-[--secondary] bg-white hover:bg-white w-full h-[53px] text-[--secondary] text-xs font-normal ">
                        Cancle
                      </Button> */}
                      <Button className="px-8 mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-auto h-[53px] text-white">
                        Add customer
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

export default AddCustomerModal;
