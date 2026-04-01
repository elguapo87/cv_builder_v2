import DBConnection from "@/config/db";
import protectUser from "@/middleware/protectUser";
import resumeModel from "@/models/resumeModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await DBConnection();

        const userId = await protectUser(req);

        const resumes = await resumeModel.find({ userId });

        return NextResponse.json({ success: true, resumes }, { status: 200 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}