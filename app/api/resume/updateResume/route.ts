import DBConnection from "@/config/db";
import imageKit from "@/config/imageKit";
import protectUser from "@/middleware/protectUser";
import resumeModel from "@/models/resumeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DBConnection();

        const userId = await protectUser(req);

        const form = await req.formData();
        const resumeId = form.get("resumeId") as string;
        const resumeData = form.get("resumeData") as string;
        const removeBackground = form.get("removeBackground") === "true";
        const image = form.get("image") as File | null;

        let imageUrl = "";

        if (image && image.size > 0) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadRes = await imageKit.upload({
                file: buffer,
                fileName: `profile_${userId}_${Date.now()}_${image.name}`,
                folder: "/cv_builder"
            });

            const transformation = removeBackground
                ? "e-bgremove,w-300,h-300,fo-face,z-0.75"
                : "w-300,h-300,fo-face,z-0.75";

            imageUrl = imageKit.url({
                path: uploadRes.filePath,
                transformation: [{ raw: transformation }]
            });
        }

        const parsedResumeData = JSON.parse(resumeData);
        if (imageUrl) {
            parsedResumeData.personal_info.image = imageUrl;
        }

        const resume = await resumeModel.findOneAndUpdate(
            { _id: resumeId, userId },
            { $set: parsedResumeData },
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Saved", resume }, { status: 200 });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
    }
}