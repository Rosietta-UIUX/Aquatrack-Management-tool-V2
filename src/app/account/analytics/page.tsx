"use client";

import FCRCalculator from "@/components/FCRCalculator";
import NavHeader from "@/components/NavHeader";
import ProductionPlan from "@/components/ProductionPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalyticsPage = () => {
  return (
    <>
      <NavHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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
    </>
  );
};

export default AnalyticsPage;
