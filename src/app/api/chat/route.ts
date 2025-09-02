import { NextResponse, NextRequest } from "next/server";
import { buildDynamicPrompt } from "@/app/utils/prompt-builder";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
  const systemPrompt = await buildDynamicPrompt(lastMessage.text, req);

  const formattedMessages = messages.map((message: any) => ({
    role: message.isUser ? "user" : "assistant",
    content: message.text,
  }));

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...formattedMessages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch from Groq API: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
      throw new Error("Invalid response structure from Groq API");
    }

    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message || "An unknown error occurred." },
      { status: 500 }
    );
  }
}
