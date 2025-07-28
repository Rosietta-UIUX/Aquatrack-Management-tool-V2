"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatCurrency } from "@/utils";

interface TableProps {
  data: {
    data: any[];
    total_amount: string;
    total_size: string;
    total_pieces: string;
  };
}

const HarvestTable: React.FC<TableProps> = ({ data }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data?.data?.map((item) => item.id));
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
    setSelectAll(newSelectedItems.length === data?.data?.length);
  };

  return (
    <div className="overflow-hidden">
      <Table className="w-full overflow-hidden">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="py-4 pl-8 text-black ">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-1 w-4 h-4"
              />
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Price/unit
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Size (kg)
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              {" "}
              Pieces
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              {" "}
              Amount
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white pl-8">
          {/* {data?.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-4 pl-8">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-1 w-4 h-4"
                />
              </TableCell>
              <TableCell className="py-4">
                N {formatCurrency(item?.attributes?.price_per_unit)}
              </TableCell>
              <TableCell className="py-4">
                {item?.attributes?.size} (kg)
              </TableCell>
              <TableCell className="py-4">
                {item?.attributes?.pieces} pcs
              </TableCell>
              <TableCell className="py-4">
                N {formatCurrency(item?.attributes?.amount)}
              </TableCell>

              <TableCell className="py-4">
                {item?.attributes?.status == "paid" ? (
                  <button className="bg-green-100 text-xs text-green-700 rounded-lg px-4 py-1 flex items-center space-x-4">
                    {item?.attributes?.status}
                  </button>
                ) : (
                  <button className="bg-red-100 text-xs text-red-700 rounded-lg px-4 py-1 flex items-center space-x-4">
                    {item?.attributes?.status}
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))} */}
          <TableRow className=" mx-auto pl-8 ">
            <TableCell className="py-4"></TableCell>
            <TableCell className="py-4"></TableCell>
            <TableCell className="py-4 font-semibold">
              {data?.total_size} (kg)
            </TableCell>
            <TableCell className="py-4 font-semibold">
              {data?.total_pieces} (pcs)
            </TableCell>
            <TableCell className="py-4 font-semibold">
              NGN {formatCurrency(data?.total_amount)}
            </TableCell>
            <TableCell className="py-4"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default HarvestTable;
