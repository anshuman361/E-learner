"use client";

import { useState } from "react";

export default function RoleSelection({ user }) {
  const [role, setRole] = useState("");

  async function saveRole() {
    await fetch("api/auth/sync-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privyId: user.id,
        email: user.email?.address,
        name: user.google?.name || "User",
        image: user.google?.profilePictureUrl || "",
        role,
      }),
    });
    router.push("/");
  }
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl w-[350px]">
        <h2 className="text-2xl font-bold mb-6">Select Role</h2>

        <div className="space-y-4">
          <button
            onClick={() => setRole("student")}
            className={`w-full py-3 rounded-xl ${
              role === "student" ? "bg-indigo-600" : "bg-zinc-800"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("instructor")}
            className={`w-full py-3 rounded-xl ${
              role === "instructor" ? "bg-indigo-600" : "bg-zinc-800"
            }`}
          >
            Instructor
          </button>
        </div>

        <button
          disabled={!role}
          onClick={saveRole}
          className="w-full bg-green-600 py-3 rounded-xl mt-6"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
