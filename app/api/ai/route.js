import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, prompt } = body;
    let systemPrompt = "";

    if (type === "doubt") {
      systemPrompt =
        "You are an expert teacher. Explain concepts simply for student";
    }
    if (type === "summary") {
      systemPrompt = "Generate concise study notes and summary points";
    }
    if (type === "quiz") {
      systemPrompt =
        "Generate 5 MCQs with 4 options and correct answers in JSON format.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemPrompt}
            User Input:${prompt}`,
    });
    return NextResponse.json({
      success: true,
      data: response.text,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
