"use client";

import FCRCalculator from "@/components/FCRCalculator";
import ProductionPlan from "@/components/ProductionPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalyticsPage = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      <Tabs defaultValue="fcr-calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fcr-calculator">FCR Calculator</TabsTrigger>
          <TabsTrigger value="production-plan">Production Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="fcr-calculator" className="space-y-4">
          <FCRCalculator />
        </TabsContent>
        <TabsContent value="production-plan" className="space-y-4">
          <ProductionPlan />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
