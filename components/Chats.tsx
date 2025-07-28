import React from "react";
import { GoDotFill } from "react-icons/go";
import MortalityChart from "./MortalityChart";
import { FarmChart, MobileFarmChart } from "./FarmChart";

const MortalityChat = ({ data }: any) => {
  return (
    <div className="lg:w-[60%] w-full">
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-4 ">
        Mortality Rate
      </h2>
      <div className="bg-gray-50 rounded-xl lg:p-4 p-2 lg:py-6 py-4  lg:h-[26rem] h-[20rem]">
        {data?.graph_data && <MortalityChart data={data?.graph_data} />}
      </div>

      <div className="chart mt-8">
        <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-6 mt-6">
          Farm Details
        </h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center bg-white rounded-xl">
          <div className="cha lg:h-[40vh] h-[30vh] w-full">
            {data?.farm_details && (
              <>
                <FarmChart data={data?.farm_details} />
                <MobileFarmChart data={data?.farm_details} />
              </>
            )}
          </div>
          <div className="flex flex-col space-y-4 mx-auto pb-6">
            <div className="flex items-center">
              <GoDotFill className="text-[#3E93F6] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex space-x-2">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Total Unit:
                </p>
                <p className="lg:text-sm text-xs">
                  {data?.farm_details?.data?.total_units} units
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[#02579E] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex space-x-2">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Batch:
                </p>{" "}
                <p className="lg:text-sm text-xs">
                  {data?.farm_details?.data?.batch}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[#C3A6FF] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex space-x-2">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Feed Available:
                </p>
                <p className="lg:text-sm text-xs">
                  {data?.farm_details?.data?.feed_available} bags
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[#B6C8F8] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex space-x-2">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Ponds:
                </p>
                <p className="lg:text-sm text-xs">
                  {data?.farm_details?.data?.ponds}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[#F84D4D] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex space-x-2">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Mortality Rate:
                </p>
                <p className="lg:text-sm text-xs">
                  {" "}
                  {data?.farm_details?.data?.mortality_rate} units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortalityChat;
