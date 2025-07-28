"use client";
import HarvestTable from "@/components/HarvestTable";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import NavHeader from "@/components/NavHeader";
import { useGetAllHarvestQuery } from "@/redux/services/harvestApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import PaginationTab from "@/components/PaginationTab";
import { useState } from "react";
import React from "react";

const HarvestPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading: loading, data } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const { isLoading, data: harvestData } = useGetAllHarvestQuery({
    farmId: defaultFarmId,
    params: currentPage,
  });

  return (
    <>
      <NavHeader />
      <main className="w-11/12 mx-auto mt-8 ">
        {loading ? (
          <div className="mt-10 lg:w-11/12 w-10/12 mx-auto flex items-center gap-x-8">
            <div className="mt-8 lg:w-8/12 w-full">
              <div>
                <Skeleton className="w-full bg-gray-200 h-4" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
              </div>
              <div className="mt-4">
                <Skeleton className="w-full bg-gray-200 h-20" />
              </div>
            </div>
            <div className="mt-8 lg:w-4/12 w-full">
              <div>
                <Skeleton className="w-full bg-gray-200 h-20" />
              </div>
              <div className="mt-2">
                <Skeleton className="w-full bg-gray-200 h-4" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
              </div>
            </div>
          </div>
        ) : (
          <div className="pb-10">
            <HarvestTable
              isLoading={isLoading}
              farmId={defaultFarmId}
              data={harvestData?.data?.harvests?.data}
              stats={harvestData?.data}
            />
            <PaginationTab
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={harvestData?.data?.harvests?.last_page}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default HarvestPage;
