import gsap from "gsap";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { throttle, getAnimationSettings } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";

// Memoized audio indicator
const AudioIndicator = memo(({ isActive }: { isActive: boolean }) => (
  <>
    {Array(4)
      .fill("")
      .map((_, i) => (
        <div
          key={i + 1}
          className={cn("indicator-line", isActive && "active")}
          style={{ animationDelay: `${(i + 1) * 0.1}s` }}
        />
      ))}
  </>
));

AudioIndicator.displayName = "AudioIndicator";

// Memoized nav link
const NavLink = memo(({ href, label, isRoutedPage, shouldUseRouter, isDark }: {
  href: string;
  label: string;
  isRoutedPage: boolean;
  shouldUseRouter: boolean;
  isDark: boolean;
}) => {
  const linkClass = cn(
    "nav-hover-btn",
    isDark ? "text-blue-50" : "text-gray-800"
  );

  if (isRoutedPage) {
    return (
      <Link to={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  if (shouldUseRouter) {
    return (
      <Link to={`/${href}`} className={linkClass}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={linkClass}>
      {label}
    </a>
  );
});

NavLink.displayName = "NavLink";

// Theme Toggle Button
const ThemeToggle = memo(({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={cn(
      "p-2 rounded-full transition-all duration-300",
      isDark
        ? "bg-white/10 hover:bg-white/20 text-yellow-400"
        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
    )}
    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    aria-label="Toggle theme"
  >
    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
  </button>
));

ThemeToggle.displayName = "ThemeToggle";

export const Navbar = memo(() => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();
  const animSettings = getAnimationSettings();
  const { isDark, toggleTheme } = useTheme();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  const routedPages = ["Home", "About", "Contact", "Pricing", "FAQ", "Services"];
  const routedPaths = ["/", "/about", "/contact", "/pricing", "/products", "/faq", "/services"];

  const toggleAudioIndicator = useCallback(() => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Audio control effect
  useEffect(() => {
    if (isAudioPlaying) {
      void audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  // Optimized scroll handler with throttle
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY + 5) {
        // Add threshold to prevent jitter
        setIsNavVisible(false);
        navContainerRef.current?.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY - 5) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
      }

      lastScrollYRef.current = currentScrollY;
    }, 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optimized nav animation
  useEffect(() => {
    if (!animSettings.shouldAnimate) {
      if (navContainerRef.current) {
        navContainerRef.current.style.transform = isNavVisible
          ? "translateY(0)"
          : "translateY(-100px)";
        navContainerRef.current.style.opacity = isNavVisible ? "1" : "0";
      }
      return;
    }

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [isNavVisible, animSettings.shouldAnimate]);

  // Mobile menu animations - simplified
  useEffect(() => {
    if (!isMobileMenuOpen || !animSettings.shouldAnimate) return;

    gsap.fromTo(
      ".mobile-menu-overlay",
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "power2.out" }
    );
    gsap.fromTo(
      ".mobile-menu-content",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      ".mobile-menu-item",
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.2,
        stagger: 0.05,
        delay: 0.1,
        ease: "power2.out",
      }
    );
  }, [isMobileMenuOpen, animSettings.shouldAnimate]);

  const isRoutedPage = (label: string) => routedPages.includes(label);
  const shouldUseRouter = (href: string) =>
    routedPaths.includes(location.pathname) && href.startsWith("#");

  return (
    <>
      <header
        ref={navContainerRef}
        className={cn(
          "fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-300 sm:inset-x-6 will-change-transform",
          !isDark && "bg-white/80 backdrop-blur-sm rounded-lg shadow-sm"
        )}
      >
        <div className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <Link
                to="/"
                className="transition hover:opacity-75"
                onClick={closeMobileMenu}
              >
                <img
                  src="img/logo.jpeg"
                  alt="4DK Teams Logo"
                  className="h-10 w-10 rounded-full object-cover"
                  loading="eager"
                  width={40}
                  height={40}
                />
              </Link>

              <Link
                to="/products"
                className={cn(
                  "md:flex hidden items-center justify-center gap-1 group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 transition hover:opacity-75",
                  isDark ? "bg-blue-50 text-black" : "bg-indigo-600 text-white"
                )}
              >
                <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                  Products
                </span>
                <TiLocationArrow className="ml-1" />
              </Link>
            </div>

            <div className="flex h-full items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                {NAV_ITEMS.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    href={href}
                    label={label}
                    isRoutedPage={isRoutedPage(label)}
                    shouldUseRouter={shouldUseRouter(href)}
                    isDark={isDark}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* Audio Controls */}
                <button
                  onClick={toggleAudioIndicator}
                  className={cn(
                    "ml-2 md:ml-10 flex items-center space-x-1 p-2 transition hover:opacity-75",
                    !isDark && "[&_.indicator-line]:bg-gray-800"
                  )}
                  title="Play Audio"
                  aria-label="Toggle audio"
                >
                  <audio
                    ref={audioElementRef}
                    src="/audio/loop.mp3"
                    className="hidden"
                    loop
                    preload="none"
                  />
                  <AudioIndicator isActive={isIndicatorActive} />
                </button>

                {/* Theme Toggle */}
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className={cn(
                    "md:hidden p-2 transition-colors",
                    isDark ? "text-white hover:text-yellow-400" : "text-gray-800 hover:text-indigo-600"
                  )}
                  title="Toggle Menu"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-40 md:hidden">
          <div
            className={cn(
              "absolute inset-0",
              isDark ? "bg-black/50" : "bg-white/50"
            )}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className={cn(
            "mobile-menu-content absolute top-20 left-4 right-4 rounded-2xl border p-6 shadow-2xl",
            isDark
              ? "bg-black/90 border-white/10"
              : "bg-white/95 border-gray-200"
          )}>
            <div className="flex flex-col space-y-4">
              {/* Mobile Products Link */}
              <Link
                to="/products"
                className="mobile-menu-item flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 active:scale-95"
                onClick={closeMobileMenu}
              >
                <span>Products</span>
                <TiLocationArrow className="w-4 h-4" />
              </Link>

              {/* Mobile Navigation Items */}
              {NAV_ITEMS.map(({ label, href }) => {
                const routedPage = isRoutedPage(label);
                const useRouter = shouldUseRouter(href);

                const linkClass = cn(
                  "mobile-menu-item block w-full py-3 px-4 rounded-lg transition-all duration-200 text-center font-medium",
                  isDark
                    ? "text-white hover:text-yellow-400 hover:bg-white/10"
                    : "text-gray-800 hover:text-indigo-600 hover:bg-gray-100"
                );

                if (routedPage) {
                  return (
                    <Link
                      key={href}
                      to={href}
                      className={linkClass}
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  );
                }
                if (useRouter) {
                  return (
                    <Link
                      key={href}
                      to={`/${href}`}
                      className={linkClass}
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={href}
                    href={href}
                    className={linkClass}
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </a>
                );
              })}

              {/* Mobile Theme Toggle */}
              <div className="mobile-menu-item flex justify-center pt-2">
                <button
                  onClick={toggleTheme}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300",
                    isDark
                      ? "bg-white/10 text-yellow-400 hover:bg-white/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Navbar.displayName = "Navbar";
