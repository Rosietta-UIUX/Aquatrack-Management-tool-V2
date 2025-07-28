"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import {
  useGetExpensesQuery,
  useDeleteAllExpenseMutation,
} from "@/redux/services/expenseRecordApiSlice";
import { searchTableData } from "@/utils";
import toast from "react-hot-toast";
import AddExpensesModal from "@/components/AddExpensesModal";
import DeleteModal from "@/app/account/inventory/expenses/@deleteModal/page";
import ExpensesTable from "@/app/account/inventory/expenses/@expensesTable/page";

const ExpensesRecord = ({ farmId }: any) => {
  const [deleteAllExpense] = useDeleteAllExpenseMutation();
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const { data } = useGetExpensesQuery({ farmId });

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
      model: "expenses",
      ids: selectedItems,
    };

    try {
      if (selectedItems?.length > 0) {
        await deleteAllExpense({ formdata });
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
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(searchTableData(data?.data?.data, query));
  };

  return (
    <div>
      <AddExpensesModal open={open} setOpen={setOpen} farmId={farmId} />
      <DeleteModal open={openDel} setOpen={setOpenDel} />
      {/* Header section */}
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-10">
        <div className="flex items-center space-x-6">
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
            {/* {selectedItems?.length > 0 ? (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    disabled={false}
                    className="px-2 py-5 bg-red-500 hover:bg-red-400">
                    <RiDeleteBinLine className="w-6 h-6" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="text-center">
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
            )} */}
          </div>
        </div>
        <div className="flex lg:items-center items-start lg:justify-around">
          <div className="btns space-x-6 hidden lg:flex">
            <Button
              onClick={() => setOpen(true)}
              className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
              + Add new expenses
            </Button>
            {/* <Button
              onClick={() => setOpenDel(true)}
              className="px-6 py-5 bg-red-500 hover:bg-red-400">
              Delete
            </Button> */}
          </div>
        </div>
      </section>

      <div className="table w-full lg:mt-20 mt-0">
        <ExpensesTable
          data={filteredData?.length > 0 ? filteredData : data?.data?.data}
          farmId={farmId}
          selectedItems={selectedItems}
          toggleSelectAll={toggleSelectAll}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
      </div>
    </div>
  );
};

export default ExpensesRecord;
