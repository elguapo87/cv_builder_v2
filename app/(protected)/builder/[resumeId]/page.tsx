"use client"

import ColorPicker from "@/components/ColorPicker";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import TemplateSelector from "@/components/TemplateSelector";
import { dummyResumeData } from "@/public/assets";
import { PersonalInfo, StoredResume } from "@/types/resume";
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

const ResumeBuilder = () => {
  const { resumeId } = useParams() as { resumeId: string };

  const emptyResume: StoredResume = {
    _id: "",
    title: "",
    personal_info: { full_name: "" },
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
    userId: "",
    updatedAt: "",
    createdAt: ""
  };

  const [resumeData, setResumeData] = useState<StoredResume>(emptyResume);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  console.log(activeSection);


  useEffect(() => {
    if (!resumeId) return;

    if (resumeId === "new") {
      setResumeData(emptyResume);
      return;
    }

    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (!resume) return;

    setResumeData(resume);
    document.title = resume.title;
  }, [resumeId]);

  const changeVisibility = () => {
    setResumeData((prev) => ({
      ...prev,
      public: !prev.public
    }));
  };

  const handleSave = async () => {
    let newId = resumeData._id;

    if (!newId) {
      newId = crypto.randomUUID();
    }

    const updatedResume = {
      ...resumeData,
      _id: newId,
      createdAt: resumeData.createdAt || new Date().toISOString(),
      updatedAt: resumeData.updatedAt || new Date().toISOString()
    };

    setResumeData(updatedResume);

    // store locally
    const stored = JSON.parse(localStorage.getItem("resumes") || "[]");
    const filtered = stored.filter((r: StoredResume) => r._id !== newId);

    localStorage.setItem(
      "resumes",
      JSON.stringify([...filtered, updatedResume])
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/dashboard"
          className="inline-flex gap-2 items-center text-stone-100 hover:text-stone-300 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT PANEL - FORM */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div
              className="bg-white rounded-lg shadow-sm shadow-stone-100 border-3 border-stone-400/80 p-6 pt-1"
            >
              {/* PROGRESS BAR USING activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-3 border-stone-400/80" />
              <hr
                className="absolute top-0 left-0 h-1.5 bg-linear-to-r from-[#7ce761] to-[#55a741]
                  border-none transition-all duration-2000"
                style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%` }}
              />

              {/* SECTION NAVIGATION  */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(data: string) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template: data
                      }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(data: string) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: data
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 
                        hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600
                      hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && "opacity-50"}`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    <ChevronRight className="size-4" />
                    Next
                  </button>
                </div>
              </div>

              {/* FORM CONTENT */}
              <div className="space-y-6 min-h-[30vh]">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm 
                    personalData={resumeData.personal_info}
                    onChange={(data: PersonalInfo) => 
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeBuilder
