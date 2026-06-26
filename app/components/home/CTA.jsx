import Link from "next/link";
export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold leading-tight">
          Start learning today
        </h2>

        <p className="mt-6 text-xl text-green-100">
          Join millions of learners around the world already learning on
          E-LearnMarket.
        </p>

        <button className="mt-10 bg-white text-green-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
          Explore Courses
        </button>
      </div>
    </section>
  );
}
