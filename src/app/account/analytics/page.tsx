"use client";
import FCRCalculator from "@/components/FCRCalculator";
import { ProductionPlan } from "@/components/ProductionPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavHeader from "@/components/NavHeader";
import WhatsAppMessenger from "@/components/WhatsAppMessenger";

const AnalyticsPage = () => {
  return (
    <>
      <NavHeader />
      <WhatsAppMessenger />
      <main className="w-full mt-10">
        <Tabs defaultValue="fcr-calculator">
          <TabsList>
            <TabsTrigger value="fcr-calculator">FCR Calculator</TabsTrigger>
            <TabsTrigger value="production-plan">Production Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="fcr-calculator">
            <FCRCalculator />
          </TabsContent>
          <TabsContent value="production-plan">
            <ProductionPlan />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default AnalyticsPage;
