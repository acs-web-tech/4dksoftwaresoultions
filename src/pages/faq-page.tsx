import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles, MessageCircle, Zap, Shield, Globe, Users, Rocket, HelpCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: `What is ${COMPANY.name} and who is it for?`,
    a: `${COMPANY.name} is a full-service digital solutions company specializing in web development, mobile apps, and modern software solutions. Whether you're a startup, small business, or enterprise, our team provides everything you need to create engaging digital experiences.`,
    icon: Sparkles,
    gradient: "from-purple-400 to-pink-400"
  },
  {
    q: "How do I get started with your services?",
    a: "Simply contact us through our form or reach out directly. We'll schedule a discovery call to understand your requirements, timeline, and budget. Our team prioritizes clear communication and transparent pricing from day one.",
    icon: Rocket,
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    q: "Do your solutions support cross-platform?",
    a: "Yes. Our development approach targets web, mobile (iOS & Android), and desktop platforms. We use modern frameworks and technologies to help you reach your audience everywhere with responsive, performant applications.",
    icon: Globe,
    gradient: "from-emerald-400 to-teal-400"
  },
  {
    q: "Can I integrate with my existing systems?",
    a: "Absolutely. We provide clean APIs, integrations, and custom solutions that plug into your current tech stack without friction. Our team has experience integrating with various CRMs, ERPs, payment gateways, and third-party services.",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    q: "What pricing models are available?",
    a: "We offer project-based pricing for web development and apps, monthly retainers for social media management, and custom enterprise plans. All pricing is transparent with no hidden fees - you'll know exactly what you're paying for.",
    icon: Shield,
    gradient: "from-indigo-400 to-purple-400"
  },
  {
    q: "Is there ongoing support after project completion?",
    a: "Yes. We provide maintenance packages, bug fixes, and feature updates. Enterprise customers receive dedicated support channels with priority response times and regular check-ins to ensure your systems run smoothly.",
    icon: Users,
    gradient: "from-pink-400 to-rose-400"
  },
  {
    q: "Do you provide hosting and deployment?",
    a: "Yes. We handle end-to-end deployment including domain configuration, SSL certificates, cloud hosting setup (AWS, Google Cloud, Vercel, etc.), and ongoing server maintenance. We ensure your application is secure and optimized.",
    icon: MessageCircle,
    gradient: "from-cyan-400 to-blue-400"
  },
  {
    q: `How can we partner with ${COMPANY.name}?`,
    a: "Reach out via our Contact page for partnerships. We collaborate with agencies, startups, and businesses on white-label solutions, referral programs, and long-term technical partnerships to create mutual value.",
    icon: HelpCircle,
    gradient: "from-violet-400 to-purple-400"
  }
];

const FaqPage = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLDivElement[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline();

      const heroBadge = heroRef.current?.querySelector(".hero-badge");
      if (heroBadge) {
        tl.fromTo(
          heroBadge,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
      const heroTitle = heroRef.current?.querySelector("h1");
      if (heroTitle) {
        tl.fromTo(
          heroTitle,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.4"
        );
      }
      const heroSubtitle = heroRef.current?.querySelector(".hero-subtitle");
      if (heroSubtitle) {
        tl.fromTo(
          heroSubtitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }
      const heroButtons = heroRef.current?.querySelectorAll(".hero-btn");
      if (heroButtons) {
        tl.fromTo(
          heroButtons,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // FAQ Items scroll animations
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;

        const card = item.querySelector(".faq-card");
        const number = numberRefs.current[idx];
        const icon = item.querySelector(".faq-icon");
        const answer = item.querySelector(".faq-answer");
        const decorCircle = item.querySelector(".decor-circle");

        // Main card entrance
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: 100,
            rotateY: 15,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
              onEnter: () => setActiveIndex(idx),
              onEnterBack: () => setActiveIndex(idx),
            }
          }
        );

        // Large number parallax
        if (number) {
          gsap.fromTo(
            number,
            { opacity: 0, x: -50, scale: 0.8 },
            {
              opacity: 0.08,
              x: 0,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Icon rotation and scale
        gsap.fromTo(
          icon,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 65%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Answer fade and slide up
        gsap.fromTo(
          answer,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 55%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Decorative circle pulse
        if (decorCircle) {
          gsap.fromTo(
            decorCircle,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 0.15,
              duration: 1.5,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn(
      "min-h-screen overflow-x-hidden",
      isDark ? "bg-black text-white" : "bg-gray-50 text-gray-800"
    )}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-emerald-900/20"
            : "bg-gradient-to-br from-purple-100/30 via-blue-100/20 to-emerald-100/30"
        )} />
        <div className={cn(
          "absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl animate-pulse",
          isDark ? "bg-purple-500/10" : "bg-purple-300/20"
        )} style={{ animationDuration: '8s' }} />
        <div className={cn(
          "absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl animate-pulse",
          isDark ? "bg-blue-500/10" : "bg-blue-300/20"
        )} style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={cn(
            "hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-8",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
          )}>
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className={cn(
              "text-sm font-medium",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>Your Questions Answered</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>

          <p className={cn(
            "hero-subtitle text-xl md:text-3xl mb-6 max-w-4xl mx-auto leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Everything you need to know about {COMPANY.name}
          </p>

          <p className={cn(
            "text-base md:text-lg mb-12 max-w-2xl mx-auto",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            Scroll through our most frequently asked questions or reach out to our team for personalized assistance
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="hero-btn bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              View All FAQs
            </button>
            <Link to={"/contact"} className={cn(
              "hero-btn border-2 font-semibold py-4 px-8 rounded-full text-lg transition-all",
              isDark
                ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
            )}>
              Contact Support
            </Link>
          </div>

          <div className={cn(
            "scroll-indicator flex flex-col items-center gap-2",
            isDark ? "text-white/50" : "text-gray-400"
          )}>
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section ref={contentRef} className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) itemRefs.current[idx] = el;
              }}
              className="relative"
            >
              {/* Large Background Number */}
              <div
                ref={(el) => {
                  if (el) numberRefs.current[idx] = el;
                }}
                className={cn(
                  "absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 text-[200px] md:text-[300px] font-black pointer-events-none select-none",
                  isDark ? "text-white" : "text-gray-400"
                )}
                style={{ lineHeight: 1 }}
              >
                {(idx + 1).toString().padStart(2, '0')}
              </div>

              {/* Decorative Circle */}
              <div
                className={`decor-circle absolute -right-20 top-0 w-64 h-64 rounded-full bg-gradient-to-br ${faq.gradient} blur-3xl pointer-events-none`}
              />

              {/* Main Card */}
              <div className={cn(
                "faq-card relative rounded-3xl overflow-hidden border backdrop-blur-sm p-8 md:p-12 shadow-2xl",
                isDark
                  ? "border-white/10 bg-gradient-to-br from-white/5 to-white/0"
                  : "border-gray-200 bg-white/80"
              )}>
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${faq.gradient}`} />

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Icon */}
                  <div className={`faq-icon flex-shrink-0 p-5 rounded-2xl bg-gradient-to-br ${faq.gradient}`}>
                    <faq.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={cn(
                      "faq-question text-3xl md:text-4xl font-bold mb-6 leading-tight",
                      isDark ? "text-white" : "text-gray-800"
                    )}>
                      {faq.q}
                    </h3>
                    <p className={cn(
                      "faq-answer text-lg md:text-xl leading-relaxed",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                      {faq.a}
                    </p>

                    {/* Additional Info Badge */}
                    <div className={cn(
                      "mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border",
                      isDark ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"
                    )}>
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span className={cn(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>Question #{idx + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {faqs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              itemRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "w-2 rounded-full transition-all duration-300",
              activeIndex === idx
                ? isDark ? 'bg-white scale-150 h-8' : 'bg-gray-800 scale-150 h-8'
                : isDark ? 'bg-white/30 hover:bg-white/50 h-2' : 'bg-gray-400 hover:bg-gray-500 h-2'
            )}
          />
        ))}
      </div>

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-emerald-900/30"
            : "bg-gradient-to-r from-purple-100/50 via-blue-100/50 to-emerald-100/50"
        )} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-8",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
          )}>
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className={cn(
              "text-sm font-medium",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>Need More Help?</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Still have questions?
            </span>
          </h2>

          <p className={cn(
            "text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Our team at {COMPANY.name} is here to help you build, ship, and scale your next digital project
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to={"/contact"} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-5 px-10 rounded-full text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
              Talk to Our Team
            </Link>
            <button
              onClick={scrollToTop}
              className={cn(
                "border-2 font-semibold py-5 px-10 rounded-full text-xl transition-all",
                isDark
                  ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                  : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
              )}
            >
              Back to Top
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: Users, label: "50+", desc: "Happy Clients" },
              { icon: Globe, label: "100+", desc: "Projects Delivered" },
              { icon: Zap, label: "99.9%", desc: "Client Satisfaction" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-8 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-105",
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                )}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className={cn(
                  "text-5xl font-bold mb-2",
                  isDark ? "text-white" : "text-gray-800"
                )}>{stat.label}</div>
                <div className={isDark ? "text-gray-400" : "text-gray-500"}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

FaqPage.displayName = "FaqPage";

export default FaqPage;