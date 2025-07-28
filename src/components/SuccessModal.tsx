import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SuccessModal({
  open,
  setOpen,
  email,
  text,
  title,
  link,
  btnText,
}: any) {
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <IoClose
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 h-6 w-6 text-gray-500 "
                />
                <div className="bg-white lg:py-10 lg:px-20 p-10">
                  <FaCheckCircle className="text-[--primary] lg:h-20 lg:w-20 w-14 h-14 mx-auto mb-10 " />
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-[--primary] ">
                        {title}
                      </Dialog.Title>
                      <div className="mt-4">
                        <p className="text-base text-gray-500">
                          {text} <span className="font-semibold">{email}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link href={link} className="outline-none border-none">
                    <Button className=" mt-10 outline-none border-none font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
                      {btnText}
                    </Button>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
