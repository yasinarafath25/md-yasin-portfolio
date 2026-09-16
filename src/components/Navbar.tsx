import React from 'react';
import { Volume2, VolumeX, Menu, Sparkles, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenMenu: () => void;
  onOpenSchedule: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onOpenMenu,
  onOpenSchedule,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between backdrop-blur-md bg-[#FAF8F5]/85 border-b border-[#E5E7EB] shadow-xs transition-all duration-300">
      {/* Brand & Logo */}
      <a href="#" className="flex items-center gap-3 group">
        {/* Custom Monogram Logo */}
        <div className="w-9 h-9 rounded-lg bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300 shadow-sm font-pixel text-xs font-bold tracking-wider shrink-0">
          MY
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xs font-semibold tracking-[0.2em] mb-0.5 text-[#1F2937]">
            {PERSONAL_INFO.nameLine1}
          </span>
          <span className="font-pixel text-base sm:text-lg tracking-wider text-[#F97316] font-bold group-hover:text-[#1F2937] transition-colors">
            {PERSONAL_INFO.nameLine2Pixel}
          </span>
        </div>
      </a>

      {/* Nav links matching design theme */}
      <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[#6B7280]">
        <a href="#about-services" className="hover:text-[#1F2937] transition-colors">What I Do</a>
        <a href="#about-services" className="hover:text-[#1F2937] transition-colors">Services</a>
        <a href="#projects" className="hover:text-[#1F2937] transition-colors">Projects</a>
        <a href="#ideas-lab" className="hover:text-[#F97316] transition-colors font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Ideas Lab</span>
        </a>
        <a href="#skills" className="hover:text-[#1F2937] transition-colors">Skills</a>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Audio Toggle */}
        <button
          onClick={onToggleMusic}
          className={`p-2.5 rounded-full border transition-all duration-200 text-xs flex items-center gap-2 ${
            isMusicPlaying 
              ? 'bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316] font-semibold' 
              : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB]'
          }`}
          title={isMusicPlaying ? "Mute Music" : "Play Music"}
          aria-label="Toggle Music"
        >
          <Volume2 className={`w-4 h-4 ${isMusicPlaying ? 'animate-pulse text-[#F97316]' : ''}`} />
          <span className="hidden xl:inline text-[10px] font-mono uppercase tracking-widest">
            {isMusicPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
          </span>
        </button>

        {/* Schedule Call Quick CTA */}
        <button
          onClick={onOpenSchedule}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2937] text-white hover:bg-[#F97316] font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
        >
          <span>Schedule Call</span>
          <div className="w-2 h-2 rounded-full bg-[#F97316]"></div>
        </button>

        {/* Menu Drawer Toggle */}
        <button
          onClick={onOpenMenu}
          className="p-2.5 rounded-full bg-white hover:bg-[#F5F3EF] border border-[#E5E7EB] text-[#1F2937] shadow-xs transition-all duration-200"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
