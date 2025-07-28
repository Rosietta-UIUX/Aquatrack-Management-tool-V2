"use client";
import LoginForm from "@/components/LoginForm";

import TawkMessenger from "@/components/WhatsAppMessenger";
import React from "react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <>
      <main>
        <TawkMessenger />
        <LoginForm />
      </main>
    </>
  );
}
