import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, Layers, Filter, Calculator, ShoppingBag, UserCheck, MessageSquare, ShoppingCart, Cloud } from 'lucide-react';
import { usePortfolioStore } from '../lib/portfolioStore';
import { Project } from '../types';

const iconMap: { [key: string]: React.ElementType } = {
  Calculator,
  ShoppingBag,
  UserCheck,
  MessageSquare,
  ShoppingCart,
  Cloud,
};

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { projects } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'Mobile', 'Automation & Cloud', 'E-Commerce'];

  const filteredProjects = projects.filter((proj) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Full Stack' && proj.category.includes('Full Stack')) return true;
    if (activeFilter === 'Mobile' && (proj.category.includes('Mobile') || proj.tags?.includes('Flutter'))) return true;
    if (activeFilter === 'Automation & Cloud' && (proj.category.includes('Automation') || proj.category.includes('SaaS') || proj.tags?.includes('Automation') || proj.tags?.includes('System Integration'))) return true;
    if (activeFilter === 'E-Commerce' && proj.category.includes('E-Commerce')) return true;
    return false;
  });

  return (
    <section id="projects" className="relative w-full py-24 px-4 sm:px-8 lg:px-16 z-10 max-w-7xl mx-auto border-t border-[#E5E7EB]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Featured Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight">
            Selected Works
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-[#1F2937] text-white font-bold shadow-sm'
                  : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F5F3EF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onSelectProject(project)}
            className="group relative rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#F97316]/50 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-900/8 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Media Preview Container */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#F5F3EF]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : project.iconName ? (
                <div className="w-full h-full flex items-center justify-center bg-[#F5F3EF] group-hover:scale-105 transition-transform duration-700">
                  {React.createElement(iconMap[project.iconName], { className: "w-24 h-24 text-[#F97316]/30" })}
                </div>
              ) : null}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />

              {/* Year & Category Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-[10px] font-mono font-semibold text-[#374151] uppercase tracking-wider shadow-xs">
                  {project.year}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#F97316] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                  {project.category}
                </span>
              </div>

              {/* Hover View Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/20 backdrop-blur-xs">
                <span className="px-5 py-2.5 rounded-full bg-[#1F2937] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Bottom Details Content */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-extrabold text-[#1F2937] group-hover:text-[#F97316] transition-colors mb-2 flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#F97316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs font-mono text-[#F97316] mb-3 font-semibold uppercase tracking-wider">
                  {project.subtitle}
                </p>
                <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-[#F5F3EF] border border-[#E5E7EB] text-[10px] font-mono text-[#4B5563]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
