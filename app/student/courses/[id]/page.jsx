import StudentNavbar from "@/app/components/navbar/StudentNavbar";
import CourseContent from "@/app/components/student/CourseContent";

import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";

export default async function SingleCoursePage({ params }) {
  const { id } = await params;

  await connectDB();

  const course = await Course.findById(id);

  if (!course) {
    return <div className="p-10 text-3xl font-bold">Course not found</div>;
  }

  // TEMPORARY
  // Replace this later logged-in user
  const user = await User.findOne({
    email: "12deori23@gmail.com",
  });

  return (
    <>
      <StudentNavbar />

      <div className="min-h-screen bg-gray-50">
        {/* HERO */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-14 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 md:grid-cols-2">
              {/* LEFT */}

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-100">
                  {course.category}
                </p>

                <h1 className="text-5xl font-extrabold">{course.title}</h1>

                <p className="mt-6 text-lg text-green-50">
                  {course.description}
                </p>
              </div>

              {/* RIGHT */}

              <div>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        <CourseContent
          course={JSON.parse(JSON.stringify(course))}
          studentId={user._id.toString()}
        />
      </div>
    </>
  );
}
