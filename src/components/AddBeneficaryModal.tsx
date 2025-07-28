"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateCustomerMutation } from "@/redux/services/customerApiSlice";
import { Modal } from "./Modal";
import { useGetBeneficiariesQuery } from "@/redux/services/benefiApiSlice";

const AddBeneficaryModal = ({ open, setOpen, farmId, harvestId }: any) => {
  const { data: beneficaryData } = useGetBeneficiariesQuery({
    farmId: farmId,
  });

  const [createCustomer] = useCreateCustomerMutation();
  const [loading, setLoading] = useState(false);

  const handleBeneficaries = async (beneficaryID: any) => {
    const formdata = {
      name: beneficaryID?.name,
      phone_number: beneficaryID?.phone,
      email: beneficaryID?.email,
    };

    setLoading(true);
    try {
      await createCustomer({ formdata, farmId, harvestId }).unwrap();
      toast.success("Customer added ✔️");
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} className="lg:w-[450px]">
      <div className="bg-white lg:py-10 lg:px-14 py-10 px-6">
        <div className="text-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
              Beneficaries
            </h3>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full mt-6 overflow-y-scroll pb-6">
          {/* <h3 className="font-semibold text-center  mt-6">No Beneficary</h3> */}
          {beneficaryData?.data?.map((data: any) => (
            <div
              key={data?.id}
              onClick={() => handleBeneficaries(data)}
              className="border hover:bg-gray-300 cursor-pointer hover:border-gray-100 border-gray-600 p-2 rounded-lg w-full">
              <h2 className="font-semibold text-sm ">{data?.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AddBeneficaryModal;
