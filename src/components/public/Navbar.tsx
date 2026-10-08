import React from 'react';
import { FoxMascot } from '../common/FoxMascot';
import { Home, User, Users, Play, Image, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenAdmin,
  onOpenContact
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#160803] border-b border-[#351508] shadow-lg text-white">
      {/* Top tiny platform badge as shown in screenshot */}
      <div className="bg-[#120602] py-0.5 text-center border-b border-[#240e05]">
        <span className="text-[10px] text-amber-200/50 tracking-wider">
          Holy Angel University • School Of Computing • ADF2027
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3.5 cursor-pointer group py-2"
        >
          <FoxMascot size={46} className="transform group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-tech text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                ADF
              </span>
              <span className="font-tech text-2xl font-black tracking-tight text-[#E65A15]">
                2027
              </span>
            </div>
            <span className="font-tech text-[10px] tracking-widest text-[#FED7AA] font-semibold uppercase -mt-1">
              A DAY WITH <span className="text-[#E65A15] font-bold">THE FOXES</span>
            </span>
          </div>
        </div>

        {/* Center Tagline box as seen in screenshot */}
        <div className="hidden lg:flex items-center px-4 py-1.5 rounded bg-[#210D05]/80 border border-[#431B09] text-[11px] font-mono text-[#E0A878]">
          <span>Rooted In Code, Driven By Purpose.</span>
        </div>

        {/* Navigation Items with Icons matching screenshot */}
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] hover:bg-[#2A1107] text-[#F5E6D3] transition-colors"
          >
            <Home className="w-4 h-4 text-[#E65A15]" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] hover:bg-[#2A1107] text-[#F5E6D3] transition-colors"
          >
            <User className="w-4 h-4 text-[#E65A15]" />
            <span className="hidden sm:inline">About</span>
          </button>

          <button
            onClick={() => onNavigate('organizations')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] hover:bg-[#2A1107] text-[#F5E6D3] transition-colors"
          >
            <Users className="w-4 h-4 text-[#E65A15]" />
            <span className="hidden md:inline">Organizations</span>
          </button>

          <button
            onClick={() => onNavigate('video')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] hover:bg-[#2A1107] text-[#F5E6D3] transition-colors"
          >
            <Play className="w-4 h-4 text-[#E65A15]" />
            <span className="hidden md:inline">Video</span>
          </button>

          <button
            onClick={() => onNavigate('gallery')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] hover:bg-[#2A1107] text-[#F5E6D3] transition-colors"
          >
            <Image className="w-4 h-4 text-[#E65A15]" />
            <span className="hidden lg:inline">Gallery</span>
          </button>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] hover:bg-[#2A1107] text-[#F5E6D3] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#E65A15]" />
            <span className="hidden sm:inline">Contact</span>
          </button>

          {/* Admin CMS Access Button */}
          <button
            onClick={onOpenAdmin}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E65A15] hover:bg-[#D95A11] text-white font-semibold text-xs transition-all shadow-md hover:shadow-orange-900/40 cursor-pointer"
            title="Open Admin CMS Dashboard"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>CMS Portal</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
