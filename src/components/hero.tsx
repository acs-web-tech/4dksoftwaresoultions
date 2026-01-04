import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

import { Button } from "./button";
import { COMPANY } from "@/constants";
import { isMobile } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn, hash } from "@/lib/utils";

// Local optimized hero video
const HERO_VIDEO = "/videos/hero-video.mp4";

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
  const [currentIndex, _] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  

  const totalVideos = 4;
  
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
  });

  // Keep video always playing - never pause
  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;

    // Function to ensure video keeps playing
    const keepPlaying = () => {
      if (video.paused) {
        video.play().catch(() => { });
      }
    };

    // Check every second to ensure video is playing
    const interval = setInterval(keepPlaying, 1000);

    // Also restart on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => { });
      }
    };

    // Handle video ended - restart it
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => { });
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
    <section id="hero" className="relative h-screen w-screen overflow-hidden">
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

      {/* Hero Content - Overlay */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm bg-white/10 border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white">Available for Projects</span>
          </div>

          {/* Main Heading */}
          <h1 className="special-font hero-heading text-white drop-shadow-2xl">
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

          {/* Stats row */}
          {!isMobileDevice && (
            <div className="flex items-center gap-10">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "10+", label: "Years Experience" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white drop-shadow-xl">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Company name watermark - bottom right */}
      <div className="absolute bottom-8 right-8 z-30">
        <h1 className="text-6xl md:text-8xl font-black text-white/20 tracking-tight">
          4DK<span className="text-yellow-400/30">.</span>Teams
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
