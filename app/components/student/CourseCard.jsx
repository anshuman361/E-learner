import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={`/student/courses/${course._id}`}>
      <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
            {course.category}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h2 className="line-clamp-2 text-2xl font-bold text-gray-900">
            {course.title}
          </h2>

          <p className="mt-3 line-clamp-2 text-sm text-gray-500">
            {course.description}
          </p>

          {/* INSTRUCTOR */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white">
              {course.instructor?.name?.charAt(0)}
            </div>

            <div>
              <p className="font-semibold">{course.instructor?.name}</p>

              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-6 flex items-center justify-between">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold">
              {course.level}
            </span>

            <span className="text-2xl font-bold text-green-600">
              {course.price === 0 ? "Free" : `₹${course.price}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
