import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../lib/portfolioStore';
import { Project } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Calculator, 
  ShoppingBag, 
  UserCheck, 
  MessageSquare, 
  ShoppingCart, 
  Cloud,
  Layers,
  Sparkles
} from 'lucide-react';

interface ProjectSlideshowProps {
  onSelectProject?: (project: Project) => void;
}

const getProjectIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Calculator': return <Calculator className="w-5 h-5 text-[#F97316]" />;
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-[#F97316]" />;
    case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#F97316]" />;
    case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#F97316]" />;
    case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-[#F97316]" />;
    case 'Cloud': return <Cloud className="w-5 h-5 text-[#F97316]" />;
    default: return <Layers className="w-5 h-5 text-[#F97316]" />;
  }
};

export const ProjectSlideshow: React.FC<ProjectSlideshowProps> = ({ onSelectProject }) => {
  const { projects } = usePortfolioStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeProjects = projects.length > 0 ? projects : [];

  useEffect(() => {
    if (isPaused || activeProjects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeProjects.length);
    }, 4000); // Change selected project every 4 seconds
    return () => clearInterval(interval);
  }, [isPaused, activeProjects.length]);

  const project = activeProjects[currentIndex] || activeProjects[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + activeProjects.length) % activeProjects.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % activeProjects.length);
  };

  if (!project) return null;

  return (
    <div 
      className="relative w-full bg-white border border-[#E5E7EB] shadow-lg rounded-2xl p-5 sm:p-6 transition-all duration-300 group hover:border-[#F97316]/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Label */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F3F4F6]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4B5563]">
            Featured Selected Work ({currentIndex + 1}/{PROJECTS_LIST.length})
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F97316]/10 text-[#F97316] font-semibold">
          Auto-Scrolling
        </span>
      </div>

      {/* App Logo & Image Banner Section */}
      <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#E5E7EB] mb-4 flex items-center justify-center p-3">
        {project.image ? (
          project.id === 'hishabika' ? (
            /* Dedicated logo showcase for Hishabika */
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-sm w-full h-full">
              <img 
                src={project.image} 
                alt={`${project.title} Logo`} 
                className="max-h-20 sm:max-h-24 object-contain filter drop-shadow-md mb-2"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-mono text-[#F97316] font-bold">App Logo</span>
            </div>
          ) : (
            /* Image banner with overlay app logo badge */
            <div className="relative w-full h-full rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-3.5">
                <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/40 shadow-md">
                  <div className="p-1 rounded bg-[#F97316]/10">
                    {getProjectIcon(project.iconName)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F2937] leading-none">{project.title}</h4>
                    <span className="text-[9px] font-mono text-[#F97316] uppercase font-semibold">{project.year} • {project.category}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          /* Fallback styled App Logo badge */
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center shadow-xs mb-2">
              {getProjectIcon(project.iconName)}
            </div>
            <h4 className="text-sm font-bold text-[#1F2937]">{project.title}</h4>
            <span className="text-[10px] font-mono text-[#F97316] font-semibold uppercase">{project.category}</span>
          </div>
        )}
      </div>

      {/* Project Info & Description */}
      <div className="text-left space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-[#1F2937] group-hover:text-[#F97316] transition-colors">
            {project.title}
          </h3>
          <span className="text-[10px] font-mono font-bold text-[#F97316] uppercase tracking-wider bg-[#F97316]/10 px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        <p className="text-xs font-semibold text-[#4B5563] line-clamp-1">
          {project.subtitle}
        </p>

        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Core Tech Stack / Skill Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E5E7EB] text-[10px] font-mono text-[#374151] font-medium">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#9CA3AF]">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action & Slide Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
        {/* Navigation Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {PROJECTS_LIST.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#F97316] w-6' 
                  : 'bg-[#E5E7EB] w-2 hover:bg-[#D1D5DB]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Controls & View Details */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev}
            className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#F97316] hover:bg-[#F97316] hover:text-white transition-all text-[#4B5563]"
            title="Previous Selected Work"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#F97316] hover:bg-[#F97316] hover:text-white transition-all text-[#4B5563]"
            title="Next Selected Work"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          {onSelectProject && (
            <button
              onClick={() => onSelectProject(project)}
              className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2937] text-white text-xs font-bold hover:bg-[#F97316] transition-all shadow-xs"
            >
              <span>View App</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

