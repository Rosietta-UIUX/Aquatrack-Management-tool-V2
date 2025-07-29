import { parseCookies } from "@/lib/parseCookies";
import { NextRequest } from "next/server";

const BASE_URL = "https://aquatrack-api.onrender.com/api/v1";

const KEYWORDS = {
  BATCH_COUNT: ["how many batches", "number of batches", "total batches"],
  POND_STATUS: ["pond status", "status of my ponds"],
  FARM_SUMMARY: ["summarize my farm", "farm summary", "farm state"],
};

async function getFarmData(farmId: string, token: string) {
  const response = await fetch(`${BASE_URL}/farms/dashboard/${farmId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch farm data");
  }
  return response.json();
}

export async function buildDynamicPrompt(message: string, req: NextRequest) {
  return "You are a professional aquaculture consultant with 15+ years of experience in Nigerian and African fish farming. You help farmers understand best practices, improve their feeding strategies, reduce losses, and optimize their pond management. Always provide helpful, practical advice in clear and respectful language. Keep your responses simple but professional.";
}
