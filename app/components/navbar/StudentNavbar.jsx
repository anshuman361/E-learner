"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Home,
  BookOpen,
  Bot,
  MessageCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function StudentNavbar() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "My Courses",
      href: "/student/courses",
      icon: BookOpen,
    },
    {
      name: "AI Assistant",
      href: "/assistant",
      icon: Bot,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageCircle,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
            <GraduationCap size={22} />
          </div>

          <span>
            E-Learn
            <span className="text-green-500">Market</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200
                  
                  ${
                    isActive
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }
                `}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden items-center gap-4 md:flex">
          {/* USER IMAGE */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white shadow-md">
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">Anshuman</p>

              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>

          {/* LOGOUT */}
          <button className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="border-t bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                  onClick={() => setMobileMenu(false)}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}

            <button className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-500">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
