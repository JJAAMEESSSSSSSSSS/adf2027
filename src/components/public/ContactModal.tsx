import React, { useState } from 'react';
import { ContactInquiry } from '../../types';
import { X, Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { FoxMascot } from '../common/FoxMascot';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onSubmitInquiry
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    onSubmitInquiry({
      fullName,
      email,
      subject: subject || 'General ADF2027 Inquiry',
      message
    });

    setSent(true);
  };

  const handleDone = () => {
    setSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#1C0E07] text-white rounded-3xl border-3 border-[#E65A15] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1107] text-amber-200 hover:text-white hover:bg-[#E65A15] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="font-tech text-2xl font-black text-white uppercase">
              Message Transmitted!
            </h3>
            <p className="font-mono text-xs text-amber-200/80">
              Thank you! Your message has been forwarded to event coordinators Dr. Mary Jane Rabena and Sir Bon Flores. We will respond to your email promptly.
            </p>
            <button
              onClick={handleDone}
              className="py-2.5 px-6 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FoxMascot size={36} />
              <div>
                <h3 className="font-tech text-xl sm:text-2xl font-black text-white uppercase">
                  Contact Coordinators
                </h3>
                <p className="font-mono text-[11px] text-[#E65A15]">
                  Dr. Mary Jane Rabena & Sir Bon Flores
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
              <div>
                <label className="block text-amber-200 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. msantos@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule inquiry or Booth question"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">Message *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your inquiry here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to CMS</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
