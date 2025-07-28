"use client";

import { useGetSubscriptionStatusQuery } from "@/redux/services/subApiSlice";
import useDefaultFarmId from "./useDefaultFarmId";

const useCheckSubscriptionStatus = () => {
  const { defaultFarmId } = useDefaultFarmId();
  const { data } = useGetSubscriptionStatusQuery({ farmId: defaultFarmId });

  return { active_subscription: data?.data?.active_subscription };
};

export default useCheckSubscriptionStatus;
