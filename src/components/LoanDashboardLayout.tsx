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
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[--primary]">Loan Details</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Farms</Button>
        </Link>
      </div>

      <div className="flex border-b">
        {tabs.map((tab) => (
          <Link key={tab.name} href={tab.href}>
            <div
              className={`py-2 px-4 text-lg font-medium cursor-pointer ${
                pathname === tab.href
                  ? "border-b-2 border-[--primary] text-[--primary]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.name}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
};

export default LoanDashboardLayout;
