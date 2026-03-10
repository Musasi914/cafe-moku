"use client";

import Link from "next/link";

const links = [
  {
    label: "Top",
    href: "/",
  },
  {
    label: "Concept",
    href: "/#concept",
    onClick: () => {
      window.scrollTo({
        top: window.innerHeight * 4,
      });
    },
  },
  {
    label: "Menu",
    href: "/#menu",
  },
  {
    label: "Interior",
    href: "/#interior",
  },
  {
    label: "Info",
    href: "/#info",
    onClick: () => {
      window.scrollTo({
        top: document.body.scrollHeight,
      });
    },
  },
];

export default function Nav() {
  return (
    <nav className="fixed z-50 bottom-4 left-2 sm:bottom-24 sm:left-12">
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="flex items-center gap-2 p-1 text-xs font-mono text-foreground-secondary"
              onClick={link.onClick}
            >
              <span className="w-4 h-px bg-foreground-secondary"></span>
              <span className="text-nowrap uppercase">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
