"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteModal from "../@deleteModal/page";
import { dateFormaterAndTime } from "@/utils";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import EditFeedModal from "@/components/EditFeedModal";
import PaginationTab from "@/components/PaginationTab";

interface TableData {
  id: number;
  // date: string;
  name: string;
  quantity: number;
  size: string;
  status: string;
}

interface TableProps {
  data: any[];
  farmId: string;
  selectedItems: any;
  toggleSelectAll: any;
  handleCheckboxChange: any;
  selectAll: any;
}

const FeedsTable: React.FC<TableProps> = ({
  data,
  farmId,
  selectedItems,
  toggleSelectAll,
  handleCheckboxChange,
  selectAll,
}) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editData, setEditData] = useState();
  const [feedID, setFeedID] = useState(false);

  const handleEdit = (value: any) => {
    if (value) {
      setEditData(value);
      setOpen(true);
    }
  };

  const handleDelete = (id: any) => {
    if (id) {
      setFeedID(id);
      setOpenDel(true);
    }
  };

  return (
    <div>
      <EditFeedModal
        farmId={farmId}
        editdata={editData}
        open={open}
        setOpen={setOpen}
      />
      <DeleteModal
        open={openDel}
        setOpen={setOpenDel}
        farmId={farmId}
        feedId={feedID}
      />
      {data?.length > 0 ? (
        <div>
          <div className="bg-gray-50 border-collapse border border-gray-300 pt-6 pb-4 rounded-xl mb-6">
            <Table className="w-full">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="lg:pl-8 pl-4 text-black ">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="mr-1 w-4 h-4"
                    />
                  </TableHead>
                  <TableHead className="text-black font-semibold lg:text-sm text-xs">
                    Date
                  </TableHead>
                  <TableHead className="text-black font-semibold lg:text-sm text-xs">
                    Brand
                  </TableHead>
                  <TableHead className="text-black font-semibold lg:text-sm text-xs">
                    <div className="flex">
                      Size <span className="lg:flex hidden ml-2">(mm)</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-black font-semibold lg:text-sm text-xs">
                    Quantity
                  </TableHead>
                </TableRow>
              </TableHeader>
              {data ? (
                <TableBody className="bg-white pl-8">
                  {data?.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="py-4 lg:pl-8 pl-4 w-6">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                          className="mr-1 w-4 h-4"
                        />
                      </TableCell>
                      <TableCell className="py-4 text-sm">
                        {dateFormaterAndTime(item?.attributes?.created_at)}
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs">
                        {item?.attributes?.name}
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs">
                        {item?.attributes?.size}mm
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs">
                        {item?.attributes?.quantity} Bags
                      </TableCell>
                      <TableCell className="py-4 flex items-center space-x-4">
                        <span
                          className={`${
                            item?.attributes?.status === "in stock"
                              ? `bg-blue-100 text-blue-400`
                              : `bg-red-100 text-red-400`
                          } rounded-full lg:py-2 lg:px-3 py-1 px-2 text-xs font-semibold`}>
                          {item?.attributes?.status}
                        </span>
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
          </div>
        </div>
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

export default FeedsTable;
