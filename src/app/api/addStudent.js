import supabase from "@/app/lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, department, usn } = req.body;

    try {
      const { data, error } = await supabase
        .from("students")
        .insert([{ name, department, usn }]);

      if (error) throw error;

      res.status(200).json({ message: "Student added successfully", data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
