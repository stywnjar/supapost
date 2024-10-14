"use client";
import { Home, PenBox, Search, User } from "lucide-react";
import { LogoutButton } from "@/components/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Navbar() {
  const pathname = usePathname();
  const navlinks = [
    { href: "/", icon: <Home size={32} /> },
    { href: "/create", icon: <PenBox size={32} /> },
    { href: "/search", icon: <Search size={33} /> },
    { href: "/profile", icon: <User size={32} /> },
  ];
  return (
    <nav className="fixed top-0 right-0 left-0 bg-transparent backdrop-blur-lg py-5">
      <div className="max-w-5xl mx-auto grid grid-cols-3">
        <div>
          <h1 className="font-bold text-2xl">Supapost</h1>
        </div>
        <div className="flex items-center justify-center gap-5">
          {navlinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  active ? "text-white" : "text-white/30"
                } btn btn-link hover:bg-white/5`}
              >
                {link.icon}
              </Link>
            );
          })}
        </div>
        <div className="flex justify-end">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
