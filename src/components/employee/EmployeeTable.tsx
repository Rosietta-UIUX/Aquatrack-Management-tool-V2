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
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import { dateFormaterAndTime } from "@/utils";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";

interface TableData {
  id: number;
  date: string;
  name: string;
  unitPurchased: number;
  fishType: string;
  status: string;
}

interface TableProps {
  data: any[];
  farmId: string;
}

const EmployeeTable: React.FC<TableProps> = ({ data, farmId }) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editData, setEditData] = useState({});
  const [employeeId, seteEmployeeId] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data.map((item) => item.id));
  };

  const handleCheckboxChange = (id: number) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems: number[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = [
        ...selectedItems.slice(0, selectedIndex),
        ...selectedItems.slice(selectedIndex + 1),
      ];
    }

    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === data.length);
  };

  const handleEdit = (value: any) => {
    setEditData(value);
    setOpen(true);
  };

  const handleDelete = (id: any) => {
    if (id) {
      seteEmployeeId(id);
      setOpenDel(true);
    }
  };

  return (
    <div className="bg-gray-50 border-collapse border border-gray-300 pt-6 pb-4 rounded-xl mb-6">
      {editData && (
        <EditEmployeeModal
          open={open}
          setOpen={setOpen}
          farmId={farmId}
          editData={editData}
        />
      )}
      <DeleteEmployeeModal
        open={openDel}
        setOpen={setOpenDel}
        employeeId={employeeId}
        farmId={farmId}
      />
      {data?.length > 0 ? (
        <Table className="w-full">
          <TableHeader className="">
            <TableRow>
              <TableHead className="py-4 lg:pl-8 pl-4 text-black ">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="mr-1 w-4 h-4"
                />
              </TableHead>
              <TableHead className="text-black font-bold lg:text-sm text-xs">
                Name
              </TableHead>
              <TableHead className="text-black font-bold lg:text-sm text-xs">
                Email
              </TableHead>
              <TableHead className="text-black font-bold lg:text-sm text-xs">
                Phone
              </TableHead>
              <TableHead className="text-black font-bold lg:text-sm text-xs">
                Role
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
                  <TableCell className="py-4 lg:text-sm text-xs">
                    {item?.attributes?.first_name} {item?.attributes?.last_name}
                  </TableCell>
                  <TableCell className="py-4 lg:text-sm text-xs">
                    {item?.attributes?.email}
                  </TableCell>
                  <TableCell className="py-4 lg:text-sm text-xs">
                    {item?.attributes?.phone_number}
                  </TableCell>
                  <TableCell className="py-4 lowercase lg:text-sm text-xs">
                    {item?.attributes?.role}
                  </TableCell>
                  <TableCell className="py-4 lg:text-sm text-xs flex items-center space-x-4">
                    <span
                      className={`${
                        item?.attributes?.status === "in stock"
                          ? `bg-blue-100 text-blue-400`
                          : `bg-red-100 text-red-400`
                      } rounded-full py-2 px-3 text-xs font-semibold`}>
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

export default EmployeeTable;
