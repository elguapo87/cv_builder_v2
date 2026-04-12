import { Skill } from "@/types/resume"
import { Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

type BuilderProps = {
    data: Skill[];
    onChange: (data: Skill[]) => void;
}

const SkillsForm = ({ data, onChange }: BuilderProps) => {

    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (!newSkill.trim()) return
        onChange([...data, newSkill]);
        setNewSkill("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const removeSkill = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className='space-y-4'>
            <div>
                <h3 className='max-sm:ml-auto flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
                <p className='text-sm text-gray-500'>Add your technical and soft skills</p>
            </div>

            <div className='flex gap-2 max-md:justify-center'>
                <input
                    onChange={(e) => setNewSkill(e.target.value)}
                    value={newSkill}
                    placeholder='Enter a skill (e.g., Javascript, Project Managenemt)'
                    type="text"
                    className='flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300
                        outline-blue-500 placeholder:text-xs max-md:w-1/2'
                    onKeyDown={handleKeyPress}
                />

                <button
                    onClick={addSkill}
                    className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg
                        hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed max-md:w-1/3 '
                    disabled={!newSkill.trim()}
                >
                    <Plus className='size-4' />
                    Add
                </button>
            </div>

            {data.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {data.map((skill, index) => (
                        <span
                            key={index}
                            className='flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 
                                rounded-full text-sm'
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill(index)}
                                className='ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors'
                            >
                                <X className='size-3' />
                            </button>
                        </span>
                    ))}
                </div>
            ) : (
                <div className='text-center py-6 text-gray-500'>
                    <Sparkles className='size-10 mx-auto mb-2 text-gray-300' />
                    <p>No skills added yet.</p>
                    <p className='text-sm'>Add your technical and soft skills above.</p>
                </div>
            )}

            <div className='bg-blue-50 p-3 rounded-lg'>
                <p className='text-sm text-blue-800 '>
                    <strong>Tip:</strong> {" "}
                    Add 8-12 relevant skills. Include both technical skills (programming languages, tools) {" "}
                    and soft skills (leadership, communication).
                </p>
            </div>
        </div>
    )
}

export default SkillsForm
