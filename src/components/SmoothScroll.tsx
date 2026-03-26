"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Fast initial assessment
    window.addEventListener("resize", handleResize);

    // Hard Protocol Overwrite: Bypass native browser hash cache scroll logic.
    if (typeof window !== "undefined") {
      if (window.history && window.history.scrollRestoration) {
        window.history.scrollRestoration = 'manual';
      }
      
      // Strip any residual hash on refresh to prevent anchor snapping
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      
      window.scrollTo(0, 0); // Force geometric top bounds
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Eradicate JS Scroll hijacking on mobile for native app-feel
  if (!mounted || isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.0, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
