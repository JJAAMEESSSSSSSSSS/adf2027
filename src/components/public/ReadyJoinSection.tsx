import React from 'react';
import { FoxMascot, PixelHearts } from '../common/FoxMascot';
import { EventInfo } from '../../types';
import { ChevronRight, Gamepad2 } from 'lucide-react';

interface ReadyJoinSectionProps {
  eventInfo: EventInfo;
  onOpenAdventure: () => void;
}

export const ReadyJoinSection: React.FC<ReadyJoinSectionProps> = ({
  eventInfo,
  onOpenAdventure
}) => {
  return (
    <section className="relative bg-[#F7EBD8] text-[#1B0B04] py-14 px-4 sm:px-6 lg:px-8 border-t border-[#DEC8AC]">
      <div className="max-w-6xl mx-auto">
        {/* Top Header bar with divider as seen in Screenshot 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2">
          <div className="flex items-center gap-2">
            <FoxMascot size={32} />
            <span className="font-tech text-xl sm:text-2xl font-black text-[#1B0B04]">
              ADF<span className="text-[#E65A15]">2027</span>
            </span>
          </div>
          <span className="font-mono text-xs text-[#743512] font-semibold">
            {eventInfo.tagline}
          </span>
        </div>

        {/* Orange Accent Rule */}
        <div className="w-full h-0.5 bg-[#E65A15] mb-6 opacity-75" />

        {/* Right floating pixel hearts */}
        <div className="flex justify-end pr-6 mb-2">
          <PixelHearts count={2} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Retro Arcade Cabinet Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-[#160803] p-5 sm:p-7 rounded-3xl border-4 border-[#3D180A] shadow-2xl text-white">
              {/* Arcade Header Date Badge */}
              <div className="flex items-center justify-between bg-[#C84E0C] text-white px-3 py-1 rounded-md text-xs font-mono font-bold uppercase mb-4">
                <span>FEBRUARY 23-24, 2027</span>
                <FoxMascot size={22} variant="pixel" />
              </div>

              {/* Arcade Screen Marquee */}
              <div className="relative bg-[#220D04] rounded-2xl p-6 border-2 border-[#54210C] text-center shadow-inner overflow-hidden">
                {/* CRT Scanline & grid */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E65A15]/5 to-transparent pointer-events-none" />

                <div className="font-tech text-3xl sm:text-4xl font-black text-amber-200 tracking-wider uppercase mb-1">
                  A DAY
                </div>
                <div className="font-tech text-2xl sm:text-3xl font-black text-[#E65A15] tracking-widest uppercase drop-shadow">
                  WITH THE FOXES
                </div>
                <div className="text-[11px] font-mono text-amber-300/80 mt-2">
                  INSERT COIN TO START • 2 PLAYERS READY
                </div>
              </div>

              {/* Arcade Controls Deck */}
              <div className="mt-4 p-4 rounded-xl bg-[#281106] border border-[#481E0D]">
                <div className="flex items-center justify-around py-1">
                  {/* Joystick 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#E65A15] shadow-lg border border-white/40" />
                    <div className="w-1.5 h-4 bg-stone-500 rounded-sm" />
                    <div className="w-6 h-2 rounded-full bg-stone-700 mt-0.5" />
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-200 shadow" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#E65A15] border border-orange-200 shadow" />
                    <div className="w-3.5 h-3.5 rounded-full bg-red-600 border border-red-300 shadow" />
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-cyan-200 shadow" />
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-200 shadow" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-300 border border-yellow-100 shadow" />
                  </div>

                  {/* Joystick 2 */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#E65A15] shadow-lg border border-white/40" />
                    <div className="w-1.5 h-4 bg-stone-500 rounded-sm" />
                    <div className="w-6 h-2 rounded-full bg-stone-700 mt-0.5" />
                  </div>
                </div>

                {/* Cabinet Info */}
                <div className="mt-3 text-center border-t border-[#3E1A0C] pt-2">
                  <div className="font-tech text-xs tracking-wider text-amber-200 font-bold uppercase">
                    SCHOOL OF COMPUTING
                  </div>
                  <div className="text-[10px] font-mono text-stone-300">
                    9 AM - 4 PM | SJH BUILDING
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: READY TO JOIN THE FOXES? */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-4">
              <FoxMascot size={64} className="shrink-0" />
              <div>
                <h2 className="font-tech text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B0B04] leading-tight">
                  READY TO JOIN
                  <div className="text-[#E65A15]">THE FOXES?</div>
                </h2>
              </div>
            </div>

            <p className="font-mono text-xs sm:text-sm text-[#54210C] leading-relaxed max-w-lg">
              {eventInfo.readyText}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAdventure}
                className="inline-flex items-center gap-2 py-3 px-7 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs sm:text-sm tracking-wider uppercase transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/40 cursor-pointer"
              >
                <span>ENTER THE FOX ADVENTURE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
