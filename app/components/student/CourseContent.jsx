"use client";

import { useState } from "react";
import EnrollButton from "./Enrollbutton";

export default function CourseContent({ course, studentId }) {
  const [enrolled, setEnrolled] = useState(false);

  return (
    <>
      {/* Enroll Button */}
      <div className="mt-10">
        {enrolled ? (
          <button className="rounded-2xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg">
            ✓ Enrolled
          </button>
        ) : (
          <EnrollButton
            studentId={studentId}
            courseId={course._id}
            onEnroll={() => setEnrolled(true)}
          />
        )}
      </div>

      {/* Locked Message */}
      {!enrolled && (
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-3xl border-2 border-dashed border-green-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-3xl font-bold">🔒 Course Content Locked</h2>

            <p className="mt-4 text-gray-500">
              Enroll to unlock all chapters and videos.
            </p>
          </div>
        </div>
      )}

      {/* Course Content */}
      {enrolled && (
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-3xl font-bold">Course Content</h2>

            <div className="space-y-6">
              {course.chapters?.map((chapter, index) => (
                <div key={index} className="rounded-2xl border p-6">
                  <h3 className="text-2xl font-bold text-green-600">
                    {chapter.title}
                  </h3>

                  <div className="mt-5 space-y-4">
                    {chapter.topics?.map((topic, idx) => (
                      <div key={idx} className="rounded-xl bg-gray-100 p-4">
                        <h4 className="font-semibold">{topic.title}</h4>

                        <p className="text-sm text-gray-500">{topic.type}</p>

                        {topic.type === "video" && topic.video && (
                          <video controls className="mt-3 w-full rounded-lg">
                            <source src={topic.video} />
                          </video>
                        )}

                        {topic.type === "article" && topic.article && (
                          <div className="mt-3 rounded-lg bg-white p-4">
                            {topic.article}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
