import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import resumeReducer from "@/redux/slices/resumeSlice";
import aiReducer from "@/redux/slices/aiSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        resume: resumeReducer,
        ai: aiReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch