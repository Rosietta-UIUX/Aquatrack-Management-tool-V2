"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import SuccessModal from "@/components/SuccessModal";
import { useRouter } from "next/navigation";

const LoanApplicationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    bankStatement: null,
    amountRequested: "",
    loanDuration: "",
    reasonForLoan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, bankStatement: e.target.files[0] }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, loanDuration: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/loans/status");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[--primary]">
          Loan Application
        </h1>
        <Link href="/loans/overview">
          <Button variant="outline">Back to Overview</Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input id="middleName" placeholder="Enter your middle name" value={formData.middleName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <Input id="surname" placeholder="Enter your surname" value={formData.surname} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankStatement">Upload Bank Statement (6 months)</Label>
            <Input id="bankStatement" type="file" onChange={handleFileChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amountRequested">Amount Requested</Label>
              <Input
                id="amountRequested"
                type="number"
                placeholder="Enter the amount you need"
                value={formData.amountRequested}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanDuration">Loan Duration (in months)</Label>
              <Select onValueChange={handleSelectChange} value={formData.loanDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="18">18 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonForLoan">Reason for Loan</Label>
            <Textarea
              id="reasonForLoan"
              placeholder="Tell us why you need this loan"
              value={formData.reasonForLoan}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center pt-4">
            <Button
              type="submit"
              className="bg-[--primary] hover:bg-blue-500 text-white px-8 py-3 rounded-lg text-lg"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Application Submitted!"
        message="Your loan application has been submitted successfully."
      />
    </div>
  );
};

export default LoanApplicationPage;
