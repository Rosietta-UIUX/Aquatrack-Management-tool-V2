"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import AddPurchaseModal from "../@addPurchaseModal/page";
import FeedsTable from "../@feedsTable/page";
import DeleteModal from "../@deleteModal/page";
import { useDeleteAllFeedsMutation, useGetFeedsQuery } from "@/redux/services/feedRecordApiSlice";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { searchTableData } from "@/utils";
import toast from "react-hot-toast";
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
import PaginationTab from "@/components/PaginationTab";

const FeedRecord = ({ farmId }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteAllFeeds] = useDeleteAllFeedsMutation();
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { data, isLoading } = useGetFeedsQuery({
    farmId,
    params: currentPage,
    batch,
  });
  const { data: batches } = useGetAllBatchsDataQuery({ farmId });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(
      selectAll ? [] : data?.data?.data?.map((item: { id: any }) => item.id)
    );
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

  const handleAllDelete = async () => {
    const formdata = {
      model: "inventories",
      ids: selectedItems,
    };

    try {
      if (selectedItems?.length > 0) {
        await deleteAllFeeds({ formdata });
        toast.success("Deleted ✔️");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Something went wrong please try again or check your network connection"
      );
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [batch, setBatch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(searchTableData(data?.data?.data, query));
  };

  return (
    <div>
      <AddPurchaseModal farmId={farmId} open={open} setOpen={setOpen} />
      <DeleteModal open={openDel} setOpen={setOpenDel} />
      {/* Header section */}
      <Select onValueChange={(e) => setBatch(e)}>
        <SelectTrigger className=" h-10 border-gray-400 bg-white lg:w-[100px] w-[150px]">
          <SelectValue placeholder="Batch" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {batches?.data.map(
              (item: { id: string; batch_name: string }) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.batch_name}
                </SelectItem>
              )
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <section className="grid grid-cols-1 lg:flex lg:items-center justify-between gap-8 mt-8">
        <div className="flex items-center justify-between space-x-6 lg:w-8/12 w-full">
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
        <div className="flex lg:items-center items-start lg:justify-around">
          <div className="btns space-x-6 hidden lg:flex">
            <Button
              onClick={() => setOpen(true)}
              className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
              + Add new purchase
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

      <div className="table w-full lg:mt-20 mt-0">
        {isLoading ? (
          <section className="mt-10 w-full mx-auto">
            <div className="space-y-2 bg-white p-6 rounded-xl">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
            </div>
          </section>
        ) : (
          <div>
            <FeedsTable
              data={filteredData?.length > 0 ? filteredData : data?.data?.data}
              farmId={farmId}
              selectedItems={selectedItems}
              toggleSelectAll={toggleSelectAll}
              handleCheckboxChange={handleCheckboxChange}
              selectAll={selectAll}
            />
            <PaginationTab
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={data?.data?.meta?.total}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedRecord;
