"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentDiv = divRef.current;

    if (!currentDiv) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentDiv);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(currentDiv);
    return () => {
      if (currentDiv) observer.unobserve(currentDiv);
    };
  }, []);
  return (
    <div
      ref={divRef}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      {children}
    </div>
  );
}
