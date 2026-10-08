import React, { useState } from 'react';
import { EventInfo } from '../../types';
import { Save, Check, RefreshCw, Calendar, Clock, MapPin, Phone, Video } from 'lucide-react';

interface EventSettingsTabProps {
  eventInfo: EventInfo;
  onUpdateEventInfo: (info: EventInfo) => void;
}

export const EventSettingsTab: React.FC<EventSettingsTabProps> = ({
  eventInfo,
  onUpdateEventInfo
}) => {
  const [formData, setFormData] = useState<EventInfo>({ ...eventInfo });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof EventInfo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEventInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C]">
        <div>
          <h2 className="font-tech text-2xl font-black text-white uppercase">
            Event Information & Schedule
          </h2>
          <p className="font-mono text-xs text-amber-200/80">
            Edit the event date, venue, coordinator contact, about section, and highlight reel.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-400 font-mono text-xs">
            <Check className="w-4 h-4" />
            <span>Changes published live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Schedule & Location */}
        <div className="bg-[#1C0E07] p-6 rounded-2xl border border-[#481E0C] space-y-4">
          <h3 className="font-tech text-lg font-bold text-white uppercase border-b border-[#311306] pb-3">
            Schedule & Venue Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="block text-amber-200 font-semibold mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E65A15]" />
                <span>Date Range</span>
              </label>
              <input
                type="text"
                value={formData.dateRange}
                onChange={(e) => handleChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E65A15]" />
                <span>Time Range</span>
              </label>
              <input
                type="text"
                value={formData.timeRange}
                onChange={(e) => handleChange('timeRange', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E65A15]" />
                <span>Venue Location</span>
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => handleChange('venue', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#E65A15]" />
                <span>Event Coordinators</span>
              </label>
              <input
                type="text"
                value={formData.coordinators}
                onChange={(e) => handleChange('coordinators', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Content & Copy Texts */}
        <div className="bg-[#1C0E07] p-6 rounded-2xl border border-[#481E0C] space-y-4">
          <h3 className="font-tech text-lg font-bold text-white uppercase border-b border-[#311306] pb-3">
            Public Website Copywriting
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-amber-200 font-semibold mb-1">
                Header Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-1">
                "About the Event" Description
              </label>
              <textarea
                rows={3}
                value={formData.aboutText}
                onChange={(e) => handleChange('aboutText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-1">
                "What To Expect" Text
              </label>
              <textarea
                rows={2}
                value={formData.whatToExpect}
                onChange={(e) => handleChange('whatToExpect', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-1">
                "Ready to Join the Foxes?" Subtext
              </label>
              <input
                type="text"
                value={formData.readyText}
                onChange={(e) => handleChange('readyText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Video Reel Settings */}
        <div className="bg-[#1C0E07] p-6 rounded-2xl border border-[#481E0C] space-y-4">
          <h3 className="font-tech text-lg font-bold text-white uppercase border-b border-[#311306] pb-3 flex items-center gap-2">
            <Video className="w-5 h-5 text-[#E65A15]" />
            <span>Video Teaser Settings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="block text-amber-200 font-semibold mb-1">Video Title</label>
              <input
                type="text"
                value={formData.videoTitle}
                onChange={(e) => handleChange('videoTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-1">Video Stream URL</label>
              <input
                type="text"
                value={formData.videoUrl}
                onChange={(e) => handleChange('videoUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-amber-200 font-semibold mb-1">Video Purpose Text</label>
              <textarea
                rows={2}
                value={formData.videoPurpose}
                onChange={(e) => handleChange('videoPurpose', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="py-3 px-8 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-950/60 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish All Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
