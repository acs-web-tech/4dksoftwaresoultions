import gsap from "gsap";
import { useRef } from "react";

import { AnimatedTitle } from "./animated-title";
import { Button } from "./button";
import { RoundedCorners } from "./rounded-corners";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";

export const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);
  const { isDark } = useTheme();

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section id="story" className={cn(
      "min-h-dvh w-screen",
      isDark ? "bg-black text-blue-50" : "bg-gray-50 text-gray-800"
    )}>
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className={cn(
          "font-general text-sm uppercase md:text-[10px]",
          isDark ? "text-blue-50" : "text-gray-600"
        )}>
          the {COMPANY.name} story
        </p>

        <div className="relative size-full">
          <AnimatedTitle containerClass={cn(
            "mt-5 pointer-events-none mix-blend-difference relative z-10",
            isDark ? "" : "!text-gray-800"
          )}>
            {"The St<b>o</b>ry of <br /> a hidden real<b>m</b>"}
          </AnimatedTitle>

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/img/entrance.webp"
                  alt="Entrance"
                  className="object-contain"
                />
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className={cn(
              "mt-3 max-w-sm text-center font-circular-web md:text-start",
              isDark ? "text-violet-50" : "text-gray-600"
            )}>
              Where innovation converges, lies {COMPANY.name} the boundless pillar. Discover
              its secrets and shape your digital future amidst infinite opportunities.
            </p>

            <Button id="realm-button" containerClass="mt-5">
              Discover Prologue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
