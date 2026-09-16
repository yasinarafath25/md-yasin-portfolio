import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Sparkles, ArrowUpRight, Cpu, Layers, GitBranch, Rocket, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { usePortfolioStore } from '../lib/portfolioStore';
import { Idea } from '../types';

export const IdeasSection: React.FC = () => {
  const { ideas } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'In Development', 'MVP Ready', 'Concept', 'Prototype'];

  const filteredIdeas = ideas.filter((idea) => {
    if (activeFilter === 'All') return true;
    return idea.status === activeFilter;
  });

  if (!ideas || ideas.length === 0) return null;

  return (
    <section id="ideas-lab" className="relative w-full py-24 px-4 sm:px-8 lg:px-16 z-10 max-w-7xl mx-auto border-t border-[#E5E7EB]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Innovation Lab & Future Concepts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight">
            Upcoming Apps & Ideas
          </h2>
        </div>
        <p className="text-sm font-mono text-[#6B7280] max-w-md">
          A look into active experiments, proprietary MVPs, and automated digital products currently in architectural development.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {filters.map((fil) => (
          <button
            key={fil}
            onClick={() => setActiveFilter(fil)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              activeFilter === fil
                ? 'bg-[#1F2937] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F5F3EF]'
            }`}
          >
            {fil}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea, idx) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative rounded-2xl bg-white border border-[#E5E7EB] hover:border-amber-500/40 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
          >
            <div>
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono text-amber-600 font-semibold uppercase tracking-wider">
                  {idea.category}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    idea.status === 'MVP Ready'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : idea.status === 'In Development'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {idea.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#1F2937] font-mono group-hover:text-amber-600 transition-colors mb-2">
                {idea.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                {idea.description}
              </p>

              {/* Architectural Notes */}
              {idea.notes && (
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-[11px] font-mono text-[#4B5563] mb-4">
                  <span className="text-amber-600 font-bold">Architecture: </span>
                  {idea.notes}
                </div>
              )}
            </div>

            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F3F4F6] items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {idea.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#4B5563] text-[10px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {idea.targetYear && (
                  <span className="text-[10px] font-mono text-[#9CA3AF]">
                    Launch {idea.targetYear}
                  </span>
                )}
              </div>

              {idea.demoUrl && (
                <a
                  href={idea.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-mono font-semibold transition"
                >
                  <span>Explore Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
