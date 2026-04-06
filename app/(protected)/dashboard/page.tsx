"use client"

import { addResume, fetchUserResumes, removeResume, updateResume } from "@/redux/slices/resumeSlice";
import { uploadResume as aiUploaResume } from "@/redux/slices/aiSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { StoredResume } from "@/types/resume";
import { FilePenIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {

  const { resumes, currentResume } = useSelector((state: RootState) => state.resume);
  const loading = useSelector((state: RootState) => state.ai.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [allResumes, setAllResumes] = useState<StoredResume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState("");

  const router = useRouter();

  const colors = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a"
  ];

  const loadAllResumes = async () => {
    try {
      await dispatch(fetchUserResumes()).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const createResume = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await dispatch(addResume(title)).unwrap();
      setShowCreateResume(false);

      router.push(`/builder/${result.resume._id}`);

    } catch (error) {
      console.error(error);
    }
  };

  const uploadResume = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error("No file selected");
      return;

    }

    try {
      const resumeText = await pdfToText(resumeFile);

      const result = await dispatch(aiUploaResume({ resumeText, title })).unwrap();
      setTitle("");
      setResumeFile(null);
      setShowUploadResume(false);
      router.push(`/builder/${result.resumeId}`);

    } catch (error: any) {
      const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(error?.response?.data?.message || errMessage);
    }
  };

  const editTitle = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const selectedResume = resumes.find((r) => r._id === editResumeId);
      if (!selectedResume) {
        toast.error("Resume not found");
        return;
      }

      const { _id, userId, updatedAt, ...rest } = selectedResume;

      const updatedData = {
        ...rest,
        title
      };

      await dispatch(updateResume({ resumeId: editResumeId, resumeData: updatedData })).unwrap();
      toast.success("Saved");

      loadAllResumes();
      setEditResumeId("");
      setTitle("");

    } catch (error) {
      console.error(error);
    }
  };

  const deleteResume = async (resumeId: string) => {
    const confirmation = window.confirm("Are you sure you want to delete this resume?");
    if (!confirmation) return;

    try {
      await dispatch(removeResume(resumeId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 text-stone-100'>
      <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700
          bg-clip-text text-stone-200 sm:hidden'
      >
        Welcome, John Doe
      </p>

      {/* BUTTONS - CREATE/UPLOAD */}
      <div className='flex gap-4'>
        <button
          onClick={() => setShowCreateResume(true)}
          className='w-full bg-stone-200 sm:max-w-36 h-48 flex flex-col items-center justify-center
              rounded-lg gap-2 text-slate-600 border-2 border-dashed border-slate-400 group
              hover:border-[#56b806] hover:shadow-lg shadow-[#64da05] transition-all duration-300 cursor-pointer'

        >
          <PlusIcon
            className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br 
                from-[#89db45] to-[#64da05]  text-white rounded-full'
          />
          <p className='text-sm group-hover:text-[#489b05] transition-all duration-300'>
            Create Resume
          </p>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className='w-full bg-stone-200 sm:max-w-36 h-48 flex flex-col items-center justify-center
              rounded-lg gap-2 text-slate-600 border-2 border-dashed border-slate-400 group
              hover:border-purple-500 hover:shadow-lg shadow-purple-500 transition-all duration-300 cursor-pointer'
        >
          <UploadCloudIcon
            className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br 
                from-indigo-300 to-purple-500  text-white rounded-full'
          />
          <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>
            Upload Existing
          </p>
        </button>
      </div>

      <hr className='border-slate-300 my-6 sm:w-76.25' />

      {/* USER RESUMES */}
      <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
        {resumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];

          return (
            <button
              key={index}
              onClick={() => router.push(`/builder/${resume._id}`)}
              className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg
                  gap-2 border group hover:shadow-lg shadow-gray-400 transition-all duration-300 cursor-pointer'
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: baseColor + "40"
              }}
            >
              <FilePenIcon
                className='size-7 group-hover:scale-105 transition-all'
                style={{ color: baseColor }}
              />
              <p
                className='text-sm group-hover:scale-105 transition-all px-2 text-center'
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>
              <p
                className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500
                    transition-all duration-300 px-2 text-center'
                style={{ color: baseColor + "90" }}
              >
                Updated On {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              <div
                onClick={(e) => e.stopPropagation()}
                className='absolute top-1 right-1 group-hover:flex items-center hidden'
              >
                <TrashIcon
                  onClick={() => deleteResume(resume._id)}
                  className='size-7 p-1.5 hover:bg-white/70 hover:text-gray-700 rounded 
                      text-slate-200 transition-colors'
                />
                <PencilIcon
                  onClick={() => { setEditResumeId(resume._id); setTitle(resume.title); }}
                  className='size-7 p-1.5 hover:bg-white/70 hover:text-gray-700 rounded
                      text-slate-200 transition-colors'
                />
              </div>
            </button>
          )
        })}
      </div>

      {showCreateResume && (
        <form
          onSubmit={createResume}
          className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
          >
            <h2 className='text-xl font-bold mb-4 text-gray-600'>Create a Resume</h2>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-2 focus:border-green-600 ring-green-600
                  border border-gray-500 rounded-lg outline-none text-gray-800 placeholder:text-gray-500'
              required
            />
            <button
              className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
            >
              Create Resume
            </button>
            <XIcon
              onClick={() => { setShowCreateResume(false); setTitle(""); }}
              className='absolute top-4 right-4 text-slate-400 hover:text-slate-600
                    cursor-pointer transition-colors'
            />

          </div>
        </form>
      )}

      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
          >
            <h2 className='text-xl font-bold mb-4 text-gray-600'>Upload Resume</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-2 focus:border-green-600 ring-green-600
                  border border-gray-500 rounded-lg outline-none text-gray-800 placeholder:text-gray-500'
              required
            />
            <div>
              <label htmlFor="resume-input" className='block text-sm text-slate-700'>
                Select Resume File
                <div
                  className='flex flex-col items-center justify-center gap-2 border group text-slate-400
                      border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500
                      hover:text-green-700 cursor-pointer transition-colors'
                >
                  {resumeFile ? (
                    <p className='text-green--'>{resumeFile?.name}</p>
                  ) : (
                    <>
                      <UploadCloud className='size-14 stroke-1' />
                      <p>Upload Resume</p>
                    </>
                  )}
                </div>
              </label>
              <input
                onChange={(e) => setResumeFile(e.target.files && e.target.files[0])}
                type="file"
                accept='.pdf'
                id='resume-input'
                hidden
              />
            </div>
            <button
              className={`w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors
                ${loading && "flex items-center justify-center gap-2"}`}
              disabled={loading}
            >
              {loading && <LoaderCircleIcon className="animate-spin size-4 text-white" />} 
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

            <XIcon
              onClick={() => { setShowUploadResume(false); setTitle(""); }}
              className='absolute top-4 right-4 text-slate-400 hover:text-slate-600
                    cursor-pointer transition-colors'
            />
          </div>
        </form>
      )}

      {editResumeId && (
        <form
          onSubmit={editTitle}
          className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
          >
            <h2 className='text-xl font-bold mb-4 text-gray-600'>Edit Resume Title</h2>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-2 focus:border-green-600 ring-green-600 border
                border-gray-500 rounded-lg outline-none text-gray-800 placeholder:text-gray-500'
              required
            />
            <button
              className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
            >
              Update
            </button>

            <XIcon
              onClick={() => { setEditResumeId(""); setTitle(""); }}
              className='absolute top-4 right-4 text-slate-400 hover:text-slate-600
                    cursor-pointer transition-colors'
            />
          </div>
        </form>
      )}

    </div>
  )
}

export default Dashboard
