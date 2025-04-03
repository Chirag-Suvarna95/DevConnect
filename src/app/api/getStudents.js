import supabase from "@/app/lib/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("students").select("*");
      if (error) throw error;
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
