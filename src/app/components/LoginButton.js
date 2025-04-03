"use client";

import supabase from "@/lib/supabase";

export default function LoginButton() {
    async function signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) console.error("Login error", error);
    }

    return (
        <button
            onClick={signInWithGoogle}
            className="p-2 bg-blue-500 text-white rounded-lg"
        >
            Sign In with Google
        </button>
    );
}
