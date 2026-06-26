"use client";

import { useState } from "react";

export default function EnrollButton({ courseId, studentId, onEnroll }) {
  const [loading, setLoading] = useState(false);

  async function handleEnroll() {
    try {
      setLoading(true);

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

      if (!res.ok) {
        if (data.message === "Already Enrolled") {
          onEnroll(); // Show course content
          return;
        }

        alert(data.message || "Enrollment Failed");
        return;
      }

      alert("🎉 Enrolled Successfully");

      // Tell parent component
      onEnroll();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleEnroll}
      className={`mt-10 rounded-2xl px-8 py-4 text-lg font-bold shadow-lg transition
      ${
        loading
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "m-5 mt-0.5 mb-1 w-half rounded-2xl bg-green-600 px-5 py-5 text-lg font-bold text-white shadow-lg hover:bg-green-700 transition"
      }`}
    >
      {loading ? "Enrolling..." : "Enroll Now"}
    </button>
  );
}
