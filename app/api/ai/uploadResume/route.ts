import openai from "@/config/ai";
import DBConnection from "@/config/db";
import protectUser from "@/middleware/protectUser";
import resumeModel from "@/models/resumeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const userId = await protectUser(req);
        const { resumeText, title } = await req.json();

        if (!resumeText) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const systemPrompt = "You are an expert AI agent to extract data from resume.";

        const userPrompt = `extract data from this resume: ${resumeText}
            Provide data in the following JSON format with no additional text before or after
                {
                    professional_summary: { type: String, default: "" },
                    skills: [{ type: String }],
                    personal_info: {
                        image: { type: String, default: "" },
                        full_name: { type: String, default: "" },
                        profession: { type: String, default: "" },
                        email: { type: String, default: "" },
                        phone: { type: String, default: "" },
                        location: { type: String, default: "" },
                        linkedin: { type: String, default: "" },
                        website: { type: String, default: "" }
                    }, 
                    experience: [
                        {
                            company: { type: String },
                            position: { type: String },
                            start_date: { type: String },
                            end_date: { type: String },
                            description: { type: String },
                            is_current: { type: Boolean }
                        }
                    ],
                    projects: [
                        {
                            name: { type: String },
                            type: { type: String },
                            description: { type: String }
                        }
                    ],
                    education: [
                        {
                            institution: { type: String },
                            degree: { type: String },
                            field: { type: String },
                            graduation_date: { type: String },
                            gpa: { type: String }
                        }
                    ]
                }
            `;

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL!,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],

            response_format: { type: "json_object" }
        });

        const extractedData = response.choices[0].message.content;
        if (!extractedData) {
            throw new Error("AI returned empty response");
        }

        const parsedData = JSON.parse(extractedData);

        const newResume = await resumeModel.create({
            userId, 
            title,
            ...parsedData
        });

        return NextResponse.json({ success: true, resumeId: newResume._id }, { status: 200 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}