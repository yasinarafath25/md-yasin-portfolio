import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowDown, Award, Cpu, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenShowreel: () => void;
  onScrollDown: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenShowreel,
  onScrollDown,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 lg:px-16 z-10 max-w-7xl mx-auto">
      {/* Top Header Branding Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-b border-[#E5E7EB] pb-8">
        {/* Name & Avatar Column */}
        <div className="md:col-span-4 flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group shrink-0"
          >
            <div className="absolute -inset-1 bg-[#F97316]/20 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition" />
            <img
              src="https://i.ibb.co/1tvbpPcw/Chat-GPT-Image-Jul-28-2026-01-37-35-AM.png"
              alt="Md Yasin"
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#E5E7EB] shadow-md object-top"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1F2937] leading-none">
              {PERSONAL_INFO.nameLine1}
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl text-[#F97316] tracking-wider leading-none mt-1">
              {PERSONAL_INFO.nameLine2Pixel}
            </span>
          </motion.div>
        </div>

        {/* Brand Blurb Column (font-pixel) */}
        <div className="md:col-span-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs"
          >
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed whitespace-pre-line tracking-wide">
              {PERSONAL_INFO.brandBlurb}
            </p>
          </motion.div>
        </div>

        {/* Second Heading Column */}
        <div className="md:col-span-4 md:text-right flex flex-col md:items-end justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col items-start md:items-end"
          >
            <div className="inline-block px-3.5 py-1.5 border border-[#E5E7EB] rounded-full text-[11px] uppercase tracking-widest bg-white text-[#4B5563] shadow-xs">
              {PERSONAL_INFO.secondHeadingLine1}{' '}
              <span className="text-[#F97316] font-semibold ml-1.5">
                {PERSONAL_INFO.secondHeadingLine2Pixel}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Big Hero Typography */}
      <div className="my-12 sm:my-16 lg:my-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col tracking-[-0.04em] uppercase leading-[0.85] font-extrabold select-none"
        >
          {/* Line 1: I BUILD */}
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[94px] text-[#1F2937] font-extrabold">
            {PERSONAL_INFO.heroHeading.line1}
          </div>

          {/* Line 2: MODERN (basis33 font-pixel with #F97316 accent) */}
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[94px] text-[#F97316] tracking-tighter my-1 sm:my-2 italic">
            {PERSONAL_INFO.heroHeading.line2Pixel}
          </div>

          {/* Line 3: WEB & MOBILE */}
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[94px] text-[#111827] font-extrabold">
            {PERSONAL_INFO.heroHeading.line3}
          </div>

          {/* Line 4: EXPERIENCES (basis33 font-pixel with #F97316 accent) */}
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[94px] text-[#F97316] tracking-tighter my-1 sm:my-2 italic">
            {PERSONAL_INFO.heroHeading.line4Pixel}
          </div>
        </motion.div>
      </div>

      {/* Bottom Action Row & Award Chips */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pt-6 border-t border-[#E5E7EB]">
        {/* VIEW MY WORK Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={onOpenShowreel}
            className="group relative inline-flex items-center gap-4 bg-[#1F2937] text-white px-8 py-4 rounded-full hover:bg-[#F97316] transition-all duration-300 shadow-lg shadow-slate-900/10 hover:scale-105 active:scale-95"
          >
            <span className="text-sm font-semibold uppercase tracking-widest font-mono">
              {PERSONAL_INFO.showreelBtnText}
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] group-hover:bg-white transition-colors"></div>
          </button>

          {/* Scroll Down Indicator */}
          <button
            onClick={onScrollDown}
            className="p-3.5 rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB] shadow-xs transition-all duration-200"
            aria-label="Scroll to Content"
          >
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>

        {/* Floating Award Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-mono text-[#4B5563] flex items-center gap-2 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#F97316]" />
            <span>10+ Projects Done</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-mono text-[#4B5563] flex items-center gap-2 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Scalable Web & Mobile</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-mono text-[#4B5563] flex items-center gap-2 shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Full Stack & Flutter</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
