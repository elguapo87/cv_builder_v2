import api from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface AiState {
    content: string | null;
    createdResumeId: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: AiState = {
    content: null,
    createdResumeId: null,
    loading: false,
    error: null
};

export const enhanceJobDescription = createAsyncThunk("ai/enhanceJobDescription", async (
    userContent: string, { rejectWithValue }
) => {
    try {
        const { data } = await api.post("/ai/enhanceJobDescription", { userContent });

        return data.enhancedContent;

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to enhance job description");
    }
});

export const enhanceProfessionalSummary = createAsyncThunk("ai/enhanceProfessionalSummary", async (
    userContent: string, { rejectWithValue }
) => {
    try {
        const { data } = await api.post("/ai/enhanceProfessionalSummary", { userContent });

        return data.enhancedContent

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to enhance job description");
    }
});

export const uploadResume = createAsyncThunk("ai/uploadResume", async (
    { resumeText, title }: { resumeText: string, title: string }, { rejectWithValue }
) => {
    try {
        const { data } = await api.post("/ai/uploadResume", { resumeText, title });

        return data;

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to enhance job description");
    }
});


const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(enhanceJobDescription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enhanceJobDescription.fulfilled, (state, action) => {
                state.loading = false;
                state.content = action.payload;
            })
            .addCase(enhanceJobDescription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(enhanceProfessionalSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enhanceProfessionalSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.content = action.payload;
            })
            .addCase(enhanceProfessionalSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(uploadResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                state.loading = false;
                state.createdResumeId = action.payload.resumeId;
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
    }
})

export default aiSlice.reducer;