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
  const cookies = parseCookies(req);
  const token = cookies.token;
  const farmId = cookies.farm_id;

  const basePrompt =
    "You are a professional aquaculture consultant with over 15 years of experience in fish farming, especially in Africa and Nigeria. You specialize in catfish and tilapia farming. You provide expert, practical, and data-informed advice in a clear and professional tone. Never use casual greetings like “hey buddy” or “hello friend”. Respond like a trusted advisor, using precise and respectful language. Assume the farmer has limited literacy — be simple, but never childish or overly casual.";

  if (!token || !farmId) {
    return basePrompt;
  }

  try {
    const farmData = await getFarmData(farmId, token);
    const {
      total_batch,
      ponds,
      total_stocked_fish,
      total_feed_used,
    } = farmData.data;

    let dynamicPrompt = `${basePrompt}\n\nFarmer Data:\n`;
    if (ponds) dynamicPrompt += `- Ponds: ${ponds.length}\n`;
    if (total_batch) dynamicPrompt += `- Active Batches: ${total_batch}\n`;
    if (total_stocked_fish)
      dynamicPrompt += `- Total Fish Stocked: ${total_stocked_fish}\n`;
    if (total_feed_used)
      dynamicPrompt += `- Feed Used: ${total_feed_used}kg\n`;

    dynamicPrompt +=
      "\nUse this data to answer the farmer's question accurately. If the data is not available, explain that clearly.";

    return dynamicPrompt;
  } catch (error) {
    console.error("Error fetching farm data:", error);
    return basePrompt;
  }
}
