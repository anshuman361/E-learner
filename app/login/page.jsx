"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import RoleSelection from "../components/RoleSelection";

//import RoleSelection from "@/components/RoleSelection";

export default function LoginPage() {
  const { login, authenticated, user } = usePrivy();

  const router = useRouter();

  const [showRoleModal, setShowRoleModal] = useState(false);

  const [role, setRole] = useState("");
  const email =
    user?.email?.address || user?.google?.email || user?.linkedin?.email || "";
  useEffect(() => {
    async function checkUser() {
      if (!authenticated || !user) return;
      console.log("PRIVY USER:", user);
      const res = await fetch("/api/auth/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privyId: user.id,
          email,
          provider: "privy",
        }),
      });

      const data = await res.json();

      if (data.isNewUser) {
        setShowRoleModal(true);
      } else {
        if (data.user.role === "student") {
          router.push("/student");
        }

        if (data.user.role === "instructor") {
          router.push("/instructor/dashboard");
        }
      }
    }

    checkUser();
  }, [authenticated, user]);

  async function saveRole() {
    localStorage.setItem("role", role);
    const res = await fetch("/api/auth/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        privyId: user?.id,
        email,
        name: user?.name,
        provider: "privy",
        role,
      }),
    });
    const data = await res.json();
    if (data.user.role === "student") {
      router.push("/student");
    }
    if (data.user.role === "instructor") {
      router.push("/instructor/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="w-1/2 bg-[#00C950] text-white flex flex-col justify-center px-20">
        <h1 className="text-6xl font-bold mb-6">E-Learn Market 🚀</h1>

        <p className="text-xl mb-10 text-white/90">
          Learn new skills, build your future, and connect with top instructors.
        </p>

        <div className="space-y-6 text-lg">
          <div className="flex gap-3">
            <span>✓</span>
            <p>AI Assistant to ask doubts, generate summary & take quiz</p>
          </div>

          <div className="flex gap-3">
            <span>✓</span>
            <p>Best courses to learn & upgrade yourself</p>
          </div>

          <div className="flex gap-3">
            <span>✓</span>
            <p>Teach and earn</p>
          </div>

          <div className="flex gap-3">
            <span>✓</span>
            <p>Chat with instructor</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 bg-[#F5F5F5] flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]">
          <h2 className="text-4xl font-bold text-center mb-3">Welcome 👋</h2>

          <p className="text-center text-gray-500 mb-8">
            Sign in to continue learning
          </p>

          {!authenticated && (
            <button
              onClick={login}
              className="w-full bg-[#00C950] hover:bg-green-600 transition-all text-white py-4 rounded-xl text-lg font-semibold"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* ROLE MODAL */}
      {showRoleModal && (
        <RoleSelection role={role} setRole={setRole} saveRole={saveRole} />
      )}
    </div>
  );
}
