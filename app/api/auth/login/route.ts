import DBConnection from "@/config/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { genToken } from "@/utils/genToken";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not exists" }, { status: 400 });
        }

        if (!(await user.comparePassword(password))) {
            return NextResponse.json({ success: false, message: "Wrong credentials" }, { status: 400 });
        }

        const token = genToken(user._id);
        user.password = undefined;

        return NextResponse.json({
            success: true,
            message: "Login successful",
            token,
            user
        }, { status: 200 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage });
    }
}