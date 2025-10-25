import Link from "next/link";
import { Button } from "@/components/ui/button";

const LoanOverviewPage = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[--primary]">
          AquaTrack Loan Program
        </h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Farms</Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Loan Requirements & Eligibility Criteria
        </h2>
        <p className="mb-6 text-gray-600">
          To be eligible for a loan from AquaTrack, you must meet the following criteria:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>
            <span className="font-semibold">Active User Status:</span> You must be a registered AquaTrack user for at least six (6) months.
          </li>
          <li>
            <span className="font-semibold">Consistent Engagement:</span> You must maintain a record of daily logins to the platform.
          </li>
          <li>
            <span className="font-semibold">Proven Profitability:</span> Your farm data must demonstrate a consistent and healthy profit margin.
          </li>
          <li>
            <span className="font-semibold">Financial History:</span> You must upload a bank statement covering a minimum period of the last six (6) months.
          </li>
        </ul>

        <div className="mt-8 text-center">
          <Link href="/loans/application">
            <Button className="bg-[--primary] hover:bg-blue-500 text-white px-8 py-3 rounded-lg text-lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoanOverviewPage;
