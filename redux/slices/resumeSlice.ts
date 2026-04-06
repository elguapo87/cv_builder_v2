import api from "@/lib/axios";
import { Education, Experience, PersonalInfo, Projects } from "@/types/resume";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import toast from "react-hot-toast";

interface Resume {
    _id: string;
    userId: string;
    title: string;
    public: boolean;
    template: string;
    accent_color: string;
    professional_summary: string;
    skills: string[];
    personal_info: {
        image: string;
        full_name: string,
        profession: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        website: string;
    };
    experience: {
        company: string;
        position: string;
        start_date: string;
        end_date: string;
        description: string;
        is_current: boolean;
    }[];
    projects: {
        name: string;
        type: string;
        description: string;
    }[];
    education: {
        institution: string;
        degree: string;
        field: string;
        graduation_date: string;
        gpa: string;
    }[];
    createdAt: string;
    updatedAt: string;
};

interface ResumeState {
    resumes: Resume[];
    currentResume: Resume | null;
    loading: boolean;
    error: string | null;
}

type ResumeUpdatePayload = Partial<{
    personal_info: PersonalInfo;
    professional_summary: string;
    experience: Experience[];
    projects: Projects[];
    education: Education[];
    skills: string[];
    title: string;
    template: string;
    accent_color: string;
    public: boolean;
}>;

const initialState: ResumeState = {
    resumes: [],
    currentResume: null,
    loading: false,
    error: null
};

export const addResume = createAsyncThunk("resume/createResume", async (title: string, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/resume/createResume", { title });

        return {
            resume: data.resume,
            message: data.message
        };

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to create resume");
    }
});

export const fetchUserResumes = createAsyncThunk("resume/getUserResumes", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/resume/getUserResumes");

        return data.resumes;

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch resumes");
    }
});

export const updateResume = createAsyncThunk("resume/updateResume", async (
    { resumeId, resumeData, removeBackground, image }:
        { resumeId: string, resumeData: ResumeUpdatePayload, removeBackground?: boolean, image?: File | null },
    { rejectWithValue }
) => {
    try {
        const formData = new FormData();
        formData.append("resumeId", resumeId);
        formData.append("resumeData", JSON.stringify(resumeData));
        formData.append("removeBackground", String(removeBackground ?? false));
        image && formData.append("image", image);

        const { data } = await api.post("/resume/updateResume", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to update resume");
    }
});

export const removeResume = createAsyncThunk("resume/deleteResume", async (resumeId: string, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/resume/deleteResume", { resumeId });

        return {
            resumeId,
            message: data.message
        };

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete resume");
    }
});

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addResume.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes.push(action.payload.resume);
                state.currentResume = action.payload.resume;
                toast.success(action.payload.message);
            })
            .addCase(addResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(fetchUserResumes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserResumes.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes = action.payload;
            })
            .addCase(fetchUserResumes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(updateResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateResume.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;

                state.resumes = state.resumes.map((r) =>
                    r._id === updated._id ? updated : r
                );

                if (state.currentResume?._id === updated._id) {
                    state.currentResume = updated;
                }

            })
            .addCase(updateResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(removeResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeResume.fulfilled, (state, action) => {
                state.loading = false;
                const resumeId = action.payload.resumeId;

                state.resumes = state.resumes.filter((r) => r._id !== resumeId);

                if (state.currentResume?._id === resumeId) {
                    state.currentResume = null;
                }

                toast.success(action.payload.message);
            })
            .addCase(removeResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
    }
})

export default resumeSlice.reducer;