import StudentNavbar from "@/app/components/navbar/StudentNavbar";

async function getCourse(id) {
  const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function LearnPage({ params }) {
  const course = await getCourse(params.id);

  return (
    <>
      <StudentNavbar />

      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <div className="w-80 border-r bg-white p-6">
          <h2 className="mb-6 text-2xl font-bold">Course Content</h2>

          <div className="space-y-6">
            {course.chapters?.map((chapter, index) => (
              <div key={index}>
                <h3 className="mb-3 font-bold text-green-600">
                  {chapter.title}
                </h3>

                <div className="space-y-2">
                  {chapter.topics?.map((topic, idx) => (
                    <div key={idx} className="rounded-xl bg-gray-100 px-4 py-3">
                      {topic.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 bg-gray-50 p-10">
          <div className="rounded-3xl bg-white p-10 shadow-sm">
            <h1 className="text-4xl font-bold">{course.title}</h1>

            <p className="mt-5 text-gray-500">Start learning now.</p>

            {/* VIDEO PLACEHOLDER */}
            <div className="mt-10 flex h-[500px] items-center justify-center rounded-3xl bg-black text-3xl font-bold text-white">
              Video Player
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
