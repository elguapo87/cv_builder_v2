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

                        Task:
                        Enhance the professional summary of a resume.

                        Rules:
                        - Keep it 1–2 sentences.
                        - Highlight key skills, experience, and career goals.
                        - Make it compelling and ATS-friendly.
                        - IMPORTANT: Detect the language of the input and return the response strictly in the SAME language.
                        - Do NOT translate to English.
                        - Return only the final text, no explanations.
                    `
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices?.[0]?.message?.content?.trim() || "";

        return NextResponse.json({ success: true, enhancedContent }, { status: 200 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}