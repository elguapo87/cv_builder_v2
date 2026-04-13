import openai from "@/config/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userContent } = await req.json();
        if (!userContent) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL!,
            messages: [
                {
                    role: "system",
                    content: `
                        You are an expert in resume writing.

                        Enhance a job experience description.

                        Rules:
                        - 3–6 bullet points
                        - Start each with action verbs
                        - Focus on impact and achievements
                        - ATS-friendly language
                        - Same language as input (no translation)
                        - Output only bull
                    `
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices?.[0]?.message?.content?.trim() || "";

        return NextResponse.json({ success: true, enhancedContent });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}