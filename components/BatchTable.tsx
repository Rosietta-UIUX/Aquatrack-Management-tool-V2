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
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { reverseArray, searchTableData } from "@/utils";
import { Skeleton } from "./ui/skeleton";
import DeleteModal from "./DeleteModal";
import DeleteBatchModal from "./DeleteBatchModal";
import EditBatchModal from "./EditBatchModal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
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
import {
  useDeleteAllBatchMutation,
  useGetAllBatchsQuery,
} from "@/redux/services/batchApiSlice";
import AddBatchModal from "./AddBatchModal";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import CreateFarmState from "@/components/CreateFarmState";
import toast from "react-hot-toast";
import PaginationTab from "./PaginationTab";
import Link from "next/link";
import { LuView } from "react-icons/lu";

interface TableData {
  id: number;
  attributes: {
    date_purchased: string;
    name: string;
    unit_purchase: number;
    fish_type: string;
    status: string;
  };
}

interface TableProps {
  data: TableData[];
  filterData?: any[];
  isLoading: boolean;
  farmId: string;
}

const BatchTable: React.FC<TableProps> = ({ data, isLoading, farmId }) => {
  const [deleteAllBatch] = useDeleteAllBatchMutation();
  const [open, setOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEd, setOpenEd] = useState(false);
  const [batchID, setBatchID] = useState("");
  const [batchData, setBatchData] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [filteredData, setFilteredData] = useState<string>("");
  // const [filteredValue, setFilteredValue] = useState<string>("");

  const { data: batches } = useGetAllBatchsQuery({
    farmId,
    params: searchQuery,
  });

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data?.map((item: any) => item?.id));
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

  const handleDelete = (batchId: any) => {
    if (batchId) {
      setOpenDel(true);
      setBatchID(batchId);
    }
  };

  const handleAllDelete = async () => {
    const formdata = {
      model: "batches",
      ids: selectedItems,
    };

    try {
      if (selectedItems?.length > 0) {
        await deleteAllBatch({ formdata });
        toast.success("Deleted ✔️");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Something went wrong please try again or check your network connection"
      );
    }
  };

  const handleEdit = (batchData: any) => {
    if (batchData?.id) {
      setOpenEd(true);
      setBatchData(batchData);
    }
  };

  const handleSearch = (query: string) => {
    const lowercaseQuery = query?.toLowerCase();

    setSearchQuery(lowercaseQuery);
    // setFilteredData(searchTableData(data, query));
  };

  // const filteredBatches = batches?.data?.filter((item: any) =>
  //   item?.attributes?.name?.toLowerCase()?.includes(searchQuery)
  // );

  return (
    <>
      {/* Header section */}
      <section className="grid grid-cols-1 lg:flex lg:items-center justify-between gap-8 ">
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
                      This action cannot be undone. This will permanently delete
                      this data.
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
        <div className="flex lg:items-center items-start lg:justify-around space-x-4">
          <div className="btns space-x-6 hidden lg:flex">
            <Button
              onClick={() => setOpen(true)}
              className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
              + Add new batch
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
                      This action cannot be undone. This will permanently delete
                      this data.
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
      <AddBatchModal farmId={farmId} open={open} setOpen={setOpen} />
      <DeleteBatchModal
        open={openDel}
        setOpen={setOpenDel}
        batchID={batchID}
        farmId={farmId}
      />

      {batchData && (
        <EditBatchModal
          open={openEd}
          setOpen={setOpenEd}
          batchData={batchData}
          farmId={farmId}
        />
      )}
      <>
        {isLoading ? (
          <>
            <Skeleton className="w-full h-12 bg-gray-100" />
            <Skeleton className="w-full h-12 bg-gray-100" />
            <Skeleton className="w-full h-12 bg-gray-100" />
            <Skeleton className="w-full h-12 bg-gray-100" />
          </>
        ) : batches?.data?.length > 0 ? (
          <div className="bg-gray-50 border-collapse border border-gray-300 lg:pt-6 lg:pb-4 mb-20 rounded-xl  lg:mt-20 mt-5 w-full mx-auto ">
            <Table className="w-full">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="lg:py-4 lg:pl-8 text-black">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="mr-1 w-4 h-4"
                    />
                  </TableHead>
                  <TableHead className="py-4 text-black lg:text-sm text-xs">
                    Date
                  </TableHead>
                  <TableHead className="py-4 text-black lg:text-sm text-xs">
                    Name
                  </TableHead>
                  <TableHead className="py-4 text-black text-nowrap flex gap-x-2 lg:text-sm text-xs">
                    Unit <span className="hidden lg:block">Purchased</span>
                  </TableHead>
                  <TableHead className="py-4 text-black text-nowrap lg:text-sm text-xs">
                    Fish Type
                  </TableHead>
                  <TableHead className="py-4 text-black lg:text-sm text-xs">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? (
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
              ) : (
                <TableBody className="bg-white lg:pl-8">
                  {batches?.data?.map((item: any) => (
                    <TableRow key={item?.id}>
                      <TableCell className="py-4 lg:pl-8">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item?.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                          className="mr-1 w-4 h-4"
                        />
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs text-nowrap ">
                        {item?.attributes?.date_purchased}
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs">
                        {item?.attributes?.name}
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs ">
                        {item?.attributes?.unit_purchase}
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs">
                        {item?.attributes?.fish_type}
                      </TableCell>
                      <TableCell className="py-4 lg:text-sm text-xs">
                        <p
                          className={`w-full lg:h-10 px-2 py-1 lg:text-sm text-nowrap text-xs text-center ${
                            item?.attributes?.status === `sold out`
                              ? ` bg-red-100 text-red-400`
                              : `bg-[#A3EED8] text-green-700 `
                          } border-none lg:rounded-full rounded-lg  flex items-center justify-center`}>
                          {item?.attributes?.status}
                        </p>
                      </TableCell>
                      <TableCell className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <HiOutlineDotsVertical />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Link
                                prefetch={true}
                                href={`/account/batch/${item?.id}`}
                                className="space-x-2 text-blue-600 font-semibold flex flex-row">
                                <LuView className="text-blue-600 text-lg" />{" "}
                                <span className="text-xs">View Details</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(item)}
                              className="space-x-2 text-blue-600 font-bold">
                              <MdEdit className="text-blue-600 text-lg" />{" "}
                              <span className="text-xs">Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(item?.id)}
                              className="space-x-2 text-red-600 font-bold">
                              <MdDelete className="text-red-600 text-lg" />
                              <span className="text-xs">Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-24">
            <Image src={emptyImg} alt="No data" className="w-24 h-24" />
            <p className="text-sm text-gray-500 mt-4">
              {searchQuery
                ? "No batches found matching the search query."
                : "No batches available."}
            </p>
            <Button onClick={() => setOpen(true)} className="mt-6 px-4 py-2">
              Add Batch
            </Button>
          </div>
        )}

        {/* <div className="">
          {data?.length > 0 ? (
            <div className="bg-gray-50 border-collapse border border-gray-300 lg:pt-6 lg:pb-4 mb-20 rounded-xl  lg:mt-20 mt-5 w-full mx-auto ">
              <Table className="w-full">
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="lg:py-4 lg:pl-8 text-black">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="mr-1 w-4 h-4"
                      />
                    </TableHead>
                    <TableHead className="py-4 text-black lg:text-sm text-xs">
                      Date
                    </TableHead>
                    <TableHead className="py-4 text-black lg:text-sm text-xs">
                      Name
                    </TableHead>
                    <TableHead className="py-4 text-black text-nowrap flex gap-x-2 lg:text-sm text-xs">
                      Unit <span className="hidden lg:block">Purchased</span>
                    </TableHead>
                    <TableHead className="py-4 text-black text-nowrap lg:text-sm text-xs">
                      Fish Type
                    </TableHead>
                    <TableHead className="py-4 text-black lg:text-sm text-xs">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {isLoading ? (
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
                ) : (
                  <TableBody className="bg-white lg:pl-8">
                    {batches?.data?.map((item: any) => (
                      <TableRow key={item?.id}>
                        <TableCell className="py-4 lg:pl-8">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item?.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                            className="mr-1 w-4 h-4"
                          />
                        </TableCell>
                        <TableCell className="py-4 lg:text-sm text-xs text-nowrap ">
                          {item?.attributes?.date_purchased}
                        </TableCell>
                        <TableCell className="py-4 lg:text-sm text-xs">
                          {item?.attributes?.name}
                        </TableCell>
                        <TableCell className="py-4 lg:text-sm text-xs ">
                          {item?.attributes?.unit_purchase}
                        </TableCell>
                        <TableCell className="py-4 lg:text-sm text-xs">
                          {item?.attributes?.fish_type}
                        </TableCell>
                        <TableCell className="py-4 lg:text-sm text-xs">
                          <p
                            className={`w-full lg:h-10 px-2 py-1 lg:text-sm text-nowrap text-xs text-center ${
                              item?.attributes?.status === `sold out`
                                ? ` bg-red-100 text-red-400`
                                : `bg-[#A3EED8] text-green-700 `
                            } border-none lg:rounded-full rounded-lg  flex items-center justify-center`}>
                            {item?.attributes?.status}
                          </p>
                        </TableCell>
                        <TableCell className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <HiOutlineDotsVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleEdit(item)}
                                className="space-x-4 text-blue-600 font-bold">
                                <MdEdit className="text-blue-600 text-xl" />{" "}
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(item?.id)}
                                className="space-x-4 text-red-600 font-bold">
                                <MdDelete className="text-red-600 text-xl" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </div>
          ) : (
            <section className="h-[70vh] flex items-center justify-center">
              <div className="relative lg:w-6/12 w-10/12 mx-auto">
                <div className="text absolute top-14 w-full text-center">
                  <h2 className="font-bold text-2xl mb-2">No Batch Added</h2>
                  <p>
                    There are no batch here yet. However, once there are any,
                    they will be displayed here.
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
        </div> */}
        {/* <PaginationTab /> */}
      </>
    </>
  );
};

export default BatchTable;
