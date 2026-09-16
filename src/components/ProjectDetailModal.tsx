import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-[#E5E7EB] shadow-2xl text-[#1F2937] overflow-hidden"
        >
          {/* Modal Sticky Header with Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FAF8F5] shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#F97316] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#6B7280]">
                {project.year}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white hover:bg-[#E5E7EB] text-[#4B5563] transition-colors border border-[#E5E7EB] shadow-xs flex items-center justify-center"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight mb-1">
                {project.title}
              </h2>
              <p className="text-xs font-mono text-[#F97316] font-semibold uppercase tracking-wider">
                {project.subtitle}
              </p>
            </div>

            {/* Hero Banner Image */}
            {project.image && (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#F5F3EF] border border-[#E5E7EB]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest font-semibold">
                Project Architecture & Features
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] flex items-center justify-between">
                <span className="text-xs font-mono text-[#6B7280] uppercase">Highlights</span>
                <span className="text-xs font-mono font-bold text-[#F97316]">{project.metrics}</span>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest mb-3 font-semibold">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[#F5F3EF] border border-[#E5E7EB] text-xs font-mono text-[#374151]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E7EB]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#1F2937] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#F97316] transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#FAF8F5] border border-[#E5E7EB] text-[#1F2937] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#F5F3EF] transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Repository</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

