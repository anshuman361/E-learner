"use client";

import { useRouter } from "next/navigation";

export default function EnrollButton({ courseId, studentId }) {
  const router = useRouter();

  async function handleEnroll() {
    console.log("Enroll clicked");
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

    const data = await res.json();
    alert("Enrolled Successfully");
    if (res.ok) {
      router.push(`/student/courses/${courseId}`);
    }
  }

  return (
    <button
      onClick={handleEnroll}
      className="mt-10 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-green-600 shadow-lg hover:scale-105 transition"
    >
      Enroll Now
    </button>
  );
}
