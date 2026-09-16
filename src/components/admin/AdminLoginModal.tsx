import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, X, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';
import { usePortfolioStore } from '../../lib/portfolioStore';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { checkAdminPin, setAdminLoggedIn } = usePortfolioStore();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      if (checkAdminPin(pin)) {
        setAdminLoggedIn(true);
        setIsSubmitting(false);
        setPin('');
        onSuccess();
      } else {
        setError('ভুল সিকিউরিটি পিন! ডিফল্ট পিন হলো: 7860');
        setIsSubmitting(false);
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl p-6 text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                Admin Portal
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F97316] text-white uppercase font-mono">
                  Yasin Studio
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                লগইন করে ওয়েবসাইট অটোমেটেড কন্ট্রোল করুন
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                সিকিউরিটি পিন (Security PIN)
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError('');
                  }}
                  placeholder="পিন লিখুন (ডিফল্ট: 7860)"
                  autoFocus
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition text-sm pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-[11px] font-mono text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-[#F97316]">
                <KeyRound className="w-3.5 h-3.5" />
                <span className="font-bold">ডিফল্ট মাস্টার পিন: 7860</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                (প্যানেলে লগইন করার পর সেটিংস ট্যাব থেকে এই পিন পরিবর্তন করতে পারবেন)
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-mono transition"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !pin.trim()}
                className="w-1/2 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-50 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-[#F97316]/20"
              >
                <ShieldCheck className="w-4 h-4" />
                {isSubmitting ? 'যাচাই হচ্ছে...' : 'লগইন করুন'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
