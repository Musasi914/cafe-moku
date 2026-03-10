"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const menuImageRef = useRef<HTMLImageElement>(null);
  const menuImageRef2 = useRef<HTMLImageElement>(null);
  const menuImageRef3 = useRef<HTMLImageElement>(null);
  const menuImageRef4 = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    const targets = gsap.utils.toArray(".masked") as HTMLImageElement[];
    targets.forEach((target) => {
      gsap.to(target, {
        maskPosition: "0% 100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: target,
          start: "top bottom",
        },
      });
    });
  });
  return (
    <section
      id="menu"
      ref={menuSectionRef}
      className="w-11/12 mx-auto pt-48 relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 items-start"
    >
      <div className="md:hidden space-y-8">
        <Image
          src="/menu/desert2.webp"
          alt="Desert"
          width={551}
          height={368}
          className="w-full h-auto rounded-lg"
        />
        <Image
          src="/menu/desert.webp"
          alt="Desert"
          width={406}
          height={271}
          className="w-full h-auto rounded-lg"
        />
        <Image
          src="/menu/lunch.webp"
          alt="Lunch"
          width={469}
          height={626}
          className="w-full h-auto rounded-lg"
        />
        <Image
          src="/menu/latte.webp"
          alt="Latte"
          width={396}
          height={264}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="hidden md:block md:pt-160 md:space-y-120">
        <Image
          src="/menu/desert2.webp"
          alt="Desert"
          width={551}
          height={368}
          className="masked rounded-lg w-full h-auto shadow-2xl mask-[url('/mask.png')] mask-no-repeat mask-size-[100%_600%]"
          ref={menuImageRef}
        />
        <Image
          src="/menu/desert.webp"
          alt="Desert"
          width={406}
          height={271}
          className="masked rounded-lg h-auto w-4/5 text-right ml-auto shadow-lg mask-[url('/mask.png')] mask-no-repeat mask-size-[100%_600%]"
          ref={menuImageRef2}
        />
      </div>
      <div className="masked grid gap-12 sm:items-center col-start-2 sticky sm:h-screen top-0 mask-[url('/mask.png')] mask-no-repeat mask-size-[100%_600%]">
        <div>
          <h2 className="flex justify-center items-center lg:items-end md:gap-2 flex-col lg:flex-row mb-12">
            <Image
              src="/logo-black.svg"
              alt="WoodCafe Moku."
              width={185}
              height={109}
            />
            <span>で過ごす時間</span>
          </h2>
          <div className="space-y-12 w-fit mx-auto">
            <p>
              その日の気分に寄り添う一杯と、
              <br />
              素材の風味を大切に、
              <br />
              ひとつずつ丁寧にご用意しています。
            </p>
            <p>
              自家焙煎のコーヒーと、
              <br />
              季節の素材を使った軽食やお菓子。
              <br />
              気まぐれランチもご用意しています。
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block col-start-3 md:pt-64 md:space-y-80">
        <Image
          src="/menu/lunch.webp"
          alt="Lunch"
          width={469}
          height={626}
          className="masked rounded-lg w-full h-auto shadow-2xl mask-[url('/mask.png')] mask-no-repeat mask-size-[100%_600%]"
          ref={menuImageRef3}
        />
        <Image
          src="/menu/latte.webp"
          alt="Latte"
          width={396}
          height={264}
          className="masked rounded-lg h-auto w-4/5 shadow-lg mask-[url('/mask.png')] mask-no-repeat mask-size-[100%_600%]"
          ref={menuImageRef4}
        />
      </div>
    </section>
  );
}
