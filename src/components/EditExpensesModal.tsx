"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { useEditExpenseMutation } from "@/redux/services/expenseRecordApiSlice";
import toast from "react-hot-toast";

const EditExpensesModal = ({ open, setOpen, farmId, editData }: any) => {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { data } = useGetAllBatchsDataQuery({ farmId });
  const [editExpense] = useEditExpenseMutation();

  const [description, setDescription] = useState("");
  const [total, setTotal] = useState("");
  const [inputs, setInputs] = useState<Array<any>>([]);

  useEffect(() => {
    if (open && editData) {
      if (typeof editData?.attributes?.splitted_for_batch === "string") {
        try {
          const newinputs = JSON.parse(
            editData?.attributes?.splitted_for_batch
          );
          setInputs(newinputs || []);
        } catch (error) {
          console.error("Error parsing inputs:", error);
        }
      } else {
        setInputs(editData?.attributes?.splitted_for_batch || []);
      }
      console.log("NewINputs", editData?.attributes?.splitted_for_batch);
      setDescription(editData?.attributes?.description);
      setTotal(editData?.attributes?.total_amount);
    }
  }, [open, editData]);

  const handleInputChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], [fieldName]: value };
    setInputs(newInputs);

    // Calculate total
    const newTotal = newInputs.reduce(
      (acc, curr) => acc + parseFloat(curr.amount || "0"),
      0
    );
    setTotal(newTotal.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const splitted_for_batch = inputs.map((input) => ({
        batch_id: data?.data?.[inputs.indexOf(input)].id, // Retrieve batch_id based on index
        amount: parseFloat(input.amount), // Convert amount to number if needed
      }));

      // Convert total to number
      const total_amount = parseFloat(total.replace(/,/g, ""));

      const formdata = {
        description: description,
        total_amount: isNaN(total_amount) ? null : total_amount,
        splitted_for_batch: splitted_for_batch,
      };

      await editExpense({
        formdata,
        farmId,
        expenseId: editData?.id,
      }).unwrap();
      toast.success("Expenses saved ✔️");
      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Error creating expenses:", error);
      toast.success("An error occur");
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
                <div className="bg-white lg:py-10 lg:px-8 py-10 px-6">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-[--primary] ">
                        Edit expense
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Description
                        </Label>
                        <textarea
                          placeholder="Type here..."
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="border-gray-400 w-full bg-gray-100 resize-none focus-visible:outline-none p-4 rounded-lg "
                        />
                      </div>
                      <div className="form-control mt-8">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Available Batches
                        </Label>
                        <p className="text-xs text-gray-400">
                          Assign expenses to each batch as you wish
                        </p>
                        <div className="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-4">
                          {data?.data?.map((item: any, index: any) => (
                            <div
                              key={index}
                              className="input-batch flex items-center bg-gray-100 rounded-lg w-full">
                              <p className="h-12 text-xs flex items-center rounded-l-lg px-2 text-nowrap bg-[#C9D5ED] border ">
                                {item?.attributes?.name}
                              </p>
                              <Input
                                type="text"
                                name="amount"
                                value={inputs[index]?.amount ?? ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "amount",
                                    e.target.value
                                  )
                                }
                                placeholder="20 bags"
                                className="border-none outline-none focus-visible:ring-0 focus-visible:outline-none py-6 rounded-none w-full"
                              />
                              <input
                                type="hidden"
                                name="batch_id"
                                value={item?.id} // Set the batch_id as hidden input value
                              />
                            </div>
                          ))}
                        </div>

                        <div className="form-control mt-6">
                          <Label
                            htmlFor="message-2"
                            className=" text-gray-500 font-normal mb-3">
                            Total
                          </Label>
                          <Input
                            type="text"
                            name="total"
                            disabled
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            className="border-none mt-2 h-12 bg-gray-100 outline-none focus-visible:ring-0 focus-visible:outline-none py-6 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                      <Button
                        disabled={!total ? true : false}
                        className="mt-4 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Sending..." : "Add new expense"}
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

export default EditExpensesModal;
