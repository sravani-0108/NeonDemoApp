'use client';

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<{[key:string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setForm(prev => ({ ...prev, [name]: value }));
  
    // Remove error for this field as soon as user fixes it
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validate = () => {
    let tempErrors: {[key:string]: string} = {};

    if (!form.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!form.lastName.trim()) tempErrors.lastName = "Last name is required";

    if (!form.email) tempErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) tempErrors.email = "Invalid email";

    if (!form.phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) tempErrors.phone = "Phone must be 10 digits";

    if (!form.password) tempErrors.password = "Password is required";
    else if (form.password.length < 6) tempErrors.password = "Min 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phoneNumber: form.phone, // API expects phoneNumber
          password: form.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

       //Clear all form fields
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    });

  
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
          </div>

          <div>
            <input
              name="lastName"
              placeholder="Last Name" 
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <small className="text-red-500">{errors.email}</small>}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <small className="text-red-500">{errors.phone}</small>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <small className="text-red-500">{errors.password}</small>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
      </div>
    </div>
  );
}
