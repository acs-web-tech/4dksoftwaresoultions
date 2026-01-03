import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Target, Rocket, Users, Heart, Zap, Award, Globe } from "lucide-react";
import { getAnimationSettings } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "ARUN",
    role: "Founder",
    image: "img/Founder.jpg",
    bio: "Visionary leader with 10+ years in the tech industry, passionate about creating innovative digital solutions.",
    icon: Rocket,
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 2,
    name: "DHATCHINA MOORTHY",
    role: "Co-Founder",
    image: "img/Co-founder.jpg",
    bio: "Tech innovator specializing in modern web technologies and scalable architecture design.",
    icon: Zap,
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    name: "ABURAJA",
    role: "CEO",
    image: "img/CEO.jpg",
    bio: "Award-winning designer crafting next-gen digital experiences with artistry and innovation.",
    icon: Award,
    color: "from-emerald-400 to-teal-400"
  },
  {
    id: 4,  
    name: "KARTHIGAI SELVAM",
    role: "Head of Operations",
    image: "img/karthi.jpg",
    bio: "Operations expert connecting clients with optimal solutions and ensuring project success.",
    icon: Users,
    color: "from-orange-400 to-red-400"
  }
];

const storyPoints = [
  { text: `${COMPANY.name} was born to redefine development`, icon: Target },
  { text: "A place where every client shines", icon: Sparkles },
  { text: "We connect ideas and spark innovation", icon: Globe },
  { text: "Innovation meets imagination here", icon: Zap },
  { text: "Building partnerships through excellence", icon: Heart },
  { text: "Your digital journey starts with us", icon: Rocket }
];

// Memoized story card
const StoryCard = memo(({ point, isDark }: { point: typeof storyPoints[0]; isDark: boolean }) => (
  <div
    className={cn(
      "story-card group relative p-6 rounded-2xl border cursor-pointer transition-all duration-200",
      isDark
        ? "bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:bg-white/5"
        : "bg-white border-gray-200 shadow-sm hover:shadow-md"
    )}
    style={{ opacity: 0, transform: 'translateY(30px)' }}
  >
    <div className="relative z-10">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
        isDark
          ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20"
          : "bg-gradient-to-br from-purple-100 to-blue-100"
      )}>
        <point.icon className="w-6 h-6 text-purple-400" />
      </div>
      <p className={cn(
        "text-lg font-semibold leading-relaxed",
        isDark ? "text-white" : "text-gray-800"
      )}>
        {point.text}
      </p>
    </div>
  </div>
));

StoryCard.displayName = "StoryCard";

// Memoized team card
const TeamCard = memo(({ member, isDark }: { member: typeof teamMembers[0]; isDark: boolean }) => (
  <div
    className={cn(
      "team-card group relative rounded-2xl overflow-hidden border",
      isDark
        ? "border-white/10 bg-gradient-to-br from-white/5 to-white/0"
        : "border-gray-200 bg-white shadow-sm"
    )}
    style={{ opacity: 0, transform: 'translateY(40px)' }}
  >
    {/* Image Container */}
    <div className="relative h-64 overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="team-img w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Icon Badge */}
      <div className={`absolute top-4 right-4 p-2.5 rounded-lg bg-gradient-to-br ${member.color} opacity-90`}>
        <member.icon className="w-5 h-5 text-white" />
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className={cn(
        "text-2xl font-bold mb-1",
        isDark ? "text-white" : "text-gray-800"
      )}>
        {member.name}
      </h3>
      <p className={`text-base font-semibold mb-3 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
        {member.role}
      </p>
      <p className={cn(
        "text-sm leading-relaxed",
        isDark ? "text-gray-300" : "text-gray-600"
      )}>
        {member.bio}
      </p>
    </div>

    {/* Bottom gradient bar */}
    <div className={`h-1 bg-gradient-to-r ${member.color}`} />
  </div>
));

TeamCard.displayName = "TeamCard";

const AboutPage = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const animSettings = getAnimationSettings();
  const { isDark } = useTheme();

  useEffect(() => {
    if (!animSettings.shouldAnimate) {
      // Set visible state without animations
      gsap.set(".hero-badge, .hero-title, .hero-subtitle, .hero-stats", { opacity: 1, y: 0 });
      gsap.set(".story-card, .team-card", { opacity: 1, y: 0 });
      gsap.set(".cta-content", { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Configure GSAP for performance
      gsap.config({ force3D: true });

      // Hero Animation - simplified
      gsap.fromTo(".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );

      gsap.fromTo(".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(".hero-stats",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.3 }
      );

      // Story Cards - simplified scroll trigger
      gsap.utils.toArray<HTMLElement>(".story-card").forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none"
          },
          delay: (i % 3) * 0.05
        });
      });

      // Team Cards
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          delay: (i % 2) * 0.1
        });
      });

      // CTA Section
      gsap.fromTo(".cta-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animSettings.shouldAnimate]);

  return (
    <div className={cn(
      "min-h-screen overflow-x-hidden",
      isDark ? "bg-black text-white" : "bg-gray-50 text-gray-800"
    )}>
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"
            : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/30 via-gray-50 to-gray-50"
        )} />
        {animSettings.enableBlur && (
          <>
            <div className={cn(
              "absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-2xl",
              isDark ? "bg-purple-500/10" : "bg-purple-300/20"
            )} />
            <div className={cn(
              "absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl",
              isDark ? "bg-blue-500/10" : "bg-blue-300/20"
            )} />
          </>
        )}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={cn(
            "hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-8",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
          )}>
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">Redefining Digital Solutions</span>
          </div>

          <h1 className="hero-title text-6xl md:text-8xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About {COMPANY.name}
            </span>
          </h1>

          <p className={cn(
            "hero-subtitle text-lg md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Pioneering the future of digital solutions through innovative development experiences
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "50+", desc: "Happy Clients" },
              { label: "100+", desc: "Projects Delivered" },
              { label: "10+", desc: "Team Members" },
              { label: "99.9%", desc: "Client Satisfaction" }
            ].map((stat, i) => (
              <div
                key={i}
                className={cn(
                  "hero-stats p-5 rounded-xl border",
                  isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                )}
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  {stat.label}
                </div>
                <div className={cn(
                  "text-xs",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              Every great journey begins with a vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyPoints.map((point, i) => (
              <StoryCard key={i} point={point} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={cn(
        "relative py-24 px-6",
        isDark
          ? "bg-gradient-to-b from-black via-gray-900/30 to-black"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              The visionaries building the future of digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section relative py-24 px-6 overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20"
            : "bg-gradient-to-r from-purple-100/30 via-blue-100/30 to-pink-100/30"
        )} />

        <div className="cta-content relative z-10 max-w-5xl mx-auto text-center">
          <div className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-6",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
          )}>
            <Rocket className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Get Started</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready to Start Your Project?
            </span>
          </h2>

          <p className={cn(
            "text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Partner with {COMPANY.name} and experience development excellence like never before
          </p>

          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-transform duration-200 active:scale-95">
            Start Your Journey
          </button>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {[
              { icon: Globe, label: "Global Reach" },
              { icon: Zap, label: "Cutting-Edge Tech" },
              { icon: Heart, label: "Client First" }
            ].map((feature, i) => (
              <div
                key={i}
                className={cn(
                  "p-5 rounded-xl border",
                  isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                )}
              >
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <p className={cn(
                  "text-base font-semibold",
                  isDark ? "text-white" : "text-gray-800"
                )}>{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

AboutPage.displayName = "AboutPage";

export default AboutPage;