import LoanDashboardLayout from "@/components/LoanDashboardLayout";
import { Button } from "@/components/ui/button";

const ContractPage = () => {
  return (
    <LoanDashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Loan Contract
        </h2>
        <div className="space-y-4">
          <Button>View / Download Contract</Button>
          <Button>Sign on Platform</Button>
          <div>
            <label
              htmlFor="upload"
              className="block text-sm font-medium text-gray-700"
            >
              Re-upload signed contract
            </label>
            <input
              id="upload"
              name="upload"
              type="file"
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </LoanDashboardLayout>
  );
};

export default ContractPage;
