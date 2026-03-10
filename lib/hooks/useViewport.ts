"use client";

import { useEffect, useState } from "react";

export type ViewportSize = {
  width: number;
  height: number;
};

const getViewportSize = (): ViewportSize => {
  return {
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
  };
};

export const useViewport = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    let frameId = 0;

    const updateViewportSize = () => {
      frameId = 0;

      setViewportSize((current) => {
        const next = getViewportSize();
        if (current.width === next.width && current.height === next.height) {
          return current;
        }
        return next;
      });
    };

    updateViewportSize();

    const handleResize = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(updateViewportSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return viewportSize;
};
