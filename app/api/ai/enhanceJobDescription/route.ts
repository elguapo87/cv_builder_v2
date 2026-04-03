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
                    content: "You are an exprert in resume writing. Your tasks is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly, and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices[0].message.content;

        return NextResponse.json({ success: true, enhancedContent });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}