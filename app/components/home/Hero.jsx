import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block">
            Learn from best Courses
          </p>

          <h1 className="text-6xl font-bold leading-tight mt-6">
            Learn without limits,
            <span className="text-green-500"> grow without bounds</span>
          </h1>

          <p className="text-gray-500 mt-6 text-lg">
            Ask doubts, generate Summary or take Quiz using AI Assistant
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/student/courses"
              className="bg-green-500 text-white px-6 py-3 rounded-xl"
            >
              Explore Courses
            </Link>

            <Link
              href="/instructor/dashboard"
              className="border px-6 py-3 rounded-xl"
            >
              Become Instructor
            </Link>
          </div>
        </div>

        <div>{/* Featured course card */}</div>
      </div>
    </section>
  );
}
