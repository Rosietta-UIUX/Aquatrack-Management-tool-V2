"use client";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { useState, useEffect } from "react";

// Custom hook to manage default farm ID and update it
const useDefaultFarmId = () => {
  const { data, isLoading, isError, refetch } = useGetCurrentUserQuery(null);
  // Initialize state for default farm ID
  const [defaultFarmId, setDefaultFarmId] = useState<any>("");

  // Effect to set defaultFarmId once data is fetched
  useEffect(() => {
    if (data) {
      const storedId = localStorage.getItem("defaultFarmId");
      const firstFarmId = data?.data?.organizations?.[0]?.farms?.[0]?.id || "";
      setDefaultFarmId(storedId || firstFarmId);
    }
  }, [data, isLoading, isError]);

  // Update default farm ID in local storage when it changes
  useEffect(() => {
    if (defaultFarmId) {
      localStorage.setItem("defaultFarmId", defaultFarmId);
    }
  }, [defaultFarmId]);

  // Function to update default farm ID when a farm button is clicked
  const handleFarmClick = (id: string) => {
    setDefaultFarmId(id);
    localStorage.setItem("defaultFarmId", id);
    if (typeof window !== "undefined") {
      location.reload();
    }
  };

  return { defaultFarmId, handleFarmClick };
};

export default useDefaultFarmId;
