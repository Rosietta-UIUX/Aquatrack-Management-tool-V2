"use client";
import HarvestTable from "../@harvestTable/page";

const HarvestList = ({
  data,
  harvestId,
  farmId,
  selectAll,
  toggleSelectAll,
  selectedItems,
  handleCheckboxChange,
}: any) => {
  return (
    <>
      <div className="border-gray-300 border bg-white rounded-lg mb-10">
        <div className="header border-b border-gray-300 lg:grid-cols-3 grid grid-cols-3 lg:py-6 py-4 rounded-lg">
          <div className="flex items-center lg:space-x-4 space-x-2 pl-6">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="mr-1 w-4 h-4"
            />
            <h2 className="lg:text-base text-xs font-semibold">Customers</h2>
          </div>
          <h2 className="text--[--primary] lg:text-sm text-xs font-semibold">
            Payment status
          </h2>
        </div>

        {data?.map((customer: any) => (
          <HarvestTable
            key={customer?.id}
            customerId={customer?.id}
            harvestId={harvestId}
            farmId={farmId}
            data={customer?.relationships?.purchases}
            customer={customer}
            handleCheckboxChange={handleCheckboxChange}
            selectedItems={selectedItems}
          />
        ))}
      </div>
      
    </>
  );
};

export default HarvestList;
