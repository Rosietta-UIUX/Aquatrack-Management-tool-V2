"use client";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";

export function Modal({ open, setOpen, className, children }: any) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto pb-0 pt-[6rem]"
          onClick={handleClose} // Close the modal when clicking outside of it
        >
          <div
            className={cn(
              "lg:w-auto w-10/12 relative gap-4 border rounded-xl bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
              className
            )}
            onClick={(e) => e.stopPropagation()}>
            {/* Prevent closing the modal when clicking inside it */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setOpen(false)}>
              <Cross2Icon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            <>{children}</>
          </div>
        </div>
      )}
    </>
  );
}
