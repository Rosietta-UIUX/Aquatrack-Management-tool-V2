"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import HarvestList from "./@harvestList/page";
import NavHeader from "@/components/NavHeader";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { useGetHarvestQuery } from "@/redux/services/harvestApiSlice";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import AddCustomerModal from "@/components/AddCustomerModal";
import {
  useGetCustomersQuery,
  useDeleteAllCustomerMutation,
} from "@/redux/services/customerApiSlice";
import { searchTableData } from "@/utils";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import { IoArrowBackSharp } from "react-icons/io5";
import fetchToken from "@/lib/auth";
import axios from "axios";
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
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import CustomerStats from "@/components/CustomerStats";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { AiOutlinePlus } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import PaginationTab from "@/components/PaginationTab";
import AddBeneficaryModal from "@/components/AddBeneficaryModal";

const HarvestSinglePage = ({ params }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteAllCustomer] = useDeleteAllCustomerMutation();
  const [csvData, setCsvData] = useState("");
  const { data } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const { data: harvestData } = useGetHarvestQuery(
    {
      farmId: defaultFarmId,
      harvestId: params?.id,
    },
    {
      skip: !defaultFarmId || !params?.id,
    }
  );

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(
      selectAll
        ? []
        : customerData?.data?.data.map((item: { id: any }) => item.id)
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

  // console.log()
  const { data: customerData } = useGetCustomersQuery(
    {
      farmId: defaultFarmId,
      harvestId: params?.id,
      params: currentPage,
    },
    {
      skip: !defaultFarmId || !params?.id,
    }
  );
  const [open, setOpen] = useState(false);
  const [openBeneficary, setOpenBeneficary] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(searchTableData(customerData?.data?.data, query));
  };

  useEffect(() => {
    handleDownloadSheet();
  }, [harvestData]);

  const handleDownloadSheet = async () => {
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/farmer/${defaultFarmId}/harvest/${params?.id}/customer?export=csv`,
        {
          headers,
        }
      );
      setCsvData(res?.data);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAllDelete = async () => {
    const formdata = {
      model: "customers",
      ids: selectedItems,
    };

    try {
      if (selectedItems?.length > 0) {
        await deleteAllCustomer({ formdata });
        toast.success("Deleted ✔️");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Something went wrong please try again or check your network connection"
      );
    }
  };

  const handleAddBeneficiary = () => {
    setOpenBeneficary(true);
  };

  return (
    <>
      <NavHeader />
      <main className="w-11/12 mx-auto mt-8 ">
        <AddCustomerModal
          farmId={defaultFarmId}
          harvestId={params?.id}
          open={open}
          setOpen={setOpen}
        />
        <AddBeneficaryModal
          farmId={defaultFarmId}
          harvestId={params?.id}
          open={openBeneficary}
          setOpen={setOpenBeneficary}
        />
        <div className="flex items-center justify-between">
          <Link href="/account/harvest">
            <Button
              variant="ghost"
              className="space-x-2 text-[--primary] font-semibold">
              <IoArrowBackSharp className="h-6 w-6" />
              <span>Back</span>
            </Button>
          </Link>
          <Button
            onClick={downloadCsv}
            disabled={!csvData}
            className="bg-[#387C59] hover:bg-[#387C59] lg:py-6 px-8 text-xs">
            Download sheet
          </Button>
        </div>
        <CustomerStats data={harvestData?.data} />
        {/* Header section */}
        <section className="flex items-center justify-between lg:gap-8 mt-8">
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
          </div>
          <div className="flex lg:items-center items-start lg:justify-around space-x-6">
            <Menubar className="border-none shadow-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger>
                  <Button className="bg-none px-6 py-5 bg-[--primary] hover:bg-[--primary] hidden lg:flex space-x-4">
                    <span>Add new customer</span>{" "}
                    <MdOutlineKeyboardArrowDown className="h-6 w-6" />
                  </Button>

                  <Button className="px-2 py-5 bg-[--primary] hover:bg-[--primary] lg:hidden flex">
                    <FaPlus className="w-6 h-6" />
                  </Button>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => setOpen(true)}
                    className="flex items-center font-normal cursor-pointer ">
                    <AiOutlinePlus className="text-gray-500 h-4 w-4 mr-2 " />
                    Add new customer
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    onClick={handleAddBeneficiary}
                    className="flex items-center font-normal cursor-pointer ">
                    <CiStar className="text-gray-500 h-6 w-6 mr-2 " />
                    Choose beneficiary
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <div className="hidden lg:flex">
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

            <div className="btns space-x-4 lg:hidden flex">
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
        </section>
      </main>
      {customerData?.data?.data?.length > 0 ? (
        <>
          <div className="table lg:w-11/12 w-12/12 mx-auto lg:mt-20 mt-10 mb-10">
            <HarvestList
              data={
                filteredData?.length > 0
                  ? filteredData
                  : customerData?.data?.data
              }
              harvestId={params?.id}
              farmId={defaultFarmId}
              toggleSelectAll={toggleSelectAll}
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
              selectAll={selectAll}
            />
            <div>
              <PaginationTab
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={customerData?.data?.meta?.last_page}
              />
            </div>
          </div>
        </>
      ) : (
        <section className="h-[40vh] w-full flex items-center justify-center">
          <div className="relative lg:w-6/12 w-10/12 mx-auto">
            <div className="text absolute top-14 w-full text-center">
              <h2 className="font-bold text-2xl mb-2">No Customer Added</h2>
              <p>
                There are no customer here yet. However, once there are any,
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
    </>
  );
};

export default HarvestSinglePage;
