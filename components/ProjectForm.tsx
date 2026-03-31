import { Projects } from "@/types/resume"
import { FileCog, Plus, Trash2 } from "lucide-react";

type BuilderProps = {
    data: Projects[];
    onChange: (data: Projects[]) => void;
}

const ProjectForm = ({ data, onChange }: BuilderProps) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: ""
        };

        onChange([...data, newProject]);
    };

    const removeProject = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateProjects = <K extends keyof Projects>(index: number, field: K, value: Projects[K]) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <>
            <div className="flex max-sm:flex-col max-sm:gap-5 items-center justify-between">
                <div>
                    <h3
                        className="flex items-center gap-2 text-lg font-semibold text-gray-900 max-sm:ml-6"
                    >
                        Projects
                    </h3>
                    <p className="text-sm text-gray-500">Add your projects</p>
                </div>

                <button
                    onClick={addProject}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 roudned
                        rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center max-sm:mt-5 py-8 text-gray-500">
                    <FileCog className="size-12 mx-auto mb-3 text-gray-300" />
                    <p>No projects added yet.</p>
                    <p className="text-sm">If you have any projects, you can add them by clicking 'Add Project'.</p>
                </div>
            ) : (
                <div className="space-y-4 mt-3 sm:mt-6">
                    {data.map((proj, index) => (
                        <div key={index} className="p-4 border- border-gray-200 rounded-lg space-y-3">
                            <div className="flex justify-between items-start">
                                <h4>Project #{index + 1}</h4>
                                <button
                                    onClick={() => removeProject(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="grid gap-3">
                                <input
                                    onChange={(e) => updateProjects(index, "name", e.target.value)}
                                    value={proj.name || ""}
                                    type="text"
                                    placeholder="Project Name"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <input
                                    onChange={(e) => updateProjects(index, "type", e.target.value)}
                                    value={proj.type || ""}
                                    type="text"
                                    placeholder="Project Type"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-blue-500"
                                />
                                <textarea
                                    onChange={(e) => updateProjects(index, "description", e.target.value)}
                                    value={proj.description || ""}
                                    rows={4}
                                    placeholder="Describe your project..."
                                    className="w-full px-2 py-2 text-sm resize-none rounded-lg border
                                        border-gray-300 outline-blue-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ProjectForm
