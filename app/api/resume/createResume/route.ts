import DBConnection from "@/config/db";
import protectUser from "@/middleware/protectUser";
import resumeModel from "@/models/resumeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const userId = await protectUser(req);

        const { title } = await req.json();

        const newResume = await resumeModel.create({ userId, title });

        return NextResponse.json({ success: true, message: "Resume created", resume: newResume }, { status: 201 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}