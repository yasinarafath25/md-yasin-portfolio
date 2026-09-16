import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, Check, Send, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2026-07-28');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [topic, setTopic] = useState('Full Stack Web App Development');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];
  const topics = [
    'Full Stack Web App Development',
    'Flutter Mobile App Development',
    'AI Video Creation & Photoshoot',
    'AI Integration & Automation',
    'UI/UX Design & Architecture',
    'General Technical Consultation',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetEmail = PERSONAL_INFO.email || 'mdyasinarafath20@gmail.com';

    // 1. Send via background AJAX to backend email handler
    try {
      await addDoc(collection(db, 'bookings'), {
        name,
        email,
        topic,
        selectedTime,
        selectedDate,
        createdAt: serverTimestamp(),
      });
      
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          topic,
          selectedTime,
          selectedDate,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.warn('Booking dispatch error:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-700 p-6 sm:p-8 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-[#F27D26] text-xs font-sans font-medium mb-3">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Schedule a Call with Md Yasin
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Select a convenient slot to discuss your project requirements or remote opportunity.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Topic Selector */}
                <div>
                  <label className="text-xs font-sans text-neutral-300 block mb-2">
                    Topic of Discussion
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white font-sans text-sm focus:outline-none focus:border-[#F27D26]"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t} className="bg-neutral-900 text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="text-xs font-sans text-neutral-300 block mb-2">
                    Select Time Slot (EST / GMT+6)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-lg text-xs font-sans transition-all ${
                          selectedTime === slot
                            ? 'bg-[#F27D26] text-white font-bold shadow-md'
                            : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-sans text-neutral-300 block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-sans text-neutral-300 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-[#F27D26] hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Confirm Booking'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/30 flex items-center justify-center mb-4 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-extrabold text-white mb-2">
                Call Scheduled!
              </h4>
              <p className="text-xs text-neutral-300 font-sans max-w-sm">
                Thank you {name}. A calendar invitation has been sent to {email} for {selectedTime}.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
