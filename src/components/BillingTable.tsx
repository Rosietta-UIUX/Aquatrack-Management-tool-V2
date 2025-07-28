import fetchToken from "@/lib/auth";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormater, dateFormaterAndTime, formatCurrency } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Link from "next/link";

const BillingTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, statusFilter, paymentMethodFilter, typeFilter]);

  const fetchData = async (page: any) => {
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };

      const params = new URLSearchParams({
        page,
        status: statusFilter,
        payment_method: paymentMethodFilter,
        type: typeFilter,
      });

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/farmer/billing-history?${params.toString()}`,
        { headers }
      );
      const result = await response.json();
      setData(result?.data?.transaction_history?.data);
      setTotalPages(result?.data?.transaction_history?.meta?.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    // Previous Button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          className="lg:text-base text-sm"
          href="#"
          onClick={() => handlePrevPage()}
          // disabled={currentPage === 1}
        />
      </PaginationItem>
    );

    // Page Numbers
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={currentPage === page}
            onClick={() => handlePageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next Button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          onClick={() => handleNextPage()}
          // disabled={currentPage === totalPages}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="lg:my-20 my-10 ">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Billing history</h2>
      </div>
      <div className="mt-6 rounded-lg">
        <div className="overflow-hidden border border-gray-300 rounded-lg bg-white">
          <Table className="w-full rounded-lg overflow-hidden">
            <TableHeader className="px-4">
              <TableRow>
                <TableHead className="lg:py-6 lg:pl-8 pl-4 text-black lg:text-xs text-[10px] font-semibold">
                  S/N
                </TableHead>
                <TableHead className="text-black lg:text-xs text-[10px] font-semibold">
                  Start Date
                </TableHead>
                <TableHead className="text-black lg:text-xs text-[10px] font-semibold">
                  End Date
                </TableHead>
                <TableHead className=" text-black lg:text-xs text-[10px] font-semibold">
                  Plan
                </TableHead>
                <TableHead className=" text-black lg:text-xs text-[10px] font-semibold">
                  Amount
                </TableHead>
                <TableHead className=" text-black lg:text-xs text-[10px] font-semibold">
                  <div className="flex">
                    <span className="lg:flex hidden mr-4">Payment</span> Method
                  </div>
                </TableHead>
                <TableHead className=" text-black lg:text-xs text-[10px] font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white pl-8">
              {data?.map((item: any, index) => (
                <TableRow key={item?.id}>
                  <TableCell className="lg:text-xs lg:py-4 text-[10px] lg:pl-8 pl-4">
                    {index + 1}
                  </TableCell>
                  <TableCell className="lg:w-[200px]">
                    <span className="lg:text-xs text-[10px]">
                      {dateFormater(item?.start_date)}
                    </span>
                  </TableCell>
                  <TableCell className="lg:w-[200px]">
                    <span className="lg:text-xs text-[10px]">
                      {dateFormater(item?.end_date)}
                    </span>
                  </TableCell>
                  <TableCell className="lg:w-[200px]">
                    <span className="bg-gray-200 lg:px-6 py-1 px-2 font-semibold capitalize lg:text-xs text-[10px] rounded-md">
                      {item?.type}
                    </span>
                  </TableCell>
                  <TableCell className="lg:text-xs text-[10px]">
                    {formatCurrency(item?.amount)}
                  </TableCell>
                  <TableCell className="lg:text-xs text-[10px]">
                    {item?.payment_method}
                  </TableCell>

                  <TableCell className="text-xs ">
                    {item?.status === "active" ? (
                      <span className="text-green-700 lg:text-xs text-[8px] capitalize font-semibold">
                        {item?.status}
                      </span>
                    ) : item?.status === "pending" ? (
                      <span className="text-orange-500 font-semibold lg:text-xs text-[8px] capitalize">
                        {item?.status}
                      </span>
                    ) : (
                      <span className="text-red-700 font-semibold lg:text-xs text-[8px] capitalize ">
                        {item?.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-8">
          <div className="">
            <Pagination className="w-auto rounded-lg">
              <PaginationContent>{renderPaginationItems()}</PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTable;
