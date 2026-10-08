import React from 'react';
import { Organization } from '../../types';
import { FoxMascot } from '../common/FoxMascot';
import { OrgBadge } from '../common/OrgBadge';
import { Terminal, Shield, Film, RefreshCw, ChevronRight, Sparkles, Plus } from 'lucide-react';

interface OrganizationsSectionProps {
  organizations: Organization[];
  onSelectOrg: (org: Organization) => void;
  onOpenAdmin: () => void;
}

export const OrganizationsSection: React.FC<OrganizationsSectionProps> = ({
  organizations,
  onSelectOrg,
  onOpenAdmin
}) => {
  const getOrgIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Terminal className="w-5 h-5 text-amber-500" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-orange-500" />;
      case 'media':
        return <Film className="w-5 h-5 text-amber-600" />;
      case 'loop':
        return <RefreshCw className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section id="organizations" className="relative bg-[#160803] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#311306]">
      {/* Decorative side hazard stripes border */}
      <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-6 hazard-stripes-strong opacity-80" />
      <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-6 hazard-stripes-strong opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header row matching screenshot 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#351508]">
          <div className="flex items-center gap-3">
            <FoxMascot size={44} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-tech text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
                  Featured Organizations
                </h2>
                <span className="text-[#E65A15] text-xl">✨</span>
              </div>
              <p className="font-mono text-xs text-amber-200/70">
                School of Computing Accredited Student Organizations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-amber-200/60 hidden md:inline">
              Rooted In Code, Driven By Purpose.
            </span>
            <button
              onClick={onOpenAdmin}
              className="text-[11px] font-mono px-3 py-1 rounded bg-[#2A1107] border border-[#4E210D] text-amber-300 hover:bg-[#3D180A] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#E65A15]" />
              <span>Manage in CMS</span>
            </button>
          </div>
        </div>

        {/* 4 Featured Organization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="bg-[#1C0E07] rounded-2xl border-2 border-[#54210C] hover:border-[#E65A15] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-950/60 group"
            >
              <div>
                {/* Top Icon Badge */}
                <div className="w-10 h-10 rounded-xl bg-[#281208] border border-[#481E0C] flex items-center justify-center mb-4 group-hover:border-[#E65A15]/60 transition-colors">
                  {getOrgIcon(org.iconType)}
                </div>

                {/* Organization Title */}
                <h3 className="font-tech font-black text-base sm:text-lg text-white mb-3 uppercase tracking-wide group-hover:text-amber-300 transition-colors line-clamp-2">
                  {org.name}
                </h3>

                {/* Organization Description */}
                <p className="font-mono text-[11px] sm:text-xs text-[#E6CCB2] leading-relaxed line-clamp-6 uppercase mb-6">
                  {org.description}
                </p>
              </div>

              {/* Bottom Row: Logo badge & Circular arrow button */}
              <div className="pt-4 border-t border-[#311306] flex items-center justify-between">
                <OrgBadge type={org.iconType} acronym={org.acronym} size="sm" />

                <button
                  onClick={() => onSelectOrg(org)}
                  aria-label={`View ${org.name}`}
                  className="w-9 h-9 rounded-full border border-[#E65A15]/50 group-hover:border-[#E65A15] bg-[#2A1107] group-hover:bg-[#E65A15] text-[#E65A15] group-hover:text-white flex items-center justify-center transition-all cursor-pointer shadow"
                >
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
