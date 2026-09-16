import React, { useState } from 'react';
import { Calendar as CalendarIcon, Send, Check, Code, Cpu, Smartphone, Database, Layers } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ProjectSlideshow } from './ProjectSlideshow';
import { Project } from '../types';

interface ContactPageProps {
  onSelectProject?: (project: Project) => void;
}

const coreSkillsCategories = [
  { 
    domain: 'Full Stack & Web Apps', 
    skills: 'React, Next.js, TypeScript, Tailwind CSS, Node.js',
    icon: <Code className="w-4 h-4 text-[#F97316]" /> 
  },
  { 
    domain: 'Mobile Apps Development', 
    skills: 'Flutter, Android, Cross-Platform Architecture',
    icon: <Smartphone className="w-4 h-4 text-[#F97316]" /> 
  },
  { 
    domain: 'Backend & Cloud Databases', 
    skills: 'Firebase, Supabase, MySQL, SQLite, REST APIs',
    icon: <Database className="w-4 h-4 text-[#F97316]" /> 
  },
  { 
    domain: 'AI Integration & Automation', 
    skills: 'AI Avatars, Digital Video, System Workflows',
    icon: <Cpu className="w-4 h-4 text-[#F97316]" /> 
  },
  { 
    domain: 'DevOps & System Architecture', 
    skills: 'Vercel, Cloudflare, Webhooks, CI/CD Pipelines',
    icon: <Layers className="w-4 h-4 text-[#F97316]" /> 
  },
];

const topicsList = [
  'Full Stack Web Development',
  'Mobile App Development (Flutter)',
  'React / Next.js Development',
  'AI Integration & Automation',
  'System Integration & Workflows',
  'REST API & Database Design',
  'Firebase & Cloud Infrastructure',
];

export const ContactPage: React.FC<ContactPageProps> = ({ onSelectProject }) => {
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [topic, setTopic] = useState('Full Stack Web Development');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save booking to Firebase Firestore database
      await addDoc(collection(db, 'bookings'), {
        name,
        email,
        topic,
        selectedTime,
        message,
        createdAt: serverTimestamp(),
      });
      
      // 2. Safely attempt to send booking via PHP backend (for InfinityFree hosting) & server API
      try {
        await Promise.allSettled([
          fetch('/api/send-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, topic, selectedTime, message }),
          }),
          fetch('php/booking.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, topic, selectedTime, message }),
          })
        ]);
      } catch (dispatchErr) {
        console.warn('Booking endpoint dispatch warning:', dispatchErr);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF8F5] text-[#1F2937] border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center flex-grow text-[#1F2937]">Selected Work & Consultation</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Selected Work Slideshow & Core Skills */}
          <div className="space-y-8">
            <ProjectSlideshow onSelectProject={onSelectProject} />

            <div>
                <h3 className="text-xl font-bold mb-4 text-[#1F2937]">Skills & Core Competencies</h3>
                <div className="bg-white border border-[#E5E7EB] shadow-xs rounded-2xl p-4">
                  <div className="space-y-3">
                    {coreSkillsCategories.map((item) => (
                      <div key={item.domain} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] hover:border-[#F97316]/40 transition-all">
                        <div className="flex items-center gap-2 mb-1">
                          {item.icon}
                          <span className="font-bold text-xs text-[#1F2937]">{item.domain}</span>
                        </div>
                        <p className="text-[11px] font-mono text-[#F97316] font-semibold pl-6">{item.skills}</p>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-[#E5E7EB] shadow-lg p-8 rounded-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-sans font-medium mb-3">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1F2937]">
                    Schedule a Call with Md Yasin
                    </h3>
                </div>

                <div>
                    <label className="text-xs font-mono font-semibold text-[#4B5563] block mb-2">Topic of Discussion</label>
                    <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-[#1F2937] font-sans text-sm focus:outline-none focus:border-[#F97316] focus:bg-white">
                    {topicsList.map((t) => <option key={t} value={t} className="bg-white text-[#1F2937]">{t}</option>)}
                    </select>
                </div>

                <div>
                    <label className="text-xs font-mono font-semibold text-[#4B5563] block mb-2">Select Time Slot (EST / GMT+6)</label>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                            <button type="button" key={slot} onClick={() => setSelectedTime(slot)} className={`py-2 px-3 rounded-lg text-xs font-sans transition-all ${selectedTime === slot ? 'bg-[#F97316] text-white font-bold shadow-md' : 'bg-[#FAF8F5] border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F5F3EF]'}`}>
                            {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-mono font-semibold text-[#4B5563] block mb-1.5">Your Name</label>
                    <input type="text" placeholder="e.g. Alex Vance" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-[#1F2937] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:bg-white" />
                </div>
                
                <div>
                    <label className="text-xs font-mono font-semibold text-[#4B5563] block mb-1.5">Email Address</label>
                    <input type="email" placeholder="alex@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-[#1F2937] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:bg-white" />
                </div>
                
                <div>
                    <label className="text-xs font-mono font-semibold text-[#4B5563] block mb-1.5">Your Message</label>
                    <textarea placeholder="Describe your project or query" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-[#1F2937] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:bg-white" rows={4} />
                </div>
                
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-[#1F2937] text-white font-bold text-sm hover:bg-[#F97316] transition-all shadow-md flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Confirm Booking'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <Check className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-[#1F2937]">Request Sent!</h4>
                <p className="text-[#6B7280] mt-2">Thank you, {name}. I will get back to you soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

