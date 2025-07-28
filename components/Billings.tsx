"use client";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import BillingTable from "./BillingTable";
import {
  useGetBuillingRecordsQuery,
  useActivateAutoRenewalMutation,
} from "@/redux/services/subApiSlice";
import SubscriptionModal from "./SubscriptionModal";

const Billings = ({ data }: any) => {
  const [activateAutoRenewal] = useActivateAutoRenewalMutation();
  const [openSub, setOpenSub] = useState(false);
  const [renew, setRenew] = useState(false);

  useEffect(() => {
    setRenew(data?.data?.payment_info?.auto_renewal == 1 ? true : false);
  }, [data?.data?.payment_info?.auto_renewal]);

  const handleAutoRenewal = async (value: any) => {
    setRenew(value);
    try {
      await activateAutoRenewal({
        formdata: {
          payment_info_id: data?.data?.payment_info?.id,
          activate_autorenew: renew,
        },
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="lg:mt-20 mt-10">
      <SubscriptionModal open={openSub} setOpen={setOpenSub} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4 lg:w-8/12 w-full">
        {data?.data?.payment_info?.last4 && (
          <div className="bg-white w-full lg:p-6 p-4 rounded-xl border">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-base">Payment info</h2>
              <div className="flex items-center space-x-2">
                <label htmlFor="airplane-mode" className="text-xs">
                  Auto renewal
                </label>
                <Switch
                  id="airplane-mode"
                  checked={renew}
                  onCheckedChange={(value) => handleAutoRenewal(value)}
                />
              </div>
            </div>
            <div className=" mt-6 space-y-2">
              <h2 className="uppercase text-sm">
                {data?.data?.payment_info?.brand}
              </h2>
              <p className="text-sm">{data?.data?.payment_info?.bank}</p>
              {data?.data?.payment_info?.last4 && (
                <p className="text-sm">
                  *****{data?.data?.payment_info?.last4}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="bg-[--primary] text-white w-full p-6 rounded-xl border">
          <h2 className="text-base">Your current plan</h2>
          <div className=" mt-4 space-y-2">
            <p className="text-base capitalize">
              {data?.data?.current_plan?.type} Plan
            </p>
            <p className="text-sm">NGN {data?.data?.current_plan?.amount}</p>
            <div className="mt-6">
              <Button
                onClick={() => setOpenSub(true)}
                className="bg-white hover:bg-white w-full py-5 text-[--primary] text-base font-semibold ">
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BillingTable />
    </div>
  );
};

export default Billings;
