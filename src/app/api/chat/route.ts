import { NextResponse, NextRequest } from "next/server";
import { buildDynamicPrompt } from "@/app/utils/prompt-builder";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const systemPrompt = await buildDynamicPrompt(message, req);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch response from Groq API" },
      { status: 500 }
    );
  }
}
