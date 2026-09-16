import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Calendar, Github, Linkedin, Mail, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSchedule: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenSchedule,
}) => {
  if (!isOpen) return null;

  const scrollTo = (id: string) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-sm h-full bg-[#FAF8F5] border-l border-[#E5E7EB] p-6 flex flex-col justify-between overflow-y-auto text-[#1F2937]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
            <span className="font-pixel text-sm text-[#F97316] tracking-widest font-bold">
              YASIN STUDIO
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F5F3EF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-8 space-y-6">
            <button
              onClick={() => scrollTo('about-services')}
              className="block w-full text-left text-2xl font-black text-[#1F2937] hover:text-[#F97316] transition-colors"
            >
              01. What I Do
            </button>
            <button
              onClick={() => scrollTo('about-services')}
              className="block w-full text-left text-2xl font-black text-[#1F2937] hover:text-[#F97316] transition-colors"
            >
              02. Services
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="block w-full text-left text-2xl font-black text-[#1F2937] hover:text-[#F97316] transition-colors"
            >
              03. Works & Projects
            </button>
            <button
              onClick={() => scrollTo('ideas-lab')}
              className="block w-full text-left text-2xl font-black text-[#1F2937] hover:text-[#F97316] transition-colors"
            >
              04. Ideas & Innovation Lab
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className="block w-full text-left text-2xl font-black text-[#1F2937] hover:text-[#F97316] transition-colors"
            >
              05. Tech Stack & Skills
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#E5E7EB] space-y-4">
            <button
              onClick={() => {
                onClose();
                onOpenSchedule();
              }}
              className="w-full py-3.5 rounded-full bg-[#1F2937] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#F97316] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Call</span>
            </button>

            <div className="text-center pt-2 flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-widest block font-semibold">
                Direct Contact
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xs font-mono font-bold text-[#F97316] hover:underline"
              >
                {PERSONAL_INFO.email}
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#F97316] mt-1 font-mono"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#F97316]" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 text-[#9CA3AF]" />
              </a>
              <a
                href={PERSONAL_INFO.blogUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#F97316] mt-1 font-mono"
              >
                <Globe className="w-3.5 h-3.5 text-[#F97316]" />
                <span>My Blog</span>
                <ArrowUpRight className="w-3.5 h-3 text-[#9CA3AF]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
