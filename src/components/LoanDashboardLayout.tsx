"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const LoanDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", href: "/loans/dashboard" },
    { name: "Contract", href: "/loans/dashboard/contract" },
    { name: "Loan Plan", href: "/loans/dashboard/loan-plan" },
    { name: "Profile", href: "/loans/dashboard/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[--primary]">Loan Details</h1>
          <Link href="/">
            <Button className="bg-[--primary] text-white hover:bg-[--primary-dark]">Back to Farms</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <Link key={tab.name} href={tab.href}>
                <div
                  className={`py-3 px-6 text-lg font-medium cursor-pointer transition-colors duration-300 ${
                    pathname === tab.href
                      ? "border-b-4 border-[--primary] text-[--primary]"
                      : "text-gray-600 hover:text-[--primary]"
                  }`}
                >
                  {tab.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LoanDashboardLayout;
