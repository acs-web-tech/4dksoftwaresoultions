import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
    Sparkles, ChevronDown, Rocket, Zap, Globe, Shield, Code, Server, Check, X,
    MessageSquare, Search, Palette, TestTube, Headphones, ArrowRight, Users, Award, Clock,
    Target, Layers, CircleDot, Star, TrendingUp, CheckCircle
} from "lucide-react";
import { getAnimationSettings } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

// Services list with enhanced data
const services = [
    {
        id: 1,
        title: "Web Development",
        tagline: "Modern & Scalable",
        description: "Custom web applications built with React, Next.js, and cutting-edge frameworks for unparalleled performance.",
        icon: Code,
        gradient: "from-violet-500 to-fuchsia-500",
        features: ["React/Next.js", "TypeScript", "REST/GraphQL", "Database Design"],
        stats: { projects: "200+", satisfaction: "99%" }
    },
    {
        id: 2,
        title: "Mobile Development",
        tagline: "Cross-Platform Excellence",
        description: "Native-quality mobile apps for iOS and Android using React Native and Flutter for maximum reach.",
        icon: Rocket,
        gradient: "from-blue-500 to-cyan-500",
        features: ["React Native", "Flutter", "iOS/Android", "App Store"],
        stats: { projects: "150+", satisfaction: "98%" }
    },
    {
        id: 3,
        title: "Cloud Solutions",
        tagline: "Enterprise Scale",
        description: "Scalable cloud infrastructure and DevOps automation for seamless deployment and operation.",
        icon: Server,
        gradient: "from-emerald-500 to-teal-500",
        features: ["AWS/GCP/Azure", "Docker/K8s", "CI/CD", "Monitoring"],
        stats: { projects: "100+", satisfaction: "99%" }
    },
    {
        id: 4,
        title: "AI & Machine Learning",
        tagline: "Intelligent Solutions",
        description: "Cutting-edge AI solutions powered by LLMs, computer vision, and advanced analytics.",
        icon: Zap,
        gradient: "from-orange-500 to-amber-500",
        features: ["LLM/GPT", "Computer Vision", "NLP", "Data Science"],
        stats: { projects: "80+", satisfaction: "97%" }
    },
    {
        id: 5,
        title: "UI/UX Design",
        tagline: "User-Centered Design",
        description: "Beautiful, intuitive interfaces designed with user experience and conversion optimization in mind.",
        icon: Palette,
        gradient: "from-indigo-500 to-purple-500",
        features: ["Figma", "Prototyping", "Design Systems", "User Research"],
        stats: { projects: "250+", satisfaction: "99%" }
    },
    {
        id: 6,
        title: "Security & Compliance",
        tagline: "Enterprise Security",
        description: "Comprehensive security audits, penetration testing, and compliance solutions for peace of mind.",
        icon: Shield,
        gradient: "from-pink-500 to-rose-500",
        features: ["Pen Testing", "GDPR/HIPAA", "Encryption", "Auth Systems"],
        stats: { projects: "120+", satisfaction: "100%" }
    }
];

// River flow process steps
const processSteps = [
    {
        id: 1,
        title: "Requirement Analysis",
        subtitle: "Understanding Your Vision",
        description: "Deep dive into your business needs, goals, and technical requirements through comprehensive discovery sessions.",
        details: ["Stakeholder interviews", "Business analysis", "Technical assessment", "Scope definition"],
        icon: MessageSquare,
        gradient: "from-violet-500 to-fuchsia-500",
        duration: "1-2 weeks"
    },
    {
        id: 2,
        title: "Research & Strategy",
        subtitle: "Planning for Success",
        description: "Market research, competitor analysis, and strategic planning to position your project for maximum impact.",
        details: ["Market analysis", "Competitor research", "User personas", "Roadmap creation"],
        icon: Search,
        gradient: "from-blue-500 to-cyan-500",
        duration: "1-2 weeks"
    },
    {
        id: 3,
        title: "UI/UX Design",
        subtitle: "Crafting Experiences",
        description: "Creating wireframes, interactive prototypes, and stunning visual designs that captivate users.",
        details: ["Wireframing", "Hi-fi mockups", "Prototyping", "Design system"],
        icon: Palette,
        gradient: "from-emerald-500 to-teal-500",
        duration: "2-4 weeks"
    },
    {
        id: 4,
        title: "Development",
        subtitle: "Building with Excellence",
        description: "Agile development with clean, maintainable code using best practices and modern technologies.",
        details: ["Frontend dev", "Backend API", "Database setup", "Integrations"],
        icon: Code,
        gradient: "from-orange-500 to-amber-500",
        duration: "4-12 weeks"
    },
    {
        id: 5,
        title: "Testing & QA",
        subtitle: "Ensuring Quality",
        description: "Rigorous testing including unit tests, integration tests, performance testing, and security audits.",
        details: ["Unit testing", "E2E testing", "Performance", "Security audit"],
        icon: TestTube,
        gradient: "from-rose-500 to-pink-500",
        duration: "1-2 weeks"
    },
    {
        id: 6,
        title: "Launch & Deploy",
        subtitle: "Going Live",
        description: "Seamless deployment to production with zero downtime, optimized for performance and scalability.",
        details: ["Cloud deploy", "CDN setup", "DNS config", "Go live"],
        icon: Rocket,
        gradient: "from-indigo-500 to-purple-500",
        duration: "1 week"
    },
    {
        id: 7,
        title: "Support & Growth",
        subtitle: "Long-term Partnership",
        description: "Ongoing maintenance, 24/7 support, regular updates, and continuous feature enhancements.",
        details: ["24/7 support", "Monitoring", "Updates", "Scaling"],
        icon: Headphones,
        gradient: "from-pink-500 to-rose-500",
        duration: "Ongoing"
    }
];

// Comparison data
const comparisonFeatures = [
    { feature: "24/7 Dedicated Support", us: true, others: false },
    { feature: "Dedicated Project Manager", us: true, others: false },
    { feature: "Agile Development", us: true, others: true },
    { feature: "Free Initial Consultation", us: true, others: false },
    { feature: "Full Source Code Ownership", us: true, others: true },
    { feature: "Post-Launch Support (90 days)", us: true, others: false },
    { feature: "Transparent Fixed Pricing", us: true, others: false },
    { feature: "Custom Solutions", us: true, others: true },
    { feature: "Weekly Progress Reports", us: true, others: false },
    { feature: "100% Money-Back Guarantee", us: true, others: false },
];

// Enhanced Service Card with hover effects
const ServiceCard = memo(({ service, index, isDark }: { service: typeof services[0]; index: number; isDark: boolean }) => {
    const Icon = service.icon;

    return (
        <div
            className={cn(
                "service-card group relative overflow-hidden rounded-3xl border transition-all duration-300",
                isDark
                    ? "border-white/10 hover:border-white/20"
                    : "border-gray-200 hover:border-gray-300 bg-white shadow-sm"
            )}
            style={{ opacity: 0, transform: 'translateY(40px)' }}
            data-index={index}
        >
            {/* Background glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />

            {/* Card content */}
            <div className={cn(
                "relative backdrop-blur-sm p-8 h-full",
                isDark
                    ? "bg-gradient-to-br from-white/10 to-white/5"
                    : "bg-white"
            )}>
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Icon with glow */}
                <div className="relative mb-6">
                    <div className={`absolute -inset-2 bg-gradient-to-r ${service.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity`} />
                    <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Title and tagline */}
                <div className="mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.tagline}
                    </span>
                    <h3 className={cn(
                        "text-2xl font-bold mt-1",
                        isDark ? "text-white" : "text-gray-800"
                    )}>{service.title}</h3>
                </div>

                {/* Description */}
                <p className={cn(
                    "text-sm leading-relaxed mb-6",
                    isDark ? "text-gray-400" : "text-gray-600"
                )}>{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feat, i) => (
                        <span
                            key={i}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-medium transition-all",
                                isDark
                                    ? "bg-white/5 border-white/10 text-gray-300 group-hover:bg-white/10"
                                    : "bg-gray-50 border-gray-200 text-gray-600 group-hover:bg-gray-100"
                            )}
                        >
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            {feat}
                        </span>
                    ))}
                </div>

                {/* Stats */}
                <div className={cn(
                    "flex items-center gap-6 pt-4 border-t",
                    isDark ? "border-white/10" : "border-gray-200"
                )}>
                    <div>
                        <div className={cn(
                            "text-2xl font-bold",
                            isDark ? "text-white" : "text-gray-800"
                        )}>{service.stats.projects}</div>
                        <div className={isDark ? "text-xs text-gray-500" : "text-xs text-gray-400"}>Projects</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-emerald-400">{service.stats.satisfaction}</div>
                        <div className={isDark ? "text-xs text-gray-500" : "text-xs text-gray-400"}>Satisfaction</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ServiceCard.displayName = "ServiceCard";

// River Flow Step with enhanced design
const RiverStep = memo(({
    step,
    index,
    isActive,
    isDark
}: {
    step: typeof processSteps[0];
    index: number;
    isActive: boolean;
    isDark: boolean;
}) => {
    const Icon = step.icon;
    const isLeft = index % 2 === 0;

    return (
        <div
            className={`river-step relative flex flex-col lg:flex-row items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            data-index={index}
        >
            {/* Content Card */}
            <div className={`river-card w-full lg:w-[45%] ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                <div
                    className={cn(
                        "relative overflow-hidden rounded-3xl border transition-all duration-500",
                        isActive
                            ? isDark
                                ? 'border-white/30 bg-gradient-to-br from-white/15 to-white/5 shadow-2xl scale-[1.02]'
                                : 'border-gray-300 bg-white shadow-2xl scale-[1.02]'
                            : isDark
                                ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-white/20'
                                : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                    )}
                >
                    {/* Top gradient bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.gradient}`} />

                    {/* Glow effect when active */}
                    {isActive && (
                        <div className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-3xl blur-xl opacity-20`} />
                    )}

                    <div className="relative p-8">
                        {/* Header */}
                        <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Icon */}
                            <div className="relative flex-shrink-0">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-xl blur opacity-50`} />
                                <div className={`relative p-3 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <div className={`flex-1 ${isLeft ? 'lg:text-right' : ''}`}>
                                <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                                    Step {step.id} • {step.duration}
                                </span>
                                <h3 className={cn(
                                    "text-xl font-bold mt-1",
                                    isDark ? "text-white" : "text-gray-800"
                                )}>{step.title}</h3>
                                <p className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-500"}>{step.subtitle}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={cn(
                            "text-sm leading-relaxed mb-4",
                            isDark ? "text-gray-300" : "text-gray-600",
                            isLeft ? 'lg:text-right' : ''
                        )}>
                            {step.description}
                        </p>

                        {/* Details */}
                        <div className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-end' : ''}`}>
                            {step.details.map((detail, i) => (
                                <span
                                    key={i}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                                        isActive
                                            ? `bg-gradient-to-r ${step.gradient} text-white shadow-lg`
                                            : isDark
                                                ? 'bg-white/5 border border-white/10 text-gray-300'
                                                : 'bg-gray-100 border border-gray-200 text-gray-600'
                                    )}
                                >
                                    <CircleDot className="w-3 h-3" />
                                    {detail}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* River Node - Center */}
            <div className="hidden lg:flex relative items-center justify-center z-20">
                {/* Connection lines */}
                <div className={`absolute h-0.5 w-16 bg-gradient-to-r ${step.gradient} opacity-30 ${isLeft ? '-left-16' : '-right-16'}`} />

                {/* Node */}
                <div className="relative">
                    <div className={`absolute -inset-3 bg-gradient-to-r ${step.gradient} rounded-full blur-md opacity-50 ${isActive ? 'animate-pulse' : ''}`} />
                    <div className={cn(
                        `relative w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} border-4 flex items-center justify-center shadow-xl transition-transform`,
                        isDark ? "border-black" : "border-white",
                        isActive ? 'scale-110' : ''
                    )}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {/* Step number */}
                    <div className={cn(
                        "absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold",
                        isDark ? "text-gray-500" : "text-gray-400"
                    )}>
                        {String(step.id).padStart(2, '0')}
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="hidden lg:block w-[45%]" />
        </div>
    );
});

RiverStep.displayName = "RiverStep";

const ServicePage = memo(() => {
    const heroRef = useRef<HTMLDivElement>(null);
    const riverContainerRef = useRef<HTMLDivElement>(null);
    const riverPathRef = useRef<SVGPathElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const activeStepRef = useRef(0);
    const animSettings = getAnimationSettings();
    const { isDark } = useTheme();

    // Separate effect for river progress tracking to avoid re-running all animations
    useEffect(() => {
        if (!animSettings.shouldAnimate || !riverContainerRef.current) return;

        const riverPath = riverPathRef.current;
        if (!riverPath) return;

        const pathLength = riverPath.getTotalLength();
        gsap.set(riverPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            willChange: 'stroke-dashoffset'
        });

        const riverTrigger = ScrollTrigger.create({
            trigger: riverContainerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1.5,
            onUpdate: (self) => {
                const offset = pathLength * (1 - self.progress);
                gsap.set(riverPath, { strokeDashoffset: offset });

                const newStep = Math.min(
                    Math.floor(self.progress * processSteps.length),
                    processSteps.length - 1
                );
                if (newStep !== activeStepRef.current) {
                    activeStepRef.current = newStep;
                    setActiveStep(newStep);
                }
            }
        });

        return () => {
            riverTrigger.kill();
        };
    }, [animSettings.shouldAnimate]);

    // Main animations effect
    useEffect(() => {
        if (!animSettings.shouldAnimate) {
            gsap.set(".service-card, .river-card, .comparison-row", { opacity: 1, y: 0, x: 0, rotateX: 0 });
            gsap.set(".hero-element", { opacity: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.config({ force3D: true });

            // Hero animations
            const heroTl = gsap.timeline();
            heroTl
                .fromTo(".hero-badge",
                    { opacity: 0, y: 40, scale: 0.8 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
                )
                .fromTo(".hero-title",
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(".hero-subtitle",
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.5"
                )
                .fromTo(".hero-buttons > *",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
                    "-=0.4"
                );

            // Scroll indicator
            gsap.to(".scroll-indicator", {
                y: 15,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });

            // Service cards
            gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        },
                        delay: (i % 3) * 0.1
                    }
                );
            });

            // Comparison rows
            gsap.utils.toArray<HTMLElement>(".comparison-row").forEach((row, i) => {
                gsap.fromTo(row,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 90%",
                            toggleActions: "play none none none"
                        },
                        delay: i * 0.03
                    }
                );
            });

            // River cards
            gsap.utils.toArray<HTMLElement>(".river-card").forEach((card, i) => {
                const isLeft = i % 2 === 0;
                gsap.fromTo(card,
                    { opacity: 0, x: isLeft ? -50 : 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });
        });

        return () => {
            ctx.revert();
        };
    }, [animSettings.shouldAnimate]);

    return (
        <div className={cn(
            "min-h-screen w-screen overflow-hidden",
            isDark ? "bg-black text-white" : "bg-gray-50 text-gray-800"
        )}>
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black"
                        : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/30 via-gray-50 to-gray-50"
                )} />
                {animSettings.enableBlur && (
                    <>
                        <div className={cn(
                            "absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl animate-pulse",
                            isDark ? "bg-violet-500/15" : "bg-violet-300/25"
                        )} style={{ animationDuration: '8s' }} />
                        <div className={cn(
                            "absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl animate-pulse",
                            isDark ? "bg-blue-500/15" : "bg-blue-300/25"
                        )} style={{ animationDuration: '10s' }} />
                    </>
                )}
                {/* Grid pattern */}
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]"
                        : "bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"
                )} />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
                <div ref={heroRef} className="relative z-10 text-center max-w-6xl mx-auto">
                    <div className={cn(
                        "hero-badge inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8",
                        isDark
                            ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border-violet-500/30"
                            : "bg-gradient-to-r from-violet-100 to-fuchsia-100 border-violet-200"
                    )}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur animate-pulse" />
                            <Sparkles className="relative w-5 h-5 text-yellow-400" />
                        </div>
                        <span className={cn(
                            "text-sm font-semibold",
                            isDark ? "text-white" : "text-gray-800"
                        )}>Premium Development Services by {COMPANY.name}</span>
                        <Zap className="w-4 h-4 text-violet-400" />
                    </div>

                    <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8">
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                            Our Services
                        </span>
                    </h1>

                    <p className={cn(
                        "hero-subtitle text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        End-to-end digital solutions crafted with cutting-edge technology and unmatched expertise.
                    </p>

                    <p className={cn(
                        "text-base mb-12 max-w-2xl mx-auto",
                        isDark ? "text-gray-500" : "text-gray-500"
                    )}>
                        From concept to deployment, we transform your vision into reality with precision and excellence.
                    </p>

                    <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            to="/contact"
                            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-4 px-8 rounded-full text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative">Get a Quote</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="#services"
                            className={cn(
                                "border-2 font-semibold py-4 px-8 rounded-full text-lg transition-all",
                                isDark
                                    ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
                            )}
                        >
                            Explore Services
                        </a>
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

            {/* Services Grid Section */}
            <section id="services" className="relative py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <div className={cn(
                            "inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8",
                            isDark
                                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30"
                                : "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200"
                        )}>
                            <Layers className="w-5 h-5 text-blue-400" />
                            <span className={cn(
                                "text-sm font-semibold",
                                isDark ? "text-white" : "text-gray-800"
                            )}>What We Offer</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Our Expertise
                            </span>
                        </h2>
                        <p className={cn(
                            "text-lg max-w-2xl mx-auto",
                            isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                            Comprehensive solutions tailored to your unique business needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <ServiceCard key={service.id} service={service} index={i} isDark={isDark} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Comparison Section */}
            <section className="relative py-32 px-6">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-gradient-to-b from-black via-gray-900/50 to-black"
                        : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
                )} />

                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className={cn(
                            "inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8",
                            isDark
                                ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
                                : "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200"
                        )}>
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className={cn(
                                "text-sm font-semibold",
                                isDark ? "text-white" : "text-gray-800"
                            )}>The Difference</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                Why Choose Us?
                            </span>
                        </h2>
                        <p className={cn(
                            "text-lg max-w-2xl mx-auto",
                            isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                            See how {COMPANY.name} stands out from the competition
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <div className={cn(
                        "relative overflow-hidden rounded-3xl border",
                        isDark ? "border-white/10" : "border-gray-200"
                    )}>
                        <div className={cn(
                            "absolute inset-0 backdrop-blur-sm",
                            isDark
                                ? "bg-gradient-to-br from-white/10 to-white/5"
                                : "bg-white"
                        )} />

                        {/* Header */}
                        <div className={cn(
                            "relative grid grid-cols-3 gap-4 p-6 border-b",
                            isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
                        )}>
                            <div className={cn(
                                "text-lg font-bold",
                                isDark ? "text-white" : "text-gray-800"
                            )}>Feature</div>
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg">
                                    <Star className="w-4 h-4 text-white fill-white" />
                                    <span className="text-white font-bold">{COMPANY.name}</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className={cn(
                                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border",
                                    isDark
                                        ? "bg-white/10 border-white/20"
                                        : "bg-gray-100 border-gray-200"
                                )}>
                                    <span className={isDark ? "text-gray-400 font-medium" : "text-gray-500 font-medium"}>Others</span>
                                </div>
                            </div>
                        </div>

                        {/* Rows */}
                        {comparisonFeatures.map((item, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "comparison-row relative grid grid-cols-3 gap-4 p-5 border-b transition-colors",
                                    isDark
                                        ? `border-white/5 hover:bg-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`
                                        : `border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`
                                )}
                            >
                                <div className={cn(
                                    "flex items-center gap-3 font-medium",
                                    isDark ? "text-gray-300" : "text-gray-700"
                                )}>
                                    <Target className="w-4 h-4 text-violet-400" />
                                    {item.feature}
                                </div>
                                <div className="flex justify-center">
                                    {item.us ? (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                            <Check className="w-5 h-5 text-emerald-400" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                            <X className="w-5 h-5 text-red-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    {item.others ? (
                                        <div className={cn(
                                            "w-10 h-10 rounded-full border flex items-center justify-center",
                                            isDark
                                                ? "bg-gray-500/20 border-gray-500/30"
                                                : "bg-gray-200 border-gray-300"
                                        )}>
                                            <Check className={isDark ? "w-5 h-5 text-gray-400" : "w-5 h-5 text-gray-500"} />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                            <X className="w-5 h-5 text-red-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
                        {[
                            { icon: Users, label: "500+", desc: "Happy Clients", gradient: "from-violet-500 to-fuchsia-500" },
                            { icon: Award, label: "50+", desc: "Awards Won", gradient: "from-blue-500 to-cyan-500" },
                            { icon: Clock, label: "10+", desc: "Years Experience", gradient: "from-emerald-500 to-teal-500" },
                            { icon: TrendingUp, label: "99%", desc: "Client Retention", gradient: "from-orange-500 to-amber-500" }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "group relative overflow-hidden p-6 rounded-2xl border transition-all duration-300",
                                    isDark
                                        ? "border-white/10 hover:border-white/20"
                                        : "border-gray-200 bg-white hover:border-gray-300 shadow-sm"
                                )}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                <div className="relative text-center">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={cn(
                                        "text-4xl font-black mb-1",
                                        isDark ? "text-white" : "text-gray-800"
                                    )}>{stat.label}</div>
                                    <div className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>{stat.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* River Flow Process Section */}
            <section className="relative py-32 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24">
                        <div className={cn(
                            "inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8",
                            isDark
                                ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
                                : "bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200"
                        )}>
                            <Rocket className="w-5 h-5 text-emerald-400" />
                            <span className={cn(
                                "text-sm font-semibold",
                                isDark ? "text-white" : "text-gray-800"
                            )}>Our Process</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Development Journey
                            </span>
                        </h2>
                        <p className={cn(
                            "text-lg max-w-2xl mx-auto",
                            isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                            Follow the flow of our proven development process from concept to launch
                        </p>
                    </div>

                    {/* River Container */}
                    <div ref={riverContainerRef} className="relative">
                        {/* SVG River Path - Desktop only */}
                        <svg
                            className="hidden lg:block absolute left-1/2 top-0 w-2 -translate-x-1/2 overflow-visible"
                            style={{ height: `${processSteps.length * 320}px` }}
                        >
                            <defs>
                                <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="15%" stopColor="#d946ef" />
                                    <stop offset="30%" stopColor="#3b82f6" />
                                    <stop offset="45%" stopColor="#06b6d4" />
                                    <stop offset="60%" stopColor="#10b981" />
                                    <stop offset="75%" stopColor="#f59e0b" />
                                    <stop offset="90%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>

                            {/* Background river */}
                            <path
                                d={`M 4 0 L 4 ${processSteps.length * 320}`}
                                fill="none"
                                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                                strokeWidth="8"
                                strokeLinecap="round"
                            />

                            {/* Animated river */}
                            <path
                                ref={riverPathRef}
                                d={`M 4 0 L 4 ${processSteps.length * 320}`}
                                fill="none"
                                stroke="url(#riverGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Process Steps */}
                        <div className="relative z-10 space-y-16 lg:space-y-20">
                            {processSteps.map((step, index) => (
                                <RiverStep
                                    key={step.id}
                                    step={step}
                                    index={index}
                                    isActive={activeStep === index}
                                    isDark={isDark}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6 overflow-hidden">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-gradient-to-r from-violet-900/30 via-fuchsia-900/20 to-pink-900/30"
                        : "bg-gradient-to-r from-violet-100/50 via-fuchsia-100/50 to-pink-100/50"
                )} />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <div className={cn(
                        "inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8",
                        isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                    )}>
                        <Globe className="w-5 h-5 text-blue-400" />
                        <span className={cn(
                            "text-sm font-semibold",
                            isDark ? "text-white" : "text-gray-800"
                        )}>Let's Work Together</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black mb-8">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Ready to Start?
                        </span>
                    </h2>

                    <p className={cn(
                        "text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        Let's transform your ideas into reality. Get in touch with {COMPANY.name} today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-5 px-12 rounded-full text-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative">Get Started</span>
                            <ArrowRight className="relative w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/pricing"
                            className={cn(
                                "border-2 font-semibold py-5 px-12 rounded-full text-xl transition-all",
                                isDark
                                    ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
                            )}
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
});

ServicePage.displayName = "ServicePage";

export default ServicePage;
