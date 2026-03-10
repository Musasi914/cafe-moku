"use client";

import { useViewport } from "@/lib/hooks/useViewport";
import { calculateAnimationProgress } from "@/utils/manageProgress";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const topSectionRef = useRef<HTMLDivElement>(null);
  const introStretchRef = useRef<HTMLDivElement>(null);
  const introImageRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const bgLinearRef = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLHeadingElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);

  const { height: screenHeight } = useViewport();

  useGSAP(
    () => {
      const initialTranslateY = screenHeight * 0.15;
      const initialImageScale = 1.5;
      const stretchBorderRadius = 64;
      const stretchInitialScale = 0.5;

      gsap.set(introStretchRef.current, {
        translateY: `${initialTranslateY}px`,
        scale: stretchInitialScale,
        borderRadius: `${stretchBorderRadius}px`,
      });
      gsap.set(introImageRef.current, {
        scale: initialImageScale,
      });
      const st = ScrollTrigger.create({
        trigger: topSectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: ({ progress }) => {
          const bgBlurProgress = calculateAnimationProgress(progress, 0, 0.25);
          gsap.set(bgRef.current, {
            filter: `blur(${10 * bgBlurProgress}px)`,
          });

          const stretchProgress = calculateAnimationProgress(
            progress,
            0.0,
            0.25
          );
          const borderRadiusProgress = calculateAnimationProgress(
            progress,
            0.25,
            0.3
          );
          gsap.set(introStretchRef.current, {
            scale:
              stretchInitialScale +
              stretchProgress * (1.0 - stretchInitialScale),
            translateY: `${
              Math.pow(1 - stretchProgress, 1.2) * initialTranslateY
            }px`,
            borderRadius: `${
              (1 - borderRadiusProgress) * stretchBorderRadius
            }px`,
          });
          gsap.set(introImageRef.current, {
            scale:
              initialImageScale - stretchProgress * (initialImageScale - 1.0),
          });

          //
          const introTitleProgress = calculateAnimationProgress(
            progress,
            0.05,
            0.4
          );
          gsap.set(introTitleRef.current, {
            opacity: introTitleProgress,
            filter: `blur(${16 * (1 - introTitleProgress)}px)`,
          });
          gsap.set(bgLinearRef.current, {
            opacity: introTitleProgress,
          });

          const introTextProgress = calculateAnimationProgress(
            progress,
            0.2,
            0.8
          );
          gsap.set(introTextRef.current, {
            translateY: (1 - introTextProgress) * screenHeight,
          });

          const endProgress = calculateAnimationProgress(progress, 0.8, 1);
          gsap.set(topSectionRef.current, {
            clipPath: `inset(0 ${endProgress * 4}% round ${
              endProgress * 64
            }px)`,
          });
          gsap.set(introImageRef.current, {
            translateY: endProgress * screenHeight * 0.2,
          });
        },
      });

      return () => {
        console.log("Hero unmount");
        st.kill();
      };
    },
    { dependencies: [screenHeight], revertOnUpdate: true, scope: topSectionRef }
  );

  return (
    <section
      ref={topSectionRef}
      className="h-[500vh] relative"
      aria-labelledby="hero-title"
    >
      <div className="sticky top-0 h-screen w-full grid justify-items-center contain-strict">
        <Image
          src={"/top/hero-bg.webp"}
          alt=""
          className="absolute object-cover -z-10 scale-105 w-full h-full"
          width={1920}
          height={1078}
          priority
          ref={bgRef}
        />
        <h1
          className="absolute left-1/2 -translate-x-1/2 translate-y-5/6"
          id="hero-title"
        >
          <Image
            src={"/logo-white.svg"}
            alt="Wood Cafe Moku."
            width={280}
            height={165}
            className="block w-auto h-[20vh] drop-shadow-2xl"
            priority
          />
        </h1>
        <div
          ref={introStretchRef}
          className="relative w-full h-full scale-50 contain-paint"
        >
          <Image
            src={"/top/intro.webp"}
            alt=""
            ref={introImageRef}
            className="absolute object-cover w-full h-full"
            width={4000}
            height={4000}
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-0 text-white">
          <div
            ref={bgLinearRef}
            className="absolute inset-0 w-full h-full bg-linear-120 from-transparent to-wood-dark -z-10 opacity-0"
          ></div>
          <div className="sm:w-11/12 md:w-3/4 max-w-7xl mx-auto h-full grid gap-12 sm:gap-0 sm:grid-cols-[auto_auto] justify-center sm:justify-between items-center content-center">
            <h2 ref={introTitleRef} className="text-title font-title opacity-0">
              木のぬくもりと、
              <br />
              静かな一杯。
            </h2>
            <div
              ref={introTextRef}
              className="space-y-8 sm:space-y-16 translate-y-[100vh]"
            >
              <p>
                昔、家具職人だった店主が
                <br />
                “木の匂いの中でコーヒーを飲みたかった”
                <br />
                それだけで始めたカフェ。
              </p>
              <p>
                木の香りが、ふわりと広がる店内。
                <br />
                やわらかな光と、ゆっくり流れる時間。
              </p>
              <p>
                何かを頑張るためでも、 誰かに見せるためでもなく、
                <br />
                ただ静かに、自分に戻るための一杯を。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
