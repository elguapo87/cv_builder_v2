import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const protectUser = async (req: NextRequest) => {
    try {
        const token = req.headers.get("token");

        if (!token) {
            throw new Error("Not Authorized, No Token Provided");
        }

        const jwt_secret = process.env.JWT_SECRET!
        if (!jwt_secret) {
            throw new Error("JWT_SECRET is not defined in .env");
        }

        const decoded = jwt.verify(token, jwt_secret) as { userId: string };
        return decoded.userId;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Not Authorized")
    }
};

export default protectUser;