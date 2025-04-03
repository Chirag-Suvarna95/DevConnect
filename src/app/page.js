"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase";
import Navbar from "@/app/components/Navbar";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import StudentForm from "@/app/components/StudentForm";
import StudentList from "@/app/components/StudentList";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Welcome to DevConnect</h1>
        <p className="text-gray-600">
          A place to connect with developers and share ideas
        </p>
        <DarkModeToggle />
        {user ? (
          <p className="mt-4">Logged in as: {user.email}</p>
        ) : (
          <p className="mt-4 text-red-500">Please log in to access more features.</p>
        )}
      </div>
      <div className="p-4">
        <StudentForm />
        <StudentList /> {/* Added the StudentList component */}
      </div>
    </div>
  );
}
