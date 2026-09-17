import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileArchive, 
  Download, 
  ExternalLink, 
  Search, 
  Smartphone, 
  Video, 
  Code2, 
  FileText, 
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  HardDrive,
  Eye,
  Layers
} from 'lucide-react';
import { usePortfolioStore } from '../lib/portfolioStore';
import { ResourceItem } from '../types';

export const ResourcesSection: React.FC = () => {
  const { resources, incrementDownloadCount } = usePortfolioStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Apps & ZIPs',
    'Source Code',
    'Videos & Demos',
    'Guides & Docs',
    'Media & Assets'
  ];

  const filteredResources = resources.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query)) ||
      item.fileType.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (fileType: ResourceItem['fileType']) => {
    switch (fileType) {
      case 'zip':
        return <FileArchive className="w-5 h-5 text-amber-500" />;
      case 'apk':
        return <Smartphone className="w-5 h-5 text-emerald-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-rose-500" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-sky-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-indigo-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <Layers className="w-5 h-5 text-orange-500" />;
    }
  };

  const getFileBadgeColor = (fileType: ResourceItem['fileType']) => {
    switch (fileType) {
      case 'zip':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'apk':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'video':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      case 'code':
        return 'bg-sky-500/10 text-sky-600 border-sky-500/20';
      case 'pdf':
        return 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20';
      default:
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    }
  };

  const handleDownload = (item: ResourceItem) => {
    incrementDownloadCount(item.id);
    setDownloadedId(item.id);
    setTimeout(() => setDownloadedId(null), 3000);
    window.open(item.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="resources" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-mono font-semibold uppercase tracking-widest mb-4 border border-[#F97316]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Files, ZIPs & Digital Assets</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Resources, Source Files <span className="text-[#F97316]">& Downloads</span>
        </h2>
        
        <p className="max-w-2xl text-base sm:text-lg text-[#6B7280]">
          ডাউনলোডযোগ্য সোর্স কোড জিপ (ZIP), মোবাইল অ্যাপ বিল্ড (APK), আর্কিটেকচারাল ভিডিও ডেমো এবং টেকনিক্যাল রিসোর্সসমূহ।
        </p>

        {/* Filter & Search Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সার্চ করুন (ZIP, APK, Video, Source Code, React...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#111827] text-white shadow-md'
                  : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6] hover:text-[#111827]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((item) => {
            const isDownloaded = downloadedId === item.id;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-white/90 backdrop-blur-md border border-[#E5E7EB] p-6 hover:shadow-xl hover:border-[#F97316]/40 transition-all duration-300"
              >
                {/* Top Row: Icon & File Badges */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] group-hover:scale-105 transition-transform">
                      {getFileIcon(item.fileType)}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase border ${getFileBadgeColor(item.fileType)}`}>
                        .{item.fileType}
                      </span>
                      {item.fileSize && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#F3F4F6] text-[#4B5563]">
                          {item.fileSize}
                        </span>
                      )}
                      {item.version && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-50 text-blue-600 border border-blue-200">
                          {item.version}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="mb-2">
                    <span className="text-xs font-mono font-semibold text-[#F97316]">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#111827] mt-0.5 group-hover:text-[#F97316] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#FAF8F5] text-[#6B7280] border border-[#E5E7EB]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>{item.downloadsCount || 0} downloads</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.previewUrl && (
                      <a
                        href={item.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#F3F4F6] text-[#4B5563] hover:text-[#111827] hover:bg-[#E5E7EB] transition-all"
                        title="Preview / Details"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDownload(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                        isDownloaded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#F97316] text-white hover:bg-[#EA580C]'
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>ডাউনলোড</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#D1D5DB]">
          <FileArchive className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
          <p className="text-base font-semibold text-[#374151]">কোনো ফাইল বা রিসোর্স পাওয়া যায়নি</p>
          <p className="text-xs text-[#6B7280] mt-1">অন্য কোনো ক্যাটাগরি অথবা সার্চ কি-ওয়ার্ড দিয়ে চেষ্টা করুন।</p>
        </div>
      )}
    </section>
  );
};
