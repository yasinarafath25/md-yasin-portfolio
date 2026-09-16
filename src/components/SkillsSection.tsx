import React from 'react';
import { Cpu } from 'lucide-react';
import { GlobeSolarSystem } from './GlobeSolarSystem';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative w-full py-24 px-4 sm:px-8 lg:px-16 z-10 max-w-7xl mx-auto border-t border-[#E5E7EB]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Tech Stack & Solar System Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight">
            Skills & Core Capabilities
          </h2>
        </div>
        <p className="text-sm font-mono text-[#6B7280] max-w-md">
          Interactive 3D solar system featuring a rotating world globe at the core, surrounded by orbiting skill rings across frontend, mobile, backend, cloud & AI capabilities.
        </p>
      </div>

      {/* 3D Solar System & World Globe Visualization */}
      <GlobeSolarSystem />
    </section>
  );
};
