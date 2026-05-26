"use client";

import { useRouter } from "next/navigation";

export default function EnrollButton({ courseId, studentId }) {
  const router = useRouter();

  async function handleEnroll() {
    const res = await fetch("/api/enroll", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        studentId,
        courseId,
      }),
    });

    if (res.ok) {
      router.push(`/student/learn/${courseId}`);
    }
  }

  return (
    <button
      onClick={handleEnroll}
      className="w-full rounded-2xl bg-green-500 py-4 text-lg font-bold text-white hover:bg-green-600"
    >
      Enroll Now
    </button>
  );
}
