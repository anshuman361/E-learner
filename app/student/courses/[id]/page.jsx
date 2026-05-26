import StudentNavbar from "@/app/components/navbar/StudentNavbar";

import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";

async function getCourse(id) {
  await connectDB();

  const course = await Course.findById(id);

  return JSON.parse(JSON.stringify(course));
}

export default async function SingleCoursePage({ params }) {
  // IMPORTANT FIX
  const { id } = await params;
  const allCourses = await Course.find();

  console.log("ALL COURSES:", allCourses);

  const course = await Course.findById(id);

  console.log("FOUND COURSE:", course);
  console.log("COURSE:", course);

  console.log("PARAMS:", params);

  const resolvedParams = await params;

  console.log("RESOLVED:", resolvedParams);

  //const id = resolvedParams.id;

  // console.log("ID:", id);

  if (!course) {
    return <div className="p-10 text-3xl font-bold">Course not found</div>;
  }

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

                <button className="mt-10 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-green-600 shadow-lg hover:scale-105 transition">
                  Enroll Now
                </button>
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

        {/* CONTENT */}
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-3xl font-bold">Course Content</h2>

            <div className="space-y-6">
              {course.chapters?.map((chapter, index) => (
                <div key={index} className="rounded-2xl border p-6">
                  <h3 className="text-2xl font-bold text-green-600">
                    {chapter.title}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {chapter.topics?.map((topic, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-gray-100 px-4 py-3"
                      >
                        {topic.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
