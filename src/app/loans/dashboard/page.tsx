import LoanDashboardLayout from "@/components/LoanDashboardLayout";

const LoanDashboardPage = () => {
  const isOverdue = new Date() > new Date("2025-12-31");

  return (
    <LoanDashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-default">Amount Received</h3>
          <p className="text-3xl font-bold text-[--primary] mt-2">$10,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-default">Repayment Percentage</h3>
          <p className="text-3xl font-bold text-[--primary] mt-2">25%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-default">Current Plan Duration</h3>
          <p className="text-3xl font-bold text-[--primary] mt-2">12 Months</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-default">Loan Due Date</h3>
          <p className="text-3xl font-bold text-[--primary] mt-2">2025-12-31</p>
        </div>
      </div>

      {isOverdue && (
        <div className="mt-8 bg-red-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-red-800 mb-4">Default Metric</h3>
          <p className="text-lg text-red-700">Your loan is overdue. A penalty of +2% is applied weekly.</p>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-default mb-4">Loan History</h3>
        {/* Placeholder for loan history table */}
        <p className="text-default">No previous loans to display.</p>
      </div>
    </LoanDashboardLayout>
  );
};

export default LoanDashboardPage;
