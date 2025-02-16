/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useVerifyLoginMutation } from "@/redux/api/authApi";
import { loginSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Zoom } from "react-toastify";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const [loading, setLoading] = useState(false);

  const [error,setError] = useState("")

  const [verifyLogin] = useVerifyLoginMutation();

  const onSubmit = async (data: { email: string; password: string }) => {
    // if (session?.data) {
    //   signOut()
    // }
    try {
      const response = await verifyLogin({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (!!response.success) {
        toast.success("Successfully signed in", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Zoom,
        });

        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/dashboard",
          redirect: true,
        });
      }
    } catch (error) {
      //@ts-ignore
      toast.error(error?.data?.message || "something went wrong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Zoom,
      });

      //@ts-ignore
      setError(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300 shadow-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
