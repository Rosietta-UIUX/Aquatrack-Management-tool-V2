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
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsVerticalRounded } from "react-icons/bi";
import EditTeamMemberModal from "./EditTeamMember";
import DeleteTeamMemberModal from "./DeleteTeamMemberModal";

interface TableProps {
  data: any[];
}

const TeamMembersTable: React.FC<TableProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editData, setEditData] = useState({});
  const [userID, setUserID] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data?.map((item) => item.id));
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
    setSelectAll(newSelectedItems.length === data?.length);
  };

  const handleEdit = (value: any) => {
    setEditData(value);
    setOpen(true);
  };
  const handleDelete = (value: any) => {
    setUserID(value);
    setOpenDel(true);
  };

  return (
    <div className="bg-gray-50 border-collapse border border-gray-300 mt-10 lg:pt-6 pt-2 pb-4 rounded-xl">
      {editData && (
        <EditTeamMemberModal data={editData} open={open} setOpen={setOpen} />
      )}
      {userID && (
        <DeleteTeamMemberModal
          userID={userID}
          open={openDel}
          setOpen={setOpenDel}
        />
      )}
      <Table className="lg:w-full w-full overflow-scroll">
        <TableHeader className="">
          <TableRow>
            <TableHead className="py-4 lg:pl-8 pl-4 text-black lg:flex hidden">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-1 w-4 h-4"
              />
            </TableHead>
            <TableHead className="py-4 lg:pl-8 pl-4 text-black lg:text-left text-center font-semibold lg:text-sm text-xs">
              Name
            </TableHead>
            <TableHead className="py-4 text-black lg:text-left text-center font-semibold lg:text-sm text-xs">
              Email
            </TableHead>
            <TableHead className="py-4 text-black lg:text-left text-center font-semibold lg:text-sm text-xs">
              Phone number
            </TableHead>
            <TableHead className="py-4 text-black lg:text-left text-center font-semibold lg:text-sm text-xs">
              Role
            </TableHead>
          </TableRow>
        </TableHeader>
        {data ? (
          <TableBody className="bg-white lg:pl-8 p-0 w-full lg:text-left text-center ">
            {data?.map((item) => (
              <TableRow key={item.id}>
                {/* <TableCell className="py-4 lg:pl-8 pl-4 lg:flex hidden">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mr-1 w-4 h-4"
                  />
                </TableCell> */}
                <TableCell className="py-4 lg:text-sm text-xs">
                  {item?.first_name} {item?.last_name}
                </TableCell>
                <TableCell className="py-4 lg:text-sm text-xs">
                  {item?.email}
                </TableCell>
                <TableCell className="py-4 lg:text-sm text-xs">
                  {item?.phone_number}
                </TableCell>
                <TableCell className="py-4 lowercase lg:text-sm text-xs">
                  {item?.role}
                </TableCell>
                <TableCell className="py-4 lowercase lg:text-sm text-xs">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-lg">
                      <BiDotsVerticalRounded />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        Edit
                      </DropdownMenuItem>
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
  );
};

export default TeamMembersTable;
