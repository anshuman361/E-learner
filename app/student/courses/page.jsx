import StudentNavbar from "@/app/components/navbar/StudentNavbar";
import CourseCard from "@/app/components/student/CourseCard";

async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <StudentNavbar />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-14 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <h1 className="text-5xl font-extrabold">Explore Courses</h1>

            <p className="mt-4 text-lg text-green-100">Learn modern skills</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
