import React, { useRef, useEffect } from 'react';
import { BACKGROUND_VIDEO_URL, AMBIENT_VIDEO_ALT } from '../data/portfolioData';

interface BackgroundVideoProps {
  isMuted: boolean;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ isMuted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = isMuted ? 0 : 0.25;
    }
  }, [isMuted]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#FAF8F5]">
      {/* Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] scale-105 filter saturate-100 contrast-100 transition-all duration-1000"
      >
        <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
        <source src={AMBIENT_VIDEO_ALT} type="video/mp4" />
      </video>

      {/* Light Vignette Overlay */}
      <div className="absolute inset-0 bg-vignette" />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply" />

      {/* Dot Grid Pattern matching Light theme */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      {/* Subtle Gradient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F97316]/8 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FED7AA]/20 rounded-full blur-[120px]" />
    </div>
  );
};
