"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

export function ScrollReveal({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        element.dataset.reveal = "visible";
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`scroll-reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
