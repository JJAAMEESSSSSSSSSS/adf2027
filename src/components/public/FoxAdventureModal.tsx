import React, { useState } from 'react';
import { Organization, Registration } from '../../types';
import { FoxMascot, PixelHearts } from '../common/FoxMascot';
import { X, CheckCircle, Ticket, Sparkles, User, Mail, GraduationCap, Building } from 'lucide-react';

interface FoxAdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizations: Organization[];
  onRegister: (reg: Omit<Registration, 'id' | 'createdAt' | 'status'>) => void;
}

export const FoxAdventureModal: React.FC<FoxAdventureModalProps> = ({
  isOpen,
  onClose,
  organizations,
  onRegister
}) => {
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [yearLevel, setYearLevel] = useState('1st Year');
  const [program, setProgram] = useState('BS Information Technology');
  const [preferredOrg, setPreferredOrg] = useState(organizations[0]?.name || 'Code Geeks');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    onRegister({
      studentId: studentId || `2027-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName,
      email,
      yearLevel,
      program,
      preferredOrg
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#1C0E07] text-white rounded-3xl border-3 border-[#E65A15] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1107] text-amber-200 hover:text-white hover:bg-[#E65A15] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation Ticket Card */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-tech text-2xl sm:text-3xl font-black text-white uppercase">
              YOU'RE IN THE FOX ADVENTURE!
            </h3>

            <p className="font-mono text-xs text-amber-200/80 max-w-md mx-auto">
              Your registration pass has been created. Present this digital pass at the SJH Building registration booth on February 23-24, 2027.
            </p>

            <div className="bg-[#2A1107] p-5 rounded-2xl border border-[#54210C] text-left space-y-2 font-mono text-xs my-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-[#3E1A0C] pb-2">
                <span className="text-stone-400">STUDENT PASS:</span>
                <span className="text-[#E65A15] font-bold">ADF2027-{studentId || 'CONFIRMED'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">NAME:</span>
                <span className="text-white font-semibold">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">AFFILIATION:</span>
                <span className="text-amber-300">{preferredOrg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">VENUE:</span>
                <span className="text-white">SJH Building (9:00 AM - 4:00 PM)</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                Done & Return to Event
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FoxMascot size={40} />
              <div>
                <h3 className="font-tech text-xl sm:text-2xl font-black text-white uppercase">
                  ENTER THE FOX ADVENTURE
                </h3>
                <p className="font-mono text-xs text-[#E65A15] font-semibold">
                  School of Computing • Official Student RSVP
                </p>
              </div>
            </div>

            <p className="font-mono text-xs text-[#FED7AA] mb-6 leading-relaxed">
              Experience interactive booths, gaming tournaments, specialized workshops, and connect with student organizations!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-200 font-semibold mb-1">
                    Student ID Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2023-10942"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juan Dela Cruz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">
                  HAU / Student Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jdelacruz@student.hau.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-200 font-semibold mb-1">
                    Year Level / Category
                  </label>
                  <select
                    value={yearLevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  >
                    <option value="Incoming Freshman">Incoming Freshman</option>
                    <option value="Senior High School (STEM)">Senior High School (STEM)</option>
                    <option value="1st Year">1st Year College</option>
                    <option value="2nd Year">2nd Year College</option>
                    <option value="3rd Year">3rd Year College</option>
                    <option value="4th Year">4th Year College</option>
                    <option value="Non-Computing Major">Non-Computing Major Guest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">
                    Academic Program
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  >
                    <option value="BS Information Technology">BS Information Technology</option>
                    <option value="BS Computer Science">BS Computer Science</option>
                    <option value="BS Entertainment & Multimedia Computing">BS Entertainment & Multimedia Computing</option>
                    <option value="BS Cybersecurity / Network">BS Cybersecurity Track</option>
                    <option value="Other / Non-Major">Other School / Guest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">
                  Primary Organization Interest
                </label>
                <select
                  value={preferredOrg}
                  onChange={(e) => setPreferredOrg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                >
                  {organizations.map((org) => (
                    <option key={org.id} value={org.name}>
                      {org.name} ({org.acronym})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-950/60 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Registration & Get Pass</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
