"use client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils";
import { Eye, EyeOff, Landmark, TrendingUp, TrendingDown } from "lucide-react";

const Overview = ({ data, isLoading }: any) => {
  const [hide, setHide] = useState(false);
  const isNegative = (number: any) => {
    return number < 0;
  };
  return (
    <section className="lg:w-11/12 w-11/12 mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <button onClick={() => setHide(!hide)} className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100">
          {hide ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:mt-4 mt-2">
        <div className="card bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="p-3 bg-blue-100 rounded-full">
            <Landmark className="text-blue-500" size={24} />
          </div>
          <div className="stat">
            <p className="text-gray-500 text-sm">Capital</p>
            {isLoading ? (
              <Skeleton className="h-7 w-24 bg-gray-200 mt-1" />
            ) : (
              <h2 className="font-bold text-2xl">
                {hide ? "******" : `N ${data?.overview?.capital ? formatCurrency(data?.overview?.capital) : "0.00"}`}
              </h2>
            )}
          </div>
        </div>
        <div className="card bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="stat">
            <p className="text-gray-500 text-sm">Net Profit</p>
            {isLoading ? (
              <Skeleton className="h-7 w-24 bg-gray-200 mt-1" />
            ) : (
              <h2 className="font-bold text-2xl">
                {hide ? "******" : `N ${isNegative(data?.overview?.net_profit) ? "0.00" : formatCurrency(data?.overview?.net_profit)}`}
              </h2>
            )}
          </div>
        </div>
        <div className="card bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingDown className="text-red-500" size={24} />
          </div>
          <div className="stat">
            <p className="text-gray-500 text-sm">Total Expenses</p>
            {isLoading ? (
              <Skeleton className="h-7 w-24 bg-gray-200 mt-1" />
            ) : (
              <h2 className="font-bold text-2xl">
                {hide ? "******" : `N ${data?.overview?.total_expense ? formatCurrency(data?.overview?.total_expense) : "0.00"}`}
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
