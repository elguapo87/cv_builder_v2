import DBConnection from "@/config/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import resumeModel from "@/models/resumeModel";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const { resumeId } = await req.json();

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return NextResponse.json({ success: false, message: "Invalid resume ID" }, { status: 400 });
        }

        let userId: string | null = null
        const token = req.headers.get("token");

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
            userId = decoded.userId;
        }

        const resume = await resumeModel.findById(resumeId);
        if (!resume) {
            return NextResponse.json({ success: false, message: "Resume not found" }, { status: 404 });
        }

        if (!resume.public && resume.userId.toString() !== userId) {
            return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return NextResponse.json({ success: true, resume }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}