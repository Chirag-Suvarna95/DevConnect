"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const { data, error } = await supabase.from("students").select("*");
        if (error) throw error;
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err.message);
      }
    }

    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">USN</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border p-2">{student.id}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.department}</td>
                <td className="border p-2">{student.usn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
