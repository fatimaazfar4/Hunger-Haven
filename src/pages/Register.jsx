import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "At least 3 chars"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password required").min(6, "Min 6 chars"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === data.email)) {
      alert("Email already registered!");
      return;
    }

    users.push({ name: data.name, email: data.email, password: data.password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 font-sans">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl max-w-md w-full p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-pink-600 text-center tracking-wide">
          Create Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              {...register("name")}
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your full name"
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              {...register("email")}
              type="email"
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              {...register("password")}
              type="password"
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="********"
            />
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="********"
            />
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-extrabold tracking-wide hover:bg-pink-700 transition-shadow shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-bold hover:underline underline-offset-4"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
