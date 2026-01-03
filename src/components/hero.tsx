import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./button";
import { VIDEO_LINKS, COMPANY } from "@/constants";
import { getAnimationSettings, isMobile } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn, hash } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Memoized loading spinner to prevent re-renders
const LoadingSpinner = memo(({ isDark }: { isDark: boolean }) => (
  <div className={cn(
    "flex-center absolute z-[100] h-dvh w-screen overflow-hidden",
    isDark ? "bg-violet-50" : "bg-gray-100"
  )}>
    <div className="three-body">
      <div className="three-body__dot" />
      <div className="three-body__dot" />
      <div className="three-body__dot" />
    </div>
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

export const Hero = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const totalVideos = 4;
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const animSettings = getAnimationSettings();
  const { isDark } = useTheme();

  // Check for mobile device on mount
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  const VIDEO_KEYS = ["hero1", "hero2", "hero3", "hero4"] as const;
  const getVideoSrc = useCallback((i: number) => {
    const key = VIDEO_KEYS[i - 1];
    return VIDEO_LINKS[key];
  }, []);

  const handleMiniVideoClick = useCallback(() => {
    if (!animSettings.shouldAnimate) return;
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  }, [upcomingVideoIndex, animSettings.shouldAnimate]);

  const handleVideoLoad = useCallback(() => {
    setLoadedVideos((prev) => prev + 1);
  }, []);

  // Optimized loading check
  useEffect(() => {
    if (loadedVideos >= 1) {
      // Only wait for first video to load
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [loadedVideos]);

  // Pause videos when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        mainVideoRef.current?.pause();
        nextVideoRef.current?.pause();
      } else if (!isLoading) {
        mainVideoRef.current?.play().catch(() => { });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isLoading]);

  // useGSAP(
  //   () => {
  //     if (!animSettings.shouldAnimate) return;

  //     if (hasClicked) {
  //       // Kill previous animation if exists
  //       animationRef.current?.kill();

  //       gsap.set("#next-video", { visibility: "visible" });

  //       animationRef.current = gsap.timeline();
  //       animationRef.current
  //         .to("#next-video", {
  //           transformOrigin: "center center",
  //           scale: 1,
  //           width: "100%",
  //           height: "100%",
  //           duration: 0.8, // Reduced duration
  //           ease: "power1.inOut",
  //           onStart: () => {
  //             void nextVideoRef.current?.play();
  //           },
  //         })
  //         .from(
  //           "#current-video",
  //           {
  //             transformOrigin: "center center",
  //             scale: 0,
  //             duration: 1.2, // Reduced
  //             ease: "power1.inOut",
  //           },
  //           "<"
  //         );
  //     }
  //   },
  //   { dependencies: [currentIndex], revertOnUpdate: true }
  // );

  // useGSAP(() => {
  //   if (!animSettings.shouldAnimate) return;

  //   gsap.set("#video-frame", {
  //     clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
  //     borderRadius: "0 0 40% 10%",
  //   });

  //   ScrollTrigger.create({
  //     trigger: "#video-frame",
  //     start: "center center",
  //     end: "bottom center",
  //     scrub: 0.5, // Added scrub value for smoother animation
  //     onUpdate: (self) => {
  //       const progress = self.progress;
  //       const clipPath = `polygon(${14 - 14 * progress}% 0%, ${72 + 28 * progress}% 0%, ${90 + 10 * progress}% ${90 + 10 * progress}%, 0% 100%)`;
  //       const borderRadius = `0 0 ${40 - 40 * progress}% ${10 - 10 * progress}%`;
  //       gsap.set("#video-frame", { clipPath, borderRadius });
  //     },
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach((st) => st.kill());
  //   };
  // });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && <LoadingSpinner isDark={isDark} />}

      <div
        id="video-frame"
        className={cn(
          "relative z-10 h-dvh w-screen overflow-hidden rounded-lg",
          isDark ? "bg-blue-75" : "bg-gray-100"
        )}
      >
        <div>
          {/* Mini video - only show on desktop */}
          {/* {!isMobileDevice && animSettings.enableHoverEffects && (
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              <div
                onClick={handleMiniVideoClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVideoRef}
                  src={getVideoSrc(upcomingVideoIndex)}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </div>
          )} */}

          {/* Next video - only on desktop */}
          {!isMobileDevice && (
            <video
              ref={nextVideoRef}
              src={getVideoSrc(currentIndex)}
              loop
              muted
              playsInline
              preload="metadata"
              id="next-video"
              className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
          )}

          {/* Main video */}
          <video
            ref={mainVideoRef}
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay={animSettings.enableVideoAutoplay}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            poster="/img/hero-poster.webp"
          />
        </div>

        <h1 className={cn(
          "special-font hero-heading absolute bottom-5 right-5 z-40",
          isDark ? "text-blue-75" : "text-gray-200"
        )}>
          {COMPANY.name.split(' ')[0]}<b>.</b>{COMPANY.name.split(' ')[1] || 'Teams'}
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className={cn(
              "special-font hero-heading",
              isDark ? "text-blue-100" : "text-gray-700"
            )}>
              Innov<b>a</b>tive
            </h1>

            <p className={cn(
              "mb-5 max-w-64 font-robert-regular",
              isDark ? "text-blue-100" : "text-gray-600"
            )}>
              Crafting Digital Solutions <br />
              by {COMPANY.name}
            </p>

            <Button
              id="watch-trailer"
              leftIcon={TiLocationArrow}
              onClick={()=>hash("ourwork")}
              containerClass="bg-gradient-to-r from-yellow-400 to-orange-400 flex-center gap-1 text-black"
            >
              Our Portfolio
            </Button>
          </div>
        </div>
      </div>

      <h1 className={cn(
        "special-font hero-heading absolute bottom-5 right-5",
        isDark ? "text-black" : "text-gray-300"
      )}>
        {COMPANY.name.split(' ')[0]}<b>.</b>{COMPANY.name.split(' ')[1] || 'Teams'}
      </h1>
    </section>
  );
});

Hero.displayName = "Hero";
