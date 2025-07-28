import { getAuth } from "@/lib/auth";
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
  const { token, farmId } = await getAuth(req);

  if (!token || !farmId) {
    return "You are a virtual aquaculture consultant with over 15 years of experience running profitable fish farms in Nigeria. You are an expert in catfish, tilapia, and other common species in Africa. You give simple, practical, farmer-friendly advice, avoiding complex science terms. Respond clearly in basic English, like you're talking to a local fish farmer. Be patient, supportive, and helpful.";
  }

  const lowerCaseMessage = message.toLowerCase();

  try {
    if (KEYWORDS.BATCH_COUNT.some((keyword) => lowerCaseMessage.includes(keyword))) {
      const farmData = await getFarmData(farmId, token);
      const batchCount = farmData.data.total_batch;
      return `The user is asking about the number of batches on their farm. You have access to the following data: the total number of batches is ${batchCount}. Based on this, provide a helpful and friendly response.`;
    }

    if (KEYWORDS.POND_STATUS.some((keyword) => lowerCaseMessage.includes(keyword))) {
      const farmData = await getFarmData(farmId, token);
      const pondStatus = farmData.data.ponds;
      return `The user is asking about the status of their ponds. You have access to the following data: ${JSON.stringify(pondStatus)}. Based on this, provide a helpful and friendly response.`;
    }

    if (KEYWORDS.FARM_SUMMARY.some((keyword) => lowerCaseMessage.includes(keyword))) {
      const farmData = await getFarmData(farmId, token);
      return `The user is asking for a summary of their farm. You have access to the following data: ${JSON.stringify(farmData.data)}. Based on this, provide a helpful and friendly summary of the farm's current state.`;
    }
  } catch (error) {
    console.error("Error fetching farm data:", error);
  }

  return "You are a virtual aquaculture consultant with over 15 years of experience running profitable fish farms in Nigeria. You are an expert in catfish, tilapia, and other common species in Africa. You give simple, practical, farmer-friendly advice, avoiding complex science terms. Respond clearly in basic English, like you're talking to a local fish farmer. Be patient, supportive, and helpful.";
}
