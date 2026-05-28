"use client";

import Link from "next/link";
import { LayoutDashboard, BookOpen, BarChart3, Settings } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/instructor/dashboard",
  },
  {
    title: "Create Course",
    icon: BookOpen,
    href: "/instructor/create-course",
  },
  {
    title: "Message",
    icon: BarChart3,
    href: "/messages",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/instructor/settings",
  },
];

export default function InstructorSidebar() {
  return (
    <div className="w-[260px] bg-white border-r border-gray-200 min-h-screen p-5">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold text-xl">
          E
        </div>

        <h1 className="text-3xl font-bold">Instructor</h1>
      </div>

      {/* Menu */}
      <div className="space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
            >
              <Icon size={22} />

              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
