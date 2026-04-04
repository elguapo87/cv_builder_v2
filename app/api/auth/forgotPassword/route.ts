import DBConnection from "@/config/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sendEmail from "@/utils/nodeMailer";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const { email } = await req.json();

        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: true,
                message: "If this email exists, a reset link has been sent"
            }, { status: 404 });
        }

        // Generate token (expires in 15 min)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "15m" });

        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

        await sendEmail({
            to: user.email,
            subject: "Reset your password",
            html: `Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 15 minutes.`
        });

        return NextResponse.json({ success: true, message: "Reset password email sent" });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}