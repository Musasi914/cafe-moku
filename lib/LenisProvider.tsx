"use client";

import gsap from "gsap";
import { LenisRef, ReactLenis } from "lenis/react";
import { createContext, useContext, useEffect, useRef } from "react";

// Lenisコンテキストを作成
const LenisContext = createContext<React.RefObject<LenisRef> | null>(null);

export const useLenis = () => {
  const lenisRef = useContext(LenisContext);
  if (!lenisRef) {
    throw new Error("useLenis must be used within LenisProvider");
  }
  return lenisRef;
};

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef}>
      <LenisContext.Provider value={lenisRef as React.RefObject<LenisRef>}>
        {children}
      </LenisContext.Provider>
    </ReactLenis>
  );
}
