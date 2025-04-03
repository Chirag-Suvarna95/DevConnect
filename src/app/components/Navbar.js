"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage menu toggle

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
    <nav className="p-4 bg-gray-800 text-white">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Student Portal
        </Link>
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:flex gap-6">
          <Link href="/pages/register" className="hover:text-gray-300">Register Student</Link>
          <Link href="/pages/students" className="hover:text-gray-300">Student List</Link>
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden mt-4 gap-2">
          <Link href="/pages/register" className="hover:text-gray-300">Register Student</Link>
          <Link href="/pages/students" className="hover:text-gray-300">Student List</Link>
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign in with Google
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
