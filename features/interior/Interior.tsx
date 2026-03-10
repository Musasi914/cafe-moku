"use client";

import { calculateAnimationProgress } from "@/utils/manageProgress";
import { createRefCallback } from "@/utils/mapRefs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

export default function Interior() {
  const interiorSectionRef = useRef<HTMLDivElement>(null);
  const clipImageRef = useRef<HTMLImageElement>(null);
  const scaleImageRef = useRef<HTMLDivElement>(null);
  const firstPositionRef = useRef<HTMLDivElement>(null);
  const upcomingPositionRef = useRef<HTMLDivElement>(null);
  const imageMapRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!firstPositionRef.current || !upcomingPositionRef.current) return;
    const firstBoundingBox = firstPositionRef.current.getBoundingClientRect();
    const upcomingBoundingBox =
      upcomingPositionRef.current.getBoundingClientRect();
    const targetLeftMove = upcomingBoundingBox.left - firstBoundingBox.left;
    const targetTopMove = firstBoundingBox.bottom - upcomingBoundingBox.bottom;

    ScrollTrigger.create({
      trigger: interiorSectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: ({ progress }) => {
        const easeOutProgress = 1 - Math.pow(1 - progress, 2);
        gsap.set(clipImageRef.current, {
          clipPath: `inset(${targetTopMove * easeOutProgress}px ${
            targetLeftMove * easeOutProgress
          }px round 16px)`,
        });
        gsap.set(scaleImageRef.current, {
          scale: 1.1 - easeOutProgress * 0.1,
        });

        const textFadeProgress = calculateAnimationProgress(progress, 0, 0.5);
        gsap.set(textRef.current, {
          opacity: 1 - textFadeProgress,
        });

        const imagePositionProgress = calculateAnimationProgress(
          progress,
          0.3,
          1
        );
        const easeOutImagePositionProgress =
          1 - Math.pow(1 - imagePositionProgress, 2);
        for (const [index, imageRef] of imageMapRef.current.entries()) {
          gsap.set(imageRef, {
            "--progress": calculateAnimationProgress(
              easeOutImagePositionProgress,
              index * 0.2,
              1
            ),
          });
        }
      },
    });
  });
  return (
    <section ref={interiorSectionRef} id="interior" className="h-[300vh] mt-60">
      <div className="h-screen sticky top-0 p-2">
        <div ref={firstPositionRef} className="w-full h-full">
          <div
            ref={clipImageRef}
            className="w-full h-full [clip-path:inset(0_0_round_16px)]"
          >
            <div
              ref={scaleImageRef}
              className="w-full h-full relative scale-110"
            >
              <Image
                src="/interior/garden.webp"
                alt="テラス画像"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
              <p
                ref={textRef}
                className="absolute bottom-1/6 left-1/6 text-white text-shadow-2xl leading-loose"
              >
                無垢の木とやわらかな光に包まれた空間。
                <br />
                大きな窓から差し込む自然光が、
                <br />
                ゆるやかな時間をつくります。
                <br />
                ひとりでも、誰かとでも。
                <br />
                静かに過ごせる場所でありたいと考えています。
              </p>
            </div>
          </div>
        </div>
        <div className="md:grid-margin absolute inset-0 grid items-center md:block">
          <div className="grid grid-cols-3 gap-0 md:gap-2 h-1/2 md:h-full">
            <div className="flex flex-col justify-start h-full py-2 gap-2">
              <div
                ref={(el) => createRefCallback(imageMapRef, 0)(el)}
                className="aspect-video overflow-hidden [--progress:0] [--direction:-1] transform-[translate3d(calc((1-var(--progress,0))*(100%+8rem)*var(--direction)),calc((1-var(--progress))*100%),0)]"
              >
                <Image
                  src="/interior/interior1.webp"
                  alt=""
                  width={500}
                  height={750}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
              <div
                ref={(el) => createRefCallback(imageMapRef, 1)(el)}
                className="aspect-video overflow-hidden pl-8 md:pl-16 [--progress:0] [--direction:-1] transform-[translate3d(calc((1-var(--progress,0))*(100%+8rem)*var(--direction)),calc((1-var(--progress))*100%),0)]"
              >
                <Image
                  src="/interior/interior2.webp"
                  alt=""
                  width={500}
                  height={750}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
            </div>
            <div className="h-full py-2 grid items-center md:block">
              <div
                ref={upcomingPositionRef}
                className="h-2/3 md:h-full w-full"
              ></div>
            </div>
            <div className="flex flex-col justify-end h-full py-2 gap-2">
              <div
                ref={(el) => createRefCallback(imageMapRef, 2)(el)}
                className="aspect-video overflow-hidden pr-8 md:pr-16 [--progress:0] [--direction:1] transform-[translate3d(calc((1-var(--progress,0))*(100%+8rem)*var(--direction)),calc((1-var(--progress))*100%),0)]"
              >
                <Image
                  src="/interior/interior3.webp"
                  alt=""
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
              <div
                ref={(el) => createRefCallback(imageMapRef, 3)(el)}
                className="aspect-video overflow-hidden [--progress:0] [--direction:1] transform-[translate3d(calc((1-var(--progress,0))*(100%+8rem)*var(--direction)),calc((1-var(--progress))*100%),0)]"
              >
                <Image
                  src="/interior/interior4.webp"
                  alt=""
                  width={1280}
                  height={853}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
