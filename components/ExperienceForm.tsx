import { Experience } from "@/types/resume";
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";

type BuilderProps = {
    expData: Experience[];
    onChange: (data: Experience[]) => void;
};

const ExperienceForm = ({ expData, onChange }: BuilderProps) => {
    const addExperience = () => {
        const newExperience = {
            position: "",
            company: "",
            start_date: "",
            end_date: "",
            is_current: false,
            description: ""
        };

        onChange([...expData, newExperience]);
    };

    const removeExperience = (index: number) => {
        const updated = expData.filter((_, i) => i !== index);
        onChange(updated);
    };


    const updateExperience = <K extends keyof Experience>(index: number, field: K, value: Experience[K]) => {
        const updated = [...expData];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex max-sm:flex-col max-sm:gap-5 items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Professional Experience
                    </h3>
                    <p className="text-sm text-gray-500 max-sm:text-center">Add your job experience</p>
                </div>

                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 roudned
                        rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Experience
                </button>
            </div>

            {expData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="size-12 mx-auto mb-3 text-gray-300" />
                    <p>No work experience added yet.</p>
                    <p className="text-sm">Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {expData.map((exp, index) => (
                        <div key={index} className="p-4 border- border-gray-200 rounded-lg space-y-3">
                            <div className="flex justify-between items-start">
                                <h4>Experience #{index + 1}</h4>
                                <button
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                                    value={exp.company || ""}
                                    type="text"
                                    placeholder="Company Name"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <input
                                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                                    value={exp.position || ""}
                                    type="text"
                                    placeholder="Job Title"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <input
                                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                                    value={exp.start_date || ""}
                                    type="month"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <input
                                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                                    value={exp.end_date || ""}
                                    disabled={exp.is_current}
                                    type="month"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300
                                        outline-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            <label className="flex items-center gap-1">
                                <input
                                    onChange={(e) => updateExperience(index, "is_current", e.target.checked
                                        ? true
                                        : false
                                    )}
                                    checked={exp.is_current || false}
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Currently working here</span>
                            </label>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Job Description</label>
                                    <button
                                        className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100
                                            text-purple-700 rounded hover:bg-purple-200 transition-colors
                                            disabled:opacity-50"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        Enhance with AI
                                    </button>
                                </div>
                                <textarea
                                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                                    value={exp.description || ""}
                                    rows={4}
                                    placeholder="Describe your key responsibilities and achivements..."
                                    className="w-full text-sm px-3 py-2 rounded-lg resize-none
                                        border border-gray-300 outline-blue-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm
