"use client";
import { formatCurrency } from "@/utils";
import { constants } from "fs";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const productSales = [
  {
    name: "Jan",
    product1: 4000,
    product2: 2400,
  },
  {
    name: "Feb",
    product1: 3000,
    product2: 2210,
  },
  {
    name: "Mar",
    product1: 2000,
    product2: 2290,
  },
  {
    name: "Apr",
    product1: 2780,
    product2: 2000,
  },
  {
    name: "May",
    product1: 1890,
    product2: 2181,
  },
  {
    name: "Jun",
    product1: 2390,
    product2: 2500,
  },
];

const MortalityChart = ({ data }: any) => {

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={data} margin={{ right: 30 }}>
          <YAxis />
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 5" />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Area
            type="monotone"
            dataKey="capital"
            stroke="#0180EA"
            fill="#0180EA"
            stackId="1"
          />

          <Area
            type="monotone"
            dataKey="net_profit"
            stroke="#0A2A5E"
            fill="#0A2A5E"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="total_expense"
            stroke="#7c3aed"
            fill="#8b5cf6"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-[--primary] flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-gray-100">{label}</p>
        <p className="text-sm text-white">
          Capital:
          <span className="ml-2">N {formatCurrency(payload[0].value)}</span>
        </p>
        <p className="text-sm text-white">
          Net Profit:
          <span className="ml-2">
            N {payload[1].value < 0 ? "0.00" : formatCurrency(payload[1].value)}
          </span>
        </p>
        <p className="text-sm text-white">
          Total Expense:
          <span className="ml-2">
            N {payload[2].value == 0 ? "0.00" : formatCurrency(payload[2].value)}
          </span>
        </p>
      </div>
    );
  }
};

export default MortalityChart;
