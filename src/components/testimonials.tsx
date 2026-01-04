import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, memo, useState, useCallback } from "react";
import { Star, Quote, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";

import { AnimatedTitle } from "./animated-title";
import { getAnimationSettings } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn, hash } from "@/lib/utils";
import { COMPANY } from "@/constants";
import DURAI from "../client/DuraiPandiyan.jpeg"
import REKESH from "../client/RekeshKumar.jpeg"
import RAMESH from "../client/Ramesh.G.jpg"
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        name: "Durai Pandiyan",
        position: "Manager",
        company: "ATHER SHOWROOM",
        image: DURAI,
        rating: 5,
        text: "Working with this development team was an absolute game-changer for our business. They delivered a stunning Customer Service platform that exceeded all our expectations. The attention to detail and commitment to quality is unmatched.Customer Service is very important in EV Market 4DK helped us to do it in a Smarter Way Now we are Ahead of the competitors",
        highlight: "Revenue increased by 40%",
        gradient: "from-violet-500 to-fuchsia-500",
        bgGlow: "violet"
    },
    {
        id: 2,
        name: "Rekesh Kumar",
        position: "CTO",
        company: "GTK Construction",
        image: REKESH,
        rating: 5,
        text: "The mobile app they developed for us has revolutionized how our customers interact with our services. The user experience is seamless and the performance is outstanding. Highly recommend their services!",
        highlight: "Good User Experience",
        gradient: "from-blue-500 to-cyan-500",
        bgGlow: "blue"
    },
    {
        id: 3,
        name: "Ramesh Namasivayam",
        position: "Director",
        company: "LOP CLINIC",
        image: RAMESH,
        rating: 5,
        text: "Their expertise in healthcare technology is remarkable. They built a comprehensive patient management system that has streamlined our operations and improved patient satisfaction significantly.",
        highlight: "40% efficiency boost",
        gradient: "from-emerald-500 to-teal-500",
        bgGlow: "emerald"
    }
];

// Animated star rating with stagger
const StarRating = memo(({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`star-icon w-5 h-5 transition-all duration-300 ${index < rating
                    ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                    : "text-gray-600"
                    }`}
                style={{ animationDelay: `${index * 0.1}s` }}
            />
        ))}
    </div>
));

StarRating.displayName = "StarRating";

// Enhanced testimonial card with 3D hover effects
const TestimonialCard = memo(({
    testimonial,
    index,
    isActive,
    isDark
}: {
    testimonial: typeof testimonials[0];
    index: number;
    isActive: boolean;
    isDark: boolean;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            className={cn(
                "testimonial-card group relative overflow-hidden rounded-3xl border transition-all duration-500",
                isActive
                    ? 'border-white/30 bg-gradient-to-br from-white/15 to-white/5 scale-105 shadow-2xl z-10'
                    : isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-white/20'
                        : 'border-gray-200 bg-white/90 hover:border-gray-300 shadow-sm'
            )}
            style={{ opacity: 0, transform: 'translateY(60px) rotateX(10deg)' }}
            data-index={index}
        >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${isActive ? 'opacity-30' : ''}`} />

            {/* Top accent line with animation */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>

            {/* Quote watermark */}
            <div className={isDark ? "absolute top-6 right-6 text-white/5" : "absolute top-6 right-6 text-gray-100"}>
                <Quote className="w-20 h-20 fill-current" />
            </div>

            <div className="relative p-8">
                {/* Header with avatar */}
                <div className="flex items-center gap-5 mb-6">
                    {/* Avatar with ring */}
                    <div className="relative">
                        <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-full blur opacity-75`} />
                        <div className={cn(
                            "relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-offset-2",
                            isDark ? "ring-offset-black ring-white/20" : "ring-offset-white ring-gray-200"
                        )}>
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        {/* Online indicator */}
                        <div className={cn(
                            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 flex items-center justify-center",
                            isDark ? "border-black" : "border-white"
                        )}>
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className={cn(
                            "text-lg font-bold",
                            isDark ? "text-white" : "text-gray-800"
                        )}>{testimonial.name}</h4>
                        <p className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-500"}>{testimonial.position}</p>
                        <p className={`text-sm font-medium bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                            {testimonial.company}
                        </p>
                    </div>
                </div>

                {/* Rating with animation */}
                <div className="mb-5">
                    <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial text */}
                <p className={cn(
                    "leading-relaxed text-sm mb-6",
                    isDark ? "text-gray-300" : "text-gray-600"
                )}>
                    "{testimonial.text}"
                </p>

                {/* Highlight badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} shadow-lg`}>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">{testimonial.highlight}</span>
                </div>
            </div>
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

// Featured testimonial (large showcase)
const FeaturedTestimonial = memo(({ testimonial, isDark }: { testimonial: typeof testimonials[0]; isDark: boolean }) => (
    <div className={cn(
        "featured-testimonial relative overflow-hidden rounded-3xl border backdrop-blur-sm",
        isDark
            ? "border-white/20 bg-gradient-to-br from-white/10 to-white/5"
            : "border-gray-200 bg-white/90 shadow-xl"
    )}>
        {/* Background elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${testimonial.gradient} rounded-full blur-3xl opacity-20`} />
        <div className={cn(
            "absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl",
            isDark ? "bg-blue-500/20" : "bg-blue-300/30"
        )} />

        {/* Top accent */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${testimonial.gradient}`} />

        <div className="relative p-10 md:p-14">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
                {/* Left: Avatar and info */}
                <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/3">
                    {/* Large avatar */}
                    <div className="relative">
                        <div className={`absolute -inset-3 bg-gradient-to-r ${testimonial.gradient} rounded-full blur-lg opacity-50 animate-pulse`} />
                        <div className={cn(
                            "relative w-32 h-32 rounded-full overflow-hidden ring-4",
                            isDark ? "ring-white/20" : "ring-gray-200"
                        )}>
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h3 className={cn(
                            "text-2xl font-bold mb-1",
                            isDark ? "text-white" : "text-gray-800"
                        )}>{testimonial.name}</h3>
                        <p className={isDark ? "text-gray-400" : "text-gray-500"}>{testimonial.position}</p>
                        <p className={`font-semibold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                            {testimonial.company}
                        </p>
                    </div>

                    <StarRating rating={testimonial.rating} />

                    {/* Play video button */}
                    <button className={`flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white font-semibold transition-all hover:shadow-lg hover:scale-105`}>
                        <Play className="w-5 h-5" />
                        Watch Story
                    </button>
                </div>

                {/* Right: Quote */}
                <div className="lg:w-2/3">
                    <Quote className={`w-16 h-16 mb-6 opacity-50 fill-current bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`} />
                    <p className={cn(
                        "text-xl md:text-2xl leading-relaxed mb-8",
                        isDark ? "text-white" : "text-gray-800"
                    )}>
                        "{testimonial.text}"
                    </p>

                    {/* Highlight stat */}
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${testimonial.gradient} shadow-xl`}>
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-lg font-bold text-white">{testimonial.highlight}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

FeaturedTestimonial.displayName = "FeaturedTestimonial";

export const Testimonials = memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const animSettings = getAnimationSettings();
    const { isDark } = useTheme();

    const nextFeatured = useCallback(() => {
        setFeaturedIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevFeatured = useCallback(() => {
        setFeaturedIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useGSAP(() => {
        if (!animSettings.shouldAnimate) {
            gsap.set(".testimonial-card, .featured-testimonial", { opacity: 1, y: 0, rotateX: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            // Section badge animation
            gsap.fromTo("#testimonials-badge",
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: "#testimonials-badge",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Featured testimonial entrance
            gsap.fromTo(".featured-testimonial",
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".featured-testimonial",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Grid cards with 3D stagger
            gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    delay: (i % 3) * 0.15
                });

                // Hover 3D tilt effect
                if (animSettings.enableHoverEffects) {
                    card.addEventListener("mouseenter", () => {
                        gsap.to(card, {
                            scale: 1.03,
                            rotateY: 2,
                            rotateX: -2,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                    card.addEventListener("mouseleave", () => {
                        gsap.to(card, {
                            scale: 1,
                            rotateY: 0,
                            rotateX: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                }
            });
        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [animSettings.shouldAnimate, animSettings.enableHoverEffects]);

    return (
        <section id="testimonials" className={cn(
            "relative min-h-screen w-screen py-32 overflow-hidden",
            isDark ? "bg-black" : "bg-gray-50"
        )}>
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-gradient-to-b from-black via-gray-900/50 to-black"
                        : "bg-gradient-to-b from-gray-50 via-white/50 to-gray-50"
                )} />
                {animSettings.enableBlur && (
                    <>
                        <div className={cn(
                            "absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse",
                            isDark ? "bg-violet-500/10" : "bg-violet-300/20"
                        )} style={{ animationDuration: '8s' }} />
                        <div className={cn(
                            "absolute bottom-40 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse",
                            isDark ? "bg-blue-500/10" : "bg-blue-300/20"
                        )} style={{ animationDuration: '10s' }} />
                    </>
                )}
            </div>

            {/* Grid pattern */}
            <div className={cn(
                "absolute inset-0",
                isDark
                    ? "bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]"
                    : "bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"
            )} />

            <div ref={containerRef} className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-20">
                    <div id="testimonials-badge" className={cn(
                        "inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8",
                        isDark
                            ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
                            : "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200"
                    )}>
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span className={cn(
                            "text-sm font-semibold",
                            isDark ? "text-white" : "text-gray-800"
                        )}>Client Success Stories</span>
                    </div>

                    <AnimatedTitle containerClass={cn(
                        "text-center",
                        isDark ? "!text-white" : "!text-gray-800"
                    )}>
                        {"What Our Cl<b>i</b>ents S<b>a</b>y"}
                    </AnimatedTitle>

                    <p className={cn(
                        "max-w-2xl mx-auto mt-8 text-lg leading-relaxed",
                        isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                        Don't just take our word for it. Here's what industry leaders say about working with {COMPANY.name}.
                    </p>
                </div>

                {/* Featured Testimonial */}
                <div className="mb-20">
                    <FeaturedTestimonial testimonial={testimonials[featuredIndex]} isDark={isDark} />

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={prevFeatured}
                            className={cn(
                                "p-3 rounded-full border transition-colors",
                                isDark
                                    ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setFeaturedIndex(i)}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300",
                                        featuredIndex === i
                                            ? isDark ? 'bg-white w-8' : 'bg-gray-800 w-8'
                                            : isDark ? 'bg-white/30 hover:bg-white/50 w-2' : 'bg-gray-300 hover:bg-gray-400 w-2'
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextFeatured}
                            className={cn(
                                "p-3 rounded-full border transition-colors",
                                isDark
                                    ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                            isActive={false}
                            isDark={isDark}
                        />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-20">
                    <div className="inline-flex flex-col items-center gap-6">
                        <p className={isDark ? "text-gray-400 text-lg" : "text-gray-500 text-lg"}>
                            Ready to become our next success story?
                        </p>
                        <button 
                        onClick={()=>hash("contact")}
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative">Start Your Project Today</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
});

Testimonials.displayName = "Testimonials";
