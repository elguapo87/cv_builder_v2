"use client"

import { Lock, Mail, User2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react"

const Login = () => {
  const searchParams = useSearchParams();
  const urlState = searchParams.get("state");

  const [state, setState] = useState(urlState || "login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (urlState) {
      setState(urlState);
    }
  }, [urlState]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black/98">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
      >
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
        >
          {state === "login" ? "Login" : "Sign Up"}
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
  )
}

export default Login
