"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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

import { IoIosArrowDown } from "react-icons/io";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { formatCurrency } from "@/utils";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  useAddBeneficiaryMutation,
  useCreatePurchaseMutation,
  useDeletePurchaseMutation,
  useEditPurchaseMutation,
} from "@/redux/services/customerApiSlice";
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
import { FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetHarvestQuery } from "@/redux/services/harvestApiSlice";
import EditCustomerModal from "@/components/EditCustomerModal";
import React from "react";
import { Loader2 } from "lucide-react";
import { useGetBeneficiariesQuery } from "@/redux/services/benefiApiSlice";
import EditPendingStatus from "@/components/EditPendingStatus";

interface RowData {
  price_per_unit: string;
  size: string;
  pieces: string;
  amount: string;
  harvestId: string;
  status: any;
}

const HarvestTable: React.FC<any> = ({
  data,
  customer,
  farmId,
  customerId,
  harvestId,
  handleCheckboxChange,
  selectedItems,
}) => {
  const { refetch } = useGetHarvestQuery({
    farmId,
    harvestId,
  });
  const [AddBeneficiary] = useAddBeneficiaryMutation();
  const [editPurchase] = useEditPurchaseMutation();
  const [createPurchase] = useCreatePurchaseMutation();
  const [deletePurchase] = useDeletePurchaseMutation();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [purchaseID, setPurchaseID] = useState<any>({});
  const [benefied, setBenefied] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [pendingForm, setPendingForm] = useState(false);
  const [pendingFormData, setPendingFormData] = useState({});
  const [rowindex, setRowIndex] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [editedRows, setEditedRows] = useState<any[]>([]); // Track edited rows
  const [hasUnsavedRow, setHasUnsavedRow] = useState(false); // Tracks if a new row is unsaved
  const { refetch: refetchBeneficary } = useGetBeneficiariesQuery({
    farmId: farmId,
  });

  useEffect(() => {
    if (data?.data) {
      // Initialize rows state with data from the server
      setRows(
        data?.data?.map((rowData: any) => ({
          price_per_unit: rowData?.attributes?.price_per_unit || "",
          size: rowData?.attributes?.size || "",
          pieces: rowData?.attributes?.pieces || "",
          to_balance: rowData?.attributes?.to_balance || 0,
          amount_paid: rowData?.attributes?.amount_paid || 0,
          amount: rowData?.attributes?.amount || "",
          harvest_customer_id: customerId || "",
          status: rowData?.attributes?.status || "hold", // Default status to "pending" if not provided
          id: rowData?.id || "",
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    if (rows.length > 0) {
      const lastRow = rows[rows.length - 1];
      const isNewRow = !lastRow.id;

      const handler = setTimeout(() => {
        if (isNewRow && Object.values(lastRow).every((value) => value !== "")) {
          handleSubmit(); // Handle new rows
        } else if (!isNewRow) {
          handleUpdate(); // Handle edits
        }
      }, 1000);

      return () => clearTimeout(handler);
    }
  }, [rows]);

  const handleUpdate = async () => {
    if (editedRows.length === 0) return;

    const rowsWithAmountAsNumbers = editedRows?.map((row) => ({
      ...row,
      amount: row.amount,
      pieces: row.pieces,
      size: row.size,
      price_per_unit: row.price_per_unit,
    }));

    try {
      setLoading(true);
      await editPurchase({
        formdata: { data: rowsWithAmountAsNumbers },
        farmId,
        harvestId,
      }).unwrap();
      toast.success("Purchase Edited ✔️");
      setEditedRows([]);
      refetch();
    } catch (error) {
      // console.error("Error editing purchase:", error);
      toast.error("Failed to edit purchase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    index: number,
    fieldName: keyof RowData,
    value: string
  ) => {
    // console.log(rows[index]?.id);
    // Prevent editing if a new row is unsaved
    // if (hasUnsavedRow && rows[index]?.id) {
    //   toast.error("Please save the new row before editing other rows.");
    //   return;
    // }

    // Validate input as a number or empty string
    const isValidNumber = /^\d*\.?\d*$/.test(value);
    if (!isValidNumber && value !== "") return;

    const newValue = value === "" ? null : Number(value);

    const newRows = [...rows];

    // Update the specific field in the row first
    newRows[index] = {
      ...newRows[index],
      [fieldName]: newValue,
    };

    // Recalculate the amount if the updated field is "size" or "price_per_unit"
    newRows[index].amount =
      fieldName === "size" || fieldName === "price_per_unit"
        ? newRows[index].price_per_unit * newRows[index].size
        : newRows[index].amount;

    // Set the updated row
    const updatedRow = newRows[index];

    newRows[index] = updatedRow;
    setRows(newRows);

    // Mark row as edited (only if it has an ID)
    if (updatedRow?.id) {
      setEditedRows((prev) => {
        const rowExists = prev.find((row) => row.id === updatedRow.id);
        return rowExists
          ? prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
          : [...prev, updatedRow];
      });
    }
  };

  const handleInsertRow = () => {
    // Check if any of the fields in the last row are empty
    const lastRow = rows[rows.length - 1];
    if (lastRow && Object.values(lastRow).some((value) => value === "")) {
      // If any field is empty, display a message or toast to the user
      toast.error("Please fill in all fields before adding a new row.");
      return;
    }

    // Add a new row
    const newRow = {
      price_per_unit: "",
      size: "",
      pieces: "",
      amount: "",
      harvest_customer_id: customerId,
      status: "hold",
    };

    // Update both rows and newlyAddedRows state
    setRows((prevRows) => [...prevRows, newRow]);
    setIsSave(true); // Set isSave to true when a new row is added
    setHasUnsavedRow(true); // Mark new row as unsaved
  };

  const handleSubmit = async () => {
    const newRows = rows.filter((row) => !row.id);

    if (newRows.length === 0) return;

    const rowsWithAmountAsNumber = newRows.map((row) => ({
      ...row,
      amount: parseFloat(row.amount),
    }));

    try {
      setLoading(true);
      await createPurchase({
        formdata: { data: rowsWithAmountAsNumber },
        farmId,
        harvestId,
      }).unwrap();
      toast.success("New Purchase created ✔️");
      setIsSave(false);
      setHasUnsavedRow(false); // Reset unsaved row state after saving
      refetch();
    } catch (error) {
      setIsSave(false);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (fieldName: any) => {
    return rows.reduce((total, row: any) => {
      return total + parseFloat(row[fieldName] || "0");
    }, 0);
  };

  const handleDeletePurchase = async (purchaseId: string, index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    try {
      setLoading(true);
      await deletePurchase({ harvestId, farmId, purchaseId }).unwrap();
      refetch();
      toast.success("Deleted ✔️");
      setHasUnsavedRow(false); // Mark new row as unsaved
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBeneficairy = async () => {
    try {
      setBenefied(!benefied);
      await AddBeneficiary({
        formdata: { harvest_customer_id: customerId },
        farmId,
      }).unwrap();
      refetchBeneficary();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (value: any) => {
    setEditData(value);
    setOpenEdit(true);
  };

  const handlePendingStatus = async (row: any, index: any) => {
    setPendingForm(true);
    setPendingFormData(row);
    setRowIndex(index);
  };

  return (
    <div>
      <>
        <EditPendingStatus
          open={pendingForm}
          setOpen={setPendingForm}
          editdata={pendingFormData}
          rowindex={rowindex}
          setRows={setRows}
        />
        {editData && (
          <EditCustomerModal
            farmId={farmId}
            harvestId={harvestId}
            open={openEdit}
            setOpen={setOpenEdit}
            editdata={editData}
          />
        )}
        <Accordion type="single" collapsible className="w-full mx-auto ">
          <AccordionItem value={customer?.id} className="w-full relative">
            <div className="flex items-center pr-4 relative">
              <div className="sec-header grid grid-cols-3 px-6 w-full relative">
                <div className="flex items-center lg:space-x-4 space-x-1">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(customer.id)}
                    onChange={() => handleCheckboxChange(customer.id)}
                    className="mr-1 w-4 h-4"
                  />

                  <h2 className="lg:text-sm text-xs font-semibold ">
                    {customer?.attributes?.name?.split(" ")[0]}
                  </h2>
                </div>
                <div className="flex items-center justify-start">
                  <p
                    className={`text-xs flex items-center ${
                      data?.payment_status == "incomplete" ||
                      data?.payment_status == ""
                        ? `bg-red-100 text-red-400`
                        : `bg-[#18F4B4] text-[#05805C]`
                    }  rounded-lg  lg:px-4 lg:py-2 py-1 px-2`}>
                    <span className="">
                      {data?.payment_status == "incomplete" ||
                      data?.payment_status == ""
                        ? data?.payment_status || "pending"
                        : data?.payment_status}
                    </span>
                  </p>
                </div>
                <div className="flex items-center lg:space-x-6 space-x-4 ml-3">
                  <div>
                    {benefied || customer?.relationships?.is_beneficiary ? (
                      <FaStar
                        onClick={handleSaveBeneficairy}
                        className="text-[#F3C531] lg:h-6 lg:w-6 h-5 w-5"
                      />
                    ) : (
                      <FaRegStar
                        onClick={handleSaveBeneficairy}
                        className="text-gray-400 lg:h-6 lg:w-6 h-5 w-5"
                      />
                    )}
                  </div>

                  <Button
                    onClick={handleInsertRow}
                    className="lg:flex hidden items-center justify-center space-x-3 text-[--primary] font-normal border border-[--primary] ">
                    <AiOutlinePlus className="w-4 h-4 text-gray-400" />
                    <span>Insert new row</span>
                  </Button>

                  <button
                    onClick={handleInsertRow}
                    className="w-8 h-6 rounded-md flex lg:hidden items-center justify-center space-x-3 text-[--primary] font-normal border border-[--primary] ">
                    <AiOutlinePlus className="w-4 h-4 text-[--primary]" />
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <MdOutlineEdit
                  onClick={() => handleEdit(customer)}
                  className="cursor-pointer lg:h-6 lg:w-6 h-5 w-5 text-[--primary] mr-2 "
                />
                <AccordionTrigger className="w-full mx-auto transition-all [&[data-state=open]>svg]:rotate-180">
                  <IoIosArrowUp
                    className={`h-6 w-6 shrink-0 text-gray-800 cursor-pointer transition-transform duration-200 ${
                      rotate && `transition-all rotate-180`
                    }`}
                  />
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="">
              <div className="overflow-hidden">
                <Table className="w-full overflow-hidden">
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="py-4 text-center text-black text-xs font-semibold">
                        S/N
                      </TableHead>
                      <TableHead className="py-4 text-black text-xs font-semibold">
                        Price/unit
                      </TableHead>
                      <TableHead className="py-4 text-black text-xs font-semibold flex">
                        Size
                        <span className="lg:text-sm text-[8px] ml-[2px]">
                          (kg)
                        </span>
                      </TableHead>
                      <TableHead className="py-4 text-black text-xs font-semibold">
                        Pieces
                      </TableHead>
                      <TableHead className="py-4 text-black text-xs font-semibold">
                        Amount
                      </TableHead>
                      <TableHead className="py-4 text-black text-xs font-semibold">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white pl-8">
                    {rows?.map((row, index) => (
                      <TableRow key={index} className="mx-auto pl-8">
                        <TableCell className="text-center lg:text-base text-xs">
                          {index + 1}
                        </TableCell>
                        <TableCell className="p-0">
                          <Input
                            name="price_per_unit"
                            value={row?.price_per_unit}
                            onClick={() => setPurchaseID(row)}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "price_per_unit",
                                e.target.value
                              )
                            }
                            className="w-full rounded-none border-b-0  focus-visible:ring-0 lg:text-base text-xs"
                          />
                        </TableCell>
                        <TableCell className="p-0">
                          <Input
                            type="number"
                            name="size"
                            value={row.size}
                            onClick={() => setPurchaseID(row)}
                            onChange={(e) =>
                              handleInputChange(index, "size", e.target.value)
                            }
                            className="remove-arrow rounded-none border-b-0 w-full focus-visible:ring-0 lg:text-base text-xs"
                          />
                        </TableCell>
                        <TableCell className="p-0">
                          <Input
                            type="text"
                            name="pieces"
                            value={row.pieces}
                            onClick={() => setPurchaseID(row)}
                            onChange={(e) =>
                              handleInputChange(index, "pieces", e.target.value)
                            }
                            className="rounded-none border-b-0 w-full focus-visible:ring-0 lg:text-base text-xs"
                          />
                        </TableCell>
                        <TableCell className="p-0">
                          <Input
                            name="amount"
                            value={formatCurrency(row.amount)}
                            onClick={() => setPurchaseID(row)}
                            onChange={(e) =>
                              handleInputChange(index, "amount", e.target.value)
                            }
                            className="rounded-none border-b-0 w-full focus-visible:ring-0 lg:text-base text-xs"
                          />
                        </TableCell>
                        <TableCell className="lg:pl-8 space-x-2 flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <button
                                className={`${
                                  row.status == "paid"
                                    ? `bg-green-100 text-blue-700`
                                    : row.status == "pending"
                                    ? `bg-blue-100 text-blue-700`
                                    : row.status == "hold"
                                    ? `bg-red-100 text-red-700`
                                    : ``
                                } text-xs rounded-md lg:px-4 px-1 py-1 flex items-center lg:space-x-4 space-x-1 lg:mr-2`}
                                onClick={() => setPurchaseID(row)}>
                                <span>
                                  {row.status == "paid"
                                    ? `Paid`
                                    : row.status == "pending"
                                    ? `Pending`
                                    : row.status == "hold"
                                    ? `Hold`
                                    : ``}
                                </span>
                                <IoIosArrowDown />
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              onClick={() => setPurchaseID(row)}>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setRows((prevRows) => {
                                    const newRows = [...prevRows];
                                    newRows[index].status = "paid"; // Set status to paid
                                    return newRows;
                                  });

                                  // Call editPurchase mutation after status change
                                  editPurchase({
                                    formdata: {
                                      data: rows.map((r, idx) =>
                                        idx === index
                                          ? { ...r, status: "paid" }
                                          : r
                                      ),
                                    },
                                    farmId,
                                    harvestId,
                                  })
                                    .unwrap()
                                    .then(() => {
                                      toast.success(
                                        "Purchase updated to Paid ✔️"
                                      );
                                    })
                                    .catch((error) => {
                                      console.error(
                                        "Failed to update purchase",
                                        error
                                      );
                                    });
                                }}>
                                Paid
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() => handlePendingStatus(row, index)}>
                                Pending
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setRows((prevRows) => {
                                    const newRows = [...prevRows];
                                    newRows[index].status = "hold"; // Set status to pending
                                    return newRows;
                                  });

                                  // Call editPurchase mutation after status change
                                  editPurchase({
                                    formdata: {
                                      data: rows.map((r, idx) =>
                                        idx === index
                                          ? { ...r, status: "hold" }
                                          : r
                                      ),
                                    },
                                    farmId,
                                    harvestId,
                                  })
                                    .unwrap()
                                    .then(() => {
                                      toast.success(
                                        "Purchase updated to Hold ✔️"
                                      );
                                    })
                                    .catch((error) => {
                                      console.error(
                                        "Failed to update purchase",
                                        error
                                      );
                                    });
                                }}>
                                Hold
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <MdDelete className="lg:h-6 lg:w-6 h-4 w-4 text-red-400 cursor-pointer" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="text-red-500 bg-red-100"
                                  onClick={() =>
                                    handleDeletePurchase(row?.id, index)
                                  }>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        {loading && (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="animate-spin" />{" "}
                            <span>Saving...</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="lg:text-base text-xs font-semibold">
                        {calculateTotal("size")}
                        <span className="lg:text-sm text-[8px] ml-[2px]">
                          (kg)
                        </span>
                      </TableCell>
                      <TableCell className="lg:text-base text-xs flex font-semibold">
                        {calculateTotal("pieces")}{" "}
                        <span className="lg:text-sm text-[8px] ml-[2px]">
                          (pcs)
                        </span>
                      </TableCell>
                      <TableCell className="lg:text-base text-xs font-semibold">
                        <span className="text-stroke lg:text-sm text-[8px] mr-[2px]">
                          N
                        </span>
                        {calculateTotal("amount")
                          .toFixed()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, `,`)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    </div>
  );
};

export default HarvestTable;
