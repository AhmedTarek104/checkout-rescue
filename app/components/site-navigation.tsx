"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    label: "Case Study",
    href: "/",
  },
  {
    label: "Simulator",
    href: "/simulator",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "PRD",
    href: "/prd",
  },
  {
    label: "Experiment",
    href: "/experiment",
  },
];

export default function SiteNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-300/10 bg-[#12100b]/90 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12"
      >
        <Link href="/" className="text-base font-semibold text-white">
          Checkout <span className="text-yellow-300">Rescue</span>
        </Link>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-md border px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-yellow-300 bg-yellow-300/[0.12] text-yellow-100"
                    : "border-transparent text-zinc-300 hover:border-yellow-300/40 hover:text-yellow-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
