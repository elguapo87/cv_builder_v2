import DBConnection from "@/config/db";
import protectUser from "@/middleware/protectUser";
import resumeModel from "@/models/resumeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const userId = await protectUser(req);
        const { resumeId } = await req.json();

        await resumeModel.findOneAndDelete({ userId, _id: resumeId });
        return NextResponse.json({ success: true, message: "Resume deleted" }, { status: 200 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}