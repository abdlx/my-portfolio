"use client";
import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
    {
        quote: "The sales agent is absolutely fantastic. Very professional work and exceeded our expectations. Highly satisfied!",
        name: "Mirza Amin Baig",
        designation: "CEO, ASAS Forge",
        src: "/testimonials/amin.png"
    },
    {
        quote: "Yaar 3 weeks mai pura MVP bana diya, AI integration bhi bilkul smooth chal raha hai. Worth every penny bhai 💯",
        name: "Fahad",
        designation: "Co-Founder, Fulfix",
        src: "/testimonials/fahad.png"
    },
    {
        quote: "Mashallah bohot detailed kaam kia hai. Har cheez explain karte gaye setup k time. Would definitely recommend to others 👍",
        name: "Anas Naeem",
        designation: "Manager, NASLW",
        src: "/testimonials/anas.png"
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
