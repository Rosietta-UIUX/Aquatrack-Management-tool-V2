"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { Modal } from "./Modal";
import { formatCurrency } from "@/utils";
import { useEditPendingPurchaseMutation } from "@/redux/services/customerApiSlice";

const EditPendingStatus = ({
  open,
  setOpen,
  editdata,
  setRows,
  rowindex,
}: any) => {
  const [editPendingPurchase] = useEditPendingPurchaseMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (editdata) {
      const amount = Number(editdata?.amount || ""); // Ensure numerical comparison
      const to_balance = Number(editdata?.to_balance); // Ensure numerical comparison

      setFormData({
        amount: formatCurrency(amount), // Format amount
        amount_paid: formatCurrency(editdata?.amount_paid || ""), // Format amount_paid
        balance: formatCurrency(to_balance), // Otherwise, format the remaining balance
      });

    }
  }, [editdata, rowindex, open]);


  useEffect(() => {
    // Update balance whenever amount_paid changes
    if (formData?.amount_paid > 0) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        balance: formatCurrency(
          (editdata?.amount || 0) - Number(prevFormData.amount_paid || "")
        ),
      }));
    }
  }, [formData?.amount_paid, editdata]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const purchaseId = editdata?.id;

    function removeComma(value: string): number {
      return Number(value.replace(/,/g, ""));
    }

    const balance = removeComma(formData?.balance);

    const formdata = {
      amount_paid: parseFloat(formData?.amount_paid),
      to_balance: balance,
      status: "pending",
    };

    // setLoading(true);
    setRows((prevRows: any) => {
      const newRows = [...prevRows];
      newRows[rowindex].status = "pending"; // Set status to pending
      return newRows;
    });
    setLoading(true);

    // // Call editPurchase mutation after status change
    editPendingPurchase({
      formdata,
      purchaseId,
    })
      .unwrap()
      .then(() => {
        toast.success("Purchase updated ✔️");
        setLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Failed to update purchase", error);
      });
  };

  return (
    <Modal open={open} setOpen={setOpen} className="lg:w-[450px]">
      <div className="bg-white lg:py-10 lg:px-14 py-10 px-6">
        <div className="text-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
              Pending : Balance
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Total Amount
            </Label>
            <Input
              type="text"
              name="amount"
              value={formData?.amount}
              onChange={handleInputChange}
              disabled
              className="border-gray-400 focus-visible:outline-none py-6 bg-gray-300 font-bold"
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Amount paid
            </Label>
            <Input
              type="text"
              name="amount_paid"
              value={formData?.amount_paid}
              onChange={handleInputChange}
              placeholder="Customer phone number"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              To Balance
            </Label>
            <Input
              type="text"
              name="balance"
              disabled
              value={formData?.balance}
              onChange={handleInputChange}
              className="border-gray-400 focus-visible:outline-none py-6 bg-gray-300 font-bold "
            />
          </div>

          <div className="flex items-center justify-between space-x-6">
            {/* <Button
              disabled={loading}
              className=" mt-2 outline-none border border-red-600 font-normal text-base bg-white w-full h-[53px] text-red-600">
              {loading ? "Saving..." : "Delete"}
            </Button> */}
            <Button
              disabled={loading}
              className=" mt-2 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPendingStatus;
