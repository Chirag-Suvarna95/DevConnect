"use client";

import { useState } from "react";
import supabase from "@/app/lib/supabase";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [usn, setUsn] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("students")
        .insert([{ name, department, usn }]);

      if (error) throw error;

      setMessage("Student added successfully!");
      setName("");
      setDepartment("");
      setUsn("");
    } catch (error) {
      console.error("Error adding student:", error.message);
      setMessage("Failed to add student.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border mb-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="p-2 border mb-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
        className="p-2 border mb-2 rounded w-full"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Add Student
      </button>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </form>
  );
}
