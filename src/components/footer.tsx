import { SOCIAL_LINKS } from "@/constants";
import { Link } from "react-router-dom";
import { COMPANY } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Footer = () => {
  const { isDark } = useTheme();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <footer className={cn(
      "w-screen",
      isDark ? "bg-gray-900 text-gray-300" : "bg-gray-800 text-gray-300"
    )}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <span
                className="text-3xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent font-serif italic"
              >
                4DK
              </span>
              <span className="text-2xl font-bold text-white ml-1">.Teams</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              {COMPANY.name} - Your trusted partner for innovative web development,
              mobile apps, and cutting-edge digital solutions. We transform ideas into reality.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={cn(
        "border-t",
        isDark ? "border-gray-800" : "border-gray-700"
      )}>
        <div className="container mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-sm md:text-left opacity-70">
              &copy; <strong className="font-semibold">{COMPANY.name}</strong>{" "}
              {new Date().getFullYear()}. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="opacity-50">|</span>
              <Link
                to="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
