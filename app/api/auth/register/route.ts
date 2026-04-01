import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import DBConnection from "@/config/db";
import { genToken } from "@/utils/genToken";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const { name, email, password } = await req.json(); 
        if (!name || !email || !password) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = genToken(newUser._id);
        newUser.password = undefined;

        return NextResponse.json({
            success: true,
            message: "User created",
            token,
            user: newUser
        }, { status: 201 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}