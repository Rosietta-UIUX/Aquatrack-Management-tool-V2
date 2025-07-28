"use client";
import PondDetails from "@/components/PondDetails";
import QuickAction from "@/components/QuickAction";
import { useGetAllPondsDataQuery } from "@/redux/services/pondsApiSlice";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import NavHeader from "@/components/NavHeader";
import { Skeleton } from "@/components/ui/skeleton";
import CreateFarmState from "@/components/CreateFarmState";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";

const PoundsPage = () => {
  const { isLoading: loading } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const { isLoading, data: ponds } = useGetAllPondsDataQuery({
    farmId: defaultFarmId,
  });

  return (
    <>
      <NavHeader />
      <main className="w-full">
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
            {defaultFarmId ? (
              <>
                <QuickAction farmId={defaultFarmId} />
                {ponds?.data?.data?.length == 0 ? (
                  <section className="h-[70vh] flex items-center justify-center">
                    <div className="relative lg:w-6/12 w-10/12 mx-auto">
                      <div className="text absolute top-14 w-full text-center">
                        <h2 className="font-bold text-2xl mb-2">
                          No Ponds Added
                        </h2>
                        <p>
                          There are no ponds here yet. However, once there are
                          any, they will be displayed here.
                        </p>
                      </div>
                      <Image
                        src={emptyImg}
                        alt="empty"
                        height={300}
                        width={200}
                        layout="fixed"
                        className="mx-auto"
                      />
                    </div>
                  </section>
                ) : (
                  <>
                    {isLoading ? (
                      <section className="grid lg:grid-cols-3 gap-8 mt-20 lg:w-11/12 w-11/12 mx-auto">
                        <div className="space-y-2 bg-white p-6 rounded-xl">
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                        </div>
                        <div className="space-y-2 bg-white p-6 rounded-xl">
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                        </div>
                        <div className="space-y-2 bg-white p-6 rounded-xl">
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                        </div>
                        <div className="space-y-2 bg-white p-6 rounded-xl">
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-4 w-full bg-gray-200" />
                        </div>
                      </section>
                    ) : (
                      <section className="lg:w-11/12 w-11/12 mx-auto lg:pb-20 mt-10 pb-20 grid lg:grid-cols-3 gap-8">
                        {ponds?.data?.data?.map((pond: any) => (
                          <PondDetails
                            farmId={defaultFarmId}
                            key={pond?.id}
                            pond={pond}
                          />
                        ))}
                      </section>
                    )}
                  </>
                )}
              </>
            ) : (
              <CreateFarmState vheight="70vh" />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default PoundsPage;
