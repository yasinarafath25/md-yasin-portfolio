import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Code2, Cpu, Smartphone, Layout, Database, Cloud } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const AboutServicesSection: React.FC<AboutServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="about-services" className="relative w-full py-24 px-4 sm:px-8 lg:px-16 z-10 max-w-7xl mx-auto border-t border-[#E5E7EB]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Portrait Photo Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative group"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F97316]/20 via-amber-500/10 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition duration-500" />

          {/* Photo Container Card */}
          <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white shadow-xl shadow-slate-900/5">
            <img
              src="https://i.ibb.co/1tvbpPcw/Chat-GPT-Image-Jul-28-2026-01-37-35-AM.png"
              alt="Md Yasin - Lead Architect & Developer"
              referrerPolicy="no-referrer"
              className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover object-top filter contrast-105 saturate-110 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Soft Gradient Overlay at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />

            {/* Profile Info Badge Overlay */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#E5E7EB] shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#1F2937] font-mono tracking-wide">
                  Md Yasin
                </h3>
                <p className="text-[11px] font-mono text-[#F97316] font-semibold uppercase tracking-wider mt-0.5">
                  Founder & Full Stack Lead
                </p>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-semibold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content Column: What I Do & Services */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-mono uppercase tracking-[0.2em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
              {PERSONAL_INFO.aboutLabel}
            </motion.div>

            {/* About Body Copy */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2937] leading-snug sm:leading-tight tracking-tight whitespace-pre-line"
            >
              {PERSONAL_INFO.aboutBody}
            </motion.h2>
          </div>

          {/* List of Services */}
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316] font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
              <span>{PERSONAL_INFO.servicesLabel}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PERSONAL_INFO.servicesList.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectService && onSelectService(service)}
                  className="group p-3.5 rounded-xl bg-white hover:bg-[#F5F3EF] border border-[#E5E7EB] hover:border-[#F97316]/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#F5F3EF] border border-[#E5E7EB] flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all">
                      <span className="font-mono text-xs font-bold">•</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#374151] group-hover:text-[#1F2937] transition-colors">
                      {service}
                    </span>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#F97316] group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stat Accent Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4 pt-6 border-t border-[#E5E7EB]"
          >
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#F97316]/40 shadow-xs transition-all">
              <span className="font-pixel text-2xl sm:text-3xl text-[#F97316] block mb-1">100%</span>
              <span className="text-[11px] font-mono text-[#6B7280] uppercase tracking-wider">Client Satisfaction</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#F97316]/40 shadow-xs transition-all">
              <span className="font-pixel text-2xl sm:text-3xl text-[#F97316] block mb-1">24/7</span>
              <span className="text-[11px] font-mono text-[#6B7280] uppercase tracking-wider">Fast & Reliable Delivery</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
