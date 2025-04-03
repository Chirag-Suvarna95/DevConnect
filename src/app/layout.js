import Navbar from "@/app/components/Navbar";
import "../app/globals.css";



export const metadata = {
  title: "Student Portal",
  description: "Manage students efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
