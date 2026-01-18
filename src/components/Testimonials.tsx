"use client";
import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
    {
        quote: "Built our entire SaaS MVP in 2 weeks. The AI integration is seamless.",
        name: "Sarah Chen",
        designation: "Founder, TechStart",
        src: "/testimonials/sarah.png"
    },
    {
        quote: "The latency on our pipeline dropped by 40%. Abdullah understands hardware as well as software.",
        name: "Marcus Thorne",
        designation: "CTO, LogisticsCo",
        src: "/testimonials/marcus.png"
    },
    {
        quote: "Incredible attention to detail. Our internal tools feel like a premium consumer product.",
        name: "Elena Rodriguez",
        designation: "Product Lead, InnovateAI",
        src: "/testimonials/elena.png"
    },
    {
        quote: "Efficient, communicative, and technically brilliant. A rare hybrid engineer.",
        name: "David Park",
        designation: "Founder, ScaleUp",
        src: "/testimonials/david.png"
    }
];

export function Testimonials() {
    return (
        <section className="py-32 bg-black">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-4">
                        Verified <span className="text-indigo-500">Deployments</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Trusted by industry leaders to deliver mission-critical software
                    </p>
                </div>

                <AnimatedTestimonials
                    testimonials={testimonials}
                    autoplay={true}
                />
            </div>
        </section>
    );
}
