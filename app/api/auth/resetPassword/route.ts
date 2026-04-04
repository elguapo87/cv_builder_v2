import DBConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import userModel from "@/models/userModel";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();
        const { token, newPassword } = await req.json();

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const user = await userModel.findById(decoded.userId);
        if (!user) throw new Error("User not found");

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 400 });
    }
} 