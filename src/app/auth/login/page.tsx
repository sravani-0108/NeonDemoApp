"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | { fullName: string; email: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

     //Send login data to backend API
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
         // Handle network or unexpected errors
        setError(data.message || "Invalid email or password");
      } else {
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser({ fullName: data.user.fullName, email: data.user.email });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Remove session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Reset user state
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-sm border border-gray-200">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.fullName}!</h1>
          <p className="text-gray-600 mb-6">Email: {user.email}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  //Login Form View

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {}
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transform -translate-y-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 text-sm mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
