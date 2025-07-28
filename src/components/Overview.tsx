"use client";
import { useState } from "react";
import Image from "next/image";
import capitalIcon from "@/public/icons/capital-icon.png";
import profitIcon from "@/public/icons/profit.png";
import expensesIcon from "@/public/icons/expenses.png";
import { useGetFarmDataQuery } from "@/redux/services/farmApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Overview = ({ data, isLoading }: any) => {
  const [hide, setHide] = useState(false);
  const isNegative = (number: any) => {
    return number < 0;
  };
  return (
    <section className="lg:w-11/12 w-11/12 mx-auto mt-8">
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg">
        Overview
      </h2>
      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-8 gap-4 gap-y-6 lg:mt-4 mt-2">
        <div className="card bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={capitalIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={capitalIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-sm text-xs">Capital</p>
            {isLoading ? (
              <Skeleton className="h-6 w-[50px] bg-gray-200" />
            ) : (
              <>
                {hide ? (
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    ******
                  </h2>
                ) : (
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    N{" "}
                    {data?.overview?.capital
                      ? formatCurrency(data?.overview?.capital)
                      : "0.00"}
                  </h2>
                )}
              </>
            )}
            {/* <p className="text-xs text-green-400">2.5%</p> */}
          </div>
        </div>
        <div className="card bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={profitIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={profitIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-sm text-xs">Net Profit</p>
            {isLoading ? (
              <Skeleton className="h-6 w-[50px] bg-gray-200" />
            ) : (
              <>
                {hide ? (
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    ******
                  </h2>
                ) : (
                  <h2 className="font-semibold text-[--primary] lg:text-lg text-base">
                    N{" "}
                    {hide
                      ? "*****"
                      : isNegative(data?.overview?.net_profit)
                      ? "0.00"
                      : formatCurrency(data?.overview?.net_profit)}
                  </h2>
                )}
              </>
            )}
            {/* <p className="text-xs text-green-400">2.5%</p> */}
          </div>
        </div>
        <div className="card relative bg-white p-6 rounded-xl hidden lg:flex lg:items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={expensesIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={expensesIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-sm text-xs">Total Expenses</p>
            {isLoading ? (
              <Skeleton className="h-6 w-[50px] bg-gray-200" />
            ) : (
              <>
                {hide ? (
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    ******
                  </h2>
                ) : (
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    N{" "}
                    {data?.overview?.total_expense
                      ? formatCurrency(data?.overview?.total_expense)
                      : "0.00"}
                  </h2>
                )}
              </>
            )}
            {/* <p className="text-xs text-green-400">2.5%</p> */}
          </div>
          {hide ? (
            <IoEye
              onClick={() => setHide(!hide)}
              className="text-gray-400 text-3xl absolute top-8 right-6"
            />
          ) : (
            <IoEyeOff
              onClick={() => setHide(!hide)}
              className="text-gray-400 text-3xl absolute top-8 right-6"
            />
          )}
        </div>
      </div>
      <div className="card relative mt-4 lg:hidden bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
        <div>
          <Image
            src={expensesIcon}
            alt="Greeting Image"
            layout="fixed"
            width="60"
            height="50"
            priority
            className="lg:flex hidden"
          />
          <Image
            src={expensesIcon}
            alt="Greeting Image"
            layout="fixed"
            width="40"
            height="40"
            priority
            className="flex lg:hidden"
          />
        </div>
        <div className="stat">
          <p className="text-gray-400 lg:text-sm text-xs">Total Expenses</p>
          {isLoading ? (
            <Skeleton className="h-6 w-[50px] bg-gray-200" />
          ) : (
            <>
              {hide ? (
                <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                  ******
                </h2>
              ) : (
                <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                  N{" "}
                  {data?.overview?.total_expense
                    ? formatCurrency(data?.overview?.total_expense)
                    : "0.00"}
                </h2>
              )}
            </>
          )}
          {/* <p className="text-xs text-green-400">2.5%</p> */}
        </div>
        {hide ? (
          <IoEye
            onClick={() => setHide(!hide)}
            className="text-gray-400 text-3xl absolute top-8 right-6"
          />
        ) : (
          <IoEyeOff
            onClick={() => setHide(!hide)}
            className="text-gray-400 text-3xl absolute top-8 right-6"
          />
        )}
      </div>
    </section>
  );
};

export default Overview;
