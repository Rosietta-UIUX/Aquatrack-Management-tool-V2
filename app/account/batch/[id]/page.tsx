"use client";

import React from "react";
import NavHeader from "@/components/NavHeader";
import { useGetSingleBatchsStatQuery } from "@/redux/services/batchApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import { formatCurrency, formatDate } from "@/utils";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BatchDetails = ({ params }: any) => {
  const { defaultFarmId } = useDefaultFarmId();
  const { isLoading, data } = useGetSingleBatchsStatQuery({
    batchId: params.id,
    farmId: defaultFarmId,
  });

  const batchData = data?.data?.attributes;
  const finData = data?.data?.other_details;

  return (
    <>
      <NavHeader />
      <div className="w-11/12 mx-auto lg:mt-8">
        <div className="flex items-center mt-8">
          <Link passHref={true} href="/account/batch" className="font-semibold">
            Batch
          </Link>
          {" > "} <span className="text-sm">{batchData?.name}</span>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-2 gap-4 mt-4">
          {/* Batch Name */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Batch Name</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {batchData?.name}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Units purchased */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">
                Units purchased
              </p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {batchData?.unit_purchase}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Price per unit */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Price per unit</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {batchData?.price_per_unit}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Amount Spent */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Amount Spent</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    N
                    {batchData?.amount_spent
                      ? formatCurrency(batchData?.amount_spent)
                      : "0.00"}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Fish specie */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Fish specie</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {batchData?.fish_specie}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Fish type */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Fish type</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {batchData?.fish_type}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Total Capital */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Total Capital</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    N
                    {finData?.total_capital
                      ? formatCurrency(finData?.total_capital)
                      : "0.00"}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Total Expenses */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Total Expenses</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    N
                    {finData?.total_expenses
                      ? formatCurrency(finData?.total_expenses)
                      : "0.00"}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Total Profit */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Total Profit</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    N
                    {finData?.total_profit > 0
                      ? formatCurrency(finData?.total_profit)
                      : "0.00"}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Total Kg */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Total Kg</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {finData?.total_kg}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Total Pcs after harvest */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">
                Total Pieces after harvest
              </p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {finData?.total_pc}
                  </h2>
                </>
              )}
            </div>
          </div>

          {/* Total Feed */}
          <div className="card relative bg-white p-6 rounded-xl flex lg:items-center lg:space-x-4 space-x-6">
            <div className="stat">
              <p className="text-gray-400 lg:text-sm text-xs">Total Feed</p>
              {isLoading ? (
                <Skeleton className="h-6 w-[50px] bg-gray-200" />
              ) : (
                <>
                  <h2 className="font-bold text-[--primary] lg:text-lg text-base">
                    {finData?.total_feed}
                  </h2>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg my-8">
          <h2 className="font-bold my-4 text-[--primary]">
            Feed Inventory for {batchData?.name}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Size (mm)</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finData?.inventories?.map((data: any) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium text-sm">
                    {formatDate(data?.date)}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {data?.brand}
                  </TableCell>
                  <TableCell className="text-sm">{data?.size}</TableCell>
                  <TableCell className="text-right text-sm">
                    {data?.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default BatchDetails;
