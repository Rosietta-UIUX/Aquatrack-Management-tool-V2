"use client";

import NavHeader from "@/components/NavHeader";
import React from "react";
import FCRCalculator from "@/components/FCRCalculator";
import WhatsAppMessenger from "@/components/WhatsAppMessenger";

const FCRCalculatorPage = () => {
  return (
    <>
      <NavHeader />
      <WhatsAppMessenger />
      <main className="w-full mt-10">
        <FCRCalculator />
      </main>
    </>
  );
};

export default FCRCalculatorPage;
