"use client";

import NavHeader from "@/components/NavHeader";
import React from "react";
import ChatAssistant from "@/components/ChatAssistant";
import WhatsAppMessenger from "@/components/WhatsAppMessenger";

const Assistant = () => {
  return (
    <>
      <NavHeader />
      <WhatsAppMessenger />
      <main className="w-full mt-10">
        <ChatAssistant />
      </main>
    </>
  );
};

export default Assistant;
