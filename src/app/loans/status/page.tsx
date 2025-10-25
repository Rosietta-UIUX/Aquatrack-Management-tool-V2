"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const LoanStatusPage = () => {
  // In a real application, this would come from an API
  const loanStatus = "Pending"; // Possible values: Pending, Approved, Rejected

  const getStatusColor = () => {
    switch (loanStatus) {
      case "Approved":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[--primary]">Loan Status</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Farms</Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Application Status
        </h2>
        <p className={`text-4xl font-bold ${getStatusColor()}`}>{loanStatus}</p>
        <p className="mt-4 text-gray-600">
          We are currently reviewing your application. You will be notified once there is an update.
        </p>

        {/* Temporary button for testing the post-approval flow */}
        <div className="mt-8">
          <Link href="/loans/dashboard">
            <Button>Simulate Approval (Temporary)</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoanStatusPage;
