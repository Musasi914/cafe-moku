"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  {
    label: "Top",
    href: "/",
  },
  {
    label: "Concept",
    href: "/#concept",
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
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
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.scrollTo({
        top: document.body.scrollHeight,
      });
    },
  },
];

export default function Nav() {
  const [activeLabel, setActiveLabel] = useState<string>("Top");

  useEffect(() => {
    let frameId = 0;
    const targetFps = 20;
    const frameInterval = 1000 / targetFps;
    let lastUpdatedAt = 0;

    const updateActiveSection = () => {
      frameId = 0;

      const menuSection = document.querySelector("#menu") as HTMLElement;
      const interiorSection = document.querySelector(
        "#interior"
      ) as HTMLElement;
      const mainSection = document.querySelector("main") as HTMLElement;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const conceptTop = window.innerHeight * 3;
      const menuTop = menuSection.offsetTop;
      const interiorTop = interiorSection.offsetTop;
      const infoTop = mainSection.offsetHeight - viewportHeight * 1.5;

      if (scrollY < conceptTop) {
        setActiveLabel("Top");
      } else if (scrollY < menuTop) {
        setActiveLabel("Concept");
      } else if (scrollY < interiorTop) {
        setActiveLabel("Menu");
      } else if (scrollY < infoTop) {
        setActiveLabel("Interior");
      } else {
        setActiveLabel("Info");
      }
    };

    const onScrollOrResize = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame((timestamp) => {
        frameId = 0;
        if (timestamp - lastUpdatedAt < frameInterval) return;
        lastUpdatedAt = timestamp;
        updateActiveSection();
      });
    };

    updateActiveSection();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <nav className="fixed z-50 bottom-4 left-2 sm:bottom-24 sm:left-12">
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`group flex items-center gap-2 p-1 text-xs font-mono transition-colors ${
                activeLabel === link.label
                  ? "text-white"
                  : "text-foreground-secondary"
              }`}
              onClick={link.onClick}
              aria-current={activeLabel === link.label ? "page" : undefined}
            >
              <span
                className={`h-px transition-all ${
                  activeLabel === link.label
                    ? "w-6 bg-white"
                    : "w-4 bg-foreground-secondary group-hover:w-6"
                }`}
              ></span>
              <span className="text-nowrap uppercase">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
