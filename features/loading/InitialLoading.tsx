"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type SvgReadyState = "idle" | "ready";

export default function InitialLoading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const drawTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [svgReadyState, setSvgReadyState] = useState<SvgReadyState>("idle");

  useEffect(() => {
    let isMounted = true;

    const loadLogoSvg = async () => {
      try {
        const response = await fetch("/logo-black.svg");
        const markup = await response.text();
        if (!isMounted) return;
        setSvgMarkup(markup);
        setSvgReadyState("ready");
      } catch {
        if (!isMounted) return;
        setSvgMarkup("");
        setSvgReadyState("ready");
      }
    };

    void loadLogoSvg();

    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(
    () => {
      if (svgReadyState !== "ready") return;
      if (!containerRef.current || !logoRef.current) return;

      const paths = logoRef.current.querySelectorAll("path");
      if (paths.length === 0) return;

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          fillOpacity: 0,
          stroke: "#000000",
          strokeWidth: 1.25,
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      drawTimelineRef.current?.kill();
      drawTimelineRef.current = gsap.timeline();
      drawTimelineRef.current
        .to(paths, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.04,
        })
        .to(
          paths,
          {
            fillOpacity: 1,
            strokeOpacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.01,
          },
          "-=0.5"
        );

      const startExit = () => {
        if (!containerRef.current || !logoRef.current) return;

        const exitTl = gsap.timeline({
          onComplete: () => {
            // setIsVisible(false);
          },
        });

        exitTl.to(
          containerRef.current,
          {
            maskPosition: "0% 0%",
            WebkitMaskPosition: "0% 0%",
            duration: 1,
            ease: "power2.out",
          },
          0.7
        );
      };

      const runExitWhenLoaded = () => {
        const tl = drawTimelineRef.current;
        if (!tl) {
          startExit();
          return;
        }
        tl.eventCallback("onComplete", () => {
          startExit();
        });
      };

      if (document.readyState === "complete") {
        runExitWhenLoaded();
      } else {
        window.addEventListener("load", runExitWhenLoaded, { once: true });
      }

      return () => {
        drawTimelineRef.current?.kill();
        window.removeEventListener("load", runExitWhenLoaded);
      };
    },
    { dependencies: [svgReadyState] }
  );

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-999 grid place-items-center bg-background mask-[url('/mask-loading.png')] mask-no-repeat mask-size-[100%_600%] mask-[0%_100%]"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        ref={logoRef}
        className="relative z-10 w-[min(60vw,280px)] h-auto"
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
