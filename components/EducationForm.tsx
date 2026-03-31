import { Education } from "@/types/resume";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

type ResumeProps = {
    data: Education[];
    onChange: (data: Education[]) => void;
};

const EducationForm = ({ data, onChange }: ResumeProps) => {

    const addEducation = () => {
        const newEducation = {
            degree: "",
            field: "",
            institution: "",
            gpa: "",
            graduation_date: ""
        };
        onChange([...data, newEducation]);
    };

    const removeEducation = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateEducation = <K extends keyof Education>(index: number, field: K, value: Education[K]) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex max-sm:flex-col max-sm:gap-5 items-center justify-between">
                <div>
                    <h3 className="max-sm:ml-12 flex items-center gap-2 text-lg font-semibold text-gray-900">Education</h3>
                    <p className="text-sm text-gray-500">Add your education details</p>
                </div>

                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 roudned
                        rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="size-12 mx-auto mb-3 text-gray-300" />
                    <p>No education added yet.</p>
                    <p className="text-sm">Click "Add Education" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((edu, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                            <div className="flex justify-between items-start">
                                <h4>Education #{index + 1}</h4>
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                    value={edu.institution || ""}
                                    type="text"
                                    placeholder="Institution Name"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <input
                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    value={edu.degree || ""}
                                    type="text"
                                    placeholder="Degree (e.g., Bachelor's, Master's)"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <input
                                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                                    value={edu.field || ""}
                                    type="text"
                                    placeholder="Field of Study"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <input
                                    onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                                    value={edu.graduation_date || ""}
                                    type="month"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                            </div>

                            <input
                                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                value={edu.gpa || ""}
                                type="text"
                                placeholder="Gpa (optional)"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EducationForm
