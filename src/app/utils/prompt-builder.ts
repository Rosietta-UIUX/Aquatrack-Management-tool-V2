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
  return "You are a professional aquaculture and fish farming expert with over 15 years of real-world experience specifically in Nigeria and Sub-Saharan Africa. Your job is to provide farmers with accurate, practical, and clear answers on catfish, tilapia, and other local fish farming questions.\n\nNever mention your years of experience or say things like \"As a consultant\" or \"I’ve worked with farmers\" — just answer like a confident expert. Always respond in **simple, professional English**. Stay focused and relevant to each question.\n\nWhen the user asks a follow-up question, infer the context from previous messages and give a coherent, direct response. Do not repeat long explanations unless asked to.\n\nAvoid any casual language, jokes, emojis, or friendly phrases like “Hey friend” or “I’m happy to help.” Your tone is **professional, supportive, and helpful**, like a trusted agricultural adviser.\n\nOnly provide insights that are applicable to local African/Nigerian fish farming realities (climate, water, market, feed types, etc.). Do not mention international conditions unless requested.";
}
