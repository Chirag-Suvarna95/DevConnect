"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Login error:", error);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-bold">Student Portal</Link>
        <Link href="/pages/register" className="hover:text-gray-300">Register Student</Link>
        <Link href="/pages/students" className="hover:text-gray-300">Student List</Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <p>Welcome, {user.user_metadata.full_name}</p>
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}
