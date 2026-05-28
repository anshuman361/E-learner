"use client";

export default function RoleSelection({ setRole, saveRole, role }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl w-[400px]">
        <h2 className="text-3xl font-bold mb-2 text-center">Select Role</h2>

        <p className="text-gray-500 text-center mb-8">
          Choose how you want to use E-Learner
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setRole("student")}
            className={`w-full py-4 rounded-xl border text-lg font-semibold ${
              role === "student" ? "bg-green-500 text-white" : "bg-white"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("instructor")}
            className={`w-full py-4 rounded-xl border text-lg font-semibold ${
              role === "instructor" ? "bg-green-500 text-white" : "bg-white"
            }`}
          >
            Instructor
          </button>
        </div>

        <button
          onClick={saveRole}
          disabled={!role}
          className="w-full bg-black text-white py-4 rounded-xl mt-8 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
