import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Play, Pause, Sparkles, Filter, Grid, Globe as GlobeIcon, Check, Info, Compass } from 'lucide-react';
import { usePortfolioStore } from '../lib/portfolioStore';
import { Skill } from '../types';

interface OrbitGroup {
  name: string;
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  skills: Skill[];
  color: string;
}

export const GlobeSolarSystem: React.FC = () => {
  const { skills } = usePortfolioStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  // Interactive 3D projected positions for HTML overlays
  const [screenPositions, setScreenPositions] = useState<{
    [key: string]: { x: number; y: number; z: number; isBehind: boolean; orbitName: string };
  }>({});

  // Defined orbital rings with ample physical separation to prevent clutter
  const orbits: OrbitGroup[] = [
    {
      name: 'Frontend Orbit',
      radius: 3.6,
      tiltX: 0.22,
      tiltZ: 0.12,
      speed: 0.0035,
      color: '#F97316', // Primary Orange
      skills: skills.filter((s) => s.category === 'Frontend' && (s.featured !== false)),
    },
    {
      name: 'Mobile & Cloud Orbit',
      radius: 5.4,
      tiltX: -0.28,
      tiltZ: -0.18,
      speed: -0.0028,
      color: '#FB923C', // Light Amber Orange
      skills: skills.filter((s) => (s.category === 'Mobile' || s.category === 'DevOps & Cloud') && (s.featured !== false)),
    },
    {
      name: 'Backend & DB Orbit',
      radius: 7.2,
      tiltX: 0.32,
      tiltZ: -0.22,
      speed: 0.0022,
      color: '#EA580C', // Deep Orange
      skills: skills.filter((s) => s.category === 'Backend & DB' && (s.featured !== false)),
    },
    {
      name: 'AI & Automation Orbit',
      radius: 9.0,
      tiltX: -0.18,
      tiltZ: 0.38,
      speed: -0.0018,
      color: '#F59E0B', // Amber Gold
      skills: skills.filter((s) => (s.category === 'AI & Special' || s.category === 'Cloud & Special') && (s.featured !== false)),
    },
  ];

  const categories = ['All', 'Frontend', 'Mobile', 'Backend & DB', 'DevOps & Cloud', 'AI & Special'];

  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight || 580;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const isMobile = width < 640;
    // Position camera far enough to comfortably frame all orbits without clipping
    camera.position.z = isMobile ? 22 : 16;
    camera.position.y = isMobile ? 3 : 2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Center 3D World Globe
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeRadius = isMobile ? 1.2 : 1.5;

    // Dark sleek inner core
    const coreGeo = new THREE.SphereGeometry(globeRadius * 0.98, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0B0F19,
      transparent: true,
      opacity: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // Wireframe Latitude & Longitude lines
    const wireframeGeo = new THREE.SphereGeometry(globeRadius, 20, 20);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xF97316,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeMesh);

    // Procedural Dot Matrix Landmass Points
    const dotsCount = 700;
    const dotsPositions: number[] = [];
    const dotsColors: number[] = [];

    for (let i = 0; i < dotsCount; i++) {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = (Math.random() - 0.5) * 2 * Math.PI;

      if (Math.abs(lat) > 1.35) continue;

      const r = globeRadius * 1.01;
      const x = r * Math.cos(lat) * Math.sin(lon);
      const y = r * Math.sin(lat);
      const z = r * Math.cos(lat) * Math.cos(lon);

      dotsPositions.push(x, y, z);

      const isAccent = Math.random() > 0.45;
      if (isAccent) {
        dotsColors.push(0.97, 0.45, 0.08); // #F97316
      } else {
        dotsColors.push(0.38, 0.45, 0.55); // Slate blue-gray
      }
    }

    const dotsGeometry = new THREE.BufferGeometry();
    dotsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotsPositions, 3));
    dotsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(dotsColors, 3));

    const dotsMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const dotsPoints = new THREE.Points(dotsGeometry, dotsMaterial);
    globeGroup.add(dotsPoints);

    // Glowing Atmosphere Halo
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.15, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // Equatorial Ring
    const equatorGeo = new THREE.RingGeometry(globeRadius * 1.05, globeRadius * 1.08, 64);
    const equatorMat = new THREE.MeshBasicMaterial({
      color: 0xF97316,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const equatorMesh = new THREE.Mesh(equatorGeo, equatorMat);
    equatorMesh.rotation.x = Math.PI / 2;
    globeGroup.add(equatorMesh);

    // 3. Solar System Orbit Rings
    const orbitsGroup = new THREE.Group();
    scene.add(orbitsGroup);

    const scaleFactor = isMobile ? 0.65 : 1.0;
    const orbitAngles = orbits.map(() => 0);

    orbits.forEach((orbit) => {
      const radius = orbit.radius * scaleFactor;
      const segments = 128;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }

      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(orbit.color),
        transparent: true,
        opacity: 0.22,
      });

      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.x = orbit.tiltX;
      ringLine.rotation.z = orbit.tiltZ;

      orbitsGroup.add(ringLine);
    });

    // 4. Smooth Rotation & Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.12;
    let targetRotationY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.004;
      targetRotationX += deltaY * 0.004;

      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domCanvas = canvas;
    domCanvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domCanvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 5. Animation Frame Loop
    const tempVector = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      globeGroup.rotation.y += 0.0025;
      globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, targetRotationX, 0.05);
      orbitsGroup.rotation.x = globeGroup.rotation.x;
      orbitsGroup.rotation.y = THREE.MathUtils.lerp(orbitsGroup.rotation.y, targetRotationY, 0.05);

      const newPositions: {
        [key: string]: { x: number; y: number; z: number; isBehind: boolean; orbitName: string };
      } = {};

      orbits.forEach((orbit, orbitIdx) => {
        if (isRotating && !isDragging) {
          orbitAngles[orbitIdx] += orbit.speed;
        }

        const radius = orbit.radius * scaleFactor;
        const totalSkills = orbit.skills.length;

        orbit.skills.forEach((skill, skillIdx) => {
          // Even angular distribution around the orbit circle
          const baseAngle = (skillIdx / totalSkills) * Math.PI * 2;
          const currentAngle = baseAngle + orbitAngles[orbitIdx];

          const xLocal = Math.cos(currentAngle) * radius;
          const yLocal = 0;
          const zLocal = Math.sin(currentAngle) * radius;

          const euler = new THREE.Euler(orbit.tiltX, 0, orbit.tiltZ, 'XYZ');
          tempVector.set(xLocal, yLocal, zLocal).applyEuler(euler);
          tempVector.applyEuler(orbitsGroup.rotation);

          const projected = tempVector.clone().project(camera);

          let screenX = ((projected.x + 1) * width) / 2;
          let screenY = ((-projected.y + 1) * height) / 2;

          // Padding boundary clamping so badge text never clips offscreen edges
          const padding = isMobile ? 45 : 70;
          screenX = Math.max(padding, Math.min(width - padding, screenX));
          screenY = Math.max(padding, Math.min(height - padding, screenY));

          const isBehind = tempVector.z < -0.4;

          newPositions[skill.name] = {
            x: screenX,
            y: screenY,
            z: tempVector.z,
            isBehind,
            orbitName: orbit.name,
          };
        });
      });

      setScreenPositions(newPositions);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight || 580;

      camera.aspect = width / height;
      camera.position.z = width < 640 ? 22 : 16;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      domCanvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      domCanvas.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      globeGeoDispose(scene);
    };
  }, [viewMode, isRotating]);

  function globeGeoDispose(scene: THREE.Scene) {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((m) => m.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }

  return (
    <div className="w-full relative">
      {/* Top Filter & Control Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white border border-[#E5E7EB] p-3.5 rounded-2xl shadow-xs">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <span className="text-xs font-mono text-[#6B7280] font-semibold shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#F97316]" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1F2937] text-white font-bold shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#E5E7EB] text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F5F3EF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode & Orbit Rotation Toggles */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          {viewMode === '3d' && (
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                isRotating
                  ? 'bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316] font-semibold'
                  : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937]'
              }`}
              title={isRotating ? 'Pause Orbit Rotation' : 'Resume Orbit Rotation'}
            >
              {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px] uppercase font-bold">{isRotating ? 'Active Orbit' : 'Paused'}</span>
            </button>
          )}

          <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#E5E7EB]">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === '3d'
                  ? 'bg-white text-[#1F2937] shadow-xs font-bold'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <GlobeIcon className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="hidden sm:inline">3D Solar System</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-[#1F2937] shadow-xs font-bold'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="hidden sm:inline">Grid View</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewport Box */}
      {viewMode === '3d' ? (
        <div
          ref={containerRef}
          className="relative w-full h-[500px] sm:h-[600px] rounded-3xl bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#111827] border border-[#1E293B] shadow-xl overflow-hidden select-none cursor-grab active:cursor-grabbing"
        >
          {/* Subtle Star Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          {/* Core Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F97316]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* 3D Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

          {/* Top Left Header Badge */}
          <div className="absolute top-5 left-5 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="text-[#F97316] font-bold">MD YASIN</span> — GLOBAL TECH CORE
          </div>

          <div className="absolute top-5 right-5 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-slate-700/60 text-slate-300 text-[11px] font-mono">
            <Compass className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Interactive 3D Sphere</span>
          </div>

          {/* HTML Orbiting Skill Badges */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {skills.map((skill) => {
              const pos = screenPositions[skill.name];
              if (!pos) return null;

              if (selectedCategory !== 'All' && skill.category !== selectedCategory) {
                return null;
              }

              const isHovered = hoveredSkill?.name === skill.name;
              const isSelected = selectedSkill?.name === skill.name;

              const depthOpacity = pos.isBehind ? 0.35 : 1;
              const depthScale = pos.isBehind ? 0.82 : 1;

              return (
                <div
                  key={skill.name}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.12 : depthScale})`,
                    opacity: depthOpacity,
                    zIndex: pos.isBehind ? 10 : isHovered || isSelected ? 30 : 20,
                  }}
                  className="absolute pointer-events-auto transition-all duration-150 ease-out"
                >
                  <button
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`group px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md transition-all shadow-md border ${
                      isSelected
                        ? 'bg-[#F97316] text-white border-white scale-105 font-bold ring-4 ring-[#F97316]/30 shadow-lg'
                        : isHovered
                        ? 'bg-white text-[#1F2937] border-[#F97316] font-bold shadow-xl'
                        : skill.featured
                        ? 'bg-slate-900/90 text-white border-[#F97316]/60 hover:border-[#F97316] hover:bg-white hover:text-[#1F2937]'
                        : 'bg-slate-900/80 text-slate-200 border-slate-700/80 hover:border-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        skill.featured ? 'bg-[#F97316] animate-pulse' : 'bg-slate-400'
                      }`}
                    />
                    <span>{skill.name}</span>
                    {skill.featured && (
                      <Sparkles className="w-3 h-3 text-[#F97316] group-hover:text-[#EA580C] shrink-0" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected Skill Floating Details Card */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-80 z-30 bg-slate-900/95 backdrop-blur-md border border-[#F97316]/40 p-4 rounded-2xl text-white shadow-2xl"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
                    <h4 className="text-sm font-extrabold font-mono text-white">
                      {selectedSkill.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-xs font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {selectedSkill.category}
                  </span>
                  {selectedSkill.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" /> Core Skill
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                  Production-tested technology deployed across full-stack web platforms, mobile applications, and scalable backend infrastructure.
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Orbiting World Core</span>
                  <span className="text-[#F97316] font-semibold">Active Capability</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Hint */}
          <div className="absolute bottom-4 left-5 z-20 pointer-events-none hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <Info className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Click any node to view details • Drag canvas to orbit</span>
          </div>
        </div>
      ) : (
        /* Grid Fallback View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {skills.filter(
            (s) => selectedCategory === 'All' || s.category === selectedCategory
          ).map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              onClick={() => setSelectedSkill(skill)}
              className={`group p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer shadow-xs ${
                selectedSkill?.name === skill.name
                  ? 'bg-[#F97316] text-white border-[#F97316] shadow-md'
                  : skill.featured
                  ? 'bg-white border-[#E5E7EB] hover:border-[#F97316]/60 hover:bg-[#FAF8F5]'
                  : 'bg-white/80 border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    selectedSkill?.name === skill.name
                      ? 'bg-white'
                      : skill.featured
                      ? 'bg-[#F97316] animate-pulse'
                      : 'bg-[#9CA3AF]'
                  }`}
                />
                <span
                  className={`text-xs font-mono font-semibold transition-colors ${
                    selectedSkill?.name === skill.name
                      ? 'text-white'
                      : 'text-[#374151] group-hover:text-[#1F2937]'
                  }`}
                >
                  {skill.name}
                </span>
              </div>

              {skill.featured && (
                <Check
                  className={`w-3.5 h-3.5 transition-opacity ${
                    selectedSkill?.name === skill.name
                      ? 'text-white'
                      : 'text-[#F97316] opacity-80 group-hover:opacity-100'
                  }`}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
