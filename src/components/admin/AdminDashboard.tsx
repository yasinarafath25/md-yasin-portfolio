import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Layers,
  Cpu,
  Lightbulb,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Github,
  CheckCircle2,
  RefreshCw,
  LogOut,
  X,
  Star,
  Sparkles,
  Search,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  MessageSquare,
  FileArchive,
  Download,
  HardDrive,
  Smartphone,
  Video,
  Code2,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolioStore } from '../../lib/portfolioStore';
import { Project, Skill, Idea, ResourceItem } from '../../types';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const {
    projects,
    skills,
    ideas,
    resources,
    personalInfo,
    bookings,
    saveProject,
    deleteProject,
    saveSkill,
    deleteSkill,
    saveIdea,
    deleteIdea,
    saveResource,
    deleteResource,
    savePersonalInfo,
    seedDefaultData,
    updateAdminPin,
    setAdminLoggedIn
  } = usePortfolioStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'ideas' | 'resources' | 'inbox' | 'settings'>('overview');

  // Project modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '',
    title: '',
    category: 'Full Stack Web & Mobile App',
    subtitle: '',
    description: '',
    longDescription: '',
    tags: [],
    metrics: '',
    year: new Date().getFullYear().toString(),
    image: '',
    liveUrl: '',
    githubUrl: '',
    videoUrl: '',
    featured: true
  });
  const [tagInput, setTagInput] = useState('');

  // Skill modal states
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillName, setEditingSkillName] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState<Skill>({
    name: '',
    category: 'Frontend',
    featured: true
  });

  // Idea modal states
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [ideaForm, setIdeaForm] = useState<Partial<Idea>>({
    id: '',
    title: '',
    category: 'Full Stack & Automation',
    status: 'In Development',
    description: '',
    tags: [],
    targetYear: new Date().getFullYear().toString(),
    demoUrl: '',
    notes: '',
    featured: true
  });
  const [ideaTagInput, setIdeaTagInput] = useState('');

  // Resource modal states (ZIP, APK, Videos, Source Files)
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [resourceForm, setResourceForm] = useState<Partial<ResourceItem>>({
    id: '',
    title: '',
    category: 'Apps & ZIPs',
    fileType: 'zip',
    fileSize: '',
    downloadUrl: '',
    previewUrl: '',
    description: '',
    tags: [],
    downloadsCount: 0,
    featured: true,
    version: 'v1.0.0'
  });
  const [resourceTagInput, setResourceTagInput] = useState('');
  const [resourceCategoryFilter, setResourceCategoryFilter] = useState<string>('All');

  // Settings states
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState('');
  const [infoForm, setInfoForm] = useState(personalInfo);
  const [isInfoSaved, setIsInfoSaved] = useState(false);

  // Status feedback
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    onClose();
  };

  // Project Handlers
  const handleOpenNewProject = () => {
    setEditingProject(null);
    setProjectForm({
      id: 'app-' + Date.now(),
      title: '',
      category: 'Full Stack Web & Mobile App',
      subtitle: '',
      description: '',
      longDescription: '',
      tags: ['React', 'Node.js', 'Vercel'],
      metrics: 'Active • High Performance',
      year: new Date().getFullYear().toString(),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      liveUrl: 'https://',
      githubUrl: 'https://github.com/yasin-studio/',
      videoUrl: '',
      featured: true
    });
    setTagInput('');
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({ ...proj });
    setTagInput('');
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.id) return;

    await saveProject(projectForm as Project);
    setIsProjectModalOpen(false);
    showToast(`প্রজেক্ট "${projectForm.title}" সফলভাবে সেভ হয়েছে!`);
  };

  const handleDeleteProject = async (proj: Project) => {
    if (window.confirm(`আপনি কি নিশ্চিতভাবে "${proj.title}" প্রজেক্টটি ডিলিট করতে চান?`)) {
      await deleteProject(proj.id);
      showToast('প্রজেক্ট ডিলিট করা হয়েছে');
    }
  };

  // Skill Handlers
  const handleOpenNewSkill = () => {
    setEditingSkillName(null);
    setSkillForm({
      name: '',
      category: 'Frontend',
      featured: true
    });
    setIsSkillModalOpen(true);
  };

  const handleEditSkill = (s: Skill) => {
    setEditingSkillName(s.name);
    setSkillForm({ ...s });
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    await saveSkill(skillForm, editingSkillName || undefined);
    setIsSkillModalOpen(false);
    showToast(`স্কিল "${skillForm.name}" সফলভাবে যুক্ত হয়েছে!`);
  };

  const handleDeleteSkill = async (skillName: string) => {
    if (window.confirm(`আপনি কি "${skillName}" স্কিলটি ডিলিট করতে চান?`)) {
      await deleteSkill(skillName);
      showToast('স্কিল ডিলিট করা হয়েছে');
    }
  };

  // Idea Handlers
  const handleOpenNewIdea = () => {
    setEditingIdea(null);
    setIdeaForm({
      id: 'idea-' + Date.now(),
      title: '',
      category: 'AI & Automation',
      status: 'Concept',
      description: '',
      tags: ['AI', 'Automation', 'Next.js'],
      targetYear: new Date().getFullYear().toString(),
      demoUrl: '',
      notes: '',
      featured: true
    });
    setIdeaTagInput('');
    setIsIdeaModalOpen(true);
  };

  const handleEditIdea = (idea: Idea) => {
    setEditingIdea(idea);
    setIdeaForm({ ...idea });
    setIdeaTagInput('');
    setIsIdeaModalOpen(true);
  };

  const handleSaveIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaForm.title || !ideaForm.id) return;

    await saveIdea(ideaForm as Idea);
    setIsIdeaModalOpen(false);
    showToast(`আইডিয়া "${ideaForm.title}" সফলভাবে সেভ হয়েছে!`);
  };

  const handleDeleteIdea = async (idea: Idea) => {
    if (window.confirm(`আপনি কি "${idea.title}" আইডিয়াটি ডিলিট করতে চান?`)) {
      await deleteIdea(idea.id);
      showToast('আইডিয়া ডিলিট করা হয়েছে');
    }
  };

  // Resource Handlers (ZIP, Apps, Videos, Source Code)
  const handleOpenNewResource = () => {
    setEditingResource(null);
    setResourceForm({
      id: 'res-' + Date.now(),
      title: '',
      category: 'Apps & ZIPs',
      fileType: 'zip',
      fileSize: '',
      downloadUrl: '',
      previewUrl: '',
      description: '',
      tags: ['ZIP', 'SourceCode'],
      downloadsCount: 0,
      featured: true,
      version: 'v1.0.0',
      updatedAt: new Date().toISOString().split('T')[0]
    });
    setResourceTagInput('');
    setIsResourceModalOpen(true);
  };

  const handleEditResource = (item: ResourceItem) => {
    setEditingResource(item);
    setResourceForm({ ...item });
    setResourceTagInput('');
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title || !resourceForm.downloadUrl || !resourceForm.id) {
      showToast('দয়া করে টাইটেল ও ডাউনলোড লিঙ্ক দিন');
      return;
    }
    await saveResource(resourceForm as ResourceItem);
    setIsResourceModalOpen(false);
    showToast(`ফাইল/রিসোর্স "${resourceForm.title}" সফলভাবে সেভ হয়েছে!`);
  };

  const handleDeleteResource = async (item: ResourceItem) => {
    if (window.confirm(`আপনি কি "${item.title}" ফাইলটি ডিলিট করতে চান?`)) {
      await deleteResource(item.id);
      showToast('ফাইল ডিলিট করা হয়েছে');
    }
  };

  // Settings Handlers
  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim() || newPin.length < 4) {
      setPinMessage('পিনটি কমপক্ষে ৪ ডিজিট হতে হবে');
      return;
    }
    updateAdminPin(newPin);
    setPinMessage('নতুন সিকিউরিটি পিন সফলভাবে সংরক্ষিত হয়েছে!');
    setNewPin('');
    setTimeout(() => setPinMessage(''), 4000);
  };

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await savePersonalInfo(infoForm);
    setIsInfoSaved(true);
    showToast('প্রোফাইল সেটিংস আপডেট হয়েছে!');
    setTimeout(() => setIsInfoSaved(false), 3000);
  };

  const handleSeedDefaults = async () => {
    if (window.confirm('আপনি কি পূর্বনির্ধারিত পোর্টফোলিও ডেটা ডাটাবেস ও লোকাল স্টোরেজে রিস্টোর/সিঙ্ক করতে চান?')) {
      await seedDefaultData();
      showToast('সকল ডেটা সফলভাবে রিস্টোর এবং সিঙ্ক করা হয়েছে!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#090D16] text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#F97316] flex items-center justify-center text-white font-mono font-bold shadow-md shadow-[#F97316]/30">
            Y
          </div>
          <div>
            <h1 className="text-base font-bold font-mono tracking-tight text-white flex items-center gap-2">
              Yasin Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316]">
                Admin Panel
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Vercel Realtime Automation & Dynamic Content Manager
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSeedDefaults}
            title="ডিফল্ট ডেটা সিঙ্ক করুন"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sync Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">View Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-mono transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-[#0B1120] p-4 flex md:flex-col gap-1 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'overview'
                ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>ওভারভিউ (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'projects'
                ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>কাজ ও অ্যাপস (Projects)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900/60">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'skills'
                ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4" />
              <span>দক্ষতা (Skills)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900/60">
              {skills.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ideas')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'ideas'
                ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>নতুন আইডিয়া (Ideas Lab)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900/60">
              {ideas.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'resources'
                ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileArchive className="w-4 h-4 text-orange-400" />
              <span>ফাইল ও রিসোর্স হাব (ZIP/Apps)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900/60">
              {resources.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'inbox'
                ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>মেসেজ ও বুকিং</span>
            </div>
            {bookings.length > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500 text-slate-950 font-bold">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'settings'
                ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>প্রোফাইল ও সেটিংস</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-mono text-white">ড্যাশবোর্ড ওভারভিউ</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  আপনার সম্পূর্ণ ওয়েবসাইট ডায়নামিক ও Vercel-এর সাথে ইনস্ট্যান্ট সিঙ্কড অবস্থায় রয়েছে।
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">মোট প্রজেক্ট/কাজ</span>
                    <Layers className="w-4 h-4 text-[#F97316]" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    {projects.length}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {projects.filter(p => p.featured).length} টি Featured
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">মোট স্কিলস</span>
                    <Cpu className="w-4 h-4 text-[#F97316]" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    {skills.length}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ৩ডি সোলার সিস্টেমে একটিভ
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">নতুন আইডিয়া ও ল্যাব</span>
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    {ideas.length}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    আসন্ন অ্যাপস ও কনসেপ্ট
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">ক্লায়েন্ট ইনকোয়ারি</span>
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    {bookings.length}
                  </div>
                  <span className="text-[10px] text-emerald-500 font-mono">
                    বুকিং ও মেসেজ
                  </span>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#1e1b4b] border border-slate-800">
                <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#F97316]" />
                  কুইক অ্যাকশন (Quick Actions)
                </h3>
                <p className="text-xs text-slate-400 font-mono mb-4">
                  একটি ক্লিকে নতুন কাজ সম্পন্ন হওয়া অ্যাপ, স্কিল বা নতুন আইডিয়া যোগ করুন।
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleOpenNewProject}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white font-mono font-bold text-xs shadow-lg shadow-[#F97316]/20 transition"
                  >
                    <Plus className="w-4 h-4" />
                    নতুন প্রজেক্ট/অ্যাপ যোগ করুন
                  </button>
                  <button
                    onClick={handleOpenNewSkill}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition"
                  >
                    <Plus className="w-4 h-4" />
                    নতুন স্কিল যোগ করুন
                  </button>
                  <button
                    onClick={handleOpenNewIdea}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs border border-amber-500/30 transition"
                  >
                    <Lightbulb className="w-4 h-4" />
                    নতুন আইডিয়া / অ্যাপ যোগ করুন
                  </button>
                </div>
              </div>

              {/* Recent projects preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold font-mono text-white">সাম্প্রতিক কাজসমূহ</h3>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-xs font-mono text-[#F97316] hover:underline"
                  >
                    সবগুলো দেখুন →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-800"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white font-mono">{p.title}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{p.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditProject(p)}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-mono text-white">কাজ ও অ্যাপস ম্যানেজার</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    যে সকল কাজ আপনি সম্পন্ন করেছেন তা এখানে যোগ বা আপডেট করতে পারবেন।
                  </p>
                </div>
                <button
                  onClick={handleOpenNewProject}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white font-mono font-bold text-xs shadow-lg shadow-[#F97316]/20 transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  নতুন কাজ/অ্যাপ যোগ করুন
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-14 h-14 rounded-xl object-cover bg-slate-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold font-mono text-white">{proj.title}</h3>
                              {proj.featured && (
                                <span className="p-1 rounded-full bg-amber-500/20 text-amber-400" title="Featured">
                                  <Star className="w-3 h-3 fill-amber-400" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#F97316] font-mono">{proj.category}</p>
                            <span className="text-[10px] text-slate-400 font-mono">{proj.year}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            title="লাইভ প্রিভিউ"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            title="গিটহাব রিপো"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProject(proj)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>এডিট</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                          title="ডিলিট"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS MANAGER */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-mono text-white">দক্ষতা ও টেক স্ট্যাক (Skills)</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    যে সকল স্কিল এখানে যোগ করবেন তা ওয়েবসাইটের ৩ডি সোলার সিস্টেম ও গ্রিড লিস্টে রিয়েলটাইমে প্রদর্শিত হবে।
                  </p>
                </div>
                <button
                  onClick={handleOpenNewSkill}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white font-mono font-bold text-xs shadow-lg shadow-[#F97316]/20 transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  নতুন স্কিল যোগ করুন
                </button>
              </div>

              {/* Categorized Skills */}
              {(['Frontend', 'Mobile', 'Backend & DB', 'DevOps & Cloud', 'AI & Special', 'Cloud & Special'] as const).map(
                (cat) => {
                  const catSkills = skills.filter((s) => s.category === cat);
                  return (
                    <div key={cat} className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold font-mono text-[#F97316] uppercase tracking-wider">
                          {cat} ({catSkills.length})
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {catSkills.map((s) => (
                          <div
                            key={s.name}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-white group"
                          >
                            <span>{s.name}</span>
                            {s.featured && (
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" title="3D Orbit Featured" />
                            )}
                            <button
                              onClick={() => handleEditSkill(s)}
                              className="text-slate-400 hover:text-white ml-1"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteSkill(s.name)}
                              className="text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* TAB 4: IDEAS LAB */}
          {activeTab === 'ideas' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-mono text-white">আইডিয়া ও ইনোভেশন ল্যাব</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    ভবিষ্যৎ প্রোডাক্ট, প্রোটোটাইপ এবং চলমান গবেষণা প্রদর্শন করুন।
                  </p>
                </div>
                <button
                  onClick={handleOpenNewIdea}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-mono font-bold shadow-lg shadow-[#F97316]/20 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন আইডিয়া যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono text-[#F97316] uppercase tracking-wider">
                          {idea.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {idea.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mb-3">{idea.description}</p>

                      {idea.notes && (
                        <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] font-mono text-slate-400 mb-3">
                          <span className="text-[#F97316] font-bold">Tech Concept: </span>
                          {idea.notes}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {idea.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">
                        টার্গেট: {idea.targetYear || '2026'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditIdea(idea)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>এডিট</span>
                        </button>
                        <button
                          onClick={() => handleDeleteIdea(idea)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                          title="ডিলিট"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INBOX / BOOKINGS */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-mono text-white">মেসেজ ও ক্লায়েন্ট বুকিং</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  পোর্টফোলিওর কন্টাক্ট ফর্ম এবং শিডিউল কল থেকে প্রেরিত বার্তা।
                </p>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800">
                  <Mail className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-mono text-slate-400">এখনও কোনো বুকিং বা মেসেজ আসেনি।</p>
                  <p className="text-xs font-mono text-slate-600 mt-1">
                    ভিজিটররা কন্টাক্ট পেজ থেকে যোগাযোগ করলেই এখানে রিয়েলটাইমে জমা হবে।
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b, idx) => (
                    <div
                      key={b.id || idx}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#F97316]" />
                          <h3 className="text-sm font-bold font-mono text-white">{b.name}</h3>
                          <span className="text-xs font-mono text-slate-400">({b.email})</span>
                        </div>
                        {b.selectedTime && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{b.selectedTime}</span>
                          </div>
                        )}
                      </div>
                      {b.topic && (
                        <p className="text-xs font-mono text-[#F97316]">টপিক: {b.topic}</p>
                      )}
                      {b.message && (
                        <p className="text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl">
                          {b.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SETTINGS & PROFILE */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-mono text-white">প্রোফাইল ও সিকিউরিটি সেটিংস</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  অ্যাডমিন পিন পরিবর্তন করুন এবং ওয়েবসাইটের প্রধান তথ্যাবলী আপডেট করুন।
                </p>
              </div>

              {/* PIN change section */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-white font-mono font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#F97316]" />
                  <span>অ্যাডমিন সিকিউরিটি পিন পরিবর্তন</span>
                </div>
                <form onSubmit={handleUpdatePin} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="নতুন পিন লিখুন (উদাঃ 1234)"
                    className="flex-1 px-4 py-2.5 bg-slate-850 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-[#F97316]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-mono font-bold shrink-0 transition shadow-lg shadow-[#F97316]/20"
                  >
                    পিন আপডেট করুন
                  </button>
                </form>
                {pinMessage && (
                  <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {pinMessage}
                  </p>
                )}
              </div>

              {/* Personal info edit form */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-mono text-white">ওয়েবসাইটের বিবরণ ও লিঙ্ক</h3>
                </div>
                <form onSubmit={handleSaveInfo} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">পেইজ টাইটেল (Title)</label>
                      <input
                        type="text"
                        value={infoForm.pageTitle}
                        onChange={(e) => setInfoForm({ ...infoForm, pageTitle: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">ইমেইল (Contact Email)</label>
                      <input
                        type="email"
                        value={infoForm.email}
                        onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">ব্র্যান্ড ব্লার্ব (Brand Statement)</label>
                    <textarea
                      rows={2}
                      value={infoForm.brandBlurb}
                      onChange={(e) => setInfoForm({ ...infoForm, brandBlurb: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">কী কাজ করেন (About Body)</label>
                    <textarea
                      rows={2}
                      value={infoForm.aboutBody}
                      onChange={(e) => setInfoForm({ ...infoForm, aboutBody: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn লিঙ্ক</label>
                      <input
                        type="text"
                        value={infoForm.linkedinUrl}
                        onChange={(e) => setInfoForm({ ...infoForm, linkedinUrl: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">ব্লগ / ওয়েবসাইট লিঙ্ক</label>
                      <input
                        type="text"
                        value={infoForm.blogUrl}
                        onChange={(e) => setInfoForm({ ...infoForm, blogUrl: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-mono font-bold transition shadow-lg shadow-[#F97316]/20"
                  >
                    {isInfoSaved ? 'সংরক্ষিত হয়েছে!' : 'সেভ করুন'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT PROJECT */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-2xl p-6 text-white max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold font-mono mb-4 text-[#F97316]">
                {editingProject ? 'প্রজেক্ট/কাজ এডিট করুন' : 'নতুন কাজ/অ্যাপ যোগ করুন'}
              </h3>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">টাইটেল *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="উদাঃ Hishabika Accounting"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ক্যাটাগরি *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.category || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      placeholder="উদাঃ Full Stack Web & Mobile App"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">সাবটাইটেল</label>
                  <input
                    type="text"
                    value={projectForm.subtitle || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    placeholder="স্মার্ট অ্যাকাউন্টিং প্ল্যাটফর্ম"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">সংক্ষিপ্ত বিবরণ (Short Description)</label>
                  <textarea
                    rows={2}
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="অ্যাপটির মূল কাজ সংক্ষেপে..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">বিস্তারিত বিবরণ (Long Description)</label>
                  <textarea
                    rows={3}
                    value={projectForm.longDescription || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                    placeholder="কি কি টেকনোলজি ও ফিচার ব্যবহার করা হয়েছে..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ট্যাগস (কমা দিয়ে লিখুন)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="উদাঃ React, Node.js, Vercel"
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tagInput.trim()) {
                          const newTags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
                          setProjectForm({
                            ...projectForm,
                            tags: Array.from(new Set([...(projectForm.tags || []), ...newTags]))
                          });
                          setTagInput('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-mono"
                    >
                      যুক্ত করুন
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {projectForm.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => setProjectForm({
                            ...projectForm,
                            tags: projectForm.tags?.filter(t => t !== tag)
                          })}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ইমেজ URL</label>
                    <input
                      type="text"
                      value={projectForm.image || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">বছর (Year)</label>
                    <input
                      type="text"
                      value={projectForm.year || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      placeholder="2025"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">লাইভ ডেমো URL</label>
                    <input
                      type="text"
                      value={projectForm.liveUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">গিটহাব URL</label>
                    <input
                      type="text"
                      value={projectForm.githubUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="projFeatured"
                    checked={projectForm.featured || false}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="rounded text-[#F97316] focus:ring-[#F97316]"
                  />
                  <label htmlFor="projFeatured" className="text-xs font-mono text-slate-300">
                    ফিচারড প্রজেক্ট হিসেবে প্রধান পাতায় হাইলাইট করুন
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-xs font-mono font-bold text-white shadow-lg shadow-[#F97316]/20"
                  >
                    সেভ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT SKILL */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-2xl p-6 text-white"
            >
              <button
                onClick={() => setIsSkillModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold font-mono mb-4 text-[#F97316]">
                {editingSkillName ? 'স্কিল এডিট করুন' : 'নতুন স্কিল যোগ করুন'}
              </h3>

              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">স্কিলের নাম *</label>
                  <input
                    type="text"
                    required
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    placeholder="উদাঃ Flutter, Next.js, Docker"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ক্যাটাগরি</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Backend & DB">Backend & DB</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="AI & Special">AI & Special</option>
                    <option value="Cloud & Special">Cloud & Special</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="skillFeatured"
                    checked={skillForm.featured || false}
                    onChange={(e) => setSkillForm({ ...skillForm, featured: e.target.checked })}
                    className="rounded text-[#F97316] focus:ring-[#F97316]"
                  />
                  <label htmlFor="skillFeatured" className="text-xs font-mono text-slate-300">
                    ৩ডি সোলার সিস্টেমের প্রধান অরবিটে হাইলাইট করুন (Featured)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsSkillModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-xs font-mono font-bold text-white"
                  >
                    সেভ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT IDEA */}
      <AnimatePresence>
        {isIdeaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0F172A] border border-slate-700 rounded-2xl p-6 text-white max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsIdeaModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold font-mono mb-4 text-[#F97316]">
                {editingIdea ? 'আইডিয়া এডিট করুন' : 'নতুন আইডিয়া বা আপকামিং অ্যাপ'}
              </h3>

              <form onSubmit={handleSaveIdea} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">আইডিয়া বা অ্যাপের নাম *</label>
                    <input
                      type="text"
                      required
                      value={ideaForm.title || ''}
                      onChange={(e) => setIdeaForm({ ...ideaForm, title: e.target.value })}
                      placeholder="উদাঃ Bengali Voice AI Agent"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">স্ট্যাটাস (Status)</label>
                    <select
                      value={ideaForm.status || 'Concept'}
                      onChange={(e) => setIdeaForm({ ...ideaForm, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316]"
                    >
                      <option value="Concept">Concept (আইডিয়া পর্যায়)</option>
                      <option value="In Development">In Development (চলমান কাজ)</option>
                      <option value="Prototype">Prototype (প্রোটোটাইপ)</option>
                      <option value="MVP Ready">MVP Ready (রেডি)</option>
                      <option value="Planned">Planned (পরিকল্পিত)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ক্যাটাগরি</label>
                  <input
                    type="text"
                    value={ideaForm.category || ''}
                    onChange={(e) => setIdeaForm({ ...ideaForm, category: e.target.value })}
                    placeholder="AI & Speech Processing, Mobile Architecture..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">বিবরণ (Description)</label>
                  <textarea
                    rows={3}
                    value={ideaForm.description || ''}
                    onChange={(e) => setIdeaForm({ ...ideaForm, description: e.target.value })}
                    placeholder="এই আইডিয়া বা অ্যাপটির লক্ষ্য এবং সুবিধা..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">টেকনিক্যাল নোটস বা আর্কিটেকচার</label>
                  <input
                    type="text"
                    value={ideaForm.notes || ''}
                    onChange={(e) => setIdeaForm({ ...ideaForm, notes: e.target.value })}
                    placeholder="উদাঃ WebRTC audio streaming, Gemini Live API..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ট্যাগস (কমা দিয়ে লিখুন)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ideaTagInput}
                      onChange={(e) => setIdeaTagInput(e.target.value)}
                      placeholder="Next.js, Python, WebSocket"
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (ideaTagInput.trim()) {
                          const newTags = ideaTagInput.split(',').map(t => t.trim()).filter(Boolean);
                          setIdeaForm({
                            ...ideaForm,
                            tags: Array.from(new Set([...(ideaForm.tags || []), ...newTags]))
                          });
                          setIdeaTagInput('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-mono"
                    >
                      যুক্ত করুন
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {ideaForm.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => setIdeaForm({
                            ...ideaForm,
                            tags: ideaForm.tags?.filter(t => t !== tag)
                          })}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">টার্গেট বছর / সময়</label>
                    <input
                      type="text"
                      value={ideaForm.targetYear || ''}
                      onChange={(e) => setIdeaForm({ ...ideaForm, targetYear: e.target.value })}
                      placeholder="2026"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">প্রোটোটাইপ লিঙ্ক (যদি থাকে)</label>
                    <input
                      type="text"
                      value={ideaForm.demoUrl || ''}
                      onChange={(e) => setIdeaForm({ ...ideaForm, demoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsIdeaModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-xs font-mono font-bold text-white shadow-lg shadow-[#F97316]/20"
                  >
                    সেভ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {/* RESOURCE MODAL (ZIP, APK, VIDEO, SOURCE CODE) */}
        {isResourceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <FileArchive className="w-5 h-5 text-[#F97316]" />
                  <h3 className="text-lg font-bold font-mono text-white">
                    {editingResource ? 'ফাইল/রিসোর্স সম্পাদনা' : 'নতুন ফাইল বা জিপ (ZIP) যোগ করুন'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsResourceModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveResource} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    ফাইলের নাম / টাইটেল *
                  </label>
                  <input
                    type="text"
                    required
                    value={resourceForm.title || ''}
                    onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                    placeholder="উদাঃ Full-Stack E-Commerce Source Code (ZIP)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ক্যাটাগরি</label>
                    <select
                      value={resourceForm.category || 'Apps & ZIPs'}
                      onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    >
                      <option value="Apps & ZIPs">Apps & ZIPs</option>
                      <option value="Source Code">Source Code</option>
                      <option value="Videos & Demos">Videos & Demos</option>
                      <option value="Guides & Docs">Guides & Docs</option>
                      <option value="Media & Assets">Media & Assets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ফাইল টাইপ</label>
                    <select
                      value={resourceForm.fileType || 'zip'}
                      onChange={(e) => setResourceForm({ ...resourceForm, fileType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    >
                      <option value="zip">.ZIP Archive (সোর্স ফাইল/বান্ডেল)</option>
                      <option value="apk">.APK (Android মোবাইল অ্যাপ)</option>
                      <option value="video">.MP4 / Video (ভিডিও ডেমো)</option>
                      <option value="code">.CODE / Repo (সোর্স কোড)</option>
                      <option value="pdf">.PDF (ডকুমেন্টেশন / গাইড)</option>
                      <option value="image">.PNG / Image (ডিজাইন / ছবি)</option>
                      <option value="other">অন্যান্য (Other)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    ডাউনলোড লিঙ্ক (Download URL) *
                  </label>
                  <input
                    type="url"
                    required
                    value={resourceForm.downloadUrl || ''}
                    onChange={(e) => setResourceForm({ ...resourceForm, downloadUrl: e.target.value })}
                    placeholder="Google Drive, GitHub Release, Dropbox, বা ডিরেক্ট ফাইল লিঙ্ক..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-[#F97316] outline-none"
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                    টিপস: যেকোনো গুগল ড্রাইভ বা গিটহাব রিলিজের লিঙ্ক সরাসরি পেস্ট করতে পারেন।
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ফাইলের সাইজ (Size)</label>
                    <input
                      type="text"
                      value={resourceForm.fileSize || ''}
                      onChange={(e) => setResourceForm({ ...resourceForm, fileSize: e.target.value })}
                      placeholder="উদাঃ 45.2 MB"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ভার্সন (Version)</label>
                    <input
                      type="text"
                      value={resourceForm.version || ''}
                      onChange={(e) => setResourceForm({ ...resourceForm, version: e.target.value })}
                      placeholder="v1.0.0 / 1080p"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">প্রিভিউ লিঙ্ক (যদি থাকে)</label>
                    <input
                      type="text"
                      value={resourceForm.previewUrl || ''}
                      onChange={(e) => setResourceForm({ ...resourceForm, previewUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">বিবরণ (Description)</label>
                  <textarea
                    rows={3}
                    value={resourceForm.description || ''}
                    onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                    placeholder="এই ফাইলের মধ্যে কী কী আছে এবং কীভাবে ব্যবহার করতে হবে..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ট্যাগস (কমা দিয়ে লিখুন)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={resourceTagInput}
                      onChange={(e) => setResourceTagInput(e.target.value)}
                      placeholder="ZIP, Next.js, APK, Video"
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (resourceTagInput.trim()) {
                          const newTags = resourceTagInput.split(',').map(t => t.trim()).filter(Boolean);
                          setResourceForm({
                            ...resourceForm,
                            tags: Array.from(new Set([...(resourceForm.tags || []), ...newTags]))
                          });
                          setResourceTagInput('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-mono hover:bg-slate-700 text-white"
                    >
                      যুক্ত করুন
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {resourceForm.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono flex items-center gap-1"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => setResourceForm({
                            ...resourceForm,
                            tags: resourceForm.tags?.filter(t => t !== tag)
                          })}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsResourceModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-xs font-mono font-bold text-white shadow-lg shadow-[#F97316]/20"
                  >
                    সেভ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
