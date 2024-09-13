"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use `next/navigation` in Next.js 13+
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "./login.css";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    setError(""); // Reset error message

    const formdata = new FormData();
    formdata.append("user_email", email);
    formdata.append("user_password", password);

    try {
      // Perform the login request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/token`,
        {
          method: "POST",
          body: formdata,
          redirect: "follow",
        }
      );

      // If response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Login failed");
      }

      // If login is successful, process the response
      const data = await response.json();
      console.log("Login successful", data);
      localStorage.setItem("token", data.access_token); // Save token in localStorage

      // Navigate to the dashboard page
      router.push("/dashboard/utmstats/leadcount");
    } catch (error: any) {
      // Log the error and update the error state to display it in the UI
      console.log("Login Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Login Form */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-white p-10">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Hipto Logo"
          width={150}
          height={50}
          className="mb-8"
        />

        {/* Form Title */}
        <h2 className="text-2xl font-semibold mb-2">Connexion à votre compte</h2>
        <p className="mb-4">Saisissez votre e-mail professionnel</p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="form w-100 mb-6 pt-10">
          <input
            type="email"
            placeholder="Email"
            className="form-control w-full px-4 py-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control w-full px-4 py-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="button-submit py-2 text-white rounded" type="submit">
            Connexion
          </Button>
        </form>

        {/* Display error message if any */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Right side - Image and branding */}
      <div className="flex flex-col items-center justify-center w-1/2 grid-right text-white p-10">
        <Image
          src="/logo-2.png"
          alt="Hipto Logo"
          width={150}
          height={50}
          className="mb-8"
        />
        <h1 className="text-4xl font-bold">The lead generation 🧢</h1>
      </div>
    </div>
  );
}
