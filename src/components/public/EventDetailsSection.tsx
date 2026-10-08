import React from 'react';
import { EventInfo, GalleryPhoto } from '../../types';
import { Calendar, Clock, MapPin, Phone, Sparkles } from 'lucide-react';

interface EventDetailsSectionProps {
  eventInfo: EventInfo;
  galleryPhotos: GalleryPhoto[];
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  eventInfo,
  galleryPhotos
}) => {
  return (
    <section id="details" className="relative bg-[#C84E0C] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background diagonal stripe subtle texture */}
      <div className="absolute inset-0 hazard-stripes opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Event Details Dark Card */}
        <div className="lg:col-span-6">
          <div className="bg-[#1C0E07] text-[#FFF7ED] p-7 sm:p-9 rounded-3xl border-2 border-[#54210C] shadow-2xl">
            {/* Header with calendar icon */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3E1A0C]">
              <div className="p-2.5 rounded-xl bg-[#C84E0C]/20 border border-[#C84E0C]/40 text-[#FFA05A]">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="font-tech text-2xl sm:text-3xl font-black tracking-tight text-white">
                Event Details
              </h2>
            </div>

            {/* What to expect text */}
            <div className="mb-6 p-4 rounded-xl bg-[#29130A] border border-[#481E0D]">
              <div className="font-tech text-xs uppercase tracking-wider text-[#FF9E59] font-bold mb-1">
                What To Expect:
              </div>
              <p className="font-mono text-xs leading-relaxed text-[#FED7AA]">
                {eventInfo.whatToExpect}
              </p>
            </div>

            {/* Detail items */}
            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <Calendar className="w-5 h-5 text-[#E65A15] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#FFB074]">Date: </span>
                  <span className="text-[#FFF7ED]">{eventInfo.dateRange}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#E65A15] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#FFB074]">Time: </span>
                  <span className="text-[#FFF7ED]">{eventInfo.timeRange}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#E65A15] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#FFB074]">Venue: </span>
                  <span className="text-[#FFF7ED]">{eventInfo.venue}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#E65A15] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#FFB074]">Contact Information: </span>
                  <span className="text-[#FFF7ED]">{eventInfo.coordinators}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Polaroid Gallery Cards with Tapes & "See you there!!" */}
        <div id="gallery" className="lg:col-span-6 relative">
          {/* Fun Handwritten "See you there!!" note */}
          <div className="flex items-center justify-end gap-2 pr-6 mb-4 select-none">
            <span className="font-silkscreen text-xl sm:text-2xl text-amber-200 tracking-wider font-bold drop-shadow transform -rotate-3 inline-block">
              See you there!!
            </span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" />
          </div>

          {/* Polaroid Collection Stacking */}
          <div className="flex flex-col gap-5 sm:gap-6 items-center">
            {galleryPhotos.map((photo, index) => {
              const rotation = photo.rotationDeg || (index === 0 ? -2 : index === 1 ? 2 : -1);
              return (
                <div
                  key={photo.id}
                  className="relative bg-white text-slate-800 p-3 pb-4 rounded-sm shadow-2xl transition-transform hover:scale-105 hover:z-20 w-full max-w-sm sm:max-w-md group"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Masking tape on top */}
                  <div className="tape-top" />

                  {/* Photo image */}
                  <div className="w-full h-40 sm:h-48 overflow-hidden rounded-xs bg-stone-900 border border-stone-300">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Polaroid caption handwritten style */}
                  <div className="mt-2 text-center font-mono text-[11px] text-stone-700 font-semibold truncate px-1">
                    {photo.caption}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
