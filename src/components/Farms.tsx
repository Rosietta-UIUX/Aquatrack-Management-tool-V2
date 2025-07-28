import React, { useState } from "react";
import {
  useDeleteFarmMutation,
  useGetAllFarmsQuery,
} from "@/redux/services/farmApiSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { IoIosArrowDown } from "react-icons/io";
import { GiCirclingFish } from "react-icons/gi";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import EditFarmModal from "./EditFarmModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import EditOrgModal from "./EditOrgModal";

const Farms = () => {
  const [deleteFarm] = useDeleteFarmMutation();
  const { data, refetch } = useGetAllFarmsQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const [openOrg, setOpenOrg] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [farmData, setFarmData] = useState();
  const [orgData, setOrgData] = useState();

  const handleEdit = (value: any) => {
    if (value?.name) {
      setFarmData(value);
      setOpenEdit(true);
    }
  };
  const handleEditOrg = (value: any) => {
    if (value) {
      setOrgData(value);
      setOpenOrg(true);
    }
  };

  const handleDelete = async (value: any) => {
    try {
      await deleteFarm({ farmId: value?.id }).unwrap();
      refetch();
      toast.success("Deleted ✔️");
    } catch (error) {}
  };

  return (
    <section className="mt-10">
      {farmData && (
        <EditFarmModal data={farmData} open={openEdit} setOpen={setOpenEdit} />
      )}
      {orgData && (
        <EditOrgModal data={orgData} open={openOrg} setOpen={setOpenOrg} />
      )}
      <Accordion
        type="single"
        collapsible
        className="w-full border-none underline-none bg-white border rounded-lg p-4 pb-0">
        {data?.data?.organizations?.map((org: any, index: any) => (
          <AccordionItem key={org?.id} value={org?.id}>
            <div className="flex items-center justify-between  w-full">
              <AccordionTrigger className="rounded-lg py-4 px-2 border-none w-full hover:bg-gray-100">
                <label
                  className={`text-sm flex items-center cursor-pointer w-full `}>
                  <GiCirclingFish className="text-gray-500 h-6 w-6 mr-2 " />
                  <span className="text-sm font-bold">
                    {org?.attributes?.organization_name}
                  </span>
                </label>
                <IoIosArrowDown />
              </AccordionTrigger>
              <MdOutlineEdit
                className="h-6 w-6 cursor-pointer text-[--primary] "
                onClick={() => handleEditOrg(org)}
              />
            </div>

            {org?.farms?.map((farm: any) => (
              <AccordionContent
                key={farm?.id}
                className="flex items-center justify-between p-0 space-0">
                <div
                  className={` hover:bg-blue-100 rounded-lg w-10/12 py-4 px-4 flex items-center  border-none font-medium cursor-pointer`}>
                  <FaArrowAltCircleUp className="text-gray-400 h-4 w-4 mr-2 " />
                  <p className="lg:text-base text-sm font-bold">{farm?.name}</p>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <MdOutlineEdit
                    className="h-6 w-6 cursor-pointer text-[--primary] "
                    onClick={() => handleEdit(farm)}
                  />

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <MdDelete className="text-xl text-red-400 cursor-pointer" />
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
                          onClick={() => handleDelete(farm)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Farms;
