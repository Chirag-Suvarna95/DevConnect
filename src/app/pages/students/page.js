"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import StudentList from "@/app/components/StudentList";

export default function StudentListPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase.from("students").select("*");
        if (error) throw error;
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err.message);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center">Student List</h2>
      <StudentList students={students} />
    </div>
  );
}
