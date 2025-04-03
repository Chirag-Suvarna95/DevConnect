"use client"
import { useEffect,useState } from "react";
import supabase from "./lib/supabase";
import NaNvbar from "./components/Navbar";
import DarkModeToggle from "./components/DarkModeToggle";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => { 
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
}, []);   

  return(
    <div>
      <NaNvbar />
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold ">Welcome to DevConnect</h1>
        <p className="text-gray-600">A place to connect with developers and share ideas</p>
        <DarkModeToggle/>
        {user?(
          <p className="mt-4">Logged in as: {user.email}</p>
        ):(
          <p className="mt-4 text-red-500">Please log in to access more features.</p>
  
        )}
        </div>
    </div>
  );
}