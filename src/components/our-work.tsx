import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import { useRef, memo, useEffect, useState } from "react";
import { ExternalLink, Play, Award, Zap, Users, Globe } from "lucide-react";
import { getAnimationSettings, isMobile } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn, hash } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const projects = [
  {
    id: 1,
    title: "Auto Moto Expo",
    description: "Premier automotive expo platform showcasing the latest in automobile technology and industry innovations",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&q=75",
    tech: ["Web Design", "E-Commerce", "SEO", "Events"],
    category: "Automotive",
    stats: { users: "50K+", performance: "99.9%", awards: "3" },
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-900/20 to-orange-900/20",
    liveUrl: "https://www.automotoexpo.com/"
  },
  {
    id: 2,
    title: "BLS Trading",
    description: "Professional trading platform with comprehensive business solutions and international trade services",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=75",
    tech: ["React", "Node.js", "Trading", "B2B"],
    category: "Trading",
    stats: { users: "10K+", performance: "99.8%", awards: "2" },
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-900/20 to-indigo-900/20",
    liveUrl: "https://blstrading.com/"
  },
  {
    id: 3,
    title: "FinTech Revolution",
    description: "Next-generation financial platform with AI-powered insights and real-time analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=75",
    tech: ["React", "Node.js", "AI/ML", "Blockchain"],
    category: "FinTech",
    stats: { users: "2M+", performance: "99.9%", awards: "5" },
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-900/20 to-pink-900/20",
    liveUrl: "#"
  },
  {
    id: 4,
    title: "HealthCare AI",
    description: "Revolutionary healthcare management system with predictive analytics and patient care optimization",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=75",
    tech: ["Vue.js", "Python", "TensorFlow", "IoT"],
    category: "Healthcare",
    stats: { users: "500K+", performance: "99.8%", awards: "3" },
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-900/20 to-teal-900/20",
    liveUrl: "#"
  },
  {
    id: 5,
    title: "Smart Commerce",
    description: "Intelligent e-commerce platform with AR/VR integration and personalized shopping experiences",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=75",
    tech: ["Next.js", "AR/VR", "WebGL", "Stripe"],
    category: "E-Commerce",
    stats: { users: "1.5M+", performance: "99.7%", awards: "4" },
    color: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-900/20 to-blue-900/20",
    liveUrl: "#"
  },
  {
    id: 6,
    title: "Neural Network Hub",
    description: "Advanced AI platform for machine learning model deployment and real-time data processing",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=75",
    tech: ["Python", "TensorFlow", "Kubernetes", "GraphQL"],
    category: "AI/ML",
    stats: { users: "100K+", performance: "99.9%", awards: "6" },
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-900/20 to-red-900/20",
    liveUrl: "#"
  }
];

// Memoized project card
const ProjectCard = memo(({
  project,
  index,
  isMobileDevice,
  enableHoverEffects,
  isDark
}: {
  project: typeof projects[0];
  index: number;
  isMobileDevice: boolean;
  enableHoverEffects: boolean;
  isDark: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableHoverEffects || isMobileDevice || !cardRef.current) return;

    const card = cardRef.current;
    const image = card.querySelector(".project-image img");
    const overlay = card.querySelector(".project-overlay");
    const stats = card.querySelector(".project-stats");

    const handleMouseEnter = () => {
      gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power2.out" });
      gsap.to(image, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      gsap.to(overlay, { opacity: 1, duration: 0.2 });
      gsap.to(stats, { y: 0, opacity: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(overlay, { opacity: 0, duration: 0.2 });
      gsap.to(stats, { y: 20, opacity: 0, duration: 0.2 });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableHoverEffects, isMobileDevice]);

  const handleVisitSite = () => {
    if (project.liveUrl && project.liveUrl !== "#") {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={cardRef}
      id="ourwork"
      className={cn(
        "project-card group relative rounded-3xl overflow-hidden border shadow-xl will-change-transform",
        isDark
          ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50"
          : "bg-white border-gray-200"
      )}
      style={{ opacity: 0, transform: 'translateY(50px)' }}
      data-index={index}
    >
      {/* Project Image */}
      <div className="project-image relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className={`project-overlay absolute inset-0 bg-gradient-to-t ${project.bgColor} to-transparent opacity-0 transition-opacity duration-200`} />

        {/* Category Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${project.color} shadow-lg`}>
          {project.category}
        </div>

        {/* Stats Overlay */}
        <div className="project-stats absolute bottom-4 left-4 right-4 opacity-0 translate-y-5 transition-all duration-200">
          <div className="flex justify-between items-center bg-black/60 rounded-lg p-3">
            <div className="flex items-center gap-1 text-white">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">{project.stats.users}</span>
            </div>
            <div className="flex items-center gap-1 text-white">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">{project.stats.performance}</span>
            </div>
            <div className="flex items-center gap-1 text-white">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">{project.stats.awards}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="project-content p-6">
        <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
          {project.title}
        </h3>
        <p className={cn(
          "text-sm mb-4 leading-relaxed line-clamp-2",
          isDark ? "text-gray-300" : "text-gray-600"
        )}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <span
              key={techIndex}
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium border",
                isDark
                  ? "bg-gray-800/80 text-gray-300 border-gray-600/50"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleVisitSite}
            className={`flex-1 bg-gradient-to-r ${project.color} text-white py-2.5 px-3 rounded-xl font-semibold transition-transform duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2 text-sm`}
          >
            <Play className="w-4 h-4" />
            Demo
          </button>
          <button
            onClick={handleVisitSite}
            className={cn(
              "p-2.5 rounded-xl border transition-colors duration-200",
              isDark
                ? "bg-gray-800/80 text-gray-300 border-gray-600/50 hover:bg-gray-700/80"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
            )}
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={handleVisitSite}
            className={cn(
              "p-2.5 rounded-xl border transition-colors duration-200",
              isDark
                ? "bg-gray-800/80 text-gray-300 border-gray-600/50 hover:bg-gray-700/80"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
            )}
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export const OurWork = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const animSettings = getAnimationSettings();
  const { isDark } = useTheme();

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  useGSAP(() => {
    if (!animSettings.shouldAnimate) {
      // Set initial visible state without animations
      gsap.set(".project-card", { opacity: 1, y: 0 });
      return;
    }

    // Hero section animations - simplified
    gsap.fromTo("#work-hero-badge",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    gsap.fromTo("#work-hero-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );

    gsap.fromTo("#work-hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );

    // Project cards - optimized scroll trigger
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none", // Don't reverse - better performance
        },
        delay: (index % 3) * 0.1 // Stagger within rows
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animSettings.shouldAnimate]);

  return (
    <section  className={cn(
      "relative min-h-screen w-screen overflow-hidden py-20",
      isDark ? "bg-black" : "bg-gray-50"
    )}>
      {/* Simplified Background - reduced blur for performance */}
      <div className={cn(
        "absolute inset-0",
        isDark
          ? "bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"
          : "bg-gradient-to-br from-indigo-100/50 via-transparent to-purple-100/50"
      )} />

      {/* Reduced background elements */}
      {animSettings.enableBlur && (
        <>
          <div className={cn(
            "absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-2xl",
            isDark
              ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10"
              : "bg-gradient-to-r from-purple-300/20 to-pink-300/20"
          )} />
          <div className={cn(
            "absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-2xl",
            isDark
              ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
              : "bg-gradient-to-r from-blue-300/20 to-cyan-300/20"
          )} />
        </>
      )}

      <div ref={containerRef}  id="ourwork" className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div id="work-hero-badge" className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-6",
            isDark
              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
              : "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200"
          )}>
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className={cn(
              "text-sm font-medium",
              isDark ? "text-white" : "text-gray-800"
            )}>Our Portfolio</span>
          </div>

          <h1 id="work-hero-title" className="text-5xl md:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Latest Masterpieces
            </span>
          </h1>

          <p id="work-hero-subtitle" className={cn(
            "text-lg md:text-xl max-w-3xl mx-auto leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Discover our cutting-edge projects that push the boundaries of technology and innovation
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isMobileDevice={isMobileDevice}
              enableHoverEffects={animSettings.enableHoverEffects}
              isDark={isDark}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4">
            <h3 className={cn(
              "text-2xl font-bold",
              isDark ? "text-white" : "text-gray-800"
            )}>
              Ready to Create Something Amazing?
            </h3>
            <button 
            onClick={()=>hash("contact")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-3.5 rounded-full font-bold text-lg transition-transform duration-200 active:scale-95 shadow-xl">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

OurWork.displayName = "OurWork";
