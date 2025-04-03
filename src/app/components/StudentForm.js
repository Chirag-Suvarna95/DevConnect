"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [usn, setUsn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("students")
        .insert([{ name, department, usn }])
        .select();
      if (error) throw error;

      // Pass the new student to the parent component
      onAddStudent(data[0]);

      // Clear the form
      setName("");
      setDepartment("");
      setUsn("");
    } catch (err) {
      console.error("Error adding student:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Add Student
      </button>
    </form>
  );
}
