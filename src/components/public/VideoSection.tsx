import React, { useState } from 'react';
import { EventInfo } from '../../types';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';

interface VideoSectionProps {
  eventInfo: EventInfo;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ eventInfo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="video" className="relative bg-[#160803] text-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Orange horizontal divider bar as shown in screenshot */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="h-2 w-full bg-gradient-to-r from-[#D95A11] via-[#F97316] to-[#D95A11] rounded-full shadow-lg shadow-orange-950" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Video Player Container */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden border-3 border-[#54210C] bg-[#0E0401] shadow-2xl group">
            {/* If playing, show video; otherwise show vintage newspaper thumbnail as in screenshot */}
            {isPlaying ? (
              <div className="relative aspect-video bg-black">
                <video
                  src={eventInfo.videoUrl}
                  autoPlay
                  controls
                  muted={isMuted}
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            ) : (
              <div
                onClick={() => setIsPlaying(true)}
                className="relative aspect-video cursor-pointer overflow-hidden flex items-center justify-center bg-[#201812]"
              >
                {/* Vintage Newspaper / Aged Parchment aesthetic matching the screenshot */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter contrast-125 sepia-[0.35] brightness-90 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80')`
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

                {/* Play Button Overlay */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 border-2 border-white/60 group-hover:border-[#E65A15] group-hover:bg-[#E65A15] flex items-center justify-center text-white transition-all transform group-hover:scale-110 shadow-2xl">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>

                {/* Bottom Video Badge */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-amber-200/90">
                  <span className="bg-black/70 px-2 py-1 rounded border border-white/10">
                    ADF2027 • Official Promotional Teaser
                  </span>
                  <span className="bg-[#E65A15] text-white px-2 py-0.5 rounded font-bold">
                    HD 1080P
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Title & Purpose Text */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-4 h-4 text-[#E65A15]" />
              <span>OFFICIAL HIGHLIGHT REEL</span>
            </div>

            <div className="font-tech text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-none">
              <span className="text-white">ADF</span>
              <span className="text-[#E65A15]">2027</span>
              <div className="text-xl sm:text-2xl mt-1 text-[#FFF7ED]">
                A DAY WITH <span className="text-[#E65A15]">THE FOXES</span>
              </div>
            </div>

            <p className="font-mono text-xs sm:text-sm text-[#FED7AA] leading-relaxed pt-3 border-t border-[#351508]">
              {eventInfo.videoPurpose}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="py-2.5 px-5 rounded-lg bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isPlaying ? 'Replay Teaser' : 'Watch Official Teaser'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
