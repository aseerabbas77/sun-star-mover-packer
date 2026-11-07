"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
