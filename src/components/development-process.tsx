import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, memo, useState } from "react";
import {
    MessageSquare, Search, Palette, Code, TestTube, Rocket, Headphones,
    Sparkles, ArrowRight, CheckCircle, Zap, Target
} from "lucide-react";

import { AnimatedTitle } from "./animated-title";
import { getAnimationSettings } from "@/lib/performance";
import { hash } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    {
        id: 1,
        title: "Discovery & Consultation",
        description: "We begin by understanding your vision, goals, and requirements through in-depth discussions.",
        longDescription: "Our team conducts comprehensive stakeholder interviews, analyzes existing systems, and documents every requirement to ensure nothing is missed.",
        icon: MessageSquare,
        color: "from-violet-500 to-fuchsia-500",
        bgColor: "violet",
        details: ["Stakeholder Interviews", "Requirement Gathering", "Goal Definition", "Timeline Planning"]
    },
    {
        id: 2,
        title: "Research & Strategy",
        description: "Market research, competitor analysis, and strategic planning for success.",
        longDescription: "We study your industry landscape, analyze competitors, identify opportunities, and create a comprehensive strategy that positions you for success.",
        icon: Search,
        color: "from-blue-500 to-cyan-500",
        bgColor: "blue",
        details: ["Market Analysis", "Competitor Research", "User Personas", "Strategy Blueprint"]
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Creating wireframes, prototypes, and stunning visual designs.",
        longDescription: "Our designers craft pixel-perfect interfaces with a focus on user experience, accessibility, and brand consistency across all touchpoints.",
        icon: Palette,
        color: "from-emerald-500 to-teal-500",
        bgColor: "emerald",
        details: ["Wireframing", "Prototyping", "Design System", "User Testing"]
    },
    {
        id: 4,
        title: "Development Phase",
        description: "Building your solution with clean, scalable code and modern practices.",
        longDescription: "Our engineers follow agile methodologies, write clean maintainable code, implement CI/CD pipelines, and ensure your application is built to scale.",
        icon: Code,
        color: "from-orange-500 to-amber-500",
        bgColor: "orange",
        details: ["Frontend Dev", "Backend API", "Database Design", "Integration"]
    },
    {
        id: 5,
        title: "Testing & QA",
        description: "Rigorous testing to ensure quality, performance, and security.",
        longDescription: "We perform comprehensive unit tests, integration tests, performance benchmarks, security audits, and user acceptance testing.",
        icon: TestTube,
        color: "from-rose-500 to-pink-500",
        bgColor: "rose",
        details: ["Unit Testing", "E2E Testing", "Security Audit", "Performance"]
    },
    {
        id: 6,
        title: "Launch & Deploy",
        description: "Smooth launch with zero downtime and optimized performance.",
        longDescription: "We handle cloud deployment, configure CDNs, set up monitoring dashboards, and ensure your application launches flawlessly to production.",
        icon: Rocket,
        color: "from-indigo-500 to-purple-500",
        bgColor: "indigo",
        details: ["Cloud Deploy", "CDN Setup", "Monitoring", "Go Live"]
    },
    {
        id: 7,
        title: "Support & Growth",
        description: "Ongoing maintenance, updates, and feature enhancements.",
        longDescription: "24/7 dedicated support, regular maintenance updates, security patches, and continuous improvements based on user feedback and analytics.",
        icon: Headphones,
        color: "from-pink-500 to-rose-500",
        bgColor: "pink",
        details: ["24/7 Support", "Maintenance", "Updates", "Scaling"]
    },
];

// Enhanced Step Card with 3D effects
const StepCard = memo(({
    step,
    index,
    isActive,
    onActivate,
    isDark
}: {
    step: typeof processSteps[0];
    index: number;
    isActive: boolean;
    onActivate: () => void;
    isDark: boolean;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const Icon = step.icon;
    const isLeft = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            className={`step-card w-full lg:w-[45%] ${isLeft ? 'lg:mr-auto' : 'lg:ml-auto'}`}
            data-index={index}
            onClick={onActivate}
        >
            <div
                className={cn(
                    "relative group cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500",
                    isActive
                        ? isDark
                            ? 'border-white/30 bg-gradient-to-br from-white/15 to-white/5 shadow-2xl scale-[1.02]'
                            : 'border-gray-300 bg-white shadow-2xl scale-[1.02]'
                        : isDark
                            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-white/20'
                            : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                )}
            >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />

                {/* Content */}
                <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        {/* Icon with pulse effect */}
                        <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-lg opacity-50 animate-pulse`} />
                            <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                                <Icon className="w-7 h-7 text-white" />
                            </div>
                        </div>

                        {/* Step number */}
                        <div className={`text-6xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-30`}>
                            {String(step.id).padStart(2, '0')}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                        "text-2xl font-bold mb-3",
                        isDark ? "text-white" : "text-gray-800"
                    )}>{step.title}</h3>

                    {/* Description */}
                    <p className={cn(
                        "text-sm leading-relaxed mb-4",
                        isDark ? "text-gray-400" : "text-gray-600"
                    )}>{step.description}</p>

                    {/* Expanded content */}
                    <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className={cn(
                            "text-sm leading-relaxed mb-6 border-t pt-4",
                            isDark ? "text-gray-300 border-white/10" : "text-gray-600 border-gray-200"
                        )}>
                            {step.longDescription}
                        </p>
                    </div>

                    {/* Details tags */}
                    <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                                    isActive
                                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                                        : isDark
                                            ? 'bg-white/5 border border-white/10 text-gray-300'
                                            : 'bg-gray-100 border border-gray-200 text-gray-600'
                                )}
                            >
                                <CheckCircle className="w-3 h-3" />
                                {detail}
                            </span>
                        ))}
                    </div>

                    {/* Expand indicator */}
                    <div className={cn(
                        "mt-4 flex items-center gap-2 text-sm transition-colors",
                        isActive
                            ? isDark ? 'text-white' : 'text-gray-800'
                            : isDark ? 'text-gray-500' : 'text-gray-400'
                    )}>
                        <Target className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                        <span>{isActive ? 'Click to collapse' : 'Click to expand'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

StepCard.displayName = "StepCard";

export const DevelopmentProcess = memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const animSettings = getAnimationSettings();
    const { isDark } = useTheme();

    useGSAP(() => {
        if (!animSettings.shouldAnimate) {
            gsap.set(".step-card", { opacity: 1, x: 0, y: 0 });
            gsap.set(".timeline-node", { scale: 1 });
            gsap.set(".timeline-progress", { scaleY: 1 });
            return;
        }

        const ctx = gsap.context(() => {
            // Title animation with split text effect
            gsap.fromTo("#process-badge",
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: "#process-badge",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Cards with staggered 3D entrance
            const cards = gsap.utils.toArray<HTMLElement>(".step-card");
            cards.forEach((card, i) => {
                const isLeft = i % 2 === 0;

                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: isLeft ? -100 : 100,
                        rotateY: isLeft ? -15 : 15,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

            // Timeline nodes with bounce
            gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node, i) => {
                gsap.fromTo(node,
                    { scale: 0, rotate: -180 },
                    {
                        scale: 1,
                        rotate: 0,
                        duration: 0.6,
                        ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: node,
                            start: "top 75%",
                            toggleActions: "play none none none"
                        },
                        delay: i * 0.1
                    }
                );
            });

            // Timeline progress bar
            gsap.fromTo(".timeline-progress",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 60%",
                        end: "bottom 40%",
                        scrub: 0.5
                    }
                }
            );

            // Connecting lines with draw effect
            gsap.utils.toArray<HTMLElement>(".connect-line").forEach((line) => {
                gsap.fromTo(line,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 75%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [animSettings.shouldAnimate]);

    const handleStepClick = (index: number) => {
        setActiveStep(activeStep === index ? null : index);
    };

    return (
        <section id="development-process" className={cn(
            "relative min-h-screen w-screen py-32 overflow-hidden",
            isDark ? "bg-black" : "bg-gray-50"
        )}>
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black"
                        : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/30 via-gray-50 to-gray-50"
                )} />
                {animSettings.enableBlur && (
                    <>
                        <div className={cn(
                            "absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse",
                            isDark ? "bg-violet-500/10" : "bg-violet-300/20"
                        )} style={{ animationDuration: '8s' }} />
                        <div className={cn(
                            "absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse",
                            isDark ? "bg-blue-500/10" : "bg-blue-300/20"
                        )} style={{ animationDuration: '10s' }} />
                    </>
                )}
            </div>

            {/* Grid pattern overlay */}
            <div className={cn(
                "absolute inset-0",
                isDark
                    ? "bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"
                    : "bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"
            )} />

            <div ref={containerRef} className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-24">
                    <div id="process-badge" className={cn(
                        "inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8",
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
                        )}>Our Development Process</span>
                        <Zap className="w-4 h-4 text-violet-400" />
                    </div>

                    <AnimatedTitle containerClass={cn(
                        "text-center",
                        isDark ? "!text-white" : "!text-gray-800"
                    )}>
                        {"How We B<b>u</b>ild Your Vis<b>i</b>on"}
                    </AnimatedTitle>

                    <p className={cn(
                        "max-w-3xl mx-auto mt-8 text-lg leading-relaxed",
                        isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                        A proven 7-step journey from concept to launch, designed to deliver
                        exceptional results on time and within budget
                    </p>
                </div>

                {/* Timeline Container */}
                <div ref={timelineRef} className="relative max-w-6xl mx-auto">
                    {/* Central Timeline - Desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
                        {/* Background line */}
                        <div className={cn(
                            "absolute inset-0 rounded-full",
                            isDark
                                ? "bg-gradient-to-b from-violet-500/20 via-blue-500/20 to-emerald-500/20"
                                : "bg-gradient-to-b from-violet-300/30 via-blue-300/30 to-emerald-300/30"
                        )} />
                        {/* Animated progress */}
                        <div className="timeline-progress absolute inset-0 bg-gradient-to-b from-violet-500 via-blue-500 to-emerald-500 rounded-full origin-top" style={{ transform: 'scaleY(0)' }} />
                    </div>

                    {/* Process Steps */}
                    <div className="space-y-16 lg:space-y-24">
                        {processSteps.map((step, index) => (
                            <div key={step.id} className="relative">
                                {/* Timeline Node - Desktop */}
                                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-20">
                                    <div className={`timeline-node relative`}>
                                        {/* Outer glow */}
                                        <div className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-full blur-md opacity-50`} />
                                        {/* Node */}
                                        <div className={cn(
                                            `relative w-12 h-12 rounded-full bg-gradient-to-br ${step.color} border-4 flex items-center justify-center shadow-xl`,
                                            isDark ? "border-black" : "border-white"
                                        )}>
                                            <step.icon className="w-5 h-5 text-white" />
                                        </div>
                                        {/* Pulse ring */}
                                        <div className={`absolute inset-0 rounded-full border-2 border-current animate-ping opacity-20`} style={{ color: step.bgColor === 'violet' ? '#8b5cf6' : step.bgColor === 'blue' ? '#3b82f6' : '#10b981' }} />
                                    </div>
                                </div>

                                {/* Connecting line to card */}
                                <div className={`connect-line hidden lg:block absolute top-12 h-0.5 w-[calc(50%-4rem)] bg-gradient-to-r ${step.color} opacity-30 ${index % 2 === 0 ? 'left-1/2 ml-8 origin-left' : 'right-1/2 mr-8 origin-right'
                                    }`} style={{ transform: 'scaleX(0)' }} />

                                {/* Step Card */}
                                <StepCard
                                    step={step}
                                    index={index}
                                    isActive={activeStep === index}
                                    onActivate={() => handleStepClick(index)}
                                    isDark={isDark}
                                />

                                {/* Mobile step indicator */}
                                <div className="lg:hidden flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                                        <step.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className={cn(
                                        "flex-1 h-0.5",
                                        isDark
                                            ? "bg-gradient-to-r from-white/20 to-transparent"
                                            : "bg-gradient-to-r from-gray-300 to-transparent"
                                    )} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-24">
                    <div className="inline-flex flex-col items-center gap-6">
                        <p className="text-gray-400 text-lg">Ready to start your project?</p>
                        <button
                        onClick={()=>hash("contact")}
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30">
                        <p className={isDark ? "text-gray-400 text-lg" : "text-gray-500 text-lg"}>
                            Ready to start your project with {COMPANY.name}?
                        </p>
                        </button>
                        <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30">
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative">Start Your Journey</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
});

DevelopmentProcess.displayName = "DevelopmentProcess";
