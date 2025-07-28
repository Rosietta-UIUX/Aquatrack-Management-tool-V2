"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteModal from "../@deleteModal/page";
import { dateFormaterAndTime, formatCurrency } from "@/utils";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import EditExpensesModal from "@/components/EditExpensesModal";

const ExpensesTable: React.FC<any> = ({
  data,
  farmId,
  selectedItems,
  toggleSelectAll,
  handleCheckboxChange,
  selectAll,
}) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editData, setEditData] = useState({});
  const [expenseID, setExpense] = useState(false);

  const handleEdit = (value: any) => {
    setEditData(value);
    setOpen(true);
  };

  const handleDelete = (id: any) => {
    if (id) {
      setExpense(id);
      setOpenDel(true);
    }
  };

  return (
    <div className="bg-gray-50 border-collapse border border-gray-300 pb-4 rounded-xl">
      {editData && (
        <EditExpensesModal
          editData={editData}
          open={open}
          farmId={farmId}
          setOpen={setOpen}
        />
      )}
      <DeleteModal
        open={openDel}
        setOpen={setOpenDel}
        farmId={farmId}
        expenseId={expenseID}
      />
      {data?.length > 0 ? (
        <Table className="w-full">
          <TableHeader className="">
            <TableRow>
              {/* <TableHead className="py-4 lg:pl-8 pl-4 text-black ">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="mr-1 w-4 h-4"
                />
              </TableHead> */}
              <TableHead className="py-4 lg:pl-8 pl-4 text-black font-bold lg:text-base text-xs">
                Date
              </TableHead>
              <TableHead className="py-4 text-black font-bold lg:text-base text-xs">
                Description
              </TableHead>
              <TableHead className="py-4 text-black font-bold lg:text-base text-xs">
                Amount <span className="lg:flex hidden">spent</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          {data ? (
            <TableBody className="bg-white pl-8">
              {data?.map((item: any) => (
                <TableRow key={item.id}>
                  {/* <TableCell className="py-4 lg:pl-8 pl-4 w-6">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item?.id)}
                      onChange={() => handleCheckboxChange(item?.id)}
                      className="mr-1 w-4 h-4"
                    />
                  </TableCell> */}
                  <TableCell className="py-4 lg:pl-8 pl-4 lg:text-base text-xs">
                    {dateFormaterAndTime(item?.attributes?.created_at)}
                  </TableCell>
                  <TableCell className="py-4 lg:text-base text-xs">
                    {item?.attributes?.description}
                  </TableCell>
                  <TableCell className="py-4 lg:text-base text-xs">
                    {formatCurrency(item?.attributes?.total_amount)}
                  </TableCell>
                  <TableCell className="py-4 flex items-center space-x-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-xl">
                        <BiDotsVerticalRounded />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(item?.id)}
                          className="text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody className="bg-white pl-8">
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      ) : (
        <section className="h-[70vh] flex items-center justify-center">
          <div className="relative lg:w-6/12 w-10/12 mx-auto">
            <div className="text absolute top-14 w-full text-center">
              <h2 className="font-bold text-2xl mb-2">No Feed Added</h2>
              <p>
                There are no feed data yet. However, once there are any, they
                will be displayed here.
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
      )}
    </div>
  );
};

export default ExpensesTable;
