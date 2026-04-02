import DBConnection from "@/config/db";
import resumeModel from "@/models/resumeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const { resumeId } = await req.json();

        const resume = await resumeModel.findOne({ _id: resumeId, public: true });
        if (!resume) {
            return NextResponse.json({ success: false, message: "Resume not found" }, { status: 404 });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return NextResponse.json({ success: true, resume }, { status: 200 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}