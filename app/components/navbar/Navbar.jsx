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
          <Link
            href="/student/assistant"
            className="hover:text-green-500 transition"
          >
            AI Assistant
          </Link>

          <Link href="/messages" className="hover:text-green-500 transition">
            Message
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-700 font-medium">
            Login
          </Link>

          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-full font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
