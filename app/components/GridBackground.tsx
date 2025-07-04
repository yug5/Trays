"use client";

import React, { useRef, useEffect } from "react";

export default function GridBackground() {
  const darkGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      if (darkGridRef.current) {
        darkGridRef.current.style.setProperty("--x", x);
        darkGridRef.current.style.setProperty("--y", y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:32px_32px]" />

      <div
        ref={darkGridRef}
        className="hidden md:block fixed inset-0 -z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:32px_32px] mask-radial-highlight"
      />
    </div>
  );
}
