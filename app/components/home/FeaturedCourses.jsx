const courses = [
  {
    id: 1,
    title: "Backend Development",
    category: "DEVELOPMENT",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    price: "$100",
  },

  {
    id: 2,
    title: "React Native Mobile App",
    category: "MOBILE",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
    price: "Free",
  },

  {
    id: 3,
    title: "Advanced Web Development",
    category: "WEB",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
    price: "$80",
  },
];

export default function FeaturedCourses() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between mb-14">
          <div>
            <p className="text-green-500 font-semibold mb-2">Trending now</p>

            <h2 className="text-5xl font-bold">Featured Courses</h2>

            <p className="text-gray-500 mt-3">
              Learn from the best with our hand-picked courses
            </p>
          </div>

          <button className="hidden md:block text-green-500 font-semibold">
            View all courses →
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <p className="text-green-500 font-semibold text-sm">
                  {course.category}
                </p>

                <h3 className="text-2xl font-bold mt-2">{course.title}</h3>

                <p className="text-gray-500 mt-3">
                  Modern course curriculum with practical learning.
                </p>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center">
                      E
                    </div>

                    <p className="text-sm text-gray-600">Anshuman</p>
                  </div>

                  <div className="font-bold text-lg">{course.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
