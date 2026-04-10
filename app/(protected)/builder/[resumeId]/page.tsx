"use client"

import ColorPicker from "@/components/ColorPicker";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import ProfessionalSummaryForm from "@/components/ProfessionalSummaryForm";
import ProjectForm from "@/components/ProjectForm";
import ResumePreview from "@/components/ResumePreview";
import SkillsForm from "@/components/SkillsForm";
import TemplateSelector from "@/components/TemplateSelector";
import { getResumeById, updateResume } from "@/redux/slices/resumeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Education, Experience, PersonalInfo, Projects, Skill, StoredResume } from "@/types/resume";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ResumeBuilder = () => {
  const { resumeId } = useParams() as { resumeId: string };
  const { currentResume, loading } = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch<AppDispatch>();

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

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resumeId) return;

    dispatch(getResumeById(resumeId));
  }, [resumeId, dispatch]);

  useEffect(() => {
    if (!currentResume) return;

    setResumeData(currentResume);

    document.title = currentResume.title;

  }, [currentResume]);

  const changeVisibility = () => {
    if (!resumeData._id) return;

    setResumeData((prev) => ({
      ...prev,
      public: !resumeData.public
    }));

    const updatedData = { ...resumeData, public: !resumeData.public };

    dispatch(updateResume({ resumeId: resumeData._id, resumeData: updatedData }));
  };

  const handleSave = async () => {
    if (!resumeData._id) {
      toast.error("Resume not initialized");
      return;
    }

    try {
      const payload = Object.fromEntries(Object.entries(resumeData).filter(([_id, value]) => value !== undefined));

      const result = await dispatch(updateResume({
        resumeId: resumeData._id,
        resumeData: payload,
        removeBackground,
        image:
          resumeData.personal_info.image instanceof File
            ? resumeData.personal_info.image
            : undefined
      })).unwrap();

      setResumeData(prev => ({
        ...prev,
        ...result,
        personal_info: {
          ...prev.personal_info,
          ...(result.personal_info ?? {})
        }
      }));

      toast.success("Resume saved");

    } catch (error) {
      toast.error("Failed to save resume");
    }
  };

  const handleShare = () => {
    if (!resumeData._id) {
      alert("Please save the resume before sharing.");
      return;
    }

    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/view/${resumeData._id}`;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  
  const downloadResume = async () => {
    if (!printRef.current) return;

    try {
      // 🧠 wait for DOM update
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        pixelRatio: 2
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
      });

      const imgProps = pdf.getImageProperties(dataUrl);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${resumeData.title || "resume"}.pdf`);

    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    }
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

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary ?? ""}
                    onChange={(data: string) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    expData={resumeData.experience ?? []}
                    onChange={(data: Experience[]) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education ?? []}
                    onChange={(data: Education[]) => {
                      setResumeData((prev) => ({
                        ...prev,
                        education: data
                      }))
                    }}
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.projects ?? []}
                    onChange={(data: Projects[]) =>
                      setResumeData((prev) => ({
                        ...prev,
                        projects: data
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills ?? []}
                    onChange={(data: Skill[]) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data
                      }))
                    }
                  />
                )}
              </div>

              <button
                onClick={handleSave}
                className={`bg-linear-to-r from-green-100 to-green-300 ring-green-400 text-green-700
                    ring hover:ring-green-600 transition-all rounded-md px-6 py-2 mt-6 text-sm 
                    ${loading && "cursor-not-allowed"}`}
                disabled={loading}
              >
                {loading ? "Saving" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - PREVIEW */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center py-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200
                        text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}

                <button
                  onClick={changeVisibility}
                  className="flex items-center py-2 px-4 gap-2 text-xs bg-linear-to-br
                    from-purple-100 to-purple-200 text-purple-600 rounded-lg
                    ring-purple-300 hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={downloadResume}
                  className="flex items-center py-2 px-6 gap-2 text-xs bg-linear-to-br
                    from-green-100 to-green-200 text-green-600 rounded-lg
                    ring-green-300 hover:ring transition-colors"
                >
                  <Download className="size-4" /> Download
                </button>
              </div>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>

        <div className="fixed -left-2499.75 top-0">
          <div ref={printRef}>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              classes="bg-white shadow-none border-none"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeBuilder
