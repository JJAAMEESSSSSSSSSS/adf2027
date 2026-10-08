import React from 'react';
import { EventInfo } from '../../types';
import { PixelHearts } from '../common/FoxMascot';
import { Sparkles, Terminal, ChevronRight, Layers, Cpu, Award } from 'lucide-react';

interface HeroSectionProps {
  eventInfo: EventInfo;
  onOpenAdventure: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  eventInfo,
  onOpenAdventure
}) => {
  return (
    <section id="hero" className="relative bg-[#F7EBD8] text-[#1B0B04] pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top right pixel hearts */}
      <div className="max-w-6xl mx-auto flex justify-end pr-6 mb-2">
        <PixelHearts count={3} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Event Poster Frame */}
        <div className="lg:col-span-7 relative">
          {/* Subtle background curved card placeholder */}
          <div className="absolute -left-4 -top-4 w-48 h-56 bg-[#ECD9BF] rounded-3xl -z-0 opacity-70 hidden sm:block" />

          {/* Main Poster Container */}
          <div className="relative z-10 bg-[#160803] text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-4 border-[#3D180A] shadow-2xl overflow-hidden">
            {/* Poster Header */}
            <div className="flex items-center justify-between border-b border-[#3D180A]/80 pb-3 mb-4">
              <span className="font-tech text-xs tracking-widest text-amber-200 uppercase font-bold">
                SCHOOL OF COMPUTING
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-mono">
                <span className="text-stone-400">COLLABORATED WITH:</span>
                <span className="px-1.5 py-0.5 rounded bg-[#E65A15] text-white font-bold">SOC</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-700 text-white font-bold">ORGS</span>
              </div>
            </div>

            {/* Poster Big Title */}
            <div className="text-center my-3 relative">
              <h1 className="font-tech text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-[#E65A15] tracking-tight uppercase drop-shadow">
                A DAY WITH THE FOXES
              </h1>
              <div className="mt-1 font-tech font-bold text-xs sm:text-sm text-[#FFB074] tracking-widest uppercase">
                WHERE FUTURES ARE CODED.
              </div>
            </div>

            {/* Sub-banner callout */}
            <div className="bg-[#E65A15] text-[#160803] font-black text-center py-1.5 px-3 rounded-lg text-xs sm:text-sm uppercase tracking-wide my-3 font-tech shadow">
              JOIN US AND DISCOVER WHERE YOUR JOURNEY BEGINS!
            </div>

            {/* Main Poster Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              {/* Retro code & details box */}
              <div className="bg-[#240E05] p-3 rounded-xl border border-[#481D0B] font-mono text-[11px] leading-relaxed text-amber-100/90">
                <div className="text-[#FF8A3D] font-bold mb-1 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>// SOC_EXPLORER.SH</span>
                </div>
                <p className="text-[10px] text-stone-300 mb-2">
                  Come and experience life in the School of Computing! Meet our organizations, explore specialisations, participate in interesting activities, see live demos, and discover endless possibilities.
                </p>
                <div className="p-2 rounded bg-[#160803] border border-[#3E1A0C] text-[10px] text-emerald-400 font-mono">
                  <code>&lt;div class=&quot;future&quot;&gt;The quick brown fox...&lt;/div&gt; :)</code>
                </div>
              </div>

              {/* Event highlight list box */}
              <div className="bg-[#240E05] p-3 rounded-xl border border-[#481D0B] flex flex-col justify-between">
                <div className="space-y-1.5 font-tech text-xs">
                  <div className="flex items-center gap-2 text-amber-200 font-semibold">
                    <span className="w-2 h-2 rounded-sm bg-[#E65A15]" />
                    <span>INTERACTIVE BOOTHS</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200 font-semibold">
                    <span className="w-2 h-2 rounded-sm bg-[#E65A15]" />
                    <span>LIVE DEMONSTRATIONS</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200 font-semibold">
                    <span className="w-2 h-2 rounded-sm bg-[#E65A15]" />
                    <span>FUN GAMES & ACTIVITIES</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200 font-semibold">
                    <span className="w-2 h-2 rounded-sm bg-[#E65A15]" />
                    <span>EXHIBITS, ORGS SHOWCASE</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200 font-semibold">
                    <span className="w-2 h-2 rounded-sm bg-[#E65A15]" />
                    <span>PRIZES, GIVEAWAYS & MORE</span>
                  </div>
                </div>

                {/* Date & Campus badge */}
                <div className="mt-3 pt-2 border-t border-[#3E1A0C] flex items-center justify-between text-[11px] font-mono text-amber-300">
                  <span className="font-bold text-white">FEBRUARY 2027</span>
                  <span className="text-stone-300">HOLY ANGEL UNIVERSITY</span>
                </div>
              </div>
            </div>

            {/* Poster footer shoutout */}
            <div className="text-center pt-2 border-t border-[#3D180A]/60">
              <span className="font-tech text-xs tracking-wider text-amber-300 font-bold uppercase">
                SEE YOU AT ADF2027! 🦊
              </span>
            </div>
          </div>

          {/* Retro Pixel Pointer Cursor & Pixel hearts under poster as seen in screenshot */}
          <div className="flex items-center justify-between mt-3 px-6">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#743512] font-semibold">
              <span className="text-xl select-none" style={{ imageRendering: 'pixelated' }}>👆</span>
              <span className="hidden sm:inline">Explore the official event showcase!</span>
            </div>
            <PixelHearts count={3} />
          </div>
        </div>

        {/* Right Side: "About the Event" Dark Card */}
        <div id="about" className="lg:col-span-5">
          <div className="bg-[#1C0E07] text-[#FFF7ED] p-7 sm:p-9 rounded-3xl border-2 border-[#431B0A] shadow-2xl relative">
            {/* Sparkles icon header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-tech text-2xl sm:text-3xl font-black tracking-tight text-white">
                About the Event
              </h2>
              <Sparkles className="w-6 h-6 text-[#E65A15] animate-pulse" />
            </div>

            {/* Description Text */}
            <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#FED7AA] mb-6">
              {eventInfo.aboutText}
            </p>

            {/* Showcase list */}
            <div className="mb-8">
              <div className="font-tech text-xs sm:text-sm font-bold text-white mb-3">
                The Event Showcases Different Organizations And Specialization Areas Such As:
              </div>
              <ul className="space-y-2 font-mono text-xs text-[#FDBA74] pl-2">
                {eventInfo.showcaseOrgs.map((org, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="text-[#E65A15] text-base leading-none">•</span>
                    <span>{org}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button: ENTER THE FOX ADVENTURE > */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAdventure}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-sm tracking-wider uppercase transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-950/50 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>ENTER THE FOX ADVENTURE</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="hidden sm:flex items-center justify-center text-[#E65A15] select-none text-xl">
                ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
