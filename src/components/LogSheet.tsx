"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateLogExpenseMutation, useGetLogExpensesQuery, useGetTodaysLogExpensesSummaryQuery, useGetMonthlyLogExpensesSummaryQuery } from "@/redux/services/logSheetApiSlice";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import toast from "react-hot-toast";
const LogSheet = () => {
  const { defaultFarmId } = useDefaultFarmId();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: logExpenses, isLoading } = useGetLogExpensesQuery({ farmId: defaultFarmId, startDate, endDate, tag: searchQuery });
  const { data: todaysSummary } = useGetTodaysLogExpensesSummaryQuery({ farmId: defaultFarmId });
  const { data: monthlySummary } = useGetMonthlyLogExpensesSummaryQuery({ farmId: defaultFarmId });
  const [createLogExpense] = useCreateLogExpenseMutation();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tag, setTag] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleLogExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !tag || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }
    const formdata = {
      date,
      tag,
      amount: Number(amount),
      description,
    };
    try {
      await createLogExpense({ formdata, farmId: defaultFarmId }).unwrap();
      toast.success("Expense logged successfully.");
      setDate(new Date().toISOString().split("T")[0]);
      setTag("");
      setAmount("");
      setDescription("");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to log expense.");
    }
  };

  return (
    <div>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-10">
        <div className="lg:col-span-1">
          <form onSubmit={handleLogExpense} className="space-y-4">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Select onValueChange={setTag} value={tag}>
              <SelectTrigger>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fuel">Fuel</SelectItem>
                <SelectItem value="gas">Gas</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="equipments">Equipments</SelectItem>
                <SelectItem value="drugs">Drugs</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit">Log Expense</Button>
          </form>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Today's Expenses</h2>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NGN",
              }).format(todaysSummary?.data?.total || 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">This Month's Expenses</h2>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NGN",
              }).format(monthlySummary?.data?.total || 0)}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center space-x-4">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button onClick={() => {
            setStartDate("");
            setEndDate("");
          }}>Clear Filter</Button>
        </div>
        <div className="flex items-center bg-white py-2 px-4 rounded-lg w-full lg:w-1/3 mt-4">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tag"
            className="border-none bg-transparent outline-none shadow-none"
          />
        </div>
        <div className="table w-full lg:mt-10 mt-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Date</th>
                  <th className="text-left">Tag</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {logExpenses?.data?.data?.map((expense: any) => (
                  <tr key={expense.id}>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.tag}</td>
                    <td>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "NGN",
                      }).format(expense.amount)}
                    </td>
                    <td>{expense.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default LogSheet;
