"use client"

import GuestGuard from "@/components/GuestGuard";
import { loginUser, registerUser } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ArrowLeft, Lock, Mail, User2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const searchParams = useSearchParams();
  const urlState = searchParams.get("state");

  const [state, setState] = useState(urlState || "login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const router = useRouter();

  useEffect(() => {
    if (urlState) {
      setState(urlState);
    }
  }, [urlState]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (state === "login") {
        await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
      } else {
        await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })).unwrap();
      }

      router.replace("/dashboard");

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <GuestGuard>
      <div className="flex items-center justify-center w-full h-screen bg-black/98">
        <form
          onSubmit={handleSubmit}
          className="relative sm:w-87.5 text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
        >

          <Link
            href="/"
            className="absolute left-2 top-2 text-stone-50 hover:text-stone-100
            hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="size-6.5" />
          </Link>


          <h1 className="text-white text-3xl mt-10 font-medium">
            {state === "login" ? "Login" : "Sign Up"}
          </h1>

          <p className="text-gray-400 text-sm mt-2">Please {state} to continue</p>

          {state !== "login" && (
            <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700
              h-12 rounded-full overflow-hidden pl-6 gap-2 "
            >
              <User2Icon size={16} className="text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
          )}

          <div
            className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700
              h-12 rounded-full overflow-hidden pl-6 gap-2 "
          >
            <Mail size={16} className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div
            className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700
              h-12 rounded-full overflow-hidden pl-6 gap-2"
          >
            <Lock size={16} className="text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <div className="mt-4 text-left">
            <button className="text-sm text-[#71fe64] hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full h-11 rounded-full text-gray-800 bg-[#71fe64] hover:bg-[#13a506]
              hover:text-gray-300 transition"
            disabled={loading}
          >
            {
              loading
                ? "Please wait..."
                : state === "login"
                  ? "Login"
                  : "Sign Up"
            }
          </button>

          <p
            onClick={() => setState((prev) => prev === "login" ? "register" : "login")}
            className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
          >
            {state === "login" ? "Don't have an account?" : "Already have an account?"}
            <span className="text-[#71fe64] hover:underline ml-1">click here</span>
          </p>
        </form>
      </div>
    </GuestGuard>
  )
}

export default Login
