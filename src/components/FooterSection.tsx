import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Calendar, Github, Linkedin, Mail, Twitter, Globe, Heart, Lock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterSectionProps {
  onOpenSchedule: () => void;
  onOpenAdmin?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenSchedule, onOpenAdmin }) => {
  return (
    <footer className="relative w-full py-20 px-4 sm:px-8 lg:px-16 z-10 max-w-7xl mx-auto border-t border-[#E5E7EB]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Availability Column */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-mono uppercase tracking-[0.2em] mb-6 self-start">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping"></span>
            <span>Status: Active</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F2937] leading-tight tracking-tight whitespace-pre-line mb-8">
            {PERSONAL_INFO.footerAvailability}
          </h3>

          {/* Schedule A Call Link / Button */}
          <div>
            <button
              onClick={onOpenSchedule}
              className="group inline-flex items-center gap-4 bg-[#1F2937] border border-transparent px-8 py-4 rounded-full text-white hover:bg-[#F97316] font-extrabold text-base transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
            >
              <Calendar className="w-5 h-5 text-[#F97316] group-hover:text-white" />
              <span className="font-mono tracking-wider uppercase">
                {PERSONAL_INFO.footerScheduleLink}
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] group-hover:bg-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Quick Contacts & Social Links Column */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-12">
          {/* Direct Email */}
          <div>
            <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest block mb-3 font-semibold">
              Direct Contact
            </span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-lg font-bold text-[#1F2937] hover:text-[#F97316] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#F97316]" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
            <p className="text-xs text-[#6B7280] mt-2 font-mono">
              Inquiries & Project Requests
            </p>
          </div>

          {/* Social Platforms */}
          <div>
            <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest block mb-3 font-semibold">
              Connect
            </span>
            <div className="flex flex-col space-y-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#4B5563] hover:text-[#F97316] transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#4B5563] hover:text-[#F97316] transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-[#F97316]" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </a>
              <a
                href={PERSONAL_INFO.blogUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#4B5563] hover:text-[#F97316] transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-[#F97316]" />
                <span>My Blog</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#4B5563] hover:text-[#F97316] transition-colors flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter / X</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Archive Text Banner */}
      <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-[#F97316]" />
          <span className="font-pixel text-xs sm:text-sm text-[#374151] tracking-wider">
            {PERSONAL_INFO.footerArchiveText}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-[#9CA3AF]">
          <span>© {new Date().getFullYear()} Md Yasin • Yasin Studio. All rights reserved.</span>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#9CA3AF] hover:text-[#F97316] transition-colors py-1 px-2 rounded hover:bg-[#F3F4F6]"
              title="Admin Control Panel"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
