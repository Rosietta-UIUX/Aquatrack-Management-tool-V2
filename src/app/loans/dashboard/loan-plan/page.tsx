import LoanDashboardLayout from "@/components/LoanDashboardLayout";

const LoanPlanPage = () => {
  return (
    <LoanDashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Current Loan Plan
        </h2>
        {/* Placeholder for current loan plan details */}
        <p className="text-gray-600">Details about the current loan plan will be displayed here.</p>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Previous Loan Plans
        </h2>
        {/* Placeholder for previous loan plans */}
        <p className="text-gray-600">No previous loan plans to display.</p>
      </div>
    </LoanDashboardLayout>
  );
};

export default LoanPlanPage;
