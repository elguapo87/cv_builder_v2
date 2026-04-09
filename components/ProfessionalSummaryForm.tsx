import { enhanceProfessionalSummary } from "@/redux/slices/aiSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { StoredResume } from "@/types/resume";
import { Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type BuilderProps = {
    data: string;
    onChange: (data: string) => void;
};

const ProfessionalSummaryForm = ({ data, onChange }: BuilderProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.ai.loading);

    const generateSummary = async () => {
        try {
            const prompt = `enhance my professional summary "${data}"`;
            if (!prompt) return;

            const result = await dispatch(enhanceProfessionalSummary(prompt)).unwrap();

            onChange(result);

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast.error(errMessage || "Failed to enhance");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex max-sm:flex-col max-sm:gap-5 items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Summary</h3>
                    <p className="text-sm text-gray-500">Add summary for your resume here</p>
                </div>

                <button
                    onClick={generateSummary}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 roudned
                        rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Sparkles className="size-4" />
                    )}
                    {loading ? "Enhancing..." : "AI Enhance"}
                </button>
            </div>

            <div className="sm:mt-6">
                <textarea
                    onChange={(e) => onChange(e.target.value)}
                    value={data || ""}
                    rows={7}
                    className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring 
                        focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Write a compelling professional summary that highlights
                        your key strengths and career objectives..."
                />

                <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
                    Tip: Keep it concise (3-4 sentences) and focus on your most relevant achivements and skills.
                </p>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm
