"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { generateToken } from "@/util/jwt";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mock authentication logic
    if (username === "admin" && password === "admin") {
      // Cookies.set("authToken", "your_auth_token", { expires: 1 }); // Token valid for 1 day

      const token = await generateToken({ username });
      console.log("token success", token);
      // Set the JWT token as a cookie using js-cookie
      Cookies.set("authToken", token, {
        expires: 1, // Expires in 1 day
        path: "/",
        httpOnly: false, // Since we are setting it on the client side
        // secure: process.env.NODE_ENV === "production", // Set to true on production
        sameSite: "strict",
      });

      router.push("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl text-center font-bold mb-4">INVENTIO 3.0</h1>

        <h1 className="text-2xl text-center font-bold mb-6">BILL GENERATOR</h1>

        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
