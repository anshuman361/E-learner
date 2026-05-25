import CourseCard from "@/app/components/instructor/CourseCard";
import { PlusCircle } from "lucide-react";
import { getInstructorCourses } from "@/lib/getInstructorCourses";
import InstructorSidebar from "@/app/components/instructor/InstructorSidebar";
export default async function DashboardPage() {
  const courses = await getInstructorCourses();

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* Sidebar */}
      <InstructorSidebar />

      {/* Main */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

            <p className="text-gray-500 mt-2">
              Manage your courses and analytics
            </p>
          </div>

          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition">
            <PlusCircle size={20} />
            Create New Course
          </button>
        </div>

        {/* Courses */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 border-2 border-green-600 rounded"></div>

            <h2 className="text-2xl font-semibold">My Courses</h2>
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-700">
                No Courses Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Start by creating your first course
              </p>
            </div>
          )}

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
