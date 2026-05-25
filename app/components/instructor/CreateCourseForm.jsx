"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCourseForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: 0,
    thumbnail: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/course/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      if (!data.success) {
        alert(data.message);
        return;
      }

      router.push(`/instructor/courses/${data.course._id}/curriculum`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Create Course</h1>

      <input
        type="text"
        placeholder="Course Title"
        className="w-full border p-3 rounded"
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Subtitle"
        className="w-full border p-3 rounded"
        onChange={(e) =>
          setFormData({
            ...formData,
            subtitle: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        className="w-full border p-3 rounded"
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Price"
        className="w-full border p-3 rounded"
        onChange={(e) =>
          setFormData({
            ...formData,
            price: e.target.value,
          })
        }
      />

      <input
        type="file"
        placeholder="Image"
        className="w-full border px-1 py-1 mt-2 rounded"
        accept="image/*"
        onChange={(e) =>
          setFormData({
            ...formData,
            thumbnail: e.target.files[0],
          })
        }
      />

      <button className="bg-green-600 text-white px-6 py-3 rounded">
        Create Course
      </button>
    </form>
  );
}
