"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import StudentForm from "@/app/components/StudentForm";

export default function RegisterPage() {
  const [students, setStudents] = useState([]);

  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center">Register a New Student</h2>
      <StudentForm onAddStudent={addStudent} />
    </div>
  );
}
