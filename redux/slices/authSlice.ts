import api from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    initialized: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    initialized: false,
    error: null
};

export const registerUser = createAsyncThunk("auth/register", async (
    credentials: { name: string, email: string, password: string }, { rejectWithValue }
) => {
    try {
        const { data } = await api.post("/auth/register", credentials);

        return {
            user: data.User,
            message: data.message,
            token: data.token
        };

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Registration failed")
    }
});

export const loginUser = createAsyncThunk("auth/login", async (
    credentials: { email: string, password: string }, { rejectWithValue }
) => {
    try {
        const { data } = await api.post("/auth/login", credentials);

        return {
            token: data.token,
            user: data.user,
            message: data.message
        };

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Login Failed")
    }
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/auth/me");

        return data.user;        

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },

        setInitialized: (state) => {
            state.initialized = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;

                localStorage.setItem("token", action.payload.token);
                toast.success(action.payload.message);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;

                localStorage.setItem("token", action.payload.token);
                toast.success(action.payload.message);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");
            })
    }
})

export const { logout, setToken, setInitialized } = authSlice.actions;

export default authSlice.reducer;