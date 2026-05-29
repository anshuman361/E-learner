"use client";

import { useEffect, useState } from "react";

import { usePrivy } from "@privy-io/react-auth";

import InstructorSidebar from "@/app/components/instructor/InstructorSidebar";
import CourseCard from "@/app/components/instructor/CourseCard";
export default function DashboardPage() {
  const { user, ready } = usePrivy();

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // wait until privy initializes
  //   if (!ready) return;

  //   // no logged-in user
  //   if (!user?.id) {
  //     setLoading(false);
  //     return;
  //   }

  //   const fetchCourses = async () => {
  //     try {
  //       const res = await fetch("/api/instructor/courses", {
  //         method: "POST",

  //         headers: {
  //           "Content-Type": "application/json",
  //         },

  //         body: JSON.stringify({
  //           instructorId: user.id,
  //         }),
  //       });

  //       const data = await res.json();

  //       if (data.success) {
  //         setCourses(data.courses);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, [user, ready]);
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/course/all");

      const data = await res.json();

      console.log(data);

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* Sidebar */}
      <InstructorSidebar />

      {/* Main */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Manage your courses and analytics
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <p className="text-lg font-medium">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          /* Empty */
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <h2 className="text-2xl font-semibold">No Courses Yet</h2>

            <p className="text-gray-500 mt-2">
              Start by creating your first course
            </p>
          </div>
        ) : (
          /* Courses */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
