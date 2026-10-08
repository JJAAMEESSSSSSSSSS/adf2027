import React from 'react';
import { Organization } from '../../types';
import { OrgBadge } from '../common/OrgBadge';
import { X, MapPin, Users, Award, ExternalLink, Sparkles } from 'lucide-react';

interface OrgDetailsModalProps {
  org: Organization | null;
  onClose: () => void;
  onJoinClick: (orgName: string) => void;
}

export const OrgDetailsModal: React.FC<OrgDetailsModalProps> = ({
  org,
  onClose,
  onJoinClick
}) => {
  if (!org) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#1C0E07] text-white rounded-3xl border-3 border-[#E65A15] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1107] text-amber-200 hover:text-white hover:bg-[#E65A15] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <OrgBadge type={org.iconType} acronym={org.acronym} size="md" />
          <div>
            <span className="font-mono text-[11px] text-[#E65A15] uppercase font-bold tracking-wider">
              {org.category}
            </span>
            <h3 className="font-tech text-xl sm:text-2xl font-black text-white uppercase">
              {org.name}
            </h3>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#291207] border border-[#481E0C] text-xs font-mono text-amber-200/90 mb-5 italic">
          "{org.tagline || 'Rooted In Code, Driven By Purpose.'}"
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div>
            <h4 className="font-tech text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
              About This Organization
            </h4>
            <p className="text-[#E6CCB2] leading-relaxed">
              {org.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#2A1107] border border-[#481E0C]">
              <div className="text-[10px] text-stone-400">BOOTH VENUE</div>
              <div className="text-amber-200 font-bold mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E65A15]" />
                <span>{org.boothLocation || 'SJH Building Main Hall'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#2A1107] border border-[#481E0C]">
              <div className="text-[10px] text-stone-400">ACTIVE MEMBERS</div>
              <div className="text-amber-200 font-bold mt-0.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#E65A15]" />
                <span>{org.memberCount}+ Student Foxes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#3B1709] flex gap-3">
          <button
            onClick={() => {
              onClose();
              onJoinClick(org.name);
            }}
            className="flex-1 py-3 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join This Org at ADF2027</span>
          </button>
        </div>
      </div>
    </div>
  );
};
