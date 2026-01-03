import { useEffect, useRef, useState, memo } from "react";
import { ChevronDown, Check, Zap, Shield, Users, TrendingUp, Star, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";
import { Link } from "react-router-dom";

const tiers = [
  {
    id: 1,
    name: "Web Development",
    price: "₹24,999",
    period: "/project",
    tagline: "Modern websites that convert visitors into customers",
    description:
      "Perfect for small businesses and personal brands that need a fast, responsive and professional website that looks great on every device.",
    features: [
      "Up to 5 custom-designed pages",
      "Responsive design for mobile, tablet & desktop",
      "SEO-friendly structure & basic on-page optimization",
      "Contact / enquiry form integration",
      "Basic speed optimization",
      "Deployment & domain configuration support",
      "1 round of revisions included",
      "Delivery in 10-14 business days"
    ],
    accent: "from-emerald-400 to-teal-400",
    accentSolid: "bg-emerald-500",
    icon: Zap,
    highlights: ["Best for small businesses", "One-time project", "Launch-ready website"]
  },
  {
    id: 2,
    name: "App Development",
    price: "₹1,19,999",
    period: "/project",
    tagline: "Custom mobile & web apps built for your idea",
    description:
      "Ideal for startups and growing teams that want a production-ready app with clean UX, scalable architecture and ongoing support options.",
    features: [
      "Discovery & requirements workshop",
      "UI/UX design for core user flows",
      "Cross-platform app (web or mobile) MVP",
      "Authentication & secure user management",
      "API integration (payments, email, or third-party)",
      "Admin dashboard or basic analytics",
      "Testing & QA before launch",
      "Technical handover & documentation"
    ],
    accent: "from-blue-400 to-indigo-400",
    accentSolid: "bg-blue-500",
    popular: true,
    icon: TrendingUp,
    highlights: ["Most popular", "Great for startups", "Scales with your product"]
  },
  {
    id: 3,
    name: "Social Media Handling",
    price: "₹14,999",
    period: "/month",
    tagline: "Consistent content and engagement for your brand",
    description:
      "For brands that want professional, consistent social media presence without hiring a full-time team.",
    features: [
      "Content strategy for 1–2 platforms (Instagram, Facebook, LinkedIn, etc.)",
      "12–16 posts per month (graphics + captions)",
      "Hashtag & basic keyword research",
      "Posting calendar & scheduling",
      "Replying to basic comments & DMs (business hours)",
      "Monthly performance summary report",
      "Basic ad creatives (static) – up to 2 per month",
      "One strategy review call each month"
    ],
    accent: "from-purple-400 to-fuchsia-400",
    accentSolid: "bg-purple-500",
    icon: Shield,
    highlights: ["Grow your audience", "Done-for-you content", "Great for ongoing brand building"]
  }
];

const PricingPage = memo(() => {
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={cn(
      "min-h-screen w-full overflow-x-hidden",
      isDark ? "bg-black text-white" : "bg-gray-50 text-gray-800"
    )}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={cn(
            "absolute inset-0",
            isDark
              ? "bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-emerald-900/20"
              : "bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-emerald-100/30"
          )} />
          <div className={cn(
            "absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl animate-pulse",
            isDark ? "bg-purple-500/20" : "bg-purple-300/30"
          )} style={{ animationDuration: '4s' }} />
          <div className={cn(
            "absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl animate-pulse",
            isDark ? "bg-blue-500/20" : "bg-blue-300/30"
          )} style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto animate-fade-in">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
          )}>
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className={isDark ? "text-sm text-gray-300" : "text-sm text-gray-600"}>
              Transparent Pricing, No Hidden Fees
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h1>

          <p className={cn(
            "text-xl md:text-3xl mb-4 max-w-3xl mx-auto",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Choose the perfect plan for your needs with {COMPANY.name}
          </p>

          <p className={cn(
            "text-base md:text-lg mb-12 max-w-2xl mx-auto",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            Clear pricing with no setup fees or hidden charges. All plans include our core features with transparent cost breakdown.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => scrollToSection(0)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              View Plans
            </button>
            <button className={cn(
              "border-2 font-semibold py-4 px-8 rounded-full text-lg transition-all",
              isDark
                ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
            )}>
              Compare Features
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className={cn(
              "w-8 h-8 mx-auto",
              isDark ? "text-white/50" : "text-gray-400"
            )} />
          </div>
        </div>
      </section>

      {/* Tier Sections */}
      {tiers.map((tier, index) => (
        <section
          key={tier.id}
          ref={(el) => {
            if (el) sectionRefs.current[index] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center px-6 py-20"
          style={{
            opacity: activeSection === index ? 1 : 0.3,
            transform: activeSection === index ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r ${tier.accent} opacity-10 blur-3xl`}
              style={{
                transform: `translate(-50%, -50%) scale(${activeSection === index ? 1.2 : 0.8})`,
                transition: 'transform 1s ease-out'
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div
                className="space-y-6"
                style={{
                  opacity: activeSection === index ? 1 : 0,
                  transform: `translateX(${activeSection === index ? '0' : '-100px'})`,
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${tier.accent}`}>
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>
                  {tier.popular && (
                    <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-black flex items-center gap-1">
                      <Star className="w-4 h-4" fill="currentColor" />
                      Most Popular
                    </span>
                  )}
                </div>

                <div>
                  <h2 className={`text-6xl md:text-7xl font-extrabold bg-gradient-to-r ${tier.accent} bg-clip-text text-transparent mb-2`}>
                    {tier.name}
                  </h2>
                  <p className={isDark ? "text-2xl text-gray-400" : "text-2xl text-gray-500"}>
                    {tier.tagline}
                  </p>
                </div>

                <p className={cn(
                  "text-lg leading-relaxed",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  {tier.description}
                </p>

                <div className="flex items-end gap-2">
                  <span className={`text-7xl font-extrabold bg-gradient-to-r ${tier.accent} bg-clip-text text-transparent`}>
                    {tier.price}
                  </span>
                  <span className={cn(
                    "text-2xl mb-2",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>{tier.period}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tier.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border",
                        isDark ? "border-white/20 bg-white/5" : "border-gray-200 bg-white"
                      )}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <button
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${tier.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-blue-500/50'
                      : isDark
                        ? 'bg-white text-black hover:shadow-white/50'
                        : 'bg-gray-800 text-white hover:shadow-gray-800/50'
                    }`}
                >
                  Get Started with {tier.name}
                </button>
              </div>

              {/* Right Content - Feature Card */}
              <div
                className={cn(
                  "rounded-3xl overflow-hidden border-2 backdrop-blur-sm",
                  tier.popular
                    ? "border-blue-400/50"
                    : isDark ? "border-white/10" : "border-gray-200",
                  isDark
                    ? "bg-gradient-to-br from-white/5 to-white/0"
                    : "bg-white/90"
                )}
                style={{
                  opacity: activeSection === index ? 1 : 0,
                  transform: `translateX(${activeSection === index ? '0' : '100px'}) rotateY(${activeSection === index ? '0' : '10deg'})`,
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: '0.2s'
                }}
              >
                <div className={`h-2 bg-gradient-to-r ${tier.accent}`} />

                <div className="p-8">
                  <h3 className={cn(
                    "text-2xl font-bold mb-6 flex items-center gap-2",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    <Check className="w-6 h-6 text-emerald-400" />
                    Everything Included
                  </h3>

                  <ul className="space-y-4">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-3",
                          isDark ? "text-gray-300" : "text-gray-600"
                        )}
                        style={{
                          opacity: activeSection === index ? 1 : 0,
                          transform: `translateY(${activeSection === index ? '0' : '20px'})`,
                          transition: 'all 0.5s ease-out',
                          transitionDelay: `${0.3 + idx * 0.05}s`
                        }}
                      >
                        <div className={`mt-1 p-1 rounded-full ${tier.accentSolid} flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={cn(
                    "mt-8 pt-8 border-t",
                    isDark ? "border-white/10" : "border-gray-200"
                  )}>
                    <p className={cn(
                      "text-sm text-center",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>
                      🎉 Contact us for a free consultation. No commitment required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Number Indicator */}
          <div className="absolute bottom-8 right-8">
            <div className={cn(
              "text-8xl font-bold",
              isDark ? "text-white/5" : "text-gray-200"
            )}>
              0{index + 1}
            </div>
          </div>
        </section>
      ))}

      {/* Custom Plan Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-b from-emerald-900/10 via-blue-900/10 to-purple-900/10"
            : "bg-gradient-to-b from-emerald-100/30 via-blue-100/30 to-purple-100/30"
        )} />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className={cn(
            "rounded-3xl border backdrop-blur-md p-10 md:p-14 text-center",
            isDark
              ? "border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
              : "border-gray-200 bg-white/90 shadow-xl"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6",
              isDark ? "bg-white/5 border-white/15" : "bg-gray-100 border-gray-200"
            )}>
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className={isDark ? "text-sm text-gray-300" : "text-sm text-gray-600"}>
                Need something different?
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Custom Plans for Your Project
              </span>
            </h2>

            <p className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto mb-8",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Not sure which plan fits your idea? Tell us about your website, app, or social media goals and we'll craft a custom package with transparent pricing just for you.
            </p>

            <div className="grid gap-6 md:grid-cols-3 text-left mb-10">
              <div className={cn(
                "p-4 rounded-2xl border",
                isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
              )}>
                <h3 className={cn(
                  "text-lg font-semibold mb-2",
                  isDark ? "text-white" : "text-gray-800"
                )}>Tailored to your scope</h3>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>We adjust features, timelines, and budget based on exactly what you need.</p>
              </div>
              <div className={cn(
                "p-4 rounded-2xl border",
                isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
              )}>
                <h3 className={cn(
                  "text-lg font-semibold mb-2",
                  isDark ? "text-white" : "text-gray-800"
                )}>Transparent pricing</h3>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>No hidden charges – you get a clear breakdown before we start.</p>
              </div>
              <div className={cn(
                "p-4 rounded-2xl border",
                isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
              )}>
                <h3 className={cn(
                  "text-lg font-semibold mb-2",
                  isDark ? "text-white" : "text-gray-800"
                )}>Support from day one</h3>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>We help you choose the right tech and roadmap for long-term growth.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-emerald-400 to-blue-500 text-black font-bold py-4 px-10 rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/50"
              >
                Request a Custom Quote
              </Link>
              <p className={cn(
                "text-sm max-w-xs",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                Share your requirements, budget range, and timeline – we'll get back with a tailored proposal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-t from-purple-900/20 to-transparent"
            : "bg-gradient-to-t from-purple-100/30 to-transparent"
        )} />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready to get started?
            </span>
          </h2>

          <p className={cn(
            "text-xl md:text-2xl mb-12",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Join clients already building amazing projects with {COMPANY.name}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={"/contact"} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-5 px-10 rounded-full text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
              Get Started Today
            </Link>
            <button className={cn(
              "border-2 font-semibold py-5 px-10 rounded-full text-xl transition-all",
              isDark
                ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
            )}>
              Talk to Us
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "50+", desc: "Happy Clients" },
              { icon: Star, label: "4.9/5", desc: "Client Rating" },
              { icon: Shield, label: "100%", desc: "Satisfaction" }
            ].map((stat) => (
              <div key={stat.label} className={cn(
                "p-6 rounded-2xl border",
                isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
              )}>
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className={cn(
                  "text-3xl font-bold mb-1",
                  isDark ? "text-white" : "text-gray-800"
                )}>{stat.label}</div>
                <div className={isDark ? "text-gray-400" : "text-gray-500"}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              activeSection === idx
                ? isDark ? 'bg-white scale-150' : 'bg-gray-800 scale-150'
                : isDark ? 'bg-white/30 hover:bg-white/50' : 'bg-gray-400 hover:bg-gray-500'
            )}
          />
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
});

PricingPage.displayName = "PricingPage";

export default PricingPage;