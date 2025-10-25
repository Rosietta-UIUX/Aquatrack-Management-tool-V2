import LoanDashboardLayout from "@/components/LoanDashboardLayout";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <LoanDashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Profile Options
        </h2>
        <div className="space-y-4">
          <Button>Re-apply for a new loan</Button>
          <Button variant="destructive">Reject a loan offer</Button>
          <Button>Contact Support</Button>
        </div>
      </div>
    </LoanDashboardLayout>
  );
};

export default ProfilePage;
