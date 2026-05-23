import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            E
          </div>

          <h1 className="text-2xl font-bold">
            E-Learn
            <span className="text-green-500">Market</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <Link href="/courses" className="hover:text-green-500 transition">
            Browse Courses
          </Link>

          <Link href="/teach" className="hover:text-green-500 transition">
            Teach on E-Learn
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-700 font-medium">Log in</button>

          <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-full font-medium">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
