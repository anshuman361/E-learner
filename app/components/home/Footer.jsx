import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold">
            E-Learn
            <span className="text-green-500">Market</span>
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            Learn modern skills from expert instructors worldwide.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Platform</h3>

          <div className="flex flex-col gap-3 text-gray-400">
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/teach">Teach</Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>

          <div className="flex flex-col gap-3 text-gray-400">
            <Link href="/">About</Link>
            <Link href="/">Careers</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Newsletter</h3>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 outline-none"
          />

          <button className="mt-4 bg-green-500 w-full py-3 rounded-xl font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-800 mt-14 pt-8 text-center text-gray-500">
        © 2026 E-LearnMarket. All rights reserved.
      </div>
    </footer>
  );
}
