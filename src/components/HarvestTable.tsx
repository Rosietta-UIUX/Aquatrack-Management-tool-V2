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
import { reverseArray, searchHarvestTableData } from "@/utils";
import CreateFarmState from "./CreateFarmState";
import { Button } from "./ui/button";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import DeleteHarvestModal from "@/components/DeleteHarvestModal";
import AddHarvestModal from "@/components/AddHarvestModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import HarvestStats from "@/components/HarvestStats";
import { Input } from "./ui/input";
import { IoMdSearch } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useDeleteAllHarvestMutation } from "@/redux/services/harvestApiSlice";
import { MdOutlineEdit } from "react-icons/md";
import EditHarvestModal from "./EditHarvestModal";

interface TableProps {
  data: any[];
  farmId: any[];
  isLoading: boolean;
  stats: any;
}

const HarvestTable: React.FC<TableProps> = ({
  data,
  farmId,
  isLoading,
  stats,
}) => {
  const [deleteAllHarvest] = useDeleteAllHarvestMutation();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editdata, setEditData] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const reversedArray = reverseArray(
    filteredData?.length > 0 ? filteredData : data
  );

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data?.map((item) => item?.id));
  };

  const handleCheckboxChange = (id: number) => {
    const selectedIndex = selectedItems?.indexOf(id);
    let newSelectedItems: number[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = [
        ...selectedItems?.slice(0, selectedIndex),
        ...selectedItems?.slice(selectedIndex + 1),
      ];
    }

    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems?.length === data?.length);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(searchHarvestTableData(data, query));
  };

  const handleAllDelete = async () => {
    const formdata = {
      model: "harvests",
      ids: selectedItems,
    };

    try {
      if (selectedItems?.length > 0) {
        await deleteAllHarvest({ formdata });
        toast.success("Deleted ✔️");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Something went wrong please try again or check your network connection"
      );
    }
  };

  const handleEdit = (value: any) => {
    if (value) {
      setEditData(value);
      setOpenEdit(true);
    }
  };

  return (
    <div className="">
      {farmId ? (
        <>
          <AddHarvestModal farmId={farmId} open={open} setOpen={setOpen} />
          {editdata && (
            <EditHarvestModal
              editdata={editdata}
              farmId={farmId}
              open={openEdit}
              setOpen={setOpenEdit}
            />
          )}
          <DeleteHarvestModal open={openDel} setOpen={setOpenDel} />
          <HarvestStats data={stats} isLoading={isLoading} />
          {/* Header section */}
          <section className="grid grid-cols-1 lg:flex lg:items-center justify-between gap-8 mt-8">
            <div className="flex items-center space-x-6 lg:w-7/12 w-full">
              <div className="flex items-center bg-white py-2 px-4 rounded-lg w-full">
                <IoMdSearch className="w-6 h-6 text-gray-500" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search"
                  className="border-none bg-transparent outline-none shadow-none"
                />
              </div>
              <div className="btns space-x-4 lg:hidden flex">
                <Button
                  onClick={() => setOpen(true)}
                  className="px-2 py-5 bg-[--primary] hover:bg-[--primary]">
                  <FaPlus className="w-6 h-6" />
                </Button>
                {selectedItems?.length > 0 ? (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        disabled={false}
                        className="px-2 py-5 bg-red-500 hover:bg-red-400">
                        <RiDeleteBinLine className="w-6 h-6" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="text-red-500 bg-red-100"
                          onClick={handleAllDelete}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button
                    disabled={true}
                    className="px-2 py-5 bg-red-500 hover:bg-red-400">
                    <RiDeleteBinLine className="w-6 h-6" />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex lg:items-center items-start lg:justify-around">
              <div className="btns space-x-6 hidden lg:flex">
                <Button
                  onClick={() => setOpen(true)}
                  className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
                  + Add new harvest
                </Button>
                {selectedItems?.length > 0 ? (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        disabled={false}
                        className="px-6 py-5 bg-red-500 hover:bg-red-400">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="text-red-500 bg-red-100"
                          onClick={handleAllDelete}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button
                    disabled={true}
                    className="px-6 py-5 bg-red-500 hover:bg-red-400">
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </section>

          <div className="w-full lg:mt-20 mb-10 ">
            {data?.length > 0 ? (
              <>
                <h2 className="text-[--primary] font-bold lg:text-xl text-base mb-4 ">
                  Harvest History
                </h2>
                <div className="w-full mx-auto overflow-hidden">
                  <Table className="lg:w-full w-full bg-gray-50 border-collapse border border-gray-300 ">
                    <TableHeader className="">
                      <TableRow>
                        <TableHead className="py-4 lg:pl-8 pl-2 text-black">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                            className="mr-1 w-4 h-4"
                          />
                        </TableHead>
                        <TableHead className="py-4 text-black lg:text-left font-semibold lg:text-base text-xs lg:flex hidden">
                          Date
                        </TableHead>
                        <TableHead className="py-4 text-black lg:text-left font-semibold lg:text-base text-xs">
                          Name
                        </TableHead>
                        <TableHead className="py-4 text-black lg:text-left font-semibold lg:text-base text-xs">
                          Batch
                        </TableHead>
                        <TableHead className="py-4 text-nowrap text-black lg:text-left font-semibold lg:text-base text-xs">
                          Total Sales
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {data ? (
                      <TableBody className="bg-white lg:pl-8 p-0 w-full lg:text-left text-center ">
                        {reversedArray?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="py-4 lg:pl-8 pl-2 w-0">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                className="mr-1 w-4 h-4"
                              />
                            </TableCell>
                            <TableCell className="py-4 lg:text-base text-xs text-nowrap lg:flex hidden">
                              {item?.date}
                            </TableCell>
                            <TableCell className="py-4 lg:text-base text-xs text-nowrap">
                              {item?.name}
                            </TableCell>
                            <TableCell className="py-4 lg:text-base text-xs text-nowrap">
                              {item?.batch?.name}
                            </TableCell>
                            <TableCell className="py-4 lg:text-base text-xs text-nowrap">
                              {item?.total_sales}
                            </TableCell>
                            <TableCell className="py-4 lg:hidden flex">
                              <Link
                                href={`/account/harvest/${item.id}`}
                                className="text-[--primary] text-sm ">
                                view
                              </Link>
                            </TableCell>
                            <TableCell className="py-4 lg:flex hidden">
                              <Link
                                href={`/account/harvest/${item.id}`}
                                className="border border-[--primary] text-[--primary] lg:py-2 lg:px-4 px-2 lg:text-sm text-xs rounded-lg ">
                                view details
                              </Link>
                            </TableCell>
                            <TableCell className="">
                              <MdOutlineEdit
                                onClick={() => handleEdit(item)}
                                className=" text-[--primary] lg:h-8 lg:w-8 h-5 w-5 cursor-pointer ">
                                Edit
                              </MdOutlineEdit>
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
              </>
            ) : (
              <section className="h-[70vh] flex items-center justify-center">
                <div className="relative lg:w-6/12 w-10/12 mx-auto">
                  <div className="text absolute top-14 w-full text-center">
                    <h2 className="font-bold text-2xl mb-2">
                      No Harvest Added
                    </h2>
                    <p>
                      There are no harvest here yet. However, once there are
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
            )}
          </div>
        </>
      ) : (
        <CreateFarmState vheight="70vh" />
      )}
    </div>
  );
};

export default HarvestTable;
