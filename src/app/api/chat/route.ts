import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

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
            content:
              "You are a virtual aquaculture consultant with over 15 years of experience running profitable fish farms in Nigeria. You are an expert in catfish, tilapia, and other common species in Africa. You give simple, practical, farmer-friendly advice, avoiding complex science terms. Respond clearly in basic English, like you're talking to a local fish farmer. Be patient, supportive, and helpful.",
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
