"use client";

export default function StudentList({ students }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Student List</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student.id} className="border p-2">
            <p>Name: {student.name}</p>
            <p>Department: {student.department}</p>
            <p>USN: {student.usn}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
