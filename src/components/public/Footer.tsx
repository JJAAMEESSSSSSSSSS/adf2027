import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { FoxMascot } from '../common/FoxMascot';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#D95A11] text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-[#B84E10]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Seals and School Name */}
        <div className="flex items-center gap-4 text-center md:text-left">
          {/* Seals graphic */}
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-full bg-white/95 p-1 flex items-center justify-center shadow-md">
              <span className="font-tech text-xs font-black text-[#8A2109]">HAU</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-amber-200/90 p-1 flex items-center justify-center shadow-md">
              <FoxMascot size={28} />
            </div>
          </div>

          <div>
            <div className="font-tech text-base sm:text-lg font-black tracking-wide uppercase text-white drop-shadow-sm">
              Holy Angel University
            </div>
            <div className="font-tech text-xs font-semibold text-amber-100 tracking-wider uppercase">
              School Of Computing • ADF2027
            </div>
          </div>
        </div>

        {/* Right: Official Contact info from Screenshot 3 */}
        <div className="flex flex-col gap-1.5 font-mono text-xs text-amber-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-white" />
            <span>#1 Holy Angel Avenue, Sto. Rosario, Angeles City, Philippines 2009</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 shrink-0 text-white" />
            <span>(63) 045-625-5748</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 shrink-0 text-white" />
              <a href="mailto:Admissions@Hau.Edu.Ph" className="hover:underline">
                Admissions@Hau.Edu.Ph
              </a>
            </div>

            <button
              onClick={onOpenAdmin}
              className="text-[11px] underline opacity-80 hover:opacity-100 flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
