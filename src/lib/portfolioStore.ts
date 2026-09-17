import { useState, useEffect } from 'react';
import { Project, Skill, Idea, Booking, ResourceItem } from '../types';
import { PROJECTS_LIST, SKILLS_LIST, PERSONAL_INFO } from '../data/portfolioData';
import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  addDoc,
  serverTimestamp,
  onSnapshot, 
  query,
  orderBy
} from 'firebase/firestore';

export const DEFAULT_RESOURCES: ResourceItem[] = [
  {
    id: 'ecommerce-starter-bundle',
    title: 'Full-Stack Modern E-Commerce Core (ZIP)',
    category: 'Source Code',
    fileType: 'zip',
    fileSize: '42.8 MB',
    downloadUrl: 'https://github.com/yasinarafath25/md-yasin-portfolio/archive/refs/heads/main.zip',
    previewUrl: 'https://github.com/yasinarafath25/md-yasin-portfolio',
    description: 'Complete production-grade E-Commerce boilerplate with cart, checkout, responsive UI, Tailwind CSS, and API integrations packaged in a clean ZIP bundle.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Stripe'],
    downloadsCount: 184,
    featured: true,
    version: 'v2.4.0',
    updatedAt: '2026-03-10'
  },
  {
    id: 'courier-track-app-apk',
    title: 'Courier & Logistics Mobile App Release (APK)',
    category: 'Apps & ZIPs',
    fileType: 'apk',
    fileSize: '28.4 MB',
    downloadUrl: 'https://github.com/yasinarafath25/md-yasin-portfolio',
    previewUrl: '',
    description: 'Direct Android APK build for real-time parcel delivery tracking, GPS navigation, and digital signature confirmation.',
    tags: ['Android', 'Flutter', 'APK Build', 'Google Maps'],
    downloadsCount: 312,
    featured: true,
    version: 'v1.8.2',
    updatedAt: '2026-02-18'
  },
  {
    id: 'portfolio-3d-solar-template',
    title: 'Interactive 3D Solar System Visualizer (Source ZIP)',
    category: 'Source Code',
    fileType: 'zip',
    fileSize: '15.6 MB',
    downloadUrl: 'https://github.com/yasinarafath25/md-yasin-portfolio',
    previewUrl: 'https://md-yasin-portfolio.vercel.app',
    description: 'Clean Three.js solar system code with custom orbital physics, glowing shaders, and responsive HTML overlays.',
    tags: ['Three.js', 'WebGL', 'Canvas', 'TypeScript', 'ZIP'],
    downloadsCount: 429,
    featured: true,
    version: 'v3.0.0',
    updatedAt: '2026-03-15'
  },
  {
    id: 'product-walkthrough-demo',
    title: 'AI Studio & Automation Architecture Walkthrough (Video MP4)',
    category: 'Videos & Demos',
    fileType: 'video',
    fileSize: '86.2 MB',
    downloadUrl: 'https://www.youtube.com',
    previewUrl: 'https://www.youtube.com',
    description: 'High-definition 4K video breakdown detailing micro-service workflows, Firestore listeners, and serverless edge functions on Vercel.',
    tags: ['Video Walkthrough', '4K MP4', 'Architecture', 'Tutorial'],
    downloadsCount: 650,
    featured: true,
    version: 'HD 1080p',
    updatedAt: '2026-01-20'
  },
  {
    id: 'fullstack-dev-cheatsheet-pdf',
    title: 'Full Stack API & Cloud Deployment Master Cheatsheet (PDF)',
    category: 'Guides & Docs',
    fileType: 'pdf',
    fileSize: '4.2 MB',
    downloadUrl: 'https://github.com/yasinarafath25/md-yasin-portfolio',
    previewUrl: '',
    description: 'Comprehensive 40-page technical reference covering REST/GraphQL design, Docker orchestration, Vercel CI/CD, and database indexing.',
    tags: ['PDF Guide', 'Documentation', 'DevOps', 'Cheatsheet'],
    downloadsCount: 890,
    featured: false,
    version: '2026 Edition',
    updatedAt: '2026-02-01'
  }
];

export const DEFAULT_IDEAS: Idea[] = [
  {
    id: 'ai-voice-agent',
    title: 'Autonomous Bengali Voice AI Agent',
    category: 'AI & Speech Processing',
    status: 'In Development',
    description: 'Ultra-low latency conversational AI voice bot optimized for conversational Bengali dialects, customer support, and automated tele-calling.',
    tags: ['Next.js', 'WebRTC', 'Gemini Live', 'Python', 'FastAPI'],
    targetYear: '2026',
    demoUrl: '',
    notes: 'Designing custom streaming audio WebSocket pipelines with sub-400ms turnaround.',
    featured: true
  },
  {
    id: 'cloud-inventory-sync',
    title: 'Offline-First Cloud Retail Sync Engine',
    category: 'Cloud Architecture & Mobile',
    status: 'MVP Ready',
    description: 'P2P local database sync mechanism allowing rural storefronts to run billing offline with automatic zero-conflict cloud resolution.',
    tags: ['Flutter', 'SQLite', 'CRDTs', 'Firebase', 'Node.js'],
    targetYear: '2025',
    demoUrl: '',
    notes: 'Testing CRDT vector clocks for concurrent invoice updates.',
    featured: true
  },
  {
    id: 'micro-saas-generator',
    title: 'AI Micro-SaaS Boilerplate Automator',
    category: 'Full Stack & Automation',
    status: 'Prototype',
    description: 'Instant full-stack application scaffolder combining Supabase auth, Stripe/bKash webhooks, Tailwind UI and auto-deployment to Vercel in 60 seconds.',
    tags: ['React', 'TypeScript', 'Vercel API', 'Tailwind CSS'],
    targetYear: '2026',
    demoUrl: '',
    notes: 'Automated CI/CD repo generator.',
    featured: true
  }
];

const STORAGE_KEYS = {
  PROJECTS: 'yasin_portfolio_projects',
  SKILLS: 'yasin_portfolio_skills',
  IDEAS: 'yasin_portfolio_ideas',
  RESOURCES: 'yasin_portfolio_resources',
  PERSONAL_INFO: 'yasin_portfolio_info',
  ADMIN_PIN: 'yasin_portfolio_admin_pin',
  ADMIN_AUTH: 'yasin_portfolio_admin_auth'
};

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn(`Failed reading storage key "${key}":`, err);
    return fallback;
  }
};

const setStored = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed writing storage key "${key}":`, err);
  }
};

// Global in-memory state
let currentProjects: Project[] = getStored(STORAGE_KEYS.PROJECTS, PROJECTS_LIST);
let currentSkills: Skill[] = getStored(STORAGE_KEYS.SKILLS, SKILLS_LIST);
let currentIdeas: Idea[] = getStored(STORAGE_KEYS.IDEAS, DEFAULT_IDEAS);
let currentResources: ResourceItem[] = getStored(STORAGE_KEYS.RESOURCES, DEFAULT_RESOURCES);
let currentPersonalInfo = getStored(STORAGE_KEYS.PERSONAL_INFO, PERSONAL_INFO);
let currentBookings: Booking[] = [];

// Event listeners for state reactivity across components
type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => {
  listeners.forEach(fn => fn());
};

// Firestore collections
const COLLECTIONS = {
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  IDEAS: 'portfolio_ideas',
  RESOURCES: 'portfolio_resources',
  CONFIG: 'portfolio_config',
  BOOKINGS: 'bookings'
};

// Initialize listeners to Firestore if available
let isFirebaseListening = false;
export const initFirebaseSync = () => {
  if (isFirebaseListening) return;
  isFirebaseListening = true;

  try {
    // Listen to projects
    onSnapshot(collection(db, COLLECTIONS.PROJECTS), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        currentProjects = items;
        setStored(STORAGE_KEYS.PROJECTS, items);
        notify();
      }
    }, (err) => console.log('Firestore projects sync fallback to local:', err.message));

    // Listen to skills
    onSnapshot(collection(db, COLLECTIONS.SKILLS), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => doc.data() as Skill);
        currentSkills = items;
        setStored(STORAGE_KEYS.SKILLS, items);
        notify();
      }
    }, (err) => console.log('Firestore skills sync fallback to local:', err.message));

    // Listen to ideas
    onSnapshot(collection(db, COLLECTIONS.IDEAS), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Idea));
        currentIdeas = items;
        setStored(STORAGE_KEYS.IDEAS, items);
        notify();
      }
    }, (err) => console.log('Firestore ideas sync fallback to local:', err.message));

    // Listen to resources & downloadable files
    onSnapshot(collection(db, COLLECTIONS.RESOURCES), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ResourceItem));
        currentResources = items;
        setStored(STORAGE_KEYS.RESOURCES, items);
        notify();
      }
    }, (err) => console.log('Firestore resources sync fallback to local:', err.message));

    // Listen to config/personal info
    onSnapshot(doc(db, COLLECTIONS.CONFIG, 'personal_info'), (docSnap) => {
      if (docSnap.exists()) {
        currentPersonalInfo = { ...PERSONAL_INFO, ...docSnap.data() };
        setStored(STORAGE_KEYS.PERSONAL_INFO, currentPersonalInfo);
        notify();
      }
    }, (err) => console.log('Firestore config sync fallback to local:', err.message));

    // Listen to bookings
    try {
      const q = query(collection(db, COLLECTIONS.BOOKINGS), orderBy('timestamp', 'desc'));
      onSnapshot(q, (snapshot) => {
        currentBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
        notify();
      }, (err) => console.log('Firestore bookings restricted or empty:', err.message));
    } catch {
      // Ignore if index missing
    }
  } catch (err) {
    console.warn('Firebase sync initialization warning:', err);
  }
};

// Seed default data into Firebase and local storage
export const seedDefaultData = async () => {
  currentProjects = [...PROJECTS_LIST];
  currentSkills = [...SKILLS_LIST];
  currentIdeas = [...DEFAULT_IDEAS];
  currentResources = [...DEFAULT_RESOURCES];
  currentPersonalInfo = { ...PERSONAL_INFO };

  setStored(STORAGE_KEYS.PROJECTS, currentProjects);
  setStored(STORAGE_KEYS.SKILLS, currentSkills);
  setStored(STORAGE_KEYS.IDEAS, currentIdeas);
  setStored(STORAGE_KEYS.RESOURCES, currentResources);
  setStored(STORAGE_KEYS.PERSONAL_INFO, currentPersonalInfo);
  notify();

  // Also push to Firestore
  try {
    for (const proj of currentProjects) {
      await setDoc(doc(db, COLLECTIONS.PROJECTS, proj.id), proj, { merge: true });
    }
    for (let i = 0; i < currentSkills.length; i++) {
      const skill = currentSkills[i];
      const skillId = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await setDoc(doc(db, COLLECTIONS.SKILLS, skillId), skill, { merge: true });
    }
    for (const idea of currentIdeas) {
      await setDoc(doc(db, COLLECTIONS.IDEAS, idea.id), idea, { merge: true });
    }
    for (const res of currentResources) {
      await setDoc(doc(db, COLLECTIONS.RESOURCES, res.id), res, { merge: true });
    }
    await setDoc(doc(db, COLLECTIONS.CONFIG, 'personal_info'), currentPersonalInfo, { merge: true });
  } catch (err) {
    console.warn('Firestore seed warning (local storage is active):', err);
  }
};

// CRUD for Projects
export const saveProject = async (project: Project) => {
  const index = currentProjects.findIndex(p => p.id === project.id);
  if (index >= 0) {
    currentProjects[index] = project;
  } else {
    currentProjects.unshift(project);
  }
  setStored(STORAGE_KEYS.PROJECTS, currentProjects);
  notify();

  try {
    await setDoc(doc(db, COLLECTIONS.PROJECTS, project.id), project, { merge: true });
  } catch (err) {
    console.warn('Firestore write warning:', err);
  }
};

export const deleteProject = async (projectId: string) => {
  currentProjects = currentProjects.filter(p => p.id !== projectId);
  setStored(STORAGE_KEYS.PROJECTS, currentProjects);
  notify();

  try {
    await deleteDoc(doc(db, COLLECTIONS.PROJECTS, projectId));
  } catch (err) {
    console.warn('Firestore delete warning:', err);
  }
};

// CRUD for Skills
export const saveSkill = async (skill: Skill, oldName?: string) => {
  if (oldName && oldName !== skill.name) {
    currentSkills = currentSkills.filter(s => s.name !== oldName);
    try {
      const oldId = oldName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await deleteDoc(doc(db, COLLECTIONS.SKILLS, oldId));
    } catch {}
  }
  const index = currentSkills.findIndex(s => s.name === skill.name);
  if (index >= 0) {
    currentSkills[index] = skill;
  } else {
    currentSkills.push(skill);
  }
  setStored(STORAGE_KEYS.SKILLS, currentSkills);
  notify();

  try {
    const skillId = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    await setDoc(doc(db, COLLECTIONS.SKILLS, skillId), skill, { merge: true });
  } catch (err) {
    console.warn('Firestore write skill warning:', err);
  }
};

export const deleteSkill = async (skillName: string) => {
  currentSkills = currentSkills.filter(s => s.name !== skillName);
  setStored(STORAGE_KEYS.SKILLS, currentSkills);
  notify();

  try {
    const skillId = skillName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    await deleteDoc(doc(db, COLLECTIONS.SKILLS, skillId));
  } catch (err) {
    console.warn('Firestore delete skill warning:', err);
  }
};

// CRUD for Ideas
export const saveIdea = async (idea: Idea) => {
  const index = currentIdeas.findIndex(i => i.id === idea.id);
  if (index >= 0) {
    currentIdeas[index] = idea;
  } else {
    currentIdeas.unshift(idea);
  }
  setStored(STORAGE_KEYS.IDEAS, currentIdeas);
  notify();

  try {
    await setDoc(doc(db, COLLECTIONS.IDEAS, idea.id), idea, { merge: true });
  } catch (err) {
    console.warn('Firestore write idea warning:', err);
  }
};

export const deleteIdea = async (ideaId: string) => {
  currentIdeas = currentIdeas.filter(i => i.id !== ideaId);
  setStored(STORAGE_KEYS.IDEAS, currentIdeas);
  notify();

  try {
    await deleteDoc(doc(db, COLLECTIONS.IDEAS, ideaId));
  } catch (err) {
    console.warn('Firestore delete idea warning:', err);
  }
};

// CRUD for Resources (ZIP, Apps, Videos, Source Code, Assets)
export const saveResource = async (resource: ResourceItem) => {
  const index = currentResources.findIndex(r => r.id === resource.id);
  if (index >= 0) {
    currentResources[index] = resource;
  } else {
    currentResources.unshift(resource);
  }
  setStored(STORAGE_KEYS.RESOURCES, currentResources);
  notify();

  try {
    await setDoc(doc(db, COLLECTIONS.RESOURCES, resource.id), resource, { merge: true });
  } catch (err) {
    console.warn('Firestore write resource warning:', err);
  }
};

export const deleteResource = async (resourceId: string) => {
  currentResources = currentResources.filter(r => r.id !== resourceId);
  setStored(STORAGE_KEYS.RESOURCES, currentResources);
  notify();

  try {
    await deleteDoc(doc(db, COLLECTIONS.RESOURCES, resourceId));
  } catch (err) {
    console.warn('Firestore delete resource warning:', err);
  }
};

export const incrementDownloadCount = async (resourceId: string) => {
  const target = currentResources.find(r => r.id === resourceId);
  if (target) {
    target.downloadsCount = (target.downloadsCount || 0) + 1;
    setStored(STORAGE_KEYS.RESOURCES, currentResources);
    notify();
    try {
      await setDoc(doc(db, COLLECTIONS.RESOURCES, resourceId), { downloadsCount: target.downloadsCount }, { merge: true });
    } catch {}
  }
};

// Save Personal Info
export const savePersonalInfo = async (info: typeof PERSONAL_INFO) => {
  currentPersonalInfo = info;
  setStored(STORAGE_KEYS.PERSONAL_INFO, currentPersonalInfo);
  notify();

  try {
    await setDoc(doc(db, COLLECTIONS.CONFIG, 'personal_info'), currentPersonalInfo, { merge: true });
  } catch (err) {
    console.warn('Firestore write config warning:', err);
  }
};

// CRUD for Bookings
export const addClientBooking = async (booking: Booking) => {
  const newBooking = {
    ...booking,
    createdAt: new Date().toISOString(),
  };
  currentBookings.unshift(newBooking);
  notify();

  try {
    await addDoc(collection(db, COLLECTIONS.BOOKINGS), {
      ...booking,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Firestore booking write warning:', err);
  }
};

// Admin authentication helpers
const DEFAULT_PIN = '7860'; // Default PIN for admin access
export const checkAdminPin = (enteredPin: string): boolean => {
  const customPin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_PIN;
  return enteredPin.trim() === customPin.trim();
};

export const updateAdminPin = (newPin: string) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin.trim());
};

export const setAdminLoggedIn = (isLoggedIn: boolean) => {
  if (isLoggedIn) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
  notify();
};

export const isAdminLoggedIn = (): boolean => {
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
};

// React Hooks
export const usePortfolioStore = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    initFirebaseSync();
    const handleUpdate = () => setTick(t => t + 1);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return {
    projects: currentProjects,
    skills: currentSkills,
    ideas: currentIdeas,
    resources: currentResources,
    personalInfo: currentPersonalInfo,
    bookings: currentBookings,
    isAdmin: isAdminLoggedIn(),
    saveProject,
    deleteProject,
    saveSkill,
    deleteSkill,
    saveIdea,
    deleteIdea,
    saveResource,
    deleteResource,
    incrementDownloadCount,
    savePersonalInfo,
    seedDefaultData,
    checkAdminPin,
    updateAdminPin,
    setAdminLoggedIn
  };
};
