import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, ArrowRight } from 'lucide-react';
import { BACKGROUND_VIDEO_URL, PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolioStore } from '../lib/portfolioStore';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (proj: any) => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, onSelectProject }) => {
  const { projects } = usePortfolioStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-2xl flex flex-col text-[#1F2937]"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse"></span>
              <span className="font-pixel text-sm sm:text-base text-[#1F2937] tracking-widest font-semibold">
                YASIN STUDIO — SHOWREEL 2026
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#F5F3EF] hover:bg-[#E5E7EB] text-[#4B5563] transition-colors"
              aria-label="Close Showreel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Box */}
          <div className="relative aspect-video w-full bg-[#1F2937] overflow-hidden group">
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
            >
              <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-white text-[#1F2937] hover:bg-[#F97316] hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="text-xs font-mono text-neutral-200">
                  Md Yasin • Full Stack & Mobile Portfolio
                </div>
              </div>
            </div>
          </div>

          {/* Featured Projects Reel Strip */}
          <div className="p-6 bg-[#FAF8F5] border-t border-[#E5E7EB]">
            <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest block mb-4 font-semibold">
              Featured Works Highlighted in Reel
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onClose();
                    onSelectProject(proj);
                  }}
                  className="p-2.5 rounded-lg bg-white hover:bg-[#F5F3EF] border border-[#E5E7EB] text-left transition-all text-xs group shadow-2xs"
                >
                  <span className="font-bold text-[#1F2937] group-hover:text-[#F97316] block truncate">
                    {proj.title}
                  </span>
                  <span className="text-[10px] text-[#6B7280] block truncate mt-0.5 font-mono">
                    {proj.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
