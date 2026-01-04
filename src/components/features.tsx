import { VIDEO_LINKS } from "@/constants";
import { PropsWithChildren, useRef, useState, memo, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { getAnimationSettings } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface BentoTiltProps {
  className?: string;
}

const BentoTilt = memo(({
  children,
  className = "",
}: PropsWithChildren<BentoTiltProps>) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);
  const animSettings = getAnimationSettings();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !animSettings.enableHoverEffects) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`);
  }, [animSettings.enableHoverEffects]);

  const handleMouseLeave = useCallback(() => {
    setTransformStyle("");
  }, []);

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={animSettings.enableHoverEffects ? handleMouseMove : undefined}
      onMouseLeave={animSettings.enableHoverEffects ? handleMouseLeave : undefined}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
});

BentoTilt.displayName = "BentoTilt";

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
}

const BentoCard = memo(({ src, title, description }: BentoCardProps) => {
  const animSettings = getAnimationSettings();

  return (
    <article className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay={animSettings.enableVideoAutoplay}
        playsInline
        preload="metadata"
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="text-lg mt-3 max-w-64 md:text-base">{description}</p>
          )}
        </div>
      </div>
    </article>
  );
});

BentoCard.displayName = "BentoCard";

export const Features = memo(() => {
  const navigate = useNavigate();
  const animSettings = getAnimationSettings();
  const { isDark } = useTheme();

  const handleViewProducts = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  return (
    <section className={cn(
      "pb-52",
      isDark ? "bg-black" : "bg-gray-50"
    )}>
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className={cn(
            "font-circular-web text-lg",
            isDark ? "text-blue-50" : "text-gray-800"
          )}>
            Our Development Solutions
          </p>

          <p className={cn(
            "max-w-md font-circular-web text-lg opacity-50",
            isDark ? "text-blue-50" : "text-gray-700"
          )}>
            Discover our comprehensive suite of development services and products
            designed to transform your digital vision into reality with cutting-edge
            technology and innovative solutions.
          </p>
        </div>

        <BentoTilt className={cn(
          "border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]",
          isDark ? "" : "shadow-lg"
        )}>
          <BentoCard
            src={VIDEO_LINKS.feature1}
            title={
              <>
                radia<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </BentoTilt>

        <div
          id="nexus"
          className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7"
        >
          <BentoTilt className={cn(
            "bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2",
            isDark ? "" : "shadow-lg"
          )}>
            <BentoCard
              src={VIDEO_LINKS.feature2}
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          <BentoTilt className={cn(
            "bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0",
            isDark ? "" : "shadow-lg"
          )}>
            <BentoCard
              src={VIDEO_LINKS.feature3}
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </BentoTilt>

          <BentoTilt className={cn(
            "bento-tilt_1 me-14 md:col-span-1 md:me-0",
            isDark ? "" : "shadow-lg"
          )}>
            <BentoCard
              src={VIDEO_LINKS.feature4}
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            />
          </BentoTilt>

          <BentoTilt className={cn(
            "bento-tilt_2",
            isDark ? "" : "shadow-lg"
          )}>
            <div
              className={cn(
                "flex size-full flex-col justify-between p-5 cursor-pointer transition-colors duration-200",
                isDark
                  ? "bg-violet-300 hover:bg-violet-400"
                  : "bg-violet-200 hover:bg-violet-300"
              )}
              onClick={handleViewProducts}
            >
              <h1 className="bento-title special-font max-w-64 text-black">
                View Our Products
              </h1>

              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className={cn(
            "bento-tilt_2",
            isDark ? "" : "shadow-lg"
          )}>
            <video
              src={VIDEO_LINKS.feature5}
              loop
              muted
              autoPlay={animSettings.enableVideoAutoplay}
              playsInline
              preload="metadata"
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
});

Features.displayName = "Features";
