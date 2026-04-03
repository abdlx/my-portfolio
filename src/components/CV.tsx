"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";

export function CV() {
  return (
    <section id="cv" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs font-mono mb-4"
            >
              <FileText size={14} className="text-emerald-500" />
              <span>Curriculum Vitae</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              My <span className="text-emerald-500">Trajectory</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-400 text-lg leading-relaxed font-mono"
            >
              A snapshot of my professional experience, skills, and the 
              engineering milestones that define my journey.
            </motion.p>
          </div>

        </div>

        {/* CV Display Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative w-full aspect-[1/1.414] md:aspect-auto md:h-[1000px] rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl overflow-hidden group shadow-2xl shadow-emerald-500/5"
        >
          {/* Decorative Window Header */}
          <div className="absolute top-0 left-0 w-full h-12 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between px-6 z-20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2 text-neutral-500 text-xs font-mono flex items-center gap-2">
              <FileText size={12} />
              abdullah-cv.html
            </div>

            <a 
              href="/abdullah-cv/index.html" 
              target="_blank"
              className="text-neutral-500 hover:text-emerald-500 transition-colors flex items-center gap-1.5 text-[10px] font-mono group/btn"
              title="Open full view"
            >
              <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity uppercase tracking-widest hidden sm:inline">Full View</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Iframe for Content */}
          <div className="w-full h-full pt-12 overflow-hidden bg-white">
            <iframe 
              src="/abdullah-cv/index.html" 
              title="Abdullah CV"
              className="w-full h-full border-none"
              loading="lazy"
            />
          </div>

          {/* Overlay gradient for bottom-to-top transition */}
          <div className="absolute bottom-half left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Mobile Info */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-6 text-center text-neutral-500 text-xs font-mono md:hidden"
        >
          Scroll inside the frame to view details
        </motion.p>
      </div>
    </section>
  );
}
