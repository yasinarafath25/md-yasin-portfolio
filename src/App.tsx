import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { BackgroundVideo } from './components/BackgroundVideo';
import { HeroSection } from './components/HeroSection';
import { AboutServicesSection } from './components/AboutServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { IdeasSection } from './components/IdeasSection';
import { SkillsSection } from './components/SkillsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { FooterSection } from './components/FooterSection';
import { ShowreelModal } from './components/ShowreelModal';
import { ContactPage } from './components/ContactPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { CustomCursor } from './components/CustomCursor';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Project } from './types';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { usePortfolioStore } from './lib/portfolioStore';

export default function App() {
  const { isAdmin } = usePortfolioStore();
  const [isMuted, setIsMuted] = useState(true);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Check URL on load for /admin or #admin
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await addDoc(collection(db, 'page_visits'), {
          path: window.location.pathname,
          referrer: document.referrer,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        // Safe failover if Firebase rule restricts page_visits
      }
    };
    trackVisit();
  }, []);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(console.error);
    }
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleScrollDown = () => {
    const elem = document.getElementById('about-services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF8F5] text-[#1F2937] selection:bg-[#F97316] selection:text-white overflow-x-hidden font-sans">
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Ambient Looping Video Background */}
      <BackgroundVideo isMuted={isMuted} />
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Sticky Fixed Navbar */}
      <Navbar
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSchedule={handleScrollToContact}
      />

      {/* Main Full Viewport Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onScrollDown={handleScrollDown}
        />

        {/* What I Do & Services Section */}
        <AboutServicesSection
          onSelectService={handleScrollToContact}
        />

        {/* Works & Projects Section */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Ideas & Innovation Lab Section */}
        <IdeasSection />

        {/* Tech Stack & Skills Section */}
        <SkillsSection />

        {/* Digital Assets, Source Code & Downloads Section */}
        <ResourcesSection />

        <ContactPage onSelectProject={(project) => setSelectedProject(project)} />
      </main>

      {/* Footer */}
      <FooterSection 
        onOpenSchedule={handleScrollToContact}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <MobileMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenSchedule={handleScrollToContact}
      />

      {/* Admin Panel and Login Modal */}
      {isAdminOpen && (
        isAdmin ? (
          <AdminDashboard onClose={() => {
            setIsAdminOpen(false);
            if (window.location.hash === '#admin') {
              history.replaceState(null, '', window.location.pathname);
            }
          }} />
        ) : (
          <AdminLoginModal
            isOpen={true}
            onClose={() => {
              setIsAdminOpen(false);
              if (window.location.hash === '#admin') {
                history.replaceState(null, '', window.location.pathname);
              }
            }}
            onSuccess={() => setIsAdminOpen(true)}
          />
        )
      )}
    </div>
  );
}
