import { SOCIAL_LINKS, COMPANY } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={cn(
      "w-screen py-6",
      isDark ? "bg-violet-300 text-violet-50" : "bg-indigo-600 text-white"
    )}>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; <strong className="font-semibold">4DK Software Solutions</strong>{" "}
          {new Date().getFullYear()}. All rights reserved.
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors duration-500 ease-in-out hover:opacity-75"
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="#"
            className="text-center text-sm transition hover:underline hover:opacity-75 md:text-right"
          >
            Privacy Policy
          </a>

          <b>|</b>

          <a
            href="#"
            className="text-center text-sm transition hover:underline hover:opacity-75 md:text-right"
          >
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};
