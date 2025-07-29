"use client";
import React, { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FCRCalculator: React.FC = () => {
  const [feedUsed, setFeedUsed] = useState<number | string>("");
  const [weightGained, setWeightGained] = useState<number | string>("");

  const fcr = useMemo(() => {
    const feed = Number(feedUsed);
    const weight = Number(weightGained);
    if (feed > 0 && weight > 0) {
      return (feed / weight).toFixed(2);
    }
    return null;
  }, [feedUsed, weightGained]);

  const getFCRStatus = (fcrValue: number | null) => {
    if (fcrValue === null) {
      return { status: "", color: "", message: "" };
    }
    if (fcrValue < 1.5) {
      return {
        status: "Excellent",
        color: "text-green-500",
        message: "Efficient feed usage 👍",
      };
    } else if (fcrValue >= 1.5 && fcrValue <= 2.0) {
      return {
        status: "Good",
        color: "text-blue-500",
        message: "Good job! Keep it up.",
      };
    } else if (fcrValue > 2.0 && fcrValue <= 2.5) {
      return {
        status: "Fair",
        color: "text-orange-500",
        message: "Consider reviewing your feeding strategy.",
      };
    } else {
      return {
        status: "Poor",
        color: "text-red-500",
        message: "Check for feed waste or fish health.",
      };
    }
  };

  const fcrStatus = getFCRStatus(fcr ? Number(fcr) : null);

  const handleReset = () => {
    setFeedUsed("");
    setWeightGained("");
  };

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">FCR Calculator</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Feed Conversion Ratio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="feedUsed">Feed Used (kg)</label>
              <Input
                id="feedUsed"
                type="number"
                value={feedUsed}
                onChange={(e) => setFeedUsed(e.target.value)}
                placeholder="Enter feed used in kg"
              />
            </div>
            <div>
              <label htmlFor="weightGained">Weight Gained (kg)</label>
              <Input
                id="weightGained"
                type="number"
                value={weightGained}
                onChange={(e) => setWeightGained(e.target.value)}
                placeholder="Enter weight gained in kg"
              />
            </div>
            {fcr && (
              <Card className="p-4 shadow-md">
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    FCR: <span className="font-bold">{fcr}</span>
                  </p>
                  <p className={`text-lg ${fcrStatus.color}`}>
                    Status: <span className="font-bold">{fcrStatus.status}</span>
                  </p>
                  <p className="text-sm mt-2">{fcrStatus.message}</p>
                </CardContent>
              </Card>
            )}
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FCRCalculator;
