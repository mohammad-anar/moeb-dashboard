"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "@/assets/logo.png";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Form submitted:", data);
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  return (
    <div className="w-full max-w-md px-8">
      {/* Header */}
      {/* logo */}
      <div className="flex items-center justify-center mb-5">
        <Image
          src={logo}
          width={300}
          height={300}
          className="w-60"
          alt="logo"
        />
      </div>
      {/* welcome title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-normal text-gray-900 mb-4">
          Welcome Back!
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Email
          </label>
          <div className="relative ">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ring"
              size={20}
            />
            <input
              type="email"
              placeholder="john@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring bg-input/30"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ring"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring bg-input/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right -mt-4">
          <Link
            href="/forgot-password"
            className="text-blue-500 underline text-sm font-normal hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full py-6 uppercase rounded-lg font-semibold bg-light-black text-white text-lg cursor-pointer transition-colors"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}
