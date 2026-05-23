"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import RoleSelection from "../components/RoleSelection";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, authenticated, user } = usePrivy();
  const router = useRouter();
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    async function checkUser() {
      if (!authenticated || !user) return;

      const res = await fetch("api/auth/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privyId: user.id,
        }),
      });
      const data = await res.json();

      if (data.isNewUser) {
        setShowRoleModal(true);
      } else {
        router.push("/");
      }
    }
    checkUser();
  }, [authenticated, user]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-10 rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">E-Learner Login</h1>

        {!authenticated && <button onClick={login}>Continue with Privy</button>}
      </div>

      {showRoleModal && <RoleSelection user={user} />}
    </div>
  );
}
