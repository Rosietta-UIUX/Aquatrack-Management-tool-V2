"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { baselineGrowthPlan } from "@/contants/growthPlan";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePlan } from "@/app/utils/plan-generator";

const PlanResult = ({ plan }: { plan: any }) => {
  if (!plan) return null;

  const handleExport = () => {
    const headers = [
      "Stage",
      "Start Week",
      "End Week",
      "Start Weight (g)",
      "End Weight (g)",
      "Weekly Weight Gain (g)",
      "Weekly Feed (kg)",
    ];
    const rows = plan.growthTimeline.map((stage: any) => [
      stage.stage,
      stage.weeks[0],
      stage.weeks[1],
      stage.average_weight_start_g,
      stage.average_weight_end_g,
      stage.weeklyWeightGain.toFixed(2),
      stage.weeklyFeed.toFixed(2),
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e: (string | number)[]) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "production_plan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generated Production Plan</CardTitle>
        <Button onClick={handleExport}>Export as CSV</Button>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-xl font-bold">Harvest Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Biomass</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{plan.harvestForecast.totalBiomass.toFixed(2)} kg</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Harvest Size</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{plan.harvestForecast.averageHarvestSize.toFixed(2)} g</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Feed Used</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{plan.harvestForecast.totalFeedUsed.toFixed(2)} kg</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Projected Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p>${plan.harvestForecast.projectedRevenue.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold">Growth Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={plan.growthTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="average_weight_end_g"
                stroke="#8884d8"
                name="Average Weight (g)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold">Weekly Feed Requirement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plan.growthTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="weeklyFeed"
                fill="#82ca9d"
                name="Weekly Feed (kg)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductionPlanPage = () => {
  const [numFishes, setNumFishes] = useState(1000);
  const [avgWeight, setAvgWeight] = useState(10);
  const [cultureDuration, setCultureDuration] = useState(24);
  const [survivalRate, setSurvivalRate] = useState(90);
  const [plan, setPlan] = useState<any>(null);
  const { defaultFarmId: farmId } = useDefaultFarmId();
  const { data: batches } = useGetAllBatchsDataQuery({ farmId });
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [batchPlan, setBatchPlan] = useState<any>(null);
  const [messages, setMessages] = useState<{ isUser: boolean; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { isUser: true, text: input }];
    setMessages(newMessages);
    setInput("");

    const context = plan
      ? `Here is the current production plan: ${JSON.stringify(
          plan
        )}.`
      : "";

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: newMessages,
        context: plan
          ? `Here is the current production plan: ${JSON.stringify(
              plan
            )}.`
          : "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setMessages([...newMessages, { isUser: false, text: data.response }]);
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = generatePlan(numFishes, survivalRate);
    setPlan(newPlan);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Production Plan</h2>
      </div>
      <Tabs defaultValue="new-plan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-plan">New Plan</TabsTrigger>
          <TabsTrigger value="existing-batch">Use Existing Batch</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
        </TabsList>
        <TabsContent value="new-plan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Production Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneratePlan} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="num-fishes">Number of Fishes</Label>
                    <Input
                      id="num-fishes"
                      type="number"
                      value={numFishes}
                      onChange={(e) => setNumFishes(Number(e.target.value))}
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avg-weight">
                      Average Initial Weight (g)
                    </Label>
                    <Input
                      id="avg-weight"
                      type="number"
                      value={avgWeight}
                      onChange={(e) => setAvgWeight(Number(e.target.value))}
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="culture-duration">
                      Culture Duration (weeks)
                    </Label>
                    <Input
                      id="culture-duration"
                      type="number"
                      value={cultureDuration}
                      onChange={(e) =>
                        setCultureDuration(Number(e.target.value))
                      }
                      placeholder="e.g., 24"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="survival-rate">
                      Expected Survival Rate (%)
                    </Label>
                    <Input
                      id="survival-rate"
                      type="number"
                      value={survivalRate}
                      onChange={(e) => setSurvivalRate(Number(e.target.value))}
                      placeholder="e.g., 90"
                    />
                  </div>
                </div>
                <Button type="submit">Generate Plan</Button>
              </form>
            </CardContent>
          </Card>
          {plan && (
          <PlanResult plan={plan} />
          )}
        </TabsContent>
        <TabsContent value="existing-batch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a Plan from an Existing Batch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="batch-select">Select a Batch</Label>
                <Select onValueChange={setSelectedBatch}>
                  <SelectTrigger id="batch-select">
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches?.data.map((batch: any) => (
                      <SelectItem key={batch.batchId} value={batch.batchId}>
                        {batch.batchName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => {
                    if (selectedBatch) {
                      const batch = batches?.data.find(
                        (b: any) => b.batchId === selectedBatch
                      );
                      if (batch) {
                        const scalingFactor =
                          batch.quantity /
                          baselineGrowthPlan.baseline_plan.stock_size;
                        const survivingFish =
                          batch.quantity * (batch.survivalRate / 100);

                        const generatedPlan = {
                          growthTimeline:
                            baselineGrowthPlan.baseline_plan.stages.map(
                              (stage) => {
                                const stageWeeks =
                                  stage.weeks[1] - stage.weeks[0] + 1;
                                const weeklyWeightGain =
                                  (stage.average_weight_end_g -
                                    stage.average_weight_start_g) /
                                  stageWeeks;
                                const weeklyFeed =
                                  (stage.feed_per_fish_kg * scalingFactor) /
                                  stageWeeks;

                                return {
                                  ...stage,
                                  weeklyWeightGain,
                                  weeklyFeed,
                                };
                              }
                            ),
                          harvestForecast: {
                            totalBiomass:
                              (survivingFish *
                                baselineGrowthPlan.baseline_plan.stages[
                                  baselineGrowthPlan.baseline_plan.stages
                                    .length - 1
                                ].average_weight_end_g) /
                              1000, // in kg
                            averageHarvestSize:
                              baselineGrowthPlan.baseline_plan.stages[
                                baselineGrowthPlan.baseline_plan.stages
                                  .length - 1
                              ].average_weight_end_g,
                            totalFeedUsed:
                              baselineGrowthPlan.baseline_plan.outputs
                                .total_feed_required_kg * scalingFactor,
                            projectedRevenue:
                              baselineGrowthPlan.baseline_plan.outputs
                                .estimated_revenue.price_per_kg_usd *
                              ((survivingFish *
                                baselineGrowthPlan.baseline_plan.stages[
                                  baselineGrowthPlan.baseline_plan.stages
                                    .length - 1
                                ].average_weight_end_g) /
                                1000),
                          },
                        };
                        setBatchPlan(generatedPlan);
                      }
                    }
                  }}
                  disabled={!selectedBatch}
                >
                  Generate Plan from Batch
                </Button>
              </div>
              <PlanResult plan={batchPlan} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-assistant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto border p-4 rounded-md">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          msg.isUser
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductionPlanPage;
