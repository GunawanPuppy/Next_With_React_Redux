"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface UserLogin {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async (loginData: UserLogin) => {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://dummyjson.com/user/login",
        loginData,
        { headers: { "Content-Type": "application/json" } },
      );
      return data;
    },
    onSuccess: async (data) => {
      try {
        await axios.post("/api", {
          token: data.token,
        });
        setIsLoading(false);
        router.push("/users")
      } catch (error) {
        console.error("Error handling login success", error);
        setIsLoading(false);
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "An error occurred",
        showConfirmButton: false,
      });
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<UserLogin> = (loginData) => {
    mutation.mutate(loginData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
