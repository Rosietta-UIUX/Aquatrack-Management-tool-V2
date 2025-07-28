"use client";
import BatchTable from "@/components/BatchTable";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import NavHeader from "@/components/NavHeader";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";

const BatchPage = () => {
  const { defaultFarmId } = useDefaultFarmId();
  const { isLoading: loading, data } = useGetCurrentUserQuery(null);
  const { isLoading, data: batch } = useGetAllBatchsDataQuery({
    farmId: defaultFarmId,
  });

  return (
    <>
      <NavHeader />

      <main className="w-11/12 mx-auto mt-8">
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
          <>
            <BatchTable
              farmId={defaultFarmId}
              data={batch?.data}
              isLoading={isLoading}
            />
          </>
        )}
      </main>
    </>
  );
};

export default BatchPage;
