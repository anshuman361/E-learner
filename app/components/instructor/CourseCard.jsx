import { Pencil } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition bg-white">
      {/* Top */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            course.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {course.isPublished ? "Published" : "Draft"}
        </span>

        <span className="font-semibold text-gray-700">
          {course.price === 0 ? "Free" : `₹${course.price}`}
        </span>
      </div>

      {/* Thumbnail */}
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover rounded-xl mb-4"
        />
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
        {course.description}
      </p>

      {/* Edit */}
      <button className="mt-6 w-full border border-gray-300 hover:bg-gray-100 rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition">
        <Pencil size={18} />
        Edit Course
      </button>
    </div>
  );
}
